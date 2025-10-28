// embed.js - 用於嵌入到學校網站的腳本
(function() {
    'use strict';
    
    // 創建 iframe 來完全隔離
    function createIframe() {
        const container = document.createElement('div');
        container.id = 'isu-activity-news-iframe-container';
        container.style.cssText = `
            width: 100%;
            border: none;
            margin: 0;
            padding: 0;
        `;
        
        const iframe = document.createElement('iframe');
        iframe.id = 'isu-activity-news-iframe';
        iframe.src = 'https://您的用户名.github.io/您的倉庫名稱'; // 您的 GitHub Pages 網址
        iframe.style.cssText = `
            width: 100%;
            height: 800px;
            border: none;
            margin: 0;
            padding: 0;
            display: block;
        `;
        iframe.loading = 'lazy';
        
        container.appendChild(iframe);
        return container;
    }
    
    // 插入到學校網頁中
    function insertIntoPage() {
        const targetElement = document.querySelector('#isu-activity-news-embed-target');
        if (targetElement) {
            const iframeContainer = createIframe();
            targetElement.appendChild(iframeContainer);
        }
    }
    
    // 當 DOM 加載完成後執行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertIntoPage);
    } else {
        insertIntoPage();
    }
})();