// 专家配置
const experts = [
    {
        id: 'math',
        name: '数学专家',
        avatar: './src/assets/images/experts/math.png',
        description: '专注初高中数学教学设计',
        tags: ['教案设计', '试题解析', '概念讲解'],
        greeting: '你好！我可以帮你设计数学课程、解答教学难点。',
        backgroundColor: '#E3F2FD',
        themeColor: '#1976D2'
    },
    {
        id: 'moral',
        name: '德育专家',
        avatar: '👩‍🏫',
        description: '德育课程与班级管理专家',
        tags: ['班级管理', '心理辅导', '品德教育'],
        greeting: '你好！让我们一起探讨如何培养学生的品德与心理健康。',
        backgroundColor: '#F8BBD0',
        themeColor: '#C2185B'
    },
    {
        id: 'physics',
        name: '物理专家',
        avatar: '👨‍🔬',
        description: '物理教学与实验指导专家',
        tags: ['实验设计', '概念解析', '题目讲解'],
        greeting: '你好！让我们一起探索物理的奥秘。',
        backgroundColor: '#F3E5F5',
        themeColor: '#7B1FA2',
        comingSoon: true
    },
    {
        id: 'chemistry',
        name: '化学专家',
        avatar: '👩‍🔬',
        description: '化学实验与教学指导专家',
        tags: ['实验指导', '反应原理', '考点分析'],
        greeting: '你好！我可以帮你设计化学实验和教学方案。',
        backgroundColor: '#E8F5E9',
        themeColor: '#388E3C',
        comingSoon: true
    },
    {
        id: 'biology',
        name: '生物专家',
        avatar: '🧬',
        description: '生物教学与实验指导专家',
        tags: ['实验设计', '教学设计', '知识讲解'],
        greeting: '你好！让我们一起探索生命的奥秘。',
        backgroundColor: '#FFF3E0',
        themeColor: '#E64A19',
        comingSoon: true
    }
];

// 页面状态
let chatState = {
    currentExpert: null,
    messages: [],
    isLoading: false
};

// 渲染专家选择页面
function renderExpertList() {
    const container = document.getElementById('page-container');
    
    // 创建头部
    const header = document.createElement('header');
    header.className = 'chat-header';
    header.innerHTML = `
        <h1>专家数字人</h1>
        <p>选择专家开始对话</p>
    `;
    
    // 创建专家网格
    const grid = document.createElement('div');
    grid.className = 'expert-grid';
    
    // 渲染专家卡片
    const expertsHTML = experts.map(expert => `
        <div class="expert-card" data-id="${expert.id}" 
             style="background-color: ${expert.backgroundColor}">
            <div class="expert-avatar" style="color: ${expert.themeColor}">
                ${expert.avatar.startsWith('./') ? 
                    `<img src="${expert.avatar}" alt="${expert.name}">` : 
                    expert.avatar}
            </div>
            <div class="expert-info">
                <div class="expert-name" style="color: ${expert.themeColor}">
                    ${expert.name}
                    ${expert.comingSoon ? '<span class="coming-soon">即将上线</span>' : ''}
                </div>
                <div class="expert-description">${expert.description}</div>
                <div class="expert-tags">
                    ${expert.tags.map(tag => `
                        <span class="expert-tag" style="background-color: ${expert.themeColor}20; color: ${expert.themeColor}">
                            ${tag}
                        </span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    grid.innerHTML = expertsHTML;
    
    // 清空容器并添加内容
    container.innerHTML = '';
    container.appendChild(header);
    container.appendChild(grid);
    
    // 绑定事件
    bindExpertEvents(grid);
}

// 绑定专家卡片事件
function bindExpertEvents(grid) {
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.expert-card');
        if (!card) return;
        
        const expertId = card.dataset.id;
        const expert = experts.find(e => e.id === expertId);
        
        if (expert) {
            if (expert.comingSoon) {
                showToast('该专家正在开发中，敬请期待');
                return;
            }
            
            // 进入对话界面
            enterChatRoom(expert);
        }
    });
}

// 进入对话界面
function enterChatRoom(expert) {
    chatState.currentExpert = expert;
    chatState.messages = [];
    
    const container = document.getElementById('page-container');
    
    // 创建对话界面
    container.innerHTML = `
        <header class="chat-header">
            <div class="back-button">←</div>
            <div class="expert-chat-info">
                <div class="expert-chat-avatar" style="color: ${expert.themeColor}">
                    ${expert.avatar.startsWith('./') ? 
                        `<img src="${expert.avatar}" alt="${expert.name}">` : 
                        expert.avatar}
                </div>
                <div class="expert-chat-name">${expert.name}</div>
            </div>
        </header>
        <div class="message-list"></div>
        <div class="chat-input-area">
            <textarea class="chat-input" placeholder="输入你的问题..." rows="1"></textarea>
            <button class="send-btn">发送</button>
        </div>
    `;
    
    // 显示欢迎消息
    addMessage({
        type: 'assistant',
        content: expert.greeting
    });
    
    // 绑定事件
    bindChatEvents();
}

// 绑定对话界面事件
function bindChatEvents() {
    const backButton = document.querySelector('.back-button');
    const input = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.send-btn');
    
    // 返回按钮
    backButton.addEventListener('click', () => {
        renderExpertList();
    });
    
    // 发送消息
    const sendMessage = () => {
        const content = input.value.trim();
        if (!content || chatState.isLoading) return;
        
        // 添加用户消息
        addMessage({
            type: 'user',
            content
        });
        
        // 清空输入
        input.value = '';
        input.style.height = 'auto';
        
        // 获取回复
        handleAssistantResponse(content);
    };
    
    // 发送按钮
    sendBtn.addEventListener('click', sendMessage);
    
    // 回车发送
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // 自动调整输入框高度
    input.addEventListener('input', () => {
        input.style.height = 'auto';
        input.style.height = input.scrollHeight + 'px';
    });
}

// 添加消息到列表
function addMessage(message) {
    const messageList = document.querySelector('.message-list');
    const messageEl = document.createElement('div');
    messageEl.className = `message ${message.type}`;
    
    messageEl.innerHTML = `
        <div class="message-content">
            ${message.type === 'assistant' ? 
                `<div class="message-avatar" style="color: ${chatState.currentExpert.themeColor}">
                    ${chatState.currentExpert.avatar.startsWith('./') ? 
                        `<img src="${chatState.currentExpert.avatar}" alt="${chatState.currentExpert.name}">` : 
                        chatState.currentExpert.avatar}
                </div>` : ''}
            <div class="message-text">${message.content}</div>
        </div>
    `;
    
    messageList.appendChild(messageEl);
    messageList.scrollTop = messageList.scrollHeight;
}

// 处理助手回复
async function handleAssistantResponse(userMessage) {
    chatState.isLoading = true;
    
    try {
        // 模拟的回复消息
        const response = "这是一个模拟的回复消息。后续将替换为实际的API调用。";
        
        addMessage({
            type: 'assistant',
            content: response
        });
    } catch (error) {
        console.error('获取回复失败:', error);
        addMessage({
            type: 'system',
            content: '抱歉，获取回复失败，请稍后重试。'
        });
    } finally {
        chatState.isLoading = false;
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

// 初始化
function init() {
    const hash = location.hash.slice(1);
    if (hash.startsWith('/chat')) {
        renderExpertList();
    }
}

// 页面加载时初始化
window.addEventListener('load', init);

// 路由变化时初始化
window.addEventListener('hashchange', init); 