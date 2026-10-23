from pathlib import Path
import re
ROOT=Path(__file__).resolve().parent
html=(ROOT/'index.html').read_text()
css=(ROOT/'style.css').read_text().replace("@import url('data:text/css,');\n",'')
scripts=[]
for name in ['core.mjs','samples.mjs','app.mjs']:
    content=(ROOT/name).read_text()
    content=re.sub(r'^import .*?;\n','',content,flags=re.M)
    content=re.sub(r'^export ', '', content, flags=re.M)
    scripts.append(content)
html=html.replace('<link rel="stylesheet" href="style.css">', '<style>'+css+'</style>')
html=html.replace('<script type="module" src="app.mjs"></script>', '<script type="module">'+'\n'.join(scripts)+'</script>')
(ROOT/'dist'/'index.html').write_text(html)
print(f'Built self-contained page: {(ROOT/"dist"/"index.html").stat().st_size} bytes')
