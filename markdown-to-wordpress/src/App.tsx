import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Trash2, Sparkles, ArrowRight } from 'lucide-react';
import './App.css';

function App() {
  const [markdownInput, setMarkdownInput] = useState('');
  const [wordpressOutput, setWordpressOutput] = useState('');
  const [notification, setNotification] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const showNotificationMessage = (message: string) => {
    setNotification(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const markdownToWordPress = (markdown: string): string => {
    let wordpress = markdown;

    // まず、ブロック数式 $$ ... $$ を一時的にプレースホルダーに置換して保護
    const blockMathPlaceholders: string[] = [];
    wordpress = wordpress.replace(/\$\$([\s\S]*?)\$\$/g, (match) => {
      blockMathPlaceholders.push(match);
      return `BLOCK_MATH_PLACEHOLDER_${blockMathPlaceholders.length - 1}`;
    });

    // インライン数式 $ ... $ を \( ... \) に変換
    // $$は既にプレースホルダーに置換されているので、単一の$のみがマッチする
    wordpress = wordpress.replace(/\$([^\$]+?)\$/g, '\\($1\\)');

    // ブロック数式のプレースホルダーを元に戻す（$文字のエスケープ問題を回避）
    blockMathPlaceholders.forEach((math, index) => {
      const placeholder = `BLOCK_MATH_PLACEHOLDER_${index}`;
      const parts = wordpress.split(placeholder);
      wordpress = parts.join(math);
    });

    // 太字 **text** を <span class="huto">text</span> に変換
    wordpress = wordpress.replace(/\*\*([^\*]+)\*\*/g, '<span class="huto">$1</span>');

    // 斜体 *text* を <em>text</em> に変換
    wordpress = wordpress.replace(/\*([^\*\n]+)\*/g, '<em>$1</em>');

    // 見出し変換
    wordpress = wordpress.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    wordpress = wordpress.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    wordpress = wordpress.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // リンク [text](url) を <a href="url">text</a> に変換
    wordpress = wordpress.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');

    // 画像 ![alt](url) を <img src="url" alt="alt"> に変換
    wordpress = wordpress.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1">');

    // コードブロック ```code``` を <pre><code>code</code></pre> に変換
    wordpress = wordpress.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // インラインコード `code` を <code>code</code> に変換
    wordpress = wordpress.replace(/`([^`]+)`/g, '<code>$1</code>');

    // 番号付きリスト
    wordpress = wordpress.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
    
    // 番号なしリスト
    wordpress = wordpress.replace(/^[\*\-\+] (.+)$/gm, '<li>$1</li>');

    // 連続する<li>タグを<ul>または<ol>で囲む処理
    let lines = wordpress.split('\n');
    let inList = false;
    let listType = '';
    let result = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      
      if (line.startsWith('<li>')) {
        if (!inList) {
          let originalLine = markdown.split('\n')[i];
          if (originalLine && /^\d+\./.test(originalLine.trim())) {
            result.push('<ol>');
            listType = 'ol';
          } else {
            result.push('<ul>');
            listType = 'ul';
          }
          inList = true;
        }
        result.push(line);
      } else {
        if (inList && line.trim() === '') {
          continue;
        } else if (inList) {
          result.push(`</${listType}>`);
          inList = false;
        }
        result.push(line);
      }
    }
    
    if (inList) {
      result.push(`</${listType}>`);
    }

    wordpress = result.join('\n');

    // 引用 > text を <blockquote>text</blockquote> に変換
    wordpress = wordpress.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

    // 連続する<blockquote>を統合
    wordpress = wordpress.replace(/<\/blockquote>\n<blockquote>/g, '\n');

    // 水平線 --- を <hr> に変換
    wordpress = wordpress.replace(/^---$/gm, '<hr>');

    return wordpress;
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMarkdownInput(value);
    setWordpressOutput(markdownToWordPress(value));
  }, []);

  const handleCopy = () => {
    if (wordpressOutput) {
      navigator.clipboard.writeText(wordpressOutput);
      showNotificationMessage('コピーしました！');
    } else {
      showNotificationMessage('コピーする内容がありません');
    }
  };

  const handleClear = () => {
    setMarkdownInput('');
    setWordpressOutput('');
    showNotificationMessage('クリアしました！');
  };

  return (
    <div className="App">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="header"
      >
        <h1>
          <Sparkles className="icon" />
          Markdown → WordPress Converter
        </h1>
        <p className="subtitle">マークダウンを美しくWordPress記法に変換</p>
      </motion.div>

      <div className="converter-container">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="input-section"
        >
          <h2>Markdown Input</h2>
          <textarea
            value={markdownInput}
            onChange={handleInputChange}
            placeholder="ここにマークダウンテキストを入力してください..."
            className="textarea"
          />
        </motion.div>

        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          className="arrow-container"
        >
          <ArrowRight className="arrow-icon" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="output-section"
        >
          <h2>WordPress Output</h2>
          <textarea
            value={wordpressOutput}
            readOnly
            placeholder="変換結果がここに表示されます..."
            className="textarea output"
          />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="button-container"
      >
        <button onClick={handleCopy} className="button copy-button">
          <Copy size={18} />
          コピー
        </button>
        <button onClick={handleClear} className="button clear-button">
          <Trash2 size={18} />
          クリア
        </button>
      </motion.div>

      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="notification"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="conversion-examples"
      >
        <h3>変換例と使い方</h3>
        
        <div className="example-grid">
          <div className="example-card">
            <h4>📝 基本的な文字装飾</h4>
            <div className="example-item">
              <code className="markdown">**太字のテキスト**</code>
              <span className="arrow">→</span>
              <code className="wordpress">&lt;span class="huto"&gt;太字のテキスト&lt;/span&gt;</code>
            </div>
            <div className="example-item">
              <code className="markdown">*斜体のテキスト*</code>
              <span className="arrow">→</span>
              <code className="wordpress">&lt;em&gt;斜体のテキスト&lt;/em&gt;</code>
            </div>
          </div>

          <div className="example-card">
            <h4>🔢 数式の変換</h4>
            <div className="example-item">
              <code className="markdown">$x^2 + y^2 = z^2$</code>
              <span className="arrow">→</span>
              <code className="wordpress">\(x^2 + y^2 = z^2\)</code>
            </div>
            <div className="example-item">
              <code className="markdown">$$E = mc^2$$</code>
              <span className="arrow">→</span>
              <code className="wordpress">$$E = mc^2$$ (そのまま)</code>
            </div>
          </div>

          <div className="example-card">
            <h4>📌 見出しとリンク</h4>
            <div className="example-item">
              <code className="markdown"># 大見出し</code>
              <span className="arrow">→</span>
              <code className="wordpress">&lt;h1&gt;大見出し&lt;/h1&gt;</code>
            </div>
            <div className="example-item">
              <code className="markdown">[リンク](https://example.com)</code>
              <span className="arrow">→</span>
              <code className="wordpress">&lt;a href="https://example.com"&gt;リンク&lt;/a&gt;</code>
            </div>
          </div>

          <div className="example-card">
            <h4>📋 リストとコード</h4>
            <div className="example-item">
              <code className="markdown">- リスト項目</code>
              <span className="arrow">→</span>
              <code className="wordpress">&lt;ul&gt;&lt;li&gt;リスト項目&lt;/li&gt;&lt;/ul&gt;</code>
            </div>
            <div className="example-item">
              <code className="markdown">`インラインコード`</code>
              <span className="arrow">→</span>
              <code className="wordpress">&lt;code&gt;インラインコード&lt;/code&gt;</code>
            </div>
          </div>
        </div>

        <div className="usage-tips">
          <h4>💡 使い方のヒント</h4>
          <p>• 左側にMarkdownを入力すると、リアルタイムで右側に変換結果が表示されます</p>
          <p>• WordPressで数式を表示するには、MathJaxプラグインが必要です</p>
          <p>• 太字表示には、WordPressのCSSに <code>.huto {"{"} font-weight: bold; {"}"}</code> を追加してください</p>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
