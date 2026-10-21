import importlib.util
import unittest
from pathlib import Path
spec=importlib.util.spec_from_file_location('updater',Path(__file__).parents[1]/'scripts/update_videos.py')
u=importlib.util.module_from_spec(spec);spec.loader.exec_module(u)

class UpdateTests(unittest.TestCase):
    def test_filter_other_games_even_if_description_has_keywords(self):
        self.assertTrue(u.likely_game('薑餅人放置大戰爭 推圖配置'))
        self.assertTrue(u.likely_game('CookieRun: Crumble guild raid'))
        self.assertFalse(u.likely_game('薑餅人王國 競技場','薑餅人放置大戰爭'))
        self.assertFalse(u.likely_game('烤箱大逃亡 公會戰','CookieRun: Crumble'))
    def test_only_accept_evidence_in_video_and_known_entities(self):
        video={'id':'abcdefghijk','url':'https://www.youtube.com/watch?v=abcdefghijk','duration':100,'publishedAt':'2026-10-21'}
        t={'title':'隊伍','mode':'stage','subtype':'','cookies':['牛奶'],'pets':[], 'confidence':.9,'note':'測試',
           'evidence':{'timestamp_seconds':50,'kind':'SCREEN','note':'畫面有名單'}}
        r={'game_id':'cookierun_crumble','teams':[t],'runeNotes':[]}
        teams,_,rejected=u.extract(r,video,{'牛奶'});self.assertEqual(len(teams),1);self.assertFalse(rejected)
        t['evidence']['timestamp_seconds']=101;self.assertFalse(u.extract(r,video,{'牛奶'})[0])
        t['evidence']['timestamp_seconds']=50;t['cookies']=['新未知角色'];self.assertFalse(u.extract(r,video,{'牛奶'})[0])
        t['cookies']=['牛奶'];t['mode']='chaos';self.assertEqual(u.extract(r,video,{'牛奶'})[0][0]['mode'],'chaos')
    def test_wrong_game_never_publishes_a_team(self):
        self.assertFalse(u.extract({'game_id':'other'}, {'duration':10},set())[0])
        self.assertFalse(u.extract({'game_id':'uncertain'}, {'duration':10},set())[0])
    def test_duration_and_response_parsing(self):
        self.assertEqual(u.duration_seconds('PT1H2M3S'),3723)
        self.assertEqual(u.duration_seconds('P0D'),0)
        self.assertEqual(u.output_text({'steps':[{'type':'model_output','content':[{'type':'text','text':'{}'}]}]}),'{}')

if __name__=='__main__':unittest.main()
