# 即座にデプロイする方法

## 原因
Reactアプリの変更は`markdown-to-wordpress`フォルダ内で行われましたが、GitHub Pagesにデプロイされていません。

## 最速のデプロイ方法

### GitHub Actionsを使う場合（設定済み）

1. **空のコミットを作成してプッシュ**
```bash
git commit --allow-empty -m "Trigger GitHub Actions deployment"
git push origin master
```

2. **GitHub Actionsの確認**
   - リポジトリの「Actions」タブを開く
   - ワークフローが実行されているか確認
   - 完了まで待つ（約2-3分）

### 手動でデプロイする場合

```bash
# GitHubの認証を設定していない場合は、以下を実行
export GH_TOKEN=ghp_YOUR_PERSONAL_ACCESS_TOKEN

# デプロイ実行
npm run deploy
```

## デプロイ状況の確認

1. **gh-pagesブランチの確認**
```bash
git branch -r | grep gh-pages
```

2. **最新のデプロイ時刻を確認**
```bash
git log origin/gh-pages -1 --format="%cd" --date=relative
```

## 変更が表示されるまで

1. デプロイ完了後、5-10分待つ
2. ブラウザでハード更新（Ctrl+F5）
3. URL: `https://nomuyu00.github.io/markdown-to-wordpress`

変換例のカードが4つ表示され、使い方のヒントも表示されるはずです！