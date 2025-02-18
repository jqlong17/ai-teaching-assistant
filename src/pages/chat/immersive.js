class ImmersiveChat {
    constructor(expert) {
        this.expert = expert;
        this.isVoiceMode = true;
        this.isRecording = false;
        this.recognition = null;
        this.isMuted = false;
        this.isListening = false;
        this.isGeneratingDocument = false;
        this.documentSteps = [
            '分析教学内容',
            '分析学情',
            '确定教学目标',
            '设计教学过程',
            '设计教学评价'
        ];
        this.currentStep = 0;
        this.initSpeechRecognition();
    }

    // 初始化语音识别
    initSpeechRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.recognition.lang = 'zh-CN';
            
            this.setupRecognitionHandlers();
        }
    }

    // 设置语音识别处理器
    setupRecognitionHandlers() {
        this.recognition.onstart = () => {
            this.isRecording = true;
            document.querySelector('.voice-status-indicator').classList.add('show');
        };

        this.recognition.onend = () => {
            this.isRecording = false;
            if (!document.getElementById('endDialogBtn')) {
                document.querySelector('.voice-status-indicator').classList.remove('show');
            }
        };

        this.recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');
            
            if (event.results[0].isFinal) {
                this.handleUserInput(transcript);
            }
        };

        this.recognition.onerror = (event) => {
            console.error('语音识别错误:', event.error);
            this.showVoiceStatus('未能识别语音，请重试');
            document.querySelector('.voice-status-indicator').classList.remove('show');
        };
    }

    // 渲染沉浸式界面
    render() {
        const container = document.getElementById('page-container');
        container.className = 'immersive-container';
        
        container.innerHTML = `
            <div class="immersive-header">
                <div class="header-content">
                    <div class="back-button">←</div>
                    <div class="expert-name">返回</div>
                </div>
                <button class="mode-switch-btn immersive">
                    <span class="icon">⇆</span>
                    <span class="text">传统对话</span>
                </button>
            </div>
            
            <div class="digital-human">
                <img src="${this.expert.avatar}" alt="${this.expert.name}" class="digital-human-image">
                <div class="digital-human-name">${this.expert.name}</div>
                <div class="expert-output">
                    <span class="text"></span>
                    <span class="typing"></span>
                </div>
                <div class="voice-status-indicator">
                    <div class="wave-animation">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                    <span class="status-text">正在聆听...</span>
                </div>
                <div class="text-input-area">
                    <input type="text" class="text-input" placeholder="请输入您的问题...">
                    <button class="send-btn">发送</button>
                </div>
                <div class="digital-human-controls">
                    <button class="control-btn voice-dialog" id="voiceDialogBtn">语音对话</button>
                    <button class="control-btn text-dialog" id="textDialogBtn">文字输入</button>
                </div>
            </div>
        `;

        this.bindEvents();
    }

    // 绑定事件处理
    bindEvents() {
        const modeSwitch = document.querySelector('.mode-switch-btn');
        const voiceDialogBtn = document.getElementById('voiceDialogBtn');
        const textDialogBtn = document.getElementById('textDialogBtn');
        const textInputArea = document.querySelector('.text-input-area');
        const voiceStatusIndicator = document.querySelector('.voice-status-indicator');
        const textInput = document.querySelector('.text-input');
        const sendBtn = document.querySelector('.send-btn');
        const backButton = document.querySelector('.back-button');
        
        // 返回按钮事件
        backButton.addEventListener('click', () => {
            window.chat.renderExpertList();
        });
        
        // 切换布局模式
        modeSwitch.addEventListener('click', () => {
            const isSplitMode = modeSwitch.classList.contains('split');
            if (isSplitMode) {
                modeSwitch.classList.remove('split');
                modeSwitch.classList.add('immersive');
                modeSwitch.querySelector('.text').textContent = '传统对话';
            } else {
                modeSwitch.classList.remove('immersive');
                modeSwitch.classList.add('split');
                modeSwitch.querySelector('.text').textContent = '沉浸模式';
            }
            window.chat.switchChatMode();
        });
        
        // 语音对话按钮事件
        voiceDialogBtn.addEventListener('click', () => {
            const isVoiceActive = voiceDialogBtn.classList.contains('active');
            
            if (!isVoiceActive) {
                // 开始语音对话
                voiceDialogBtn.textContent = '结束语音';
                voiceDialogBtn.classList.add('active');
                textDialogBtn.classList.remove('active');
                textInputArea.classList.remove('show');
                voiceStatusIndicator.classList.add('show');
                
                if (!this.isRecording) {
                    this.recognition.start();
                    const welcomeText = `您好！我是${this.expert.name}。让我们开始探讨数学教学的问题吧。我可以帮您设计教案、解答疑难，请告诉我您的需求。`;
                    this.streamText(welcomeText);
                }
            } else {
                // 结束语音对话
                voiceDialogBtn.textContent = '语音对话';
                voiceDialogBtn.classList.remove('active');
                voiceStatusIndicator.classList.remove('show');
                
                if (this.isRecording) {
                    this.recognition.stop();
                }
            }
        });
        
        // 文字输入按钮事件
        textDialogBtn.addEventListener('click', () => {
            const isTextMode = !textDialogBtn.classList.contains('active');
            
            if (isTextMode) {
                // 激活文字输入模式
                textDialogBtn.classList.add('active');
                voiceDialogBtn.classList.remove('active');
                voiceDialogBtn.textContent = '语音对话';  // 重置语音按钮文本
                
                // 如果正在语音识别，先停止
                if (this.isRecording) {
                    this.recognition.stop();
                }
                
                // 隐藏语音状态指示器，显示文字输入区域
                voiceStatusIndicator.classList.remove('show');
                textInputArea.classList.add('show');
                textInput.focus();
            } else {
                // 取消文字输入模式
                textDialogBtn.classList.remove('active');
                textInputArea.classList.remove('show');
            }
        });
        
        // 文本输入框回车事件
        textInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const text = textInput.value.trim();
                if (text) {
                    this.handleUserInput(text);
                    textInput.value = '';
                }
            }
        });
        
        // 发送按钮事件
        sendBtn.addEventListener('click', () => {
            const text = textInput.value.trim();
            if (text) {
                this.handleUserInput(text);
                textInput.value = '';
            }
        });
    }

    // 显示语音状态提示
    showVoiceStatus(text) {
        const voiceStatus = document.querySelector('.voice-status-tip');
        voiceStatus.textContent = text;
        voiceStatus.classList.add('show');
        
        if (text !== '正在聆听...') {
            setTimeout(() => {
                voiceStatus.classList.remove('show');
            }, 2000);
        }
    }

    // 处理用户输入
    async handleUserInput(content) {
        if (!content) return;
        
        // 添加用户消息到对话界面
        const outputElement = document.querySelector('.expert-output');
        const textElement = outputElement.querySelector('.text');
        
        // 确保expert-output可见
        outputElement.classList.add('show');
        
        // 显示用户的输入
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.innerHTML = `<div class="message-content">${content}</div>`;
        textElement.appendChild(userMessage);
        
        // 如果正在生成文档，不处理新的输入
        if (this.isGeneratingDocument) {
            return;
        }

        // 检测是否需要生成文档
        if (this.detectDocumentGeneration(content)) {
            console.log('检测到需要生成文档');
            this.showDocumentConfirmation();
        } else {
            try {
                // 显示思考动画
                document.querySelector('.digital-human-image').classList.add('thinking');
                
                // 根据输入内容生成回复
                let response = '';
                if (content === '你好') {
                    response = `您好！我是${this.expert.name}。让我们开始探讨数学教学的问题吧。我可以帮您设计教案、解答疑难，请告诉我您的需求。`;
                } else if (content.includes('教学') || content.includes('课程')) {
                    response = '关于教学问题，我建议我们可以从以下几个方面来思考：\n\n1. 教学目标的设定\n2. 学生特点分析\n3. 教学重难点把握\n4. 教学方法选择\n\n您想先了解哪个方面呢？';
                } else {
                    response = '您说得很有意思。能具体说说您的想法吗？我很乐意和您深入探讨这个话题。';
                }
                
                // 添加数字人回复
                const assistantMessage = document.createElement('div');
                assistantMessage.className = 'message assistant';
                assistantMessage.innerHTML = `<div class="message-content">${response}</div>`;
                textElement.appendChild(assistantMessage);
                
                // 移除思考动画
                document.querySelector('.digital-human-image').classList.remove('thinking');
                
            } catch (error) {
                console.error('处理用户消息时出错:', error);
                this.streamText('抱歉，处理您的消息时出现了问题，请重试');
            }
        }
        
        // 滚动到底部
        textElement.scrollTop = textElement.scrollHeight;
    }

    // 检测是否需要生成文档
    detectDocumentGeneration(content) {
        const keywords = ['教案', '教学设计', '课程设计', '教学计划'];
        const result = keywords.some(keyword => content.includes(keyword));
        console.log('文档生成检测结果:', result, '内容:', content);
        return result;
    }

    // 显示文档生成确认UI
    showDocumentConfirmation() {
        const outputElement = document.querySelector('.expert-output');
        const textElement = outputElement.querySelector('.text');
        
        outputElement.classList.add('show');
        textElement.innerHTML = `
            <div class="document-confirmation">
                <div class="confirmation-message">我发现您需要生成教学设计文档，需要我现在开始生成吗？</div>
                <div class="confirmation-buttons">
                    <button class="confirm-btn">开始生成</button>
                    <button class="cancel-btn">暂不需要</button>
                </div>
            </div>
        `;
        
        const confirmBtn = textElement.querySelector('.confirm-btn');
        const cancelBtn = textElement.querySelector('.cancel-btn');
        
        confirmBtn.addEventListener('click', () => {
            this.startBackgroundDocumentGeneration();
        });
        
        cancelBtn.addEventListener('click', () => {
            this.streamText('好的，您有其他需要随时可以找我');
        });
    }

    // 在后台开始生成文档
    async startBackgroundDocumentGeneration() {
        // 告知用户文档正在后台生成
        await this.streamText('我将在后台经过长时间思考生成教学设计，我们可以正常对话，设计完成后将提醒您查看。');
        
        // 在后台开始生成过程
        setTimeout(async () => {
            // 模拟文档生成过程
            for (let i = 0; i < this.documentSteps.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
            
            // 生成完成后，通过对话通知用户
            await this.streamText('我已经完成了教学设计文档的生成，您可以点击[这里查看和下载](download)教学设计文档。');
            
            // 绑定下载事件
            const downloadLink = document.querySelector('.expert-output .text a');
            if (downloadLink) {
                downloadLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    // 模拟下载操作
                    alert('文档下载开始');
                });
            }
        }, 1000);
    }

    updateControlButtons() {
        const muteBtn = document.querySelector('.control-btn.mute');
        const listeningStatus = document.querySelector('.listening-status');
        
        // 更新静音按钮
        if (this.isMuted) {
            muteBtn.textContent = '🔇';
            muteBtn.classList.add('active');
            muteBtn.querySelector('.status-indicator').textContent = '已静音';
        } else {
            muteBtn.textContent = '🔊';
            muteBtn.classList.remove('active');
            muteBtn.querySelector('.status-indicator').textContent = '已开启声音';
        }

        // 更新聆听状态
        if (this.isListening) {
            listeningStatus.classList.remove('inactive');
            listeningStatus.querySelector('span').textContent = '正在聆听';
        } else {
            listeningStatus.classList.add('inactive');
            listeningStatus.querySelector('span').textContent = '已暂停聆听';
        }
    }

    // 添加流式显示文本的方法
    async streamText(text) {
        const outputElement = document.querySelector('.expert-output');
        const textElement = outputElement.querySelector('.text');
        
        outputElement.classList.add('show');
        textElement.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            textElement.textContent += text[i];
            await new Promise(resolve => setTimeout(resolve, 50)); // 控制打字速度
        }
        
        // 显示完成后隐藏打字动画
        outputElement.querySelector('.typing').style.display = 'none';
    }
}

