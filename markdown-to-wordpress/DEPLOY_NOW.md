# 今すぐデプロイする手順

## 変更が反映されない原因

Reactアプリの変更をGitHub Pagesに反映するには、ビルドしたファイルを`gh-pages`ブランチにデプロイする必要があります。

## 手動デプロイ手順

### 方法1: GitHub CLIを使用（推奨）

```bash
# 1. GitHub CLIでログイン
gh auth login

# 2. デプロイを実行
npm run deploy
```

### 方法2: 個人アクセストークンを使用

1. GitHubで個人アクセストークンを作成
   - GitHub → Settings → Developer settings → Personal access tokens
   - "Generate new token" をクリック
   - repo権限を付与

2. デプロイコマンドを実行
```bash
npm run deploy
```

3. ユーザー名とパスワード（トークン）を入力

### 方法3: 手動でgh-pagesブランチを更新

```bash
# 1. gh-pagesブランチを作成/切り替え
git checkout -b gh-pages

# 2. buildフォルダの内容をコピー
cp -r build/* .

# 3. コミットしてプッシュ
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages

# 4. masterブランチに戻る
git checkout master
```

## 確認事項

1. **package.jsonのhomepage設定**を確認：
   ```json
   "homepage": "https://yourusername.github.io/markdown-to-wordpress"
   ```

2. **GitHub Pages設定**を確認：
   - リポジトリ → Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

3. **ビルドフォルダ**が最新であることを確認：
   - `npm run build`を実行済み
   - `build/`フォルダに最新のファイルが生成されている

## デプロイ後の確認

- デプロイ完了後、5-10分待つ
- ブラウザのキャッシュをクリア（Ctrl+Shift+R）
- `https://yourusername.github.io/markdown-to-wordpress`にアクセス

変換例の説明が表示されるはずです！