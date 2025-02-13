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
        id: 'design-polish',
        title: '教学设计润色',
        desc: '智能优化和完善现有教学设计方案',
        icon: '✨',
        path: '#/design-polish',
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
        id: 'ppt-generator',
        title: '一键PPT制作',
        desc: '输入文本或上传文件，智能生成精美PPT',
        icon: '🎯',
        path: '/ppt-generator',
        category: 'tools'
    },
    {
        id: 'animated-dialogue',
        title: '动画对话',
        desc: '输入对话文本，生成角色动画视频，适用于课堂知识导入',
        icon: '🎬',
        path: '/animated-dialogue',
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
        // MVP阶段，只有以下功能可用
        const availableFeatures = {
            'unit-teaching-design': '#/unit-teaching-design',
            'design-polish': '#/design-polish',
            'project-learning-design': '#/project-learning-design',
            'interdisciplinary-design': '#/interdisciplinary-design',
            'essay-evaluation': '#/essay-evaluation',
            'ppt-to-plan': '#/ppt-to-design',
            'ppt-generator': '#/ppt-generator',
            'animated-dialogue': '#/animated-dialogue'
        };

        if (availableFeatures[feature.id]) {
            location.hash = availableFeatures[feature.id];
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
    const hash = location.hash || '#/';
    
    // 检查登录状态
    const token = localStorage.getItem('token');
    if (token && hash === '#/') {
        // 如果已登录且在首页，自动跳转到我的页面
        window.location.hash = '/my';
        return;
    }
    
    handleRoute(hash);
});

// 处理路由变化
window.addEventListener('hashchange', () => {
    console.log('路由变化');
    const hash = location.hash || '#/';
    handleRoute(hash);
});

// 更新导航状态
function updateNavigation(hash) {
    // 更新底部导航栏
    const tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === hash) {
            item.classList.add('active');
        }
    });

    // 更新侧边栏
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === hash) {
            item.classList.add('active');
        }
    });
}

