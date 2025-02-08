// 首页功能配置
const features = [
    {
        id: 'teaching-design',
        title: '数学教学设计生成',
        desc: '快速生成专业的教学设计方案',
        icon: '📚',
        path: '/teaching-design',
        category: 'design'
    },
    {
        id: 'project-learning',
        title: '数学项目式学习指导',
        desc: '个性化的项目学习规划与指导',
        icon: '🎯',
        path: '/chat?type=project-learning',
        category: 'learning'
    },
    {
        id: 'simulation',
        title: '数学实验模拟',
        desc: '交互式数学概念可视化体验',
        icon: '🔬',
        path: '/simulation',
        category: 'tools'
    },
    {
        id: 'visualization',
        title: '数学可视化工具',
        desc: '数学函数与图形可视化工具',
        icon: '📊',
        path: '/visualization',
        category: 'tools'
    },
    {
        id: 'exercises',
        title: '思维训练题库',
        desc: '针对性的数学思维训练题目',
        icon: '🧩',
        path: '/exercises',
        category: 'practice'
    },
    {
        id: 'resources',
        title: '学习资源推荐',
        desc: '精选数学学习资源与教材',
        icon: '📖',
        path: '/resources',
        category: 'resources'
    }
];

// 分类配置
const categories = [
    { id: 'all', name: '全部' },
    { id: 'design', name: '教学设计' },
    { id: 'learning', name: '学习指导' },
    { id: 'tools', name: '教学工具' },
    { id: 'practice', name: '练习题库' },
    { id: 'resources', name: '学习资源' }
];

// 页面状态
let state = {
    currentCategory: 'all',
    searchKeyword: ''
};

// 渲染首页
async function renderHomePage() {
    console.log('开始渲染首页');
    const container = document.getElementById('page-container');
    
    if (!container) {
        console.error('找不到页面容器元素');
        return;
    }
    
    // 显示加载状态
    container.innerHTML = '<div class="loading"><div class="loading-spinner"></div></div>';
    
    try {
        // 创建头部区域（包含标题和搜索框）
        const header = document.createElement('header');
        header.className = 'page-header';
        header.innerHTML = `
            <div class="header-content">
                <h1>云小睿</h1>
                <p>智能教学助手，让教学更轻松</p>
            </div>
            <div class="search-bar">
                <input type="text" placeholder="搜索功能" class="search-input">
            </div>
        `;
        
        // 创建分类标签
        const categoryTabs = document.createElement('div');
        categoryTabs.className = 'category-tabs';
        categoryTabs.innerHTML = categories.map(category => `
            <span class="category-tab ${category.id === state.currentCategory ? 'active' : ''}" 
                  data-category="${category.id}">
                ${category.name}
            </span>
        `).join('');
        
        // 创建功能网格
        const grid = document.createElement('div');
        grid.className = 'feature-grid';
        
        // 过滤并渲染功能卡片
        const filteredFeatures = features.filter(feature => {
            const matchCategory = state.currentCategory === 'all' || feature.category === state.currentCategory;
            const matchKeyword = !state.searchKeyword || 
                feature.title.includes(state.searchKeyword) || 
                feature.desc.includes(state.searchKeyword);
            return matchCategory && matchKeyword;
        });
        
        const featuresHTML = filteredFeatures.map(feature => `
            <div class="feature-card" data-id="${feature.id}">
                <div class="feature-icon">${feature.icon}</div>
                <div class="feature-content">
                    <div class="feature-title">${feature.title}</div>
                    <div class="feature-desc">${feature.desc}</div>
                </div>
            </div>
        `).join('');
        
        grid.innerHTML = featuresHTML || '<div class="empty-state">暂无相关功能</div>';
        
        // 清空容器并添加内容
        container.innerHTML = '';
        container.appendChild(header);
        container.appendChild(categoryTabs);
        container.appendChild(grid);
        
        console.log('首页内容渲染完成');
        
        // 绑定事件
        bindEvents(categoryTabs, grid);
        console.log('首页事件绑定完成');
        
    } catch (error) {
        console.error('渲染首页失败:', error);
        container.innerHTML = '<div class="error">加载失败，请刷新重试</div>';
    }
}

