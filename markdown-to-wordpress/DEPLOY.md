# GitHub Pages デプロイ手順

## 1. package.jsonの設定を確認

```json
{
  "homepage": "https://yourusername.github.io/markdown-to-wordpress",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

**重要**: `yourusername` を実際のGitHubユーザー名に変更してください。

## 2. ビルドが正常に完了していることを確認

```bash
npm run build
```

ビルドは正常に完了しています。`build/` フォルダが作成されています。

## 3. GitHub Pagesへのデプロイ

### 方法1: GitHub CLI使用（推奨）
```bash
gh auth login
npm run deploy
```

### 方法2: 手動デプロイ
1. `build/` フォルダの内容をコピー
2. GitHubリポジトリの `gh-pages` ブランチを作成
3. `build/` の内容を `gh-pages` ブランチにプッシュ

### 方法3: GitHub Actions使用
`.github/workflows/deploy.yml` ファイルを作成して自動デプロイ設定

## 4. GitHub Pages設定

1. GitHubリポジトリの Settings → Pages
2. Source: Deploy from a branch
3. Branch: gh-pages を選択
4. Folder: / (root) を選択
5. Save

## 5. アクセス

デプロイ完了後、以下のURLでアクセス可能：
`https://yourusername.github.io/markdown-to-wordpress`

## 注意事項

- `package.json` の `homepage` フィールドを正しいURLに設定
- GitHubの認証が必要
- 初回デプロイ時は反映まで数分かかる場合があります