// 首页功能配置
const features = [
    {
        id: 'unit-teaching-design',
        title: '数学单元教学设计',
        desc: '智能生成完整的数学单元教学设计方案',
        icon: '📚',
        path: '/unit-teaching-design',
        category: 'design'
    },
    {
        id: 'project-learning-design',
        title: '数学项目式学习教学设计',
        desc: '基于项目式学习理念的数学教学设计助手',
        icon: '🎯',
        path: '/project-learning-design',
        category: 'design'
    },
    {
        id: 'interdisciplinary-design',
        title: '数学跨学科教学设计',
        desc: '融合多学科知识的数学教学设计方案',
        icon: '🔄',
        path: '/interdisciplinary-design',
        category: 'design'
    },
    {
        id: 'essay-evaluation',
        title: '语文作文评价',
        desc: '拍照上传作文图片，AI进行评价修改',
        icon: '📝',
        path: '/essay-evaluation',
        category: 'chinese'
    },
    {
        id: 'ppt-to-plan',
        title: 'PPT转教案',
        desc: '上传PPT自动转换成完整教案',
        icon: '📊',
        path: '/ppt-conversion',
        category: 'tools'
    },
    {
        id: 'math-concept-explain',
        title: '数学概念可视化',
        desc: '复杂数学概念的3D动态演示',
        icon: '🎥',
        path: '/math-visualization',
        category: 'math'
    },
    {
        id: 'homework-generator',
        title: '智能作业生成',
        desc: '基于学生水平的个性化作业设计',
        icon: '📖',
        path: '/homework',
        category: 'tools'
    },
    {
        id: 'exam-analysis',
        title: '试卷分析助手',
        desc: '快速分析试卷难度和知识点分布',
        icon: '📊',
        path: '/exam-analysis',
        category: 'tools'
    },
    {
        id: 'student-portrait',
        title: '学情画像系统',
        desc: '基于大数据的学生学习特征分析',
        icon: '👤',
        path: '/student-portrait',
        category: 'analysis'
    },
    {
        id: 'lesson-record',
        title: '课堂实录助手',
        desc: '自动记录课堂教学过程和要点',
        icon: '🎥',
        path: '/lesson-record',
        category: 'tools'
    },
    {
        id: 'math-problem-solver',
        title: '数学解题步骤生成',
        desc: '详细的数学题目解析和步骤说明',
        icon: '🔢',
        path: '/problem-solver',
        category: 'math'
    },
    {
        id: 'chinese-reading',
        title: '语文阅读理解助手',
        desc: '智能分析文章结构和写作手法',
        icon: '📚',
        path: '/reading-assistant',
        category: 'chinese'
    },
    {
        id: 'english-speaking',
        title: '英语口语教练',
        desc: 'AI驱动的英语口语训练和评估',
        icon: '🗣️',
        path: '/english-speaking',
        category: 'english'
    },
    {
        id: 'physics-simulation',
        title: '物理实验模拟',
        desc: '虚拟物理实验室和现象模拟',
        icon: '⚡',
        path: '/physics-lab',
        category: 'science'
    },
    {
        id: 'chemistry-3d',
        title: '化学分子3D展示',
        desc: '交互式3D分子结构展示',
        icon: '🧪',
        path: '/chemistry-3d',
        category: 'science'
    },
    {
        id: 'biology-virtual',
        title: '生物虚拟显微镜',
        desc: 'AI辅助的生物样本观察工具',
        icon: '🔬',
        path: '/virtual-microscope',
        category: 'science'
    },
    {
        id: 'geography-maps',
        title: '地理知识地图',
        desc: '交互式地理知识可视化系统',
        icon: '🌍',
        path: '/geo-maps',
        category: 'social'
    },
    {
        id: 'history-timeline',
        title: '历史时间线生成',
        desc: '智能历史事件关联和时间线制作',
        icon: '⏳',
        path: '/history-timeline',
        category: 'social'
    },
    {
        id: 'art-appreciation',
        title: '美术作品赏析',
        desc: 'AI辅助的艺术作品解读工具',
        icon: '🎨',
        path: '/art-appreciation',
        category: 'art'
    },
    {
        id: 'music-teaching',
        title: '音乐教学助手',
        desc: '智能乐理讲解和曲目分析',
        icon: '🎵',
        path: '/music-teaching',
        category: 'art'
    },
    {
        id: 'pe-posture',
        title: '体育动作分析',
        desc: 'AI体育动作规范度评估',
        icon: '⚽',
        path: '/pe-analysis',
        category: 'pe'
    },
    {
        id: 'classroom-helper',
        title: '课堂互动助手',
        desc: '智能课堂提问和互动管理',
        icon: '🤝',
        path: '/classroom-interaction',
        category: 'tools'
    },
    {
        id: 'parent-communication',
        title: '家校沟通助手',
        desc: '智能生成家校沟通建议和报告',
        icon: '👨‍👩‍👧‍👦',
        path: '/parent-comm',
        category: 'tools'
    },
    {
        id: 'learning-plan',
        title: '个性化学习方案',
        desc: '基于学生特点的学习规划',
        icon: '📋',
        path: '/learning-plan',
        category: 'tools'
    },
    {
        id: 'resource-recommend',
        title: '教学资源推荐',
        desc: '智能匹配教学资源和材料',
        icon: '📚',
        path: '/resource',
        category: 'tools'
    },
    {
        id: 'quiz-generator',
        title: '随堂测试生成',
        desc: '快速生成课堂小测验',
        icon: '✍️',
        path: '/quiz',
        category: 'tools'
    },
    {
        id: 'mistake-analysis',
        title: '错题分析系统',
        desc: '智能分析错题原因和知识点',
        icon: '❌',
        path: '/mistake-analysis',
        category: 'analysis'
    },
    {
        id: 'study-report',
        title: '学习报告生成',
        desc: '自动生成个性化学习报告',
        icon: '📊',
        path: '/study-report',
        category: 'analysis'
    },
    {
        id: 'teaching-reflection',
        title: '教学反思助手',
        desc: 'AI辅助教学反思和改进建议',
        icon: '🤔',
        path: '/teaching-reflection',
        category: 'tools'
    },
    {
        id: 'lesson-optimization',
        title: '课程优化建议',
        desc: '基于教学效果的优化建议',
        icon: '⭐',
        path: '/lesson-optimization',
        category: 'analysis'
    }
];

