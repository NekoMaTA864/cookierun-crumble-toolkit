export const sampleSpecs = [
 {key:'smile',title:'我很好，真的。',caption:'我很好，真的。',sub:'笑著但其實快崩潰',tags:['心累','崩潰','強顏歡笑','貓咪'],bg:'#f5e8d9',ink:'#59493e',pose:'cry',ratio:1.04},
 {key:'ok',title:'好喔',caption:'好 喔',sub:'已讀，隨緣回覆。',tags:['敷衍','收到','無言','貓咪'],bg:'#e8eaf4',ink:'#4a4d6c',pose:'flat',ratio:.88},
 {key:'work1',title:'不想上班的貓 01',caption:'又要上班了嗎',sub:'星期一，先讓我靜一下。',tags:['上班','星期一','心累','貓咪'],bg:'#e5eee7',ink:'#426052',pose:'work',ratio:1.19},
 {key:'cheer',title:'今天也超棒！',caption:'今天也超棒！',sub:'給努力的你一點鼓勵',tags:['加油','鼓勵','開心','貓咪'],bg:'#f3e8c8',ink:'#7c653e',pose:'happy',ratio:.94},
 {key:'what',title:'你再說一次？',caption:'蛤？',sub:'腦袋正在重新連線',tags:['傻眼','疑惑','敷衍','貓咪'],bg:'#eee6f4',ink:'#6c547c',pose:'flat',ratio:1.07},
 {key:'sleep',title:'今日電量已用完',caption:'今日電量已用完',sub:'晚安，明天再努力。',tags:['晚安','想睡','疲憊','貓咪'],bg:'#e1eaf2',ink:'#4b647b',pose:'sleep',ratio:1.19},
 {key:'work2',title:'不想上班的貓 02',caption:'先喝一口再說',sub:'咖啡是最後的倔強',tags:['上班','咖啡','打工','貓咪'],bg:'#ede5dc',ink:'#725948',pose:'work',ratio:.94},
 {key:'happy',title:'好耶，放假！',caption:'好 耶！',sub:'今天的快樂很簡單',tags:['開心','放假','歡呼','貓咪'],bg:'#e6efdb',ink:'#587243',pose:'happy',ratio:1.1},
 {key:'angry',title:'我先忍一下',caption:'我 先 忍 一 下',sub:'表面平靜，內心火山。',tags:['生氣','不爽','反諷','貓咪'],bg:'#f3dedb',ink:'#85594f',pose:'angry',ratio:1},
 {key:'work3',title:'不想上班的貓 03',caption:'下班時間到了嗎',sub:'每一分鐘都好漫長',tags:['上班','下班','厭世','貓咪'],bg:'#e3e9e2',ink:'#53674f',pose:'sleep',ratio:1.13},
 {key:'thanks',title:'謝謝你出現',caption:'謝 謝 你',sub:'有你在就安心了',tags:['謝謝','感謝','溫暖','貓咪'],bg:'#f4e7e7',ink:'#855d66',pose:'happy',ratio:.94},
 {key:'cry',title:'委屈，但還是要吃飯',caption:'先吃飯吧',sub:'難過也要好好照顧自己',tags:['委屈','哭泣','難過','吃飯','貓咪'],bg:'#e6edf0',ink:'#526c79',pose:'cry',ratio:1.16}
];
const escapeXml=s=>String(s).replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]));
export function sampleSVG(s) {
 const eyes=s.pose==='happy'?'<path d="M130 149q9-15 18 0m35 0q9-15 18 0"/>':s.pose==='sleep'?'<path d="M130 148h18m35 0h18"/>':s.pose==='angry'?'<path d="m129 139 20 9m34 0 20-9"/><circle cx="142" cy="151" r="2"/><circle cx="190" cy="151" r="2"/>':'<path d="M131 149h17m36 0h17"/>';
 const tears=s.pose==='cry'?'<path d="M139 156v24m53-24v24" stroke="#8da9bf" stroke-width="5"/>':'';
 const props=s.pose==='work'?'<path d="M194 203h32v28h-32zM226 207h7q9 10-7 16" fill="#fbfaf4"/><path d="M201 195q-6-8 0-15m13 15q-6-8 0-15" stroke-width="2"/>':s.pose==='sleep'?'<text x="232" y="119" font-size="18" stroke="none">z z</text>':s.pose==='happy'?'<path d="m85 117-8-10m4 37H67m166-28 9-10m-2 36h16"/>':'';
 return `<svg xmlns="http://www.w3.org/2000/svg" width="340" height="${Math.round(340*s.ratio)}" viewBox="0 0 340 ${Math.round(340*s.ratio)}"><rect width="340" height="100%" fill="${s.bg}"/><g transform="translate(0 ${s.ratio>.99?8:-12})" stroke="${s.ink}" stroke-width="3.7" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M114 229q-20-26-9-60-11-25 3-43l-3-38 39 22q23-7 46 1l39-20-4 40q15 18 4 42 8 34-10 56" fill="#fcfaf3"/><path d="M113 227q48 12 105 0M119 227v10m90-10v10"/>${eyes}<path d="m159 165 6 4 7-4m-7 4v8m0 0q-7 5-12-1m12 1q7 5 12-1"/><path d="m107 161-22-3m22 10-22 5m139-12 23-4m-23 13 23 5" stroke-width="2"/>${tears}${props}</g><text x="170" y="${Math.round(340*s.ratio)-54}" text-anchor="middle" fill="${s.ink}" font-family="system-ui,sans-serif" font-weight="700" font-size="${s.caption.length>8?23:28}">${escapeXml(s.caption)}</text><text x="170" y="${Math.round(340*s.ratio)-26}" text-anchor="middle" fill="${s.ink}" opacity=".66" font-family="system-ui,sans-serif" font-size="12">${escapeXml(s.sub)}</text></svg>`;
}
