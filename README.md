# 餅乾作戰室｜Cookie Lab

《薑餅人放置大戰爭 / CookieRun: Crumble》個人小工具，純 HTML / CSS / JavaScript，可部署 GitHub Pages。

## 初版可用

- 推圖、公會討伐戰、一般競技場、五種每日副本參考配置：9 隊。
- 熱熱鬧鬧競技場獨立分類，尚無確認來源；可自訂隊伍。
- 34 名起始餅乾索引（不是完整圖鑑），13 名角色有模式相關的糖符文候選。
- 持有名單、缺角排序、無缺角篩選、收藏、實測筆記、自訂配置、複製名單。
- 個人資料只存瀏覽器，可匯出／匯入 JSON；不會同步到公開 repo。
- 糖符文比對是參考候選檢查，不推測機率、數值收益或畢業門檻。

初始資料核對日：2026-10-21。資料來源保存在每張隊伍卡；初版社群資料不是蹦蹦林影片解析結果。不複製完整第三方圖鑑或攻略文章。

## 本機

在專案目錄執行 `python -m http.server 8765 --directory dist`，開啟 http://localhost:8765 。不可直接使用 file://，因為資料透過 fetch 讀取。

測試：`node --test tests/logic.test.mjs` 與 `python -m unittest discover -s tests -p 'test_*.py'`。

## GitHub Pages

1. 將所有來源推到 `main`。
2. Repository Settings → Pages → Source 選 GitHub Actions。
3. 執行 `Build, update and deploy Cookie Lab`，或推送 dist 變更。

只公開 dist/；腳本、處理狀態與 Secrets 不屬於網站資產。

## 每日影片更新（預備完成，需設定才能啟用）

固定頻道：PonPonLin 蹦蹦林，`@ponponlin`，`UC4O0Bsolr3brLF1jdo9v-jg`。

Repository Settings → Secrets and variables → Actions：

- Secret `YOUTUBE_API_KEY`：啟用 YouTube Data API v3，僅讀取公開頻道／影片，不需要 YouTube 帳號 OAuth。
- Secret `GEMINI_API_KEY`：Gemini Developer API，使用支援公開 YouTube 影片的模型。
- Variable `ENABLE_VIDEO_UPDATES`：設成 `true` 才啟用自動分析。

每日 cron `17 2 * * *` 即台灣時間 10:17，GitHub 排程可能延遲或漏跑，並非準時服務。也可手動 workflow_dispatch。公開 repo 長期無活動時排程可能停用，請查看 Actions。

API 配額與費用取決於 Google 帳號，ChatGPT 訂閱額度不會轉成 Gemini API 額度。未設定 Secrets 時不呼叫 API、不改動資料。

流程：讀上傳清單 → 遊戲名稱初篩 → Gemini 音畫確認遊戲 → 結構化陣容／符文與時間戳 → 驗證 → 新增獨立參考版本 → 部署。

- 首次最多掃描最近 200 支上傳，之後遇已處理紀錄即停止翻頁；每次最多分析 3 支。
- 失敗項保留 pending；已成功項有 checkpoint，避免正常重跑重複付費。checkpoint 寫檔前程序被強制終止仍可能重複請求。
- 最長自動分析 60 分鐘；過長、直播中與無長度項目放待確認。
- 不將王國或烤箱大逃亡影片視為 Crumble。模糊模式不猜一般／熱鬧競技場。
- 名稱必須在起始索引內，證據需有影片範圍內秒數，擷取自評至少 0.8；這是資料篩選門檻，不是校準過的正確率。
- 新角色、資訊不完整或證據不足保留 reviewReasons，不冒充已確認攻略。
- 自動結果標記「影片解析・待實測」，不覆寫人工配置。這是附來源的參考更新，不保證模型判讀正確。
- 程式不透過 YouTube Data API 下載他人字幕；影片內容交由 Gemini 公開 URL 輸入解析。會員限定／私人／無法讀取的影片不保證可用。

要擴充圖鑑，編輯 `scripts/build_seed.py` 或 `dist/data/catalog.json`；不要在已累積影片資料後直接執行 seed 重建，因為 seed 會初始化 generated.json。

## 來源

- [蹦蹦林頻道](https://www.youtube.com/channel/UC4O0Bsolr3brLF1jdo9v-jg)
- [crumbles.fun 配隊](https://crumbles.fun/zh-TW/builds)：初版少量隊伍、寵物與糖符文索引，逐筆連回原頁。
- [YouTube playlistItems.list](https://developers.google.com/youtube/data/reference/rest/v3/playlistItems/list)
- [Gemini video understanding](https://ai.google.dev/gemini-api/docs/video-understanding)

角色、遊戲名稱與商標屬 Devsisters；本工具為非官方個人專案。
