class MobileTabs {
    constructor() {
        // 只在移动端初始化
        if (window.innerWidth >= 1024) return;
        
        this.container = document.querySelector('.ai-layout-content');
        if (!this.container) return;
        
        this.createTabs();
        this.bindEvents();
    }

    createTabs() {
        // 创建tab结构
        const tabsHtml = `
            <div class="mobile-tabs">
                <div class="mobile-tab-item active" data-tab="input">配置</div>
                <div class="mobile-tab-item" data-tab="preview">预览</div>
            </div>
        `;
        
        // 插入到内容区域的最前面
        this.container.insertAdjacentHTML('afterbegin', tabsHtml);
        
        // 初始化内容区域的显示状态
        const input = this.container.querySelector('.ai-layout-input');
        const preview = this.container.querySelector('.ai-layout-preview');
        
        if (input) input.classList.add('active');
        if (preview) preview.classList.remove('active');
    }

    bindEvents() {
        const tabs = this.container.querySelectorAll('.mobile-tab-item');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchTab(tab.dataset.tab);
            });
        });
    }

    switchTab(tabName) {
        // 更新tab状态
        const tabs = this.container.querySelectorAll('.mobile-tab-item');
        tabs.forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // 更新内容显示
        const input = this.container.querySelector('.ai-layout-input');
        const preview = this.container.querySelector('.ai-layout-preview');
        
        if (tabName === 'input') {
            input?.classList.add('active');
            preview?.classList.remove('active');
        } else {
            input?.classList.remove('active');
            preview?.classList.add('active');
        }
    }
}

// 暴露到全局
window.MobileTabs = MobileTabs; 