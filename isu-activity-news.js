// isu-activity-news.js
window.ISU_ACTIVITY_NEWS = (function() {
    'use strict';
    
    let currentEvent = '';
    let currentIndex = 0;
    let currentImages = [];
    
    const init = function() {
        const isuContainer = document.querySelector('.isu-container');
        if (!isuContainer) return;
        
        // 分頁切換功能
        const tabLinks = isuContainer.querySelectorAll('.isu-nav-link');
        const tabPanes = isuContainer.querySelectorAll('.isu-tab-pane');
        
        tabLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                tabLinks.forEach(l => l.classList.remove('isu-active'));
                tabPanes.forEach(p => p.classList.remove('isu-active'));
                
                this.classList.add('isu-active');
                
                const targetId = this.getAttribute('data-target');
                const targetPane = document.getElementById(targetId);
                if (targetPane) {
                    targetPane.classList.add('isu-active');
                }
            });
        });
        
        // 字型大小調整功能
        const isuFontButtons = isuContainer.querySelectorAll('.isu-font-btn');
        
        isuFontButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                
                isuFontButtons.forEach(btn => btn.classList.remove('isu-active'));
                this.classList.add('isu-active');
                
                const size = this.classList.contains('isu-font-s') ? '12px' : 
                            this.classList.contains('isu-font-m') ? '16px' : '20px';
                
                isuContainer.style.fontSize = size;
            });
        });
        
        // 圖片點擊事件
        const imageItems = isuContainer.querySelectorAll('.isu-image-item');
        imageItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                const eventId = this.getAttribute('data-event');
                const index = parseInt(this.getAttribute('data-index'));
                
                // 獲取該活動的所有圖片
                const eventImages = Array.from(isuContainer.querySelectorAll(`.isu-image-item[data-event="${eventId}"]`));
                currentImages = eventImages.map(img => img.getAttribute('data-img'));
                currentEvent = eventId;
                currentIndex = index;
                
                // 顯示圖片
                showImage(currentIndex);
                
                // 開啟 modal
                const modal = new bootstrap.Modal(document.getElementById('isu-imageModal'));
                modal.show();
            });
        });
        
        // 左右切換按鈕
        const prevBtn = document.querySelector('.isu-nav-prev');
        const nextBtn = document.querySelector('.isu-nav-next');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (currentIndex > 0) {
                    currentIndex--;
                    showImage(currentIndex);
                }
            });
            
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (currentIndex < currentImages.length - 1) {
                    currentIndex++;
                    showImage(currentIndex);
                }
            });
        }
    };
    
    const showImage = function(index) {
        const modalImage = document.getElementById('isu-modalImage');
        const prevBtn = document.querySelector('.isu-nav-prev');
        const nextBtn = document.querySelector('.isu-nav-next');
        const counter = document.querySelector('.isu-image-counter');
        
        if (modalImage && currentImages.length > 0) {
            modalImage.src = currentImages[index];
            
            // 更新計數器
            if (counter) {
                counter.textContent = `${index + 1} / ${currentImages.length}`;
            }
            
            // 更新按鈕狀態
            if (prevBtn) {
                prevBtn.disabled = index === 0;
            }
            if (nextBtn) {
                nextBtn.disabled = index === currentImages.length - 1;
            }
        }
    };
    
    return { init };
})();

// 在 DOM 加載完成後初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (window.ISU_ACTIVITY_NEWS && window.ISU_ACTIVITY_NEWS.init) {
            window.ISU_ACTIVITY_NEWS.init();
        }
    });
} else {
    if (window.ISU_ACTIVITY_NEWS && window.ISU_ACTIVITY_NEWS.init) {
        window.ISU_ACTIVITY_NEWS.init();
    }
}
