class ImmersiveChat {
    constructor(expert) {
        this.expert = expert;
        this.isVoiceMode = true;
        this.isRecording = false;
        this.recognition = null;
        this.isMuted = false;
        this.isListening = false;
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
        await window.chat.handleUserMessage(content);
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