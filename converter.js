document.addEventListener('DOMContentLoaded', function() {
    const markdownInput = document.getElementById('markdown-input');
    const wordpressOutput = document.getElementById('wordpress-output');
    const convertButton = document.getElementById('convert-button');
    const copyButton = document.getElementById('copy-button');
    const clearButton = document.getElementById('clear-button');
    const notification = document.getElementById('notification');

    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }

    function markdownToWordPress(markdown) {
        let wordpress = markdown;

        // インライン数式 $ ... $ を \( ... \) に変換
        wordpress = wordpress.replace(/\$([^\$\n]+)\$/g, '\\($1\\)');

        // ブロック数式 $$ ... $$ はそのまま残す（WordPressでも同じ）
        // ただし、$$が改行を含む場合の処理
        wordpress = wordpress.replace(/\$\$([\s\S]*?)\$\$/g, '$$$$1$$');

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
                    // リストの開始を判定
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
                    // 空行でもリストを継続
                    continue;
                } else if (inList) {
                    // リストの終了
                    result.push(`</${listType}>`);
                    inList = false;
                }
                result.push(line);
            }
        }
        
        // 最後にリストが開いている場合は閉じる
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
    }

    convertButton.addEventListener('click', function() {
        const markdownText = markdownInput.value;
        const wordpressText = markdownToWordPress(markdownText);
        wordpressOutput.value = wordpressText;
        showNotification('変換が完了しました！');
    });

    copyButton.addEventListener('click', function() {
        if (wordpressOutput.value) {
            wordpressOutput.select();
            document.execCommand('copy');
            showNotification('コピーしました！');
        } else {
            showNotification('コピーする内容がありません');
        }
    });

    clearButton.addEventListener('click', function() {
        markdownInput.value = '';
        wordpressOutput.value = '';
        showNotification('クリアしました！');
    });

    // リアルタイム変換（オプション）
    markdownInput.addEventListener('input', function() {
        const markdownText = markdownInput.value;
        const wordpressText = markdownToWordPress(markdownText);
        wordpressOutput.value = wordpressText;
    });
});