// 绑定事件
function bindEvents(categoryTabs, grid) {
    // 分类切换
    categoryTabs.addEventListener('click', (e) => {
        const tab = e.target.closest('.category-tab');
        if (tab) {
            state.currentCategory = tab.dataset.category;
            renderHomePage();
        }
    });
    
    // 搜索功能
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            state.searchKeyword = e.target.value.trim();
            renderHomePage();
        }, 300));
    }
    
    // 功能卡片点击
    grid.addEventListener('click', handleFeatureClick);
}

// 处理功能卡片点击
function handleFeatureClick(event) {
    const card = event.target.closest('.feature-card');
    if (!card) return;
    
    const featureId = card.dataset.id;
    const feature = features.find(f => f.id === featureId);
    
    if (feature) {
        // MVP阶段，只有教学设计和项目学习可用
        if (['teaching-design', 'project-learning'].includes(feature.id)) {
            location.hash = feature.path;
        } else {
            showToast('该功能正在开发中...');
        }
    }
}

// 防抖函数
function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// 显示提示信息
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// 初始化
window.addEventListener('load', () => {
    console.log('页面加载，初始化路由');
    const hash = location.hash.slice(1);
    handleRoute(hash);
});

// 处理路由变化
window.addEventListener('hashchange', () => {
    console.log('路由变化');
    const hash = location.hash.slice(1);
    handleRoute(hash);
});

// 路由处理函数
function handleRoute(hash) {
    console.log('处理路由:', hash);
    
    // 清空页面容器
    const container = document.getElementById('page-container');
    if (!container) {
        console.error('找不到页面容器元素');
        return;
    }
    
    try {
        if (!hash || hash === '/' || hash === '') {
            console.log('渲染首页');
            renderHomePage();
        } else if (hash === '/teaching-design') {
            console.log('渲染教学设计页面');
            if (window.teachingDesign && typeof window.teachingDesign.renderTeachingDesign === 'function') {
                window.teachingDesign.renderTeachingDesign();
            } else {
                console.error('教学设计渲染函数未定义');
                renderHomePage();
            }
        } else if (hash.startsWith('/chat')) {
            console.log('渲染对话页面');
            if (window.chat && typeof window.chat.renderExpertList === 'function') {
                window.chat.renderExpertList();
            } else {
                console.error('对话页面渲染函数未定义');
                // 显示友好的错误提示
                container.innerHTML = `
                    <div class="error-container">
                        <h2>页面加载失败</h2>
                        <p>对话功能暂时无法使用，请稍后再试</p>
                        <button onclick="location.hash='/'">返回首页</button>
                    </div>
                `;
            }
        } else if (hash === '/my') {
            console.log('渲染我的页面');
            if (window.my && typeof window.my.renderMyPage === 'function') {
                window.my.renderMyPage();
            } else {
                console.error('我的页面渲染函数未定义');
                renderHomePage();
            }
        } else {
            console.log('未知路由，显示首页');
            renderHomePage();
        }
        
        // 更新导航栏状态
        updateTabBar();
    } catch (error) {
        console.error('路由处理出错:', error);
        container.innerHTML = '<div class="error">页面加载失败，请刷新重试</div>';
    }
}

// 更新底部导航栏状态
function updateTabBar() {
    console.log('更新导航栏状态');
    
    // 移除所有tab的active类
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.remove('active');
    });
    
    const hash = location.hash.slice(1);
    console.log('当前hash:', hash);
    
    // 根据当前hash设置对应tab的active状态
    if (!hash || hash === '/' || hash === '') {
        console.log('激活首页标签');
        const homeTab = document.querySelector('.tab-item[href="#/"]');
        if (homeTab) {
            homeTab.classList.add('active');
        }
    } else if (hash.startsWith('/chat')) {
        console.log('激活对话标签');
        const chatTab = document.querySelector('.tab-item[href="#/chat"]');
        if (chatTab) {
            chatTab.classList.add('active');
        }
    } else if (hash === '/my') {
        console.log('激活我的标签');
        const myTab = document.querySelector('.tab-item[href="#/my"]');
        if (myTab) {
            myTab.classList.add('active');
        }
    }
} 