// 导出模块
window.ImmersiveChat = ImmersiveChat; 

function renderDigitalHumanControls() {
    const controls = document.createElement('div');
    controls.className = 'digital-human-controls';
    
    const startRecordBtn = document.createElement('button');
    startRecordBtn.className = 'control-btn start-record';
    startRecordBtn.textContent = '开始对话';
    startRecordBtn.id = 'startRecordBtn';
    
    const endRecordBtn = document.createElement('button');
    endRecordBtn.className = 'control-btn end-record';
    endRecordBtn.textContent = '结束对话';
    endRecordBtn.id = 'endRecordBtn';
    endRecordBtn.style.display = 'none';
    
    controls.appendChild(startRecordBtn);
    controls.appendChild(endRecordBtn);
    
    return controls;
}

function bindControlEvents() {
    const startRecordBtn = document.getElementById('startRecordBtn');
    const endRecordBtn = document.getElementById('endRecordBtn');
    
    startRecordBtn.addEventListener('click', () => {
        startRecordBtn.textContent = '正在聆听...';
        startRecordBtn.classList.add('recording');
        startRecordBtn.style.display = 'none';
        endRecordBtn.style.display = 'flex';
        if (!this.isRecording) {
            this.recognition.start();
        }
    });
    
    endRecordBtn.addEventListener('click', () => {
        startRecordBtn.textContent = '开始对话';
        startRecordBtn.classList.remove('recording');
        startRecordBtn.style.display = 'flex';
        endRecordBtn.style.display = 'none';
        stopRecording();
    });
} 