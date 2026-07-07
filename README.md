# 情熱型ポートフォリオ

「好きなことに、誰よりも夢中になる。」をコンセプトにしたポートフォリオサイトです。

## 技術スタック

- Next.js (App Router / TypeScript)
- Tailwind CSS v4
- lucide-react

## ローカル開発

```powershell
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## ビルド

```powershell
npm run build
```

静的ファイルは `out/` フォルダに出力されます。

## GitHub Pages への公開

### 1. リポジトリ作成

[GitHub](https://github.com/new) で新規リポジトリを作成します（Public 推奨）。

### 2. リポジトリ名と basePath

| リポジトリ名 | 公開 URL |
|---|---|
| `yourname.github.io` | `https://yourname.github.io/` |
| `portfolio` など | `https://yourname.github.io/portfolio/` |

`yourname.github.io` 以外の名前の場合は、ローカルビルド時に環境変数を設定します:

```powershell
$env:NEXT_PUBLIC_BASE_PATH="/portfolio"
npm run build
```

GitHub Actions 上では `GITHUB_REPOSITORY` から自動判定されます。

### 3. push と Pages 設定

```powershell
git init
git add .
git commit -m "Initial commit: passion portfolio"
git branch -M main
git remote add origin https://github.com/yourname/portfolio.git
git push -u origin main
```

リポジトリの **Settings → Pages → Build and deployment → Source** で **GitHub Actions** を選択します。

### 4. Contact 情報の更新

[`lib/content.ts`](lib/content.ts) の `contact` セクションを実際の URL・メールアドレスに差し替えて push してください。

## カスタマイズ

テキストやプロジェクト内容は [`lib/content.ts`](lib/content.ts) を編集するだけで更新できます。
