// 用户信息
const userInfo = {
    name: '张老师',
    avatar: '👨‍🏫',
    grade: '七年级',
    subject: '数学'
};

// 功能列表
const myFeatures = [
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
    console.log('开始渲染我的页面');
    const container = document.getElementById('page-container');
    
    if (!container) {
        console.error('找不到页面容器元素');
        return;
    }
    
    try {
        // 构建页面内容
        const content = `
            <!-- 页面头部 -->
            <div class="my-header">
                <h1>我的</h1>
            </div>
            
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
                    ${myFeatures.map(feature => `
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
        
        // 更新容器内容
        container.innerHTML = content;
        console.log('页面内容渲染完成');
        
        // 确保 DOM 已更新后再绑定事件
        setTimeout(() => {
            try {
                bindMyPageEvents();
                console.log('事件绑定完成');
            } catch (error) {
                console.error('绑定事件失败:', error);
            }
        }, 0);
        
    } catch (error) {
        console.error('渲染我的页面出错:', error);
        container.innerHTML = '<div class="error">页面加载失败，请刷新重试</div>';
    }
}

// 绑定我的页面事件
function bindMyPageEvents() {
    try {
        console.log('开始绑定我的页面事件');
        
        // 功能项点击
        const featureItems = document.querySelectorAll('.feature-item');
        if (featureItems) {
            featureItems.forEach(item => {
                item.addEventListener('click', () => {
                    const id = item.dataset.id;
                    showToast(`${id}功能正在开发中...`);
                });
            });
        }
        
        // 历史对话点击
        const historyItems = document.querySelectorAll('.history-item');
        if (historyItems) {
            historyItems.forEach(item => {
                item.addEventListener('click', () => {
                    const id = item.dataset.id;
                    // TODO: 跳转到对话详情页
                    location.hash = `/chat?history=${id}`;
                });
            });
        }
        
        console.log('我的页面事件绑定完成');
    } catch (error) {
        console.error('绑定我的页面事件出错:', error);
    }
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
window.my = {
    renderMyPage
}; 