# Markdown → WordPress 変換ツール

## 概要

このツールは、Markdown記法で書かれた文章をWordPress用の記法に自動変換するWebアプリケーションです。特に数式を含む技術文書やブログ記事の執筆に便利です。

🔗 **アプリURL**: [https://nomuyu00.github.io/markdown-to-wordpress](https://nomuyu00.github.io/markdown-to-wordpress)

## 主な機能

### 📝 基本的な変換機能

- **太字**: `**テキスト**` → `<span class="huto">テキスト</span>`
- **斜体**: `*テキスト*` → `<em>テキスト</em>`
- **見出し**: `# 見出し` → `<h1>見出し</h1>`
- **リンク**: `[リンク文字](URL)` → `<a href="URL">リンク文字</a>`
- **画像**: `![代替テキスト](画像URL)` → `<img src="画像URL" alt="代替テキスト">`
- **コード**: `` `code` `` → `<code>code</code>`
- **リスト**: `- 項目` → `<ul><li>項目</li></ul>`

### 🔢 数式変換（重要機能）

- **インライン数式**: `$x^2 + y^2 = z^2$` → `\(x^2 + y^2 = z^2\)`
- **ブロック数式**: `$$E = mc^2$$` → そのまま `$$E = mc^2$$` を維持

MathJaxプラグインを使用したWordPressでの数式表示に対応しています。

## 使い方

1. **左側のテキストエリア**にMarkdown形式の文章を入力
2. **リアルタイムで右側**にWordPress形式の変換結果が表示されます
3. **「コピー」ボタン**をクリックして変換結果をクリップボードにコピー
4. WordPressの投稿画面に貼り付けて使用

## 具体的な使用例

### 技術ブログの例

**Markdown入力:**
```markdown
## ピタゴラスの定理

**ピタゴラスの定理**は、直角三角形において成り立つ重要な定理です。

数式で表すと $a^2 + b^2 = c^2$ となります。

証明は以下の通りです：

$$
\begin{align}
c^2 &= a^2 + b^2 \\
&= \text{（直角三角形の性質より）}
\end{align}
$$
```

**WordPress出力:**
```html
<h2>ピタゴラスの定理</h2>

<span class="huto">ピタゴラスの定理</span>は、直角三角形において成り立つ重要な定理です。

数式で表すと \(a^2 + b^2 = c^2\) となります。

証明は以下の通りです：

$$
\begin{align}
c^2 &= a^2 + b^2 \\
&= \text{（直角三角形の性質より）}
\end{align}
$$
```

## 特徴

- ✨ **リアルタイム変換** - 入力と同時に変換結果を確認
- 🎨 **美しいUI** - グラデーション背景とアニメーション
- 📱 **レスポンシブ対応** - スマートフォンでも快適に使用可能
- 🚀 **高速動作** - ブラウザ上で完結するため高速

## 技術仕様

- **フレームワーク**: React + TypeScript
- **スタイリング**: CSS + Framer Motion
- **アイコン**: Lucide React
- **ホスティング**: GitHub Pages

## 注意事項

- WordPressで数式を表示するには、MathJaxプラグインのインストールが必要です
- `<span class="huto">` を太字として表示するには、WordPressのCSSに以下を追加してください：
  ```css
  .huto {
    font-weight: bold;
  }
  ```

## 開発者向け

ローカルで実行する場合：

```bash
git clone https://github.com/nomuyu00/markdown-to-wordpress.git
cd markdown-to-wordpress
npm install
npm start
```

## ライセンス

MIT License

## 作者

nomuyu00

---

何か問題や要望がありましたら、[Issues](https://github.com/nomuyu00/markdown-to-wordpress/issues)にお願いします。