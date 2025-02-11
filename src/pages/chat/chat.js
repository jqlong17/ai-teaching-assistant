// 专家配置
const experts = [
    {
        id: 'math',
        name: '章建跃',
        avatar: './src/assets/images/experts/数字人示意图.png',
        qrcode: './src/assets/images/experts/1_1036350563_171_85_3_981752988_439c1f688e4f333d0b5d63c683b232b1.png',
        description: '著名数学教育专家，教育部基础教育课程教材专家工作委员会委员，国家级教学成果奖获得者。',
        detailedDescription: `
            章建跃教授是我国著名的数学教育专家，从事数学教育研究与实践40余年。他长期致力于中学数学教育理论研究与教学改革实践，在数学教育领域具有重要影响力。
        `,
        achievements: [
            '教育部基础教育课程教材专家工作委员会委员',
            '国家级教学成果奖获得者',
            '全国优秀教师',
            '参与多项国家级教育课题研究',
            '编写多部广受好评的数学教材和教辅资料'
        ],
        tags: ['教案设计', '试题解析', '概念讲解'],
        greeting: '你好！我可以帮你设计数学课程、解答教学难点。',
        backgroundColor: '#E3F2FD',
        themeColor: '#1976D2'
    },
    {
        id: 'moral',
        name: '李德育',
        avatar: '👩‍🏫',
        qrcode: './src/assets/images/experts/1_1036350563_171_85_3_981752988_439c1f688e4f333d0b5d63c683b232b1.png',
        description: '资深德育专家，从事德育教育研究与实践30余年，国家级德育示范课题负责人。',
        detailedDescription: `
            李德育教授专注于青少年品德教育和心理健康教育研究，在班级管理、心理辅导等方面具有丰富经验。她提出的"情境德育"教学模式在全国多所学校推广应用。
        `,
        achievements: [
            '国家级德育示范课题负责人',
            '教育部德育工作专家指导委员会委员',
            '多次获得省级以上德育教学成果奖',
            '出版德育教育专著多部',
            '开发德育课程体系，在全国推广应用'
        ],
        tags: ['班级管理', '心理辅导', '品德教育'],
        greeting: '你好！让我们一起探讨如何培养学生的品德与心理健康。',
        backgroundColor: '#F8BBD0',
        themeColor: '#C2185B'
    },
    {
        id: 'physics',
        name: '张物理',
        avatar: '👨‍🔬',
        qrcode: './src/assets/images/experts/1_1036350563_171_85_3_981752988_439c1f688e4f333d0b5d63c683b232b1.png',
        description: '国家级物理教学名师，物理教育研究会副会长，擅长物理实验教学设计。',
        detailedDescription: `
            张物理教授是国内知名的物理教育专家，在物理实验教学和科学探究教育方面有独特见解。他开发的多个创新物理实验获得国家专利，并在中学物理教学中广泛应用。
        `,
        achievements: [
            '国家级物理教学名师',
            '物理教育研究会副会长',
            '多项物理教学发明专利持有者',
            '国家级物理实验教学示范中心主任',
            '编写国家级重点物理教材'
        ],
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
        qrcode: './src/assets/images/experts/1_1036350563_171_85_3_981752988_439c1f688e4f333d0b5d63c683b232b1.png',
        description: '化学实验与教学指导专家',
        achievements: [
            '国家级化学教学名师',
            '化学教育研究会理事',
            '化学实验教学创新奖获得者'
        ],
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
        qrcode: './src/assets/images/experts/1_1036350563_171_85_3_981752988_439c1f688e4f333d0b5d63c683b232b1.png',
        description: '生物教学与实验指导专家',
        achievements: [
            '生物教育研究会会员',
            '生物实验教学创新奖获得者',
            '生物教育教学成果奖获得者'
        ],
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
    isLoading: false,
    isVoiceMode: true, // 默认使用语音输入
    isRecording: false,
    recognition: null
};

// 在 experts 数组后添加
let chatMode = 'immersive'; // 修改默认模式为 'immersive'

// 渲染专家选择页面
function renderExpertList() {
    const container = document.getElementById('page-container');
    container.className = 'expert-list-container';  
    
    // 创建头部
    const header = document.createElement('header');
    header.className = 'expert-list-header';
    header.innerHTML = `
        <h1>AI 教学助手</h1>
        <p>选择专业的数字人助手，开启智能教学之旅</p>
    `;
    
    // 创建专家网格
    const grid = document.createElement('div');
    grid.className = 'expert-grid';
    
    // 渲染专家卡片
    grid.innerHTML = experts.map(expert => {
        // 设置专家特定的颜色
        const style = `
            --expert-color: ${expert.themeColor || '#4F46E5'};
            --expert-color-light: ${expert.backgroundColor || '#0EA5E9'};
            --tag-bg: ${expert.themeColor}15;
            --tag-color: ${expert.themeColor};
            --tag-bg-hover: ${expert.themeColor}25;
        `;
        
        // 处理成就列表
        const achievements = expert.achievements || [];
        const achievementsHTML = achievements.length > 0 ? `
            <div class="expert-achievements">
                <h4>主要成就</h4>
                <ul>
                    ${achievements.slice(0, 3).map(achievement => 
                        `<li>${achievement}</li>`
                    ).join('')}
                </ul>
            </div>
        ` : '';
        
        return `
            <div class="expert-card" data-id="${expert.id}" style="${style}">
                <div class="qrcode-hover">
                    <img src="${expert.qrcode || '/images/qrcode-placeholder.png'}" alt="扫码体验">
                    <p>扫码在移动端体验数字人</p>
                </div>
                <div class="expert-avatar">
                    ${expert.avatar.startsWith('./') ? 
                        `<img src="${expert.avatar}" alt="${expert.name}">` : 
                        expert.avatar}
                </div>
                <div class="expert-info">
                    <div class="expert-name">${expert.name}</div>
                    <div class="expert-description">${expert.description}</div>
                    <div class="expert-tags">
                        ${(expert.tags || []).map(tag => `
                            <span class="expert-tag">${tag}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
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
                showToast('即将上线，敬请期待');
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
    
    if (chatMode === 'immersive') {
        const immersiveChat = new ImmersiveChat(expert);
        immersiveChat.render();
        return;
    }
    
    const container = document.getElementById('page-container');
    container.className = 'chat-container';
    
    // 创建对话界面
    container.innerHTML = `
        <div class="expert-side">
            <!-- 专家图片和音频波形 -->
            <div class="expert-image-container">
                <img src="${expert.avatar}" alt="${expert.name}" class="expert-image">
                <div class="audio-wave inactive">
                    <div class="wave-bar"></div>
                    <div class="wave-bar"></div>
                    <div class="wave-bar"></div>
                    <div class="wave-bar"></div>
                    <div class="wave-bar"></div>
                </div>
            </div>
            <div class="expert-description-panel">
                <div class="expert-title">${expert.name}</div>
                <div class="expert-desc">${expert.description}</div>
                <div class="expert-achievements">
                    <h4>主要成就：</h4>
                    <ul>
                        ${expert.achievements.slice(0, 3).map(achievement => 
                            `<li>${achievement}</li>`
                        ).join('')}
                    </ul>
                </div>
                <div class="expert-tags">
                    ${expert.tags.map(tag => `
                        <span class="expert-tag" style="background-color: ${expert.themeColor}20; color: ${expert.themeColor}">
                            ${tag}
                        </span>
                    `).join('')}
                </div>
            </div>
        </div>
        <div class="chat-main">
            <header class="chat-header">
                <div class="back-button">←</div>
                <div class="expert-chat-info">
                    <div class="expert-chat-name">返回</div>
                </div>
                <button class="mode-switch-btn" onclick="window.chat.switchChatMode()">
                    沉浸模式
                </button>
            </header>
            <div class="chat-content">
                <div class="message-list"></div>
            </div>
            <div class="chat-input-area">
                <div class="chat-input-wrapper">
                    <textarea class="chat-input" placeholder="输入你的问题..." rows="1"></textarea>
                    <button class="send-btn">发送</button>
                </div>
            </div>
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
    const sendButton = document.querySelector('.send-btn');
    
    // 发送按钮点击事件
    sendButton.addEventListener('click', () => {
        const content = input.value.trim();
        if (content) {
            handleUserMessage(content);
            input.value = '';
            input.style.height = 'auto';
        }
    });
    
    // 回车发送
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendButton.click();
        }
    });
    
    // 自动调整输入框高度
    input.addEventListener('input', () => {
        input.style.height = 'auto';
        input.style.height = input.scrollHeight + 'px';
    });
    
    // 返回按钮
    backButton.addEventListener('click', () => {
        renderExpertList();
    });
}

// 处理用户消息
function handleUserMessage(content) {
    if (!content || chatState.isLoading) return;
    
    // 添加用户消息
    addMessage({
        type: 'user',
        content
    });
    
    // 获取回复
    handleAssistantResponse(content);
}

// 添加消息到列表
function addMessage(message) {
    const messageList = document.querySelector('.message-list');
    const messageEl = document.createElement('div');
    messageEl.className = `message ${message.type}`;
    
    // 获取当前专家信息
    const expert = chatState.currentExpert;
    
    // 根据消息类型设置不同的头像
    const avatar = message.type === 'user' 
        ? '<div class="message-avatar">我</div>'
        : `<div class="message-avatar"><img src="${expert.avatar}" alt="${expert.name}"></div>`;
    
    // 为助手消息添加音频波形
    const audioWave = message.type === 'assistant' 
        ? `<div class="audio-wave">
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
           </div>`
        : '';
    
    messageEl.innerHTML = `
        ${avatar}
        <div class="message-content">
            <div class="message-text">${message.type === 'assistant' ? marked.parse(message.content) : message.content}</div>
        </div>
        ${audioWave}
    `;
    
    messageList.appendChild(messageEl);
    messageList.scrollTop = messageList.scrollHeight;

    // 如果是助手消息，添加动画效果
    if (message.type === 'assistant') {
        const wave = messageEl.querySelector('.audio-wave');
        wave.classList.remove('inactive');
        // 3秒后停止动画
        setTimeout(() => {
            wave.classList.add('inactive');
        }, 3000);
    }
}

// 处理助手回复
async function handleAssistantResponse(userMessage) {
    chatState.isLoading = true;
    
    try {
        // 激活专家头像下方的音频波形
        const expertWave = document.querySelector('.expert-side .audio-wave');
        if (expertWave) {
            expertWave.classList.remove('inactive');
        }

        // 如果是第一条消息，创建新对话
        if (!chatState.conversationId) {
            chatState.conversationId = await window.api.createConversation();
            console.log('创建新对话:', chatState.conversationId);
        }
        
        // 创建加载状态消息
        const messageList = document.querySelector('.message-list');
        const loadingMessage = document.createElement('div');
        loadingMessage.className = 'message loading';
        loadingMessage.innerHTML = `
            <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="loading-text">正在思考回答中，请稍候...</div>
        `;
        messageList.appendChild(loadingMessage);
        messageList.scrollTop = messageList.scrollHeight;
        
        // 发送消息并获取流式响应
        console.log('准备发送消息到 API...');
        const stream = await window.api.sendMessage(
            chatState.conversationId,
            userMessage,
            chatState.currentExpert
        );
        console.log('获取到 API 响应流');
        
        // 移除加载状态消息
        loadingMessage.remove();
        
        // 创建回复消息容器
        const messageEl = document.createElement('div');
        messageEl.className = 'message assistant';
        messageEl.innerHTML = `
            <div class="message-avatar">
                <img src="${chatState.currentExpert.avatar}" alt="${chatState.currentExpert.name}">
            </div>
            <div class="message-content">
                <div class="message-text">正在接收回复...</div>
            </div>
        `;
        messageList.appendChild(messageEl);
        const messageText = messageEl.querySelector('.message-text');
        
        // 处理流式响应
        let fullResponse = '';
        try {
            for await (const chunk of window.api.handleStream(stream)) {
                console.log('收到响应块:', chunk);
                if (chunk.event === 'message') {
                    const content = chunk.answer || chunk.message || '';
                    fullResponse += content;
                    messageText.innerHTML = marked.parse(fullResponse);
                    messageList.scrollTop = messageList.scrollHeight;
                }
            }
        } catch (streamError) {
            console.error('处理响应流时出错:', streamError);
            messageText.textContent = '抱歉，处理响应时出错了';
        }
        
        // 保存消息
        chatState.messages.push({
            type: 'user',
            content: userMessage
        }, {
            type: 'assistant',
            content: fullResponse || '抱歉，没有收到有效的回复'
        });
        
        // 停用专家头像下方的音频波形
        if (expertWave) {
            expertWave.classList.add('inactive');
        }
        
    } catch (error) {
        console.error('获取回复失败:', error);
        // 停用专家头像下方的音频波形
        const expertWave = document.querySelector('.expert-side .audio-wave');
        if (expertWave) {
            expertWave.classList.add('inactive');
        }
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
    console.log('对话页面初始化');
    const hash = location.hash;
    if (hash === '#/chat') {
        renderExpertList();
    }
}

// 添加切换模式的函数
function switchChatMode() {
    chatMode = chatMode === 'normal' ? 'immersive' : 'normal';
    enterChatRoom(chatState.currentExpert);
}

// 暴露到全局
window.chat = {
    renderExpertList,
    init,
    enterChatRoom,
    switchChatMode,
    handleUserMessage
};

// 页面加载时初始化
window.addEventListener('load', init);

// 路由变化时初始化
window.addEventListener('hashchange', init); 