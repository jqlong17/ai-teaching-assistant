class AnimatedDialogue {
    constructor() {
        this.dialogueText = '';
        this.isGenerating = false;
        this.characters = [];
    }

    render() {
        const container = document.getElementById('page-container');
        container.className = 'ai-layout-container';
        
        container.innerHTML = `
            <div class="ai-layout-header">
                <div class="back-button">←</div>
                <h1>动画对话</h1>
            </div>
            
            <div class="ai-layout-content">
                <div class="ai-layout-input">
                    <div class="dialogue-section">
                        <div class="section-title">对话文本</div>
                        <div class="section-desc">请输入角色对话内容，格式如下：</div>
                        <div class="format-example">
                            角色1: 大家好，今天我们来学习分数。
                            角色2: 分数在我们生活中随处可见呢！
                            角色1: 没错，比如把一个苹果平均分成两份...
                        </div>
                        <textarea 
                            class="dialogue-input" 
                            placeholder="在这里输入对话内容..."
                            rows="10"
                        ></textarea>
                    </div>

                    <div class="style-section">
                        <div class="section-title">场景风格</div>
                        <div class="style-presets">
                            <label class="style-label">
                                <input type="radio" name="style" value="classroom" checked>
                                <span class="style-preview classroom"></span>
                                <span class="style-name">教室场景</span>
                            </label>
                            <label class="style-label">
                                <input type="radio" name="style" value="cartoon">
                                <span class="style-preview cartoon"></span>
                                <span class="style-name">卡通场景</span>
                            </label>
                            <label class="style-label">
                                <input type="radio" name="style" value="nature">
                                <span class="style-preview nature"></span>
                                <span class="style-name">自然场景</span>
                            </label>
                            <label class="style-label">
                                <input type="radio" name="style" value="abstract">
                                <span class="style-preview abstract"></span>
                                <span class="style-name">抽象场景</span>
                            </label>
                        </div>
                    </div>

                    <div class="character-section">
                        <div class="section-title">角色形象</div>
                        <div class="character-list">
                            <!-- 角色列表将在检测到对话文本后动态生成 -->
                        </div>
                    </div>

                    <div class="action-section">
                        <button class="generate-btn" disabled>
                            <span class="btn-text">生成动画</span>
                            <div class="loading-dots" style="display: none;">
                                <span></span><span></span><span></span>
                            </div>
                        </button>
                    </div>
                </div>

                <div class="ai-layout-preview">
                    <div class="ai-layout-preview-header">
                        <div class="ai-layout-preview-title">动画预览</div>
                    </div>
                    <div class="ai-layout-preview-content">
                        <div class="empty-preview" style="text-align: center; padding: 40px; color: #94a3b8;">
                            生成的动画将在这里预览
                        </div>
                        <div class="video-preview" style="display: none;">
                            <video controls style="width: 100%; border-radius: 12px;">
                                <source src="" type="video/mp4">
                                您的浏览器不支持 video 标签
                            </video>
                        </div>
                    </div>
                    <div class="ai-layout-preview-footer result-actions" style="display: none;">
                        <button class="download-btn">下载视频</button>
                    </div>
                </div>
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        const dialogueInput = document.querySelector('.dialogue-input');
        const generateBtn = document.querySelector('.generate-btn');
        const backButton = document.querySelector('.back-button');
        const downloadBtn = document.querySelector('.download-btn');

        // 对话文本输入
        dialogueInput.addEventListener('input', (e) => {
            this.dialogueText = e.target.value.trim();
            this.updateCharacters();
            this.updateGenerateButton();
        });

        // 生成按钮
        generateBtn.addEventListener('click', () => {
            if (!this.isGenerating) {
                this.startGeneration();
            }
        });

        // 返回按钮
        backButton.addEventListener('click', () => {
            window.location.hash = '#/';
        });

        // 下载按钮
        downloadBtn.addEventListener('click', () => {
            this.downloadVideo();
        });
    }

    // 从对话文本中提取角色
    updateCharacters() {
        const characters = new Set();
        const lines = this.dialogueText.split('\n');
        
        lines.forEach(line => {
            const match = line.match(/^(.+?):/);
            if (match) {
                characters.add(match[1].trim());
            }
        });

        this.characters = Array.from(characters);
        this.renderCharacterList();
    }

    // 渲染角色列表
    renderCharacterList() {
        const characterList = document.querySelector('.character-list');
        
        if (this.characters.length === 0) {
            characterList.innerHTML = '<div class="empty-characters">检测到的角色将在这里显示</div>';
            return;
        }

        characterList.innerHTML = this.characters.map((character, index) => `
            <div class="character-item">
                <div class="character-name">${character}</div>
                <select class="character-style" data-character="${character}">
                    <option value="teacher">老师形象</option>
                    <option value="student">学生形象</option>
                    <option value="cartoon">卡通形象</option>
                    <option value="custom">自定义形象</option>
                </select>
            </div>
        `).join('');
    }

    updateGenerateButton() {
        const generateBtn = document.querySelector('.generate-btn');
        generateBtn.disabled = !this.dialogueText || this.characters.length < 2;
    }

    async startGeneration() {
        this.isGenerating = true;
        const generateBtn = document.querySelector('.generate-btn');
        const btnText = generateBtn.querySelector('.btn-text');
        const loadingDots = generateBtn.querySelector('.loading-dots');
        const videoPreview = document.querySelector('.video-preview');
        const emptyPreview = document.querySelector('.empty-preview');
        const resultActions = document.querySelector('.result-actions');
        
        btnText.style.display = 'none';
        loadingDots.style.display = 'flex';
        generateBtn.disabled = true;

        try {
            // 获取选中的场景风格
            const selectedStyle = document.querySelector('input[name="style"]:checked').value;
            
            // 获取角色形象设置
            const characterStyles = {};
            this.characters.forEach(character => {
                const select = document.querySelector(`.character-style[data-character="${character}"]`);
                characterStyles[character] = select.value;
            });
            
            // TODO: 实际的生成逻辑
            const videoUrl = await this.mockGeneration(selectedStyle, characterStyles);
            
            // 显示预览
            const video = videoPreview.querySelector('video');
            video.src = videoUrl;
            videoPreview.style.display = 'block';
            emptyPreview.style.display = 'none';
            resultActions.style.display = 'flex';
            
            // 在移动端时滚动到预览区域
            if (window.innerWidth < 1024) {
                videoPreview.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            this.showToast('生成失败，请重试');
            console.error('Generation error:', error);
        } finally {
            this.isGenerating = false;
            btnText.style.display = 'block';
            loadingDots.style.display = 'none';
            generateBtn.disabled = false;
        }
    }

    // 模拟生成过程
    async mockGeneration(style, characterStyles) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 这里应该返回实际生成的视频URL
        return 'data:video/mp4;base64,...';
    }

    downloadVideo() {
        // TODO: 实际的下载逻辑
        this.showToast('视频文件准备下载...');
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 2000);
    }
}

// 初始化
function init() {
    console.log('动画对话页面初始化');
    const hash = location.hash.slice(1);
    if (hash === '/animated-dialogue') {
        new AnimatedDialogue().render();
    }
}

// 暴露到全局
window.animatedDialogue = {
    init
};

// 页面加载时初始化
window.addEventListener('load', init);

// 路由变化时初始化
window.addEventListener('hashchange', init); 