// 分类配置
const categories = [
    { id: 'all', name: '全部' },
    { id: 'design', name: '教学设计' },
    { id: 'tools', name: '教学工具' },
    { id: 'math', name: '数学教学' },
    { id: 'chinese', name: '语文教学' },
    { id: 'english', name: '英语教学' },
    { id: 'science', name: '理科教学' },
    { id: 'social', name: '文科教学' },
    { id: 'art', name: '艺术教学' },
    { id: 'pe', name: '体育教学' },
    { id: 'analysis', name: '数据分析' }
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
    
    try {
        // 创建头部区域
        const header = document.createElement('header');
        header.className = 'page-header';
        header.innerHTML = `
            <div class="header-content">
                <div class="header-text">
                    <h1>云小睿</h1>
                    <span class="ai-badge">AI</span>
                </div>
                <p>智能教学助手，让教学更轻松</p>
            </div>
            <div class="search-bar">
                <input type="text" placeholder="搜索AI教学功能" class="search-input">
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
        
        // 创建可滚动内容区域
        const scrollableContent = document.createElement('div');
        scrollableContent.className = 'scrollable-content';
        
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
        
        // 将网格添加到可滚动区域
        scrollableContent.appendChild(grid);
        
        // 清空容器并添加内容
        container.innerHTML = '';
        container.appendChild(header);
        container.appendChild(categoryTabs);
        container.appendChild(scrollableContent);
        
        // 绑定事件
        bindEvents(categoryTabs, grid);
        
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
        // MVP阶段，只有单元教学设计、项目学习、跨学科教学设计和作文评价可用
        if (['unit-teaching-design', 'project-learning-design', 'interdisciplinary-design', 'essay-evaluation'].includes(feature.id)) {
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
        } else if (hash === '/unit-teaching-design') {
            console.log('渲染教学设计页面');
            if (window.teachingDesign && typeof window.teachingDesign.renderTeachingDesign === 'function') {
                window.teachingDesign.renderTeachingDesign();
            } else {
                console.error('教学设计渲染函数未定义');
                renderHomePage();
            }
        } else if (hash === '/project-learning-design') {
            console.log('渲染项目式学习页面');
            console.log('window.projectLearning:', window.projectLearning);
            if (window.projectLearning && typeof window.projectLearning.renderProjectLearning === 'function') {
                window.projectLearning.renderProjectLearning();
            } else {
                console.error('项目式学习渲染函数未定义');
                console.error('window.projectLearning:', window.projectLearning);
                renderHomePage();
            }
        } else if (hash === '/interdisciplinary-design') {
            console.log('渲染跨学科教学设计页面');
            console.log('window.interdisciplinary:', window.interdisciplinary);
            if (window.interdisciplinary && typeof window.interdisciplinary.renderInterdisciplinary === 'function') {
                window.interdisciplinary.renderInterdisciplinary();
            } else {
                console.error('跨学科教学设计渲染函数未定义');
                console.error('window.interdisciplinary:', window.interdisciplinary);
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