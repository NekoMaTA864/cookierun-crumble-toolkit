export const normalize = value => String(value || '').normalize('NFKC').toLocaleLowerCase('zh-TW').replace(/[，。！？、：；「」『』（）【】,.!?;:()[\]{}"']/g, ' ').replace(/\s+/g, ' ').trim();
const synonymGroups = [
 ['崩潰','撐不住','心累','累了','疲憊','疲倦'],['上班','工作','打工','星期一','週一'],
 ['敷衍','隨便','無言','傻眼','無語','蛤'],['開心','快樂','高興','歡呼','好耶'],
 ['加油','鼓勵','支持','打氣'],['生氣','憤怒','不爽','火大'],['晚安','睡覺','想睡','睏了'],
 ['貓咪','貓貓','小貓','貓'],['收到','了解','好的','好喔'],['哭泣','難過','委屈','哭哭']
];
export function scoreImage(image, query, albums = []) {
 const q = normalize(query); if (!q) return 1;
 const fields = [image.title, image.description, ...(image.tags || []), image.filename, ...albums].map(normalize);
 const haystack = fields.join(' '), groups = q.split(' ').filter(Boolean);
 let score = 0;
 for (const group of groups) {
  let part = 0;
  if (haystack.includes(group)) part += 25 + group.length;
  const chars = [...group], grams = chars.length === 1 ? chars : chars.slice(0,-1).map((c,i) => c+chars[i+1]);
  for (const gram of new Set(grams)) if (haystack.includes(gram)) part += gram.length === 1 ? 2 : 3;
  for (const synonyms of synonymGroups) if (synonyms.some(s => group.includes(s)) && synonyms.some(s => haystack.includes(s))) part += 5;
  if (!part) return 0;
  score += part;
 }
 if (normalize(image.title).includes(q)) score += 30;
 return score;
}
export const parseTags = text => [...new Set(String(text || '').split(/[\s,，、;；#]+/).map(s=>s.trim()).filter(Boolean))].slice(0,30).map(s=>s.slice(0,40));
export const naturalCompare = (a,b) => a.localeCompare(b, 'zh-Hant', {numeric:true,sensitivity:'base'});
export function validateBackup(value) {
 if (!value || value.kind !== 'shitu-local-backup' || value.version !== 1 || !Array.isArray(value.images) || !Array.isArray(value.albums)) throw Error('這不是拾圖的備份檔。');
 if (value.images.length > 1000 || value.albums.length > 1000) throw Error('測試版一次最多還原 1,000 張圖片與 1,000 個套圖。');
 const ids = new Set(); let estimated = 0;
 for (const i of value.images) {
  if (!i || typeof i.id !== 'string' || !i.id || ids.has(i.id)) throw Error('備份的圖片編號重複或無效。'); ids.add(i.id);
  if (!['image/png','image/jpeg','image/webp','image/gif','image/avif'].includes(i.type) || typeof i.data !== 'string' || !i.data.startsWith('data:'+i.type+';base64,') || !/^[A-Za-z0-9+/]*={0,2}$/.test(i.data.split(',')[1] || '') || !i.data.split(',')[1]) throw Error('備份包含不支援的圖片。');
  estimated += i.data.length;
  if (i.data.length > 36*1024*1024 || (i.tags && (!Array.isArray(i.tags) || !i.tags.every(t=>typeof t==='string')))) throw Error('備份的圖片大小或標籤格式錯誤。');
 }
 if (estimated > 140*1024*1024) throw Error('測試版一次最多還原約 100 MB 原圖。');
 const albumIds = new Set();
 for (const a of value.albums) {
  if (!a || typeof a.id !== 'string' || !a.id || albumIds.has(a.id) || typeof a.name !== 'string' || !Array.isArray(a.imageIds) || !a.imageIds.every(id=>typeof id==='string' && ids.has(id))) throw Error('備份的套圖格式或圖片關聯有誤。');
  albumIds.add(a.id);
 }
 return value;
}
