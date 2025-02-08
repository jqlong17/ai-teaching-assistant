// 用户信息
const userInfo = {
    name: '张老师',
    avatar: '👨‍🏫',
    grade: '七年级',
    subject: '数学'
};

// 功能列表
const features = [
    {
        id: 'subject',
        title: '我的学科',
        icon: '📚',
        value: userInfo.subject
    },
    {
        id: 'grade',
        title: '我的年级',
        icon: '🎓',
        value: userInfo.grade
    }
];

// 模拟的历史对话数据
const historyData = [
    {
        id: 1,
        title: '如何讲解二次函数',
        expert: '数学专家',
        time: '2024-03-20',
        messageCount: 8
    },
    {
        id: 2,
        title: '平行线的判定方法',
        expert: '数学专家',
        time: '2024-03-19',
        messageCount: 6
    },
    {
        id: 3,
        title: '圆的面积公式推导',
        expert: '数学专家',
        time: '2024-03-18',
        messageCount: 10
    }
];

// 渲染我的页面
function renderMyPage() {
    const container = document.getElementById('page-container');
    
    container.innerHTML = `
        <div class="my-container">
            <!-- 用户信息卡片 -->
            <div class="user-card">
                <div class="user-avatar">
                    ${userInfo.avatar}
                </div>
                <div class="user-info">
                    <div class="user-name">${userInfo.name}</div>
                    <div class="user-meta">${userInfo.grade} ${userInfo.subject}教师</div>
                </div>
            </div>
            
            <!-- 功能列表 -->
            <h2 class="section-title">基本信息</h2>
            <div class="feature-list">
                ${features.map(feature => `
                    <div class="feature-item" data-id="${feature.id}">
                        <div class="feature-icon">${feature.icon}</div>
                        <div class="feature-title">${feature.title}</div>
                        <div class="feature-value">${feature.value}</div>
                        <div class="feature-arrow">›</div>
                    </div>
                `).join('')}
            </div>
            
            <!-- 历史对话 -->
            <h2 class="section-title">历史对话</h2>
            <div class="history-list">
                ${historyData.map(item => `
                    <div class="history-item" data-id="${item.id}">
                        <div class="history-content">
                            <div class="history-title">${item.title}</div>
                            <div class="history-meta">
                                <span class="history-expert">${item.expert}</span>
                                <span class="history-time">${item.time}</span>
                                <span class="history-length">${item.messageCount}条对话</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // 绑定事件
    bindEvents();
}

// 绑定事件
function bindEvents() {
    // 功能项点击
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.dataset.id;
            showToast(`${id}功能正在开发中...`);
        });
    });
    
    // 历史对话点击
    const historyItems = document.querySelectorAll('.history-item');
    historyItems.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.dataset.id;
            // TODO: 跳转到对话详情页
            location.hash = `/chat?history=${id}`;
        });
    });
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

// 暴露到全局
window.renderMyPage = renderMyPage;

// 初始化
function init() {
    const hash = location.hash.slice(1);
    if (hash === '/my') {
        renderMyPage();
    }
}

// 页面加载时初始化
window.addEventListener('load', init);

// 路由变化时初始化
window.addEventListener('hashchange', init); 