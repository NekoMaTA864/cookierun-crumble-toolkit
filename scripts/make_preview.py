"""Produce a temporary single-file preview for hosts without loopback networking."""
import re
from pathlib import Path
root=Path(__file__).resolve().parents[1]
html=(root/'dist/index.html').read_text(encoding='utf-8')
css=(root/'dist/style.css').read_text(encoding='utf-8')
logic=(root/'dist/logic.mjs').read_text(encoding='utf-8').replace('export ','')
app=(root/'dist/app.js').read_text(encoding='utf-8')
app=re.sub(r'^import .*?;\n','',app,count=1)
catalog=(root/'dist/data/catalog.json').read_text(encoding='utf-8')
generated=(root/'dist/data/generated.json').read_text(encoding='utf-8')
app=app.replace("const r=await fetch('./data/catalog.json');if(!r.ok)throw Error('資料讀取失敗');db=await r.json();try{const r2=await fetch('./data/generated.json');if(r2.ok)generated=await r2.json()}catch{}render()",'db='+catalog+';generated='+generated+';render()')
html=html.replace('<link rel="stylesheet" href="style.css"><script src="app.js" type="module"></script>','<style>'+css+'</style>')
html=html.replace('</body>','<script type="module">'+logic+'\n'+app+'</script></body>')
out=root/'test-output/preview.html';out.parent.mkdir(exist_ok=True);out.write_text(html,encoding='utf-8');print(out)
