import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {cleanTeam,missingCookies,rankTeams,checkRune,validateBackup} from '../dist/logic.mjs';
const db=JSON.parse(fs.readFileSync(new URL('../dist/data/catalog.json',import.meta.url),'utf8'));
test('reference teams have valid, unique known members and source URLs',()=>{
 const names=new Set(db.cookies.map(c=>c.name));const ids=new Set();
 for(const t of db.teams){assert.equal(cleanTeam(t).cookies.length,12);assert.equal(t.pets.length,3);assert.ok(t.cookies.every(n=>names.has(n)));assert.ok(!ids.has(t.id));ids.add(t.id);assert.equal(new URL(t.sourceUrl).protocol,'https:')}
 assert.deepEqual(new Set(db.teams.filter(t=>t.mode==='daily').map(t=>t.subtype)),new Set(['經驗值','錢幣','麵團','研究石','符文結晶']));
 assert.ok(!db.teams.some(t=>t.mode==='chaos'),'must not mislabel ordinary arena as special arena');
});
test('missing-character comparison is based on names and never mutates saved teams',()=>{
 const a={title:'A',cookies:['牛奶','蠍子']};const b={title:'B',cookies:['牛奶']};
 assert.deepEqual(missingCookies(a,['牛奶']),['蠍子']);assert.equal(rankTeams([a,b],['牛奶'])[0],b);assert.deepEqual(a.cookies,['牛奶','蠍子']);
});
test('unknown rune recommendations cannot advise blind rerolls',()=>{
 assert.match(checkRune([],[{stat:'攻擊力增幅'}]).title,/尚無/);
 assert.match(checkRune(['攻擊力增幅'],[{stat:'體力',locked:true}]).detail,/鎖定/);
 assert.match(checkRune(['攻擊力增幅'],[{stat:'攻擊力增幅'}]).detail,/保留/);
});
test('import rejects oversized and malformed teams before replacing local state',()=>{
 const raw={version:1,owned:['A'],favorites:[],notes:{},teams:[]};assert.equal(validateBackup(raw).owned[0],'A');
 assert.throws(()=>validateBackup({...raw,teams:[{mode:'stage',cookies:Array(13).fill('A')}]}));
 assert.throws(()=>validateBackup({...raw,owned:'all'}));assert.throws(()=>cleanTeam({mode:'kingdom',cookies:['A']}));
});
