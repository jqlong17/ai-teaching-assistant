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
            this.updateRecordingUI(true);
        };

        this.recognition.onend = () => {
            this.isRecording = false;
            this.updateRecordingUI(false);
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
        };
    }

    // 渲染沉浸式界面
    render() {
        const container = document.getElementById('page-container');
        container.className = 'immersive-container';
        
        container.innerHTML = `
            <div class="immersive-header">
                <button class="mode-switch-btn">
                    <span class="icon">💡</span>
                    切换布局
                </button>
            </div>
            
            <div class="digital-human">
                <img src="${this.expert.avatar}" alt="${this.expert.name}" class="digital-human-image">
                <div class="digital-human-name">${this.expert.name}</div>
                <div class="digital-human-controls">
                    <button class="control-btn mute" title="静音">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 2c-1.7 0-3 1.2-3 2.7v6.6c0 1.5 1.3 2.7 3 2.7s3-1.2 3-2.7V4.7C15 3.2 13.7 2 12 2z"/>
                            <path d="M19 10v2c0 4.4-3.6 8-8 8s-8-3.6-8-8v-2"/>
                        </svg>
                        <span class="status-indicator">静音</span>
                    </button>
                    <div class="listening-status">
                        <span>正在聆听</span>
                        <div class="voice-wave">
                            <div class="wave-bar"></div>
                            <div class="wave-bar"></div>
                            <div class="wave-bar"></div>
                            <div class="wave-bar"></div>
                            <div class="wave-bar"></div>
                        </div>
                    </div>
                    <button class="control-btn end-call" title="结束通话">
                        📞
                        <span class="status-indicator">结束通话</span>
                    </button>
                </div>
            </div>
            
            <div class="immersive-input-area">
                <div class="input-container ${this.isVoiceMode ? 'voice-mode' : 'text-mode'}">
                    <button class="input-mode-toggle" title="切换输入模式">
                        ${this.isVoiceMode ? '⌨️' : '🎤'}
                    </button>
                    <input type="text" class="text-input" placeholder="输入你的问题...">
                    <button class="voice-input-btn">按住说话</button>
                    <button class="send-btn">发送</button>
                </div>
                <div class="voice-status-tip">按住说话</div>
            </div>
        `;

        this.bindEvents();
        this.updateControlButtons();
    }

    // 绑定事件处理
    bindEvents() {
        const modeSwitch = document.querySelector('.mode-switch-btn');
        const inputModeToggle = document.querySelector('.input-mode-toggle');
        const voiceBtn = document.querySelector('.voice-input-btn');
        const textInput = document.querySelector('.text-input');
        const sendBtn = document.querySelector('.send-btn');
        
        // 切换布局模式
        modeSwitch.addEventListener('click', () => {
            window.chat.switchChatMode();
        });
        
        // 切换输入模式
        inputModeToggle.addEventListener('click', () => {
            this.toggleInputMode();
        });
        
        // 语音输入事件
        let touchStartTime;
        
        const startRecording = () => {
            if (!this.recognition) {
                this.showVoiceStatus('您的浏览器不支持语音识别功能');
                return;
            }
            
            touchStartTime = Date.now();
            if (!this.isRecording) {
                this.recognition.start();
            }
        };
        
        const stopRecording = () => {
            const touchDuration = Date.now() - touchStartTime;
            
            if (touchDuration < 500) {
                this.recognition.stop();
                this.showVoiceStatus('说话时间太短了');
                return;
            }
            
            if (this.isRecording) {
                this.recognition.stop();
            }
        };
        
        // 支持鼠标和触摸事件
        voiceBtn.addEventListener('mousedown', startRecording);
        voiceBtn.addEventListener('mouseup', stopRecording);
        voiceBtn.addEventListener('mouseleave', stopRecording);
        voiceBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startRecording();
        });
        voiceBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            stopRecording();
        });
        
        // 文本输入事件
        textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendBtn.click();
            }
        });
        
        sendBtn.addEventListener('click', () => {
            const text = textInput.value.trim();
            if (text) {
                this.handleUserInput(text);
                textInput.value = '';
            }
        });

        // 控制按钮事件
        const muteBtn = document.querySelector('.control-btn.mute');
        const listeningStatus = document.querySelector('.listening-status');
        const endCallBtn = document.querySelector('.control-btn.end-call');

        muteBtn.addEventListener('click', () => {
            this.isMuted = !this.isMuted;
            this.updateControlButtons();
        });

        endCallBtn.addEventListener('click', () => {
            window.chat.renderExpertList();
        });
    }

    // 切换输入模式
    toggleInputMode() {
        this.isVoiceMode = !this.isVoiceMode;
        const container = document.querySelector('.input-container');
        const toggle = document.querySelector('.input-mode-toggle');
        
        if (this.isVoiceMode) {
            container.classList.remove('text-mode');
            container.classList.add('voice-mode');
            toggle.textContent = '⌨️';
        } else {
            container.classList.remove('voice-mode');
            container.classList.add('text-mode');
            toggle.textContent = '🎤';
        }
    }

    // 更新录音UI状态
    updateRecordingUI(isRecording) {
        const voiceBtn = document.querySelector('.voice-input-btn');
        const voiceStatus = document.querySelector('.voice-status-tip');
        
        if (isRecording) {
            voiceBtn.classList.add('recording');
            voiceBtn.textContent = '松开结束';
            this.showVoiceStatus('正在聆听...');
        } else {
            voiceBtn.classList.remove('recording');
            voiceBtn.textContent = '按住说话';
            voiceStatus.classList.remove('show');
        }
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
        
        // 这里调用原来的消息处理逻辑
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
}

// 导出模块
window.ImmersiveChat = ImmersiveChat; 