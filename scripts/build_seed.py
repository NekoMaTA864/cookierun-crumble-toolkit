"""Rebuild the small, attributed starter dataset. Not a scrape of a third-party dex."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://crumbles.fun/zh-TW/builds/'
teams = []

def add(id, title, mode, members, pets, note, slug, date='2026-10-13', subtype='', benefits=None):
    teams.append(dict(id=id, title=title, mode=mode, subtype=subtype,
                      cookies=members.split('|'), pets=pets.split('|'), note=note,
                      benefits=benefits or [], sourceUrl=BASE+slug, sourceLabel='crumbles.fun 社群參考',
                      sourceDate=date, checkedAt='2026-10-21', status='reference'))

add('stage-chardonnay','夏多內葡萄推圖隊','stage',
    '活潑探子餅乾|黑皮諾葡萄餅乾|石榴餅乾|小巫莓餅乾|搖滾巨星餅乾|櫻桃可樂餅乾|夏多內葡萄餅乾|起司蛋糕餅乾|溜冰女王餅乾|鉢里公主餅乾|酥脆專科醫生牛奶餅乾|黑巧克力餅乾',
    '新生神滴露|熱狗狗|汪汪毛球','偏自動推圖；團長採醫生牛奶。關卡卡住時再調整走位。','chardonnay-stage','2026-10-15',benefits=['熱情代替薪水','超高速升遷'])
add('stage-bari','鉢里公主自動隊','stage',
    '馬卡龍餅乾|蠍子餅乾|起司蛋糕餅乾|溜冰女王餅乾|酥脆專科醫生牛奶餅乾|櫻桃可樂餅乾|活潑探子餅乾|黑皮諾葡萄餅乾|石榴餅乾|鉢里公主餅乾|草莓可麗餅餅乾|黑巧克力餅乾',
    '新生神滴露|滿電棉花糖|熱狗狗','以鉢里公主為核心。星級、頭目控制與生存壓力會影響效果；寵物替代請看原文。','princess-bari-auto',benefits=['超高速升遷','熱情代替薪水'])
add('guild-cheesecake','起司蛋糕討伐隊','guild',
    '馬卡龍餅乾|蠍子餅乾|黑皮諾葡萄餅乾|石榴餅乾|奶油蘇打餅乾|黑巧克力餅乾|活潑探子餅乾|哈密瓜蘇打餅乾|起司蛋糕餅乾|溜冰女王餅乾|酥脆專科醫生牛奶餅乾|錫蘭騎士餅乾',
    '芥末章魚|熱狗狗|五彩福袋','重試型高分參考，依賴隨機增益目標；不是保證分數。攻擊力排序與團長設定需依原文核對。','guild-cheesecake-lotto',benefits=['爆肝模式','熱情代替薪水'])
add('arena-cherry','櫻桃可樂多重隊','arena',
    '馬卡龍餅乾|黑皮諾葡萄餅乾|石榴餅乾|酥脆專科醫生牛奶餅乾|離子餅乾機器人|藥草餅乾|烤箱浪子餅乾|起司蛋糕餅乾|鉢里公主餅乾|無名蛋糕犬|櫻桃可樂餅乾|中秋柿子月兔餅乾',
    '嚴肅巧克力巨大滴露|熱狗狗|新生神滴露','多重與連擊配置參考。來源僅標記競技場，初版歸一般競技場，實際限制需對照當期規則。','cherry-cola-multi-arena')
add('daily-exp','活潑探子無人機隊','daily',
    '活潑探子餅乾|起司蛋糕餅乾|葡萄藤餅乾|搖滾巨星餅乾|無名蛋糕犬|藥草餅乾|黑麥餅乾|石榴餅乾|萊姆餅乾|酥脆專科醫生牛奶餅乾|離子餅乾機器人|中秋柿子月兔餅乾',
    '新生神滴露|冰晶甜點鳥|熱狗狗','以探子無人機處理頭目。高階通關表現需實測。','exp-brightseeker-drone','2026-09-27','經驗值', ['熱情代替薪水','防具維修優惠'])
add('daily-coin','暗屬性錢幣隊','daily',
    '風箭手餅乾|哈密瓜蘇打餅乾|石榴餅乾|扭扭糖餅乾|無名蛋糕犬|藥草餅乾|銀河餅乾|黑皮諾葡萄餅乾|小巫莓餅乾|酥脆專科醫生牛奶餅乾|草莓可麗餅餅乾|黑巧克力餅乾',
    '新生神滴露|嚴肅巧克力巨大滴露|熱狗狗','暗屬性輸出參考；團長與福利可依自己的養成檢查。','coin-dark-dealers',subtype='錢幣',benefits=['熱情代替薪水','超高速升遷'])
add('daily-dough','櫻桃可樂麵團隊','daily',
    '風箭手餅乾|哈密瓜蘇打餅乾|溜冰女王餅乾|巧克力牙膏餅乾|無名蛋糕犬|藥草餅乾|銀河餅乾|石榴餅乾|濃縮咖啡餅乾|酥脆專科醫生牛奶餅乾|櫻桃可樂餅乾|黑巧克力餅乾',
    '新生神滴露|嚴肅巧克力巨大滴露|熱狗狗','多重／範圍綜效刷麵團參考。','dough-cherry-cola-multi',subtype='麵團',benefits=['熱情代替薪水','超高速升遷'])
add('daily-research','水屬性研究石隊','daily',
    '風箭手餅乾|銀河餅乾|石榴餅乾|奶油蘇打餅乾|離子餅乾機器人|櫻桃可樂餅乾|馬卡龍餅乾|哈密瓜蘇打餅乾|溜冰女王餅乾|酥脆專科醫生牛奶餅乾|清涼薄荷餅乾|黑巧克力餅乾',
    '新生神滴露|嚴肅巧克力巨大滴露|熱狗狗','水屬性刷本參考；包含黑巧克力的降防。','research-water-stack',subtype='研究石',benefits=['熱情代替薪水','超高速升遷'])
add('daily-rune','火系持續符文隊','daily',
    '馬卡龍餅乾|烤箱浪子餅乾|黑麥餅乾|吸血鬼餅乾|酥脆專科醫生牛奶餅乾|藥草餅乾|活潑探子餅乾|蠍子餅乾|石榴餅乾|叢林戰士餅乾|無名蛋糕犬|黑巧克力餅乾',
    '新生神滴露|滿電棉花糖|熱狗狗','火屬性與持續綜效的單體頭目配置參考。','rune-fire-dot',subtype='符文結晶',benefits=['熱情代替薪水','超高速升遷'])

# Small attributed rune notes, not a complete mirror of the source article.
runes = {
    '酥脆專科醫生牛奶餅乾': (['攻擊力增幅','技能增幅提升','技能加速提升'],'增益與治療都需留意自身攻擊力。'),
    '夏多內葡萄餅乾': (['技能增幅提升','技能加速提升','攻擊力增幅'],'依推圖來源的支援配置。'),
    '小巫莓餅乾': (['技能增幅提升','技能加速提升','傷害減少'],'來源推圖配置；生存不足可保留減傷。'),
    '搖滾巨星餅乾': (['技能增幅提升','技能加速提升','傷害減少'],'來源推圖配置。'),
    '黑皮諾葡萄餅乾': (['技能加速提升','專注率增加','攻擊力增幅'],'競技場來源的建議組合，非跨模式唯一答案。'),
    '起司蛋糕餅乾': (['技能加速提升','技能增幅提升'],'以競技場支援用途為基準。'),
    '藥草餅乾': (['攻擊力增幅','技能增幅提升','技能加速提升'],'競技場來源的治療配置。'),
    '馬卡龍餅乾': (['技能加速提升','技能增幅提升'],'以競技場來源為基準。'),
    '蠍子餅乾': (['專注率增加','攻擊力增幅','技能增幅提升'],'公會討伐戰來源，重視減益命中。'),
    '溜冰女王餅乾': (['技能加速提升','技能增幅提升'],'公會討伐戰來源。'),
    '石榴餅乾': (['技能加速提升','技能增幅提升'],'公會討伐戰來源。'),
    '活潑探子餅乾': (['技能加速提升','技能增幅提升','攻擊力增幅'],'每日經驗值副本來源。'),
    '黑巧克力餅乾': (['技能加速提升','專注率增加','傷害減少'],'研究石副本來源。'),
}
sources_for = {name:next(t['sourceUrl'] for t in teams if name in t['cookies']) for name in runes}
for name in ['黑皮諾葡萄餅乾','起司蛋糕餅乾','藥草餅乾','馬卡龍餅乾']:
    sources_for[name]=BASE+'cherry-cola-multi-arena'
for name in ['蠍子餅乾','溜冰女王餅乾','石榴餅乾']:
    sources_for[name]=BASE+'guild-cheesecake-lotto'
sources_for['活潑探子餅乾']=BASE+'exp-brightseeker-drone'
sources_for['黑巧克力餅乾']=BASE+'research-water-stack'
names=sorted({n for t in teams for n in t['cookies']})
data={'schemaVersion':1,'checkedAt':'2026-10-21','teams':teams,'cookies':[
    {'id':f'cookie-{i+1:03d}','name':n,'stats':runes[n][0] if n in runes else [],
     'runeNote':runes[n][1] if n in runes else '尚未整理此角色的糖符文建議，不提供推測配法。',
     'runeSource':sources_for.get(n,''),'role':'待補技能定位'} for i,n in enumerate(names)],
    'limitations':['熱熱鬧鬧競技場尚待獨立來源，未套用一般競技場配隊。','初版角色索引只涵蓋已收錄隊伍，非全圖鑑。','來源配置可能受改版影響，缺角符合度不代表強度。']}
out=ROOT/'dist/data';out.mkdir(parents=True,exist_ok=True)
(out/'catalog.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(out/'generated.json').write_text(json.dumps({'schemaVersion':1,'videos':[],'teams':[],'runeNotes':[],'lastCheckedAt':None,'state':'not_configured'},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Built {len(teams)} teams / {len(names)} cookie entries')
