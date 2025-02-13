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

class My {
    constructor() {
        this.container = null;
        this.isLoggedIn = false;
        this.userInfo = null;
    }

    async init() {
        this.container = document.createElement('div');
        this.container.className = 'my-container';
        
        // 检查登录状态
        this.isLoggedIn = !!localStorage.getItem('token');
        
        await this.renderView();
        return this.container;
    }

    async renderView() {
        if (this.isLoggedIn) {
            this.container.innerHTML = this.getLoggedInTemplate();
        } else {
            this.container.innerHTML = this.getLoginTemplate();
        }
        this.bindEvents();
    }

    getLoginTemplate() {
        return `
            <div class="my-header">
                <h1>我的</h1>
            </div>
            <div class="my-content">
                <div class="login-prompt">
                    <div class="avatar-placeholder">
                        <i class="icon-user">👤</i>
                    </div>
                    <p class="login-text">登录后体验更多功能</p>
                    <button class="login-btn" onclick="window.location.hash='#/auth'">立即登录</button>
                </div>
            </div>
        `;
    }

    getLoggedInTemplate() {
        return `
            <div class="my-header">
                <h1>我的</h1>
            </div>
            <div class="my-content">
                <div class="user-info">
                    <div class="user-avatar">
                        <img src="./src/assets/images/experts/20250213175712.jpg" alt="用户头像">
                    </div>
                    <div class="user-details">
                        <h2>张老师</h2>
                        <p>七年级 数学教师</p>
                    </div>
                </div>

                <div class="section-title">基本信息</div>
                <div class="info-list">
                    <div class="info-item">
                        <span class="info-label">📚 我的学科</span>
                        <span class="info-value">数学</span>
                        <span class="arrow">></span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">🎓 我的年级</span>
                        <span class="info-value">七年级</span>
                        <span class="arrow">></span>
                    </div>
                </div>

                <div class="section-title">历史对话</div>
                <div class="chat-history">
                    <div class="chat-item">
                        <div class="chat-info">
                            <span class="chat-title">如何讲解二次函数</span>
                            <div class="chat-meta">
                                <span class="chat-tag">数学专家</span>
                                <span class="chat-time">2024-03-20</span>
                                <span class="chat-count">8条对话</span>
                            </div>
                        </div>
                        <span class="arrow">></span>
                    </div>
                    <div class="chat-item">
                        <div class="chat-info">
                            <span class="chat-title">平行线的判定方法</span>
                            <div class="chat-meta">
                                <span class="chat-tag">数学专家</span>
                                <span class="chat-time">2024-03-19</span>
                                <span class="chat-count">6条对话</span>
                            </div>
                        </div>
                        <span class="arrow">></span>
                    </div>
                    <div class="chat-item">
                        <div class="chat-info">
                            <span class="chat-title">圆的面积公式推导</span>
                            <div class="chat-meta">
                                <span class="chat-tag">数学专家</span>
                                <span class="chat-time">2024-03-18</span>
                                <span class="chat-count">10条对话</span>
                            </div>
                        </div>
                        <span class="arrow">></span>
                    </div>
                </div>

                <button class="logout-btn" id="logoutBtn">退出登录</button>
            </div>
        `;
    }

    bindEvents() {
        const logoutBtn = this.container.querySelector('#logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('token');
                window.location.reload();
            });
        }
    }
}

// 创建全局对象
window.my = {
    render: function() {
        console.log('开始渲染我的页面');
        const container = document.getElementById('page-container');
        if (!container) {
            console.error('找不到页面容器元素');
            return;
        }
        
        // 清空容器
        container.innerHTML = '';
        
        // 初始化页面
        const page = new My();
        page.init().then(content => {
            container.appendChild(content);
            console.log('我的页面初始化完成');
        }).catch(error => {
            console.error('初始化失败:', error);
            container.innerHTML = '<div class="error-message">页面加载失败，请刷新重试</div>';
        });
    }
};

// 路由处理
window.addEventListener('DOMContentLoaded', () => {
    const hash = location.hash.slice(1);
    if (hash === '/my') {
        window.my.render();
    }
}); 