// 路由处理
function handleRoute(hash) {
    console.log('处理路由:', hash);

    // 清空页面容器
    const container = document.getElementById('page-container');
    if (!container) {
        console.error('找不到页面容器元素');
        return;
    }

    // 更新导航状态
    updateNavigation(hash);

    // 处理路由
    switch (hash) {
        case '':
        case '#/':
            renderHomePage();
            break;
        case '#/chat':
            console.log('准备渲染对话页面');
            if (window.chat && typeof window.chat.renderExpertList === 'function') {
                window.chat.renderExpertList();
            } else {
                console.error('对话页面渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/unit-teaching-design':
            console.log('准备渲染单元教学设计页面');
            if (window.teachingDesign && typeof window.teachingDesign.renderTeachingDesign === 'function') {
                window.teachingDesign.renderTeachingDesign();
            } else {
                console.error('单元教学设计页面渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/project-learning-design':
            console.log('准备渲染项目式学习设计页面');
            if (window.projectLearning && typeof window.projectLearning.renderProjectLearning === 'function') {
                window.projectLearning.renderProjectLearning();
            } else {
                console.error('项目式学习设计页面渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/interdisciplinary-design':
            console.log('准备渲染跨学科教学设计页面');
            if (window.interdisciplinary && typeof window.interdisciplinary.renderInterdisciplinary === 'function') {
                window.interdisciplinary.renderInterdisciplinary();
            } else {
                console.error('跨学科教学设计页面渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/essay-evaluation':
            console.log('准备渲染作文评价页面');
            if (window.essayEvaluation && typeof window.essayEvaluation.init === 'function') {
                window.essayEvaluation.init();
            } else {
                console.error('作文评价页面渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/ppt-to-design':
            console.log('准备渲染PPT转教案页面');
            if (window.PptToDesign) {
                new window.PptToDesign().render();
            } else {
                console.error('PPT转教案页面渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/ppt-generator':
            console.log('准备渲染PPT生成页面');
            if (window.pptGenerator && typeof window.pptGenerator.render === 'function') {
                window.pptGenerator.render();
            } else {
                console.error('PPT生成页面渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/animated-dialogue':
            console.log('准备渲染动画对话页面');
            if (window.animatedDialogue && typeof window.animatedDialogue.render === 'function') {
                window.animatedDialogue.render();
            } else {
                console.error('动画对话页面渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/auth':
            console.log('准备渲染认证页面');
            if (window.auth && typeof window.auth.render === 'function') {
                window.auth.render();
            } else {
                console.error('认证页面渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/my':
            console.log('准备渲染我的页面');
            if (window.my && typeof window.my.render === 'function') {
                window.my.render();
            } else {
                console.error('我的页面渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/math-visualization':
            console.log('渲染数学概念可视化页面');
            if (window.mathConceptExplain && typeof window.mathConceptExplain.render === 'function') {
                window.mathConceptExplain.render();
            } else {
                console.error('数学概念可视化渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/homework':
            console.log('渲染智能作业生成页面');
            if (window.homeworkGenerator && typeof window.homeworkGenerator.render === 'function') {
                window.homeworkGenerator.render();
            } else {
                console.error('智能作业生成渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/exam-analysis':
            console.log('渲染试卷分析助手页面');
            if (window.examAnalysis && typeof window.examAnalysis.render === 'function') {
                window.examAnalysis.render();
            } else {
                console.error('试卷分析助手渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/student-portrait':
            console.log('渲染学情画像系统页面');
            if (window.studentPortrait && typeof window.studentPortrait.render === 'function') {
                window.studentPortrait.render();
            } else {
                console.error('学情画像系统渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/lesson-record':
            console.log('渲染课堂实录助手页面');
            if (window.lessonRecord && typeof window.lessonRecord.render === 'function') {
                window.lessonRecord.render();
            } else {
                console.error('课堂实录助手渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/problem-solver':
            console.log('渲染数学解题步骤生成页面');
            if (window.mathProblemSolver && typeof window.mathProblemSolver.render === 'function') {
                window.mathProblemSolver.render();
            } else {
                console.error('数学解题步骤生成渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/reading-assistant':
            console.log('渲染语文阅读理解助手页面');
            if (window.chineseReading && typeof window.chineseReading.render === 'function') {
                window.chineseReading.render();
            } else {
                console.error('语文阅读理解助手渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/english-speaking':
            console.log('渲染英语口语教练页面');
            if (window.englishSpeaking && typeof window.englishSpeaking.render === 'function') {
                window.englishSpeaking.render();
            } else {
                console.error('英语口语教练渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/physics-lab':
            console.log('渲染物理实验模拟页面');
            if (window.physicsSimulation && typeof window.physicsSimulation.render === 'function') {
                window.physicsSimulation.render();
            } else {
                console.error('物理实验模拟渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/chemistry-3d':
            console.log('渲染化学分子3D展示页面');
            if (window.chemistry3d && typeof window.chemistry3d.render === 'function') {
                window.chemistry3d.render();
            } else {
                console.error('化学分子3D展示渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/virtual-microscope':
            console.log('渲染生物虚拟显微镜页面');
            if (window.biologyVirtual && typeof window.biologyVirtual.render === 'function') {
                window.biologyVirtual.render();
            } else {
                console.error('生物虚拟显微镜渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/geo-maps':
            console.log('渲染地理知识地图页面');
            if (window.geographyMaps && typeof window.geographyMaps.render === 'function') {
                window.geographyMaps.render();
            } else {
                console.error('地理知识地图渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/history-timeline':
            console.log('渲染历史时间线生成页面');
            if (window.historyTimeline && typeof window.historyTimeline.render === 'function') {
                window.historyTimeline.render();
            } else {
                console.error('历史时间线生成渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/art-appreciation':
            console.log('渲染美术作品赏析页面');
            if (window.artAppreciation && typeof window.artAppreciation.render === 'function') {
                window.artAppreciation.render();
            } else {
                console.error('美术作品赏析渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/music-teaching':
            console.log('渲染音乐教学助手页面');
            if (window.musicTeaching && typeof window.musicTeaching.render === 'function') {
                window.musicTeaching.render();
            } else {
                console.error('音乐教学助手渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/pe-analysis':
            console.log('渲染体育动作分析页面');
            if (window.pePosture && typeof window.pePosture.render === 'function') {
                window.pePosture.render();
            } else {
                console.error('体育动作分析渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/classroom-interaction':
            console.log('渲染课堂互动助手页面');
            if (window.classroomHelper && typeof window.classroomHelper.render === 'function') {
                window.classroomHelper.render();
            } else {
                console.error('课堂互动助手渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/parent-comm':
            console.log('渲染家校沟通助手页面');
            if (window.parentCommunication && typeof window.parentCommunication.render === 'function') {
                window.parentCommunication.render();
            } else {
                console.error('家校沟通助手渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/learning-plan':
            console.log('渲染个性化学习方案页面');
            if (window.learningPlan && typeof window.learningPlan.render === 'function') {
                window.learningPlan.render();
            } else {
                console.error('个性化学习方案渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/resource':
            console.log('渲染教学资源推荐页面');
            if (window.resourceRecommend && typeof window.resourceRecommend.render === 'function') {
                window.resourceRecommend.render();
            } else {
                console.error('教学资源推荐渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/quiz':
            console.log('渲染随堂测试生成页面');
            if (window.quizGenerator && typeof window.quizGenerator.render === 'function') {
                window.quizGenerator.render();
            } else {
                console.error('随堂测试生成渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/mistake-analysis':
            console.log('渲染错题分析系统页面');
            if (window.mistakeAnalysis && typeof window.mistakeAnalysis.render === 'function') {
                window.mistakeAnalysis.render();
            } else {
                console.error('错题分析系统渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/study-report':
            console.log('渲染学习报告生成页面');
            if (window.studyReport && typeof window.studyReport.render === 'function') {
                window.studyReport.render();
            } else {
                console.error('学习报告生成渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/teaching-reflection':
            console.log('渲染教学反思助手页面');
            if (window.teachingReflection && typeof window.teachingReflection.render === 'function') {
                window.teachingReflection.render();
            } else {
                console.error('教学反思助手渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/lesson-optimization':
            console.log('渲染课程优化建议页面');
            if (window.lessonOptimization && typeof window.lessonOptimization.render === 'function') {
                window.lessonOptimization.render();
            } else {
                console.error('课程优化建议渲染函数未定义');
                renderHomePage();
            }
            break;
        case '#/design-polish':
            console.log('准备渲染教学设计润色页面');
            container.innerHTML = '';
            if (window.designPolish && typeof window.designPolish.render === 'function') {
                window.designPolish.render();
            } else {
                console.error('教学设计润色页面渲染函数未定义');
                renderHomePage();
            }
            break;
        default:
            console.log('未知路由，显示首页:', hash);
            renderHomePage();
    }
} 