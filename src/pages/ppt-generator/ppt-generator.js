class PptGenerator {
    constructor() {
        this.sourceFile = null;
        this.sourceText = '';
        this.isGenerating = false;
    }

    render() {
        const container = document.getElementById('page-container');
        container.className = 'ai-layout-container';
        
        container.innerHTML = `
            <div class="ai-layout-header">
                <div class="back-button">←</div>
                <h1>一键PPT制作</h1>
            </div>
            
            <div class="ai-layout-content">
                <div class="ai-layout-input">
                    <div class="upload-section">
                        <div class="upload-area" id="uploadArea">
                            <input type="file" id="fileInput" accept=".pdf,.ppt,.pptx,.doc,.docx" hidden>
                            <div class="upload-icon">📄</div>
                            <div class="upload-text">
                                <div class="primary-text">点击或拖拽上传文件</div>
                                <div class="secondary-text">支持 PDF、PPT、Word 格式</div>
                            </div>
                        </div>
                        
                        <div class="file-info" style="display: none;">
                            <div class="file-name"></div>
                            <button class="remove-file">删除</button>
                        </div>
                    </div>

                    <div class="text-section">
                        <div class="section-title">
                            <span>或输入文本内容</span>
                            <div class="divider"></div>
                        </div>
                        <textarea 
                            class="content-input" 
                            placeholder="请输入要转换为PPT的文本内容，建议包含标题、大纲和具体内容..."
                            rows="8"
                        ></textarea>
                    </div>

                    <div class="style-section">
                        <div class="section-title">PPT风格</div>
                        <div class="style-presets">
                            <label class="style-label">
                                <input type="radio" name="style" value="business" checked>
                                <span class="style-preview business"></span>
                                <span class="style-name">商务简约</span>
                            </label>
                            <label class="style-label">
                                <input type="radio" name="style" value="education">
                                <span class="style-preview education"></span>
                                <span class="style-name">教育培训</span>
                            </label>
                            <label class="style-label">
                                <input type="radio" name="style" value="creative">
                                <span class="style-preview creative"></span>
                                <span class="style-name">创意设计</span>
                            </label>
                            <label class="style-label">
                                <input type="radio" name="style" value="technology">
                                <span class="style-preview technology"></span>
                                <span class="style-name">科技风格</span>
                            </label>
                        </div>
                    </div>

                    <div class="action-section">
                        <button class="generate-btn" disabled>
                            <span class="btn-text">开始生成</span>
                            <div class="loading-dots" style="display: none;">
                                <span></span><span></span><span></span>
                            </div>
                        </button>
                    </div>
                </div>

                <div class="ai-layout-preview">
                    <div class="ai-layout-preview-header">
                        <div class="ai-layout-preview-title">PPT预览</div>
                    </div>
                    <div class="ai-layout-preview-content">
                        <div class="empty-preview" style="text-align: center; padding: 40px; color: #94a3b8;">
                            生成的PPT将在这里预览
                        </div>
                        <div class="slides-preview" style="display: none;"></div>
                    </div>
                    <div class="ai-layout-preview-footer result-actions" style="display: none;">
                        <button class="download-btn">下载PPT</button>
                    </div>
                </div>
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const fileInfo = document.querySelector('.file-info');
        const fileName = document.querySelector('.file-name');
        const removeFileBtn = document.querySelector('.remove-file');
        const contentInput = document.querySelector('.content-input');
        const generateBtn = document.querySelector('.generate-btn');
        const backButton = document.querySelector('.back-button');
        const downloadBtn = document.querySelector('.download-btn');

        // 上传区域点击事件
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        // 文件拖拽事件
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (this.validateFile(file)) {
                this.handleFileSelect(file);
            }
        });

        // 文件选择事件
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (this.validateFile(file)) {
                this.handleFileSelect(file);
            }
        });

        // 删除文件
        removeFileBtn.addEventListener('click', () => {
            this.sourceFile = null;
            fileInput.value = '';
            uploadArea.style.display = 'flex';
            fileInfo.style.display = 'none';
            this.updateGenerateButton();
        });

        // 文本输入
        contentInput.addEventListener('input', (e) => {
            this.sourceText = e.target.value.trim();
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
            this.downloadPPT();
        });
    }

    validateFile(file) {
        if (!file) return false;
        
        const validTypes = [
            'application/pdf',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        
        if (!validTypes.includes(file.type)) {
            this.showToast('请上传 PDF、PPT 或 Word 格式的文件');
            return false;
        }
        
        if (file.size > 20 * 1024 * 1024) { // 20MB
            this.showToast('文件大小不能超过 20MB');
            return false;
        }
        
        return true;
    }

    handleFileSelect(file) {
        this.sourceFile = file;
        const uploadArea = document.getElementById('uploadArea');
        const fileInfo = document.querySelector('.file-info');
        const fileName = document.querySelector('.file-name');
        
        uploadArea.style.display = 'none';
        fileInfo.style.display = 'flex';
        fileName.textContent = file.name;
        
        this.updateGenerateButton();
    }

    updateGenerateButton() {
        const generateBtn = document.querySelector('.generate-btn');
        generateBtn.disabled = !this.sourceFile && !this.sourceText;
    }

    async startGeneration() {
        this.isGenerating = true;
        const generateBtn = document.querySelector('.generate-btn');
        const btnText = generateBtn.querySelector('.btn-text');
        const loadingDots = generateBtn.querySelector('.loading-dots');
        const slidesPreview = document.querySelector('.slides-preview');
        const emptyPreview = document.querySelector('.empty-preview');
        const resultActions = document.querySelector('.result-actions');
        
        btnText.style.display = 'none';
        loadingDots.style.display = 'flex';
        generateBtn.disabled = true;

        try {
            // 获取选中的PPT风格
            const selectedStyle = document.querySelector('input[name="style"]:checked').value;
            
            // TODO: 实际的生成逻辑
            const slides = await this.mockGeneration(selectedStyle);
            
            // 显示预览
            slidesPreview.innerHTML = slides;
            slidesPreview.style.display = 'block';
            emptyPreview.style.display = 'none';
            resultActions.style.display = 'flex';
            
            // 在移动端时滚动到预览区域
            if (window.innerWidth < 1024) {
                slidesPreview.scrollIntoView({ behavior: 'smooth' });
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
    async mockGeneration(style) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const slides = [
            {
                type: 'cover',
                title: '智能教育创新',
                subtitle: '让学习更高效、更有趣',
                style
            },
            {
                type: 'content',
                title: '目录',
                items: [
                    '人工智能在教育中的应用',
                    '个性化学习的重要性',
                    '智能教育平台的优势',
                    '未来教育发展趋势'
                ],
                style
            },
            {
                type: 'section',
                title: '人工智能在教育中的应用',
                content: '通过AI技术实现智能推荐、自适应学习、智能评测等功能，为学生提供个性化的学习体验。',
                image: 'ai-education.jpg',
                style
            }
        ];

        // 生成预览HTML
        return slides.map(slide => {
            let slideHtml = '';
            switch (slide.type) {
                case 'cover':
                    slideHtml = `
                        <div class="slide cover ${slide.style}">
                            <h1>${slide.title}</h1>
                            <h2>${slide.subtitle}</h2>
                        </div>
                    `;
                    break;
                case 'content':
                    slideHtml = `
                        <div class="slide content ${slide.style}">
                            <h2>${slide.title}</h2>
                            <ul>
                                ${slide.items.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                    break;
                case 'section':
                    slideHtml = `
                        <div class="slide section ${slide.style}">
                            <h2>${slide.title}</h2>
                            <div class="slide-content">
                                <p>${slide.content}</p>
                                <div class="slide-image"></div>
                            </div>
                        </div>
                    `;
                    break;
            }
            return slideHtml;
        }).join('');
    }

    downloadPPT() {
        // TODO: 实际的下载逻辑
        this.showToast('PPT文件准备下载...');
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
    console.log('PPT生成页面初始化');
    const hash = location.hash.slice(1);
    if (hash === '/ppt-generator') {
        new PptGenerator().render();
    }
}

// 暴露到全局
window.pptGenerator = {
    init
};

// 页面加载时初始化
window.addEventListener('load', init);

// 路由变化时初始化
window.addEventListener('hashchange', init); 