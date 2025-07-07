# masterブランチでのGitHub Pages デプロイ手順

## 現在の状況
- リポジトリにmasterブランチのみ存在
- 404エラーが発生

## 解決手順

### 1. GitHub Actionsワークフローの修正 ✅
- `.github/workflows/deploy.yml`をmasterブランチ用に修正済み

### 2. コードをGitHubにプッシュ
```bash
git add .
git commit -m "Setup GitHub Pages deployment for master branch"
git push origin master
```

### 3. GitHub Actionsの実行確認
1. GitHubリポジトリの「Actions」タブを確認
2. ワークフローが正常に実行されることを確認
3. 成功すると自動的に`gh-pages`ブランチが作成される

### 4. GitHub Pages設定
リポジトリの Settings → Pages で：
- **Source**: Deploy from a branch
- **Branch**: `gh-pages` を選択
- **Folder**: `/ (root)` を選択
- **Save**をクリック

### 5. 手動デプロイ（オプション）
GitHub Actionsが使えない場合：
```bash
# ローカルでビルド
npm run build

# 手動でgh-pagesブランチにデプロイ
npm run deploy
```

### 6. 確認
5-10分後に以下のURLでアクセス：
`https://nomuyu00.github.io/markdown-to-wordpress`

## トラブルシューティング

### 404エラーが続く場合
1. GitHub Actions → 最新のワークフロー実行を確認
2. エラーがある場合はログを確認
3. `gh-pages`ブランチが作成されているか確認
4. GitHub Pages設定で`gh-pages`ブランチが選択されているか確認

### よくある問題
- GitHub Actionsの権限不足
- `package.json`のhomepage設定ミス
- ビルドエラー

現在の設定は正しいので、GitHubにプッシュ後、数分でデプロイされるはずです。