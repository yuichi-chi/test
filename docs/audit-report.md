# サイト全体監査レポート

実施日: 2026-07-08  
対象: `test/` ポートフォリオ（localhost:3000）

## [P0] Contact プレースホルダー露出 — 解決済み

- 場所: `lib/content.ts`, `Header.tsx`, `About.tsx`
- 現象: GitHub / Email / X が `your-username` 等のダミー値
- 期待: 実在する連絡先のみ表示
- 修正: GitHub を `https://github.com/yuichi-chi`、Web を `https://yuichi-chi.github.io` に更新。メール未設定のため非表示化
- 確認: ホーム About / Header のリンク先を確認

## [P0] 旧 slug の 500 エラー — 解決済み（既存）

- 場所: `/works/rainbow-orb-rl`
- 現象: 存在しない slug で 500（過去）
- 期待: 404 を返す
- 修正: `generateStaticParams` + `notFound()` により 404。カスタム `app/not-found.tsx` を追加
- 確認: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/works/rainbow-orb-rl` → 404

## [P1] NFT ざっくりモードで英語見出し — 解決済み

- 場所: `lib/content.ts` NFT sections 4件
- 現象: Mint Flow 等に `titleSimple` 欠落
- 修正: 各セクションに日本語 `titleSimple` を追加

## [P1] RL PPO Configuration の bodySimple 不足 — 解決済み

- 場所: `lib/content.ts` PPO Configuration
- 現象: expert 2段落 vs simple 1段落
- 修正: エントロピー係数の説明を `bodySimple` に追加

## [P1] プロジェクト04の扱い不明確 — 解決済み（案B）

- 場所: `WorkList.tsx`, `WorkDetail.tsx`
- 現象: slug なし・詳細ページなし・ViewMode 非対応
- 修正: `storySimple` 追加、「インライン展示」タグと説明文を表示。詳細ページは作らず expert 寄りの概要をホーム掲載

## [P1] 印刷時に ViewMode トグルが残る — 解決済み

- 場所: `globals.css`, `ProjectViewModeToggle.tsx`
- 修正: `.project-view-mode-toggle` を `@media print` で非表示

## [P1] ESLint エラー（ProjectViewModeContext） — 解決済み

- 場所: `ProjectViewModeContext.tsx`
- 現象: effect 内 setState で lint error
- 修正: `useSyncExternalStore` で localStorage と同期

## [P2] 未使用 heroVisual 型・CSS — 解決済み

- 場所: `lib/content.ts`, `globals.css`
- 修正: `ProjectHeroVisual` 型と `.project-hero-*` を削除

## [P2] 未使用 CSS クラス — 解決済み

- 場所: `globals.css`
- 修正: `.display-lg`, `.fade-in*`, `.scroll-reveal-css`, `@keyframes fade-in-up` を削除

## [P2] portfolio-tmp 残骸 — 解決済み

- 場所: `test/portfolio-tmp/`
- 修正: ディレクトリ削除

## [P2] layout.tsx 未使用 CSS 変数 — 解決済み

- 場所: `app/layout.tsx`
- 修正: `--bg-init`, `--fg-init` を削除

## 意図的に保留

### メールアドレス未設定

- 理由: 公開プロフィールにメール情報なし。`contact.email.address` を空にし UI から非表示
- 対応: 実アドレスが決まり次第 `lib/content.ts` に追記

### プロジェクト04の詳細ページ化

- 理由: 案B（インライン展示）を採用。詳細コンテンツ（sections/process 等）が未整備
- 対応: 必要になったら slug + detail を追加

### siteUrl は GitHub Pages 向け

- 理由: 今回の監査対象はローカルのみ
- 値: `https://yuichi-chi.github.io/test`（変更なし）
