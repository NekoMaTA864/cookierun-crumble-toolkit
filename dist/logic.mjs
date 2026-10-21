export const MODES=['stage','guild','arena','chaos','daily'];
export function cleanTeam(t){
  if(!t||typeof t!=='object'||!MODES.includes(t.mode))throw Error('隊伍模式不正確');
  const strings=(a,max)=>{if(!Array.isArray(a)||a.length>max||a.some(x=>typeof x!=='string'||!x.trim()||x.length>80))throw Error('隊伍成員格式不正確');return [...new Set(a.map(x=>x.trim()))]};
  const cookies=strings(t.cookies,12);if(!cookies.length)throw Error('至少需要一名餅乾');
  return {id:String(t.id||'').slice(0,100),title:String(t.title||'我的隊伍').slice(0,80),mode:t.mode,subtype:String(t.subtype||'').slice(0,80),cookies,pets:strings(t.pets||[],3),note:String(t.note||'').slice(0,2000),status:'custom',sourceDate:String(t.sourceDate||'').slice(0,30),benefits:[]};
}
export function missingCookies(team,owned){return team.cookies.filter(n=>!owned.includes(n));}
export function rankTeams(teams,owned){return [...teams].sort((a,b)=>missingCookies(a,owned).length-missingCookies(b,owned).length||a.title.localeCompare(b.title,'zh-Hant'));}
export function checkRune(targets,lines){
  if(!targets.length)return {title:'尚無可核對的建議',detail:'保留現有配置，等待此角色的具體來源；不依通用模板判定重洗。'};
  const valid=lines.filter(x=>x.stat);const fit=valid.filter(x=>targets.includes(x.stat));
  if(!valid.length)return {title:'先選擇目前詞條',detail:'依你填入的詞條比對來源建議，不計算未公開的機率或保證傷害。'};
  const lockedOff=valid.filter(x=>x.locked&&!targets.includes(x.stat));
  return {title:fit.length?`${fit.length} / ${valid.length} 條符合參考候選`:'目前沒有符合候選的詞條',detail:lockedOff.length?'有鎖定詞條不在本配置候選內；先確認其生存或特殊用途，再決定是否解鎖。':fit.length===valid.length?'目前詞條都在候選內，可先保留並實測；不因稀有度較低就直接重洗。':'先確認這隻角色是否常上場，以及實際缺的是輸出、生存還是效果覆蓋，再投入材料。'};
}
export function validateBackup(raw){
  if(!raw||raw.version!==1||!Array.isArray(raw.owned)||raw.owned.length>500||raw.owned.some(n=>typeof n!=='string'||n.length>80))throw Error('不是支援的設定檔');
  if(!Array.isArray(raw.teams)||raw.teams.length>200||!Array.isArray(raw.favorites)||raw.favorites.length>500)throw Error('設定資料過大或不完整');
  return {version:1,owned:[...new Set(raw.owned)],teams:raw.teams.map(cleanTeam),favorites:raw.favorites.filter(x=>typeof x==='string').map(x=>x.slice(0,100)),notes:Object.fromEntries(Object.entries(raw.notes||{}).slice(0,500).filter(([k,v])=>k.length<=100&&typeof v==='string').map(([k,v])=>[k,v.slice(0,2000)]))};
}
