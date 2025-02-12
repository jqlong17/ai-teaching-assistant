class EssayEvaluation {
    constructor() {
        this.essayImage = null;
        this.isEvaluating = false;
    }

    render() {
        const container = document.getElementById('page-container');
        container.className = 'ai-layout-container';
        
        container.innerHTML = `
            <div class="ai-layout-header">
                <div class="back-button">←</div>
                <h1>语文作文评价</h1>
            </div>
            
            <div class="ai-layout-content">
                <!-- 移动端tab切换 -->
                <div class="mobile-tabs">
                    <div class="mobile-tab-item active" data-tab="input">配置</div>
                    <div class="mobile-tab-item" data-tab="preview">预览</div>
                </div>

                <div class="ai-layout-input active">
                    <div class="upload-section">
                        <div class="upload-area" id="uploadArea">
                            <input type="file" id="imageInput" accept="image/*" hidden>
                            <div class="upload-icon">📝</div>
                            <div class="upload-text">
                                <div class="primary-text">点击或拖拽上传作文图片</div>
                                <div class="secondary-text">支持 jpg、png 格式</div>
                            </div>
                        </div>
                        
                        <div class="file-info" style="display: none;">
                            <div class="file-name"></div>
                            <button class="remove-file">删除</button>
                        </div>
                    </div>

                    <div class="prompt-section">
                        <div class="section-title">评价角度</div>
                        <div class="prompt-presets">
                            <label class="preset-label">
                                <input type="radio" name="prompt" value="comprehensive" checked>
                                <span class="preset-text">全面分析</span>
                                <span class="preset-desc">从内容、结构、语言、书写等多个维度进行评价</span>
                            </label>
                            <label class="preset-label">
                                <input type="radio" name="prompt" value="content">
                                <span class="preset-text">内容思想</span>
                                <span class="preset-desc">重点评价文章的思想性、创意性和材料运用</span>
                            </label>
                            <label class="preset-label">
                                <input type="radio" name="prompt" value="structure">
                                <span class="preset-text">结构布局</span>
                                <span class="preset-desc">分析文章的结构安排和段落组织</span>
                            </label>
                            <label class="preset-label">
                                <input type="radio" name="prompt" value="language">
                                <span class="preset-text">语言表达</span>
                                <span class="preset-desc">评价用词、句式和修辞手法的运用</span>
                            </label>
                        </div>
                    </div>

                    <div class="action-section">
                        <button class="evaluate-btn" disabled>
                            <span class="btn-text">开始评价</span>
                            <div class="loading-dots" style="display: none;">
                                <span></span><span></span><span></span>
                            </div>
                        </button>
                    </div>
                </div>

                <div class="ai-layout-preview">
                    <div class="ai-layout-preview-header">
                        <div class="ai-layout-preview-title">评价结果</div>
                    </div>
                    <div class="ai-layout-preview-content">
                        <div class="empty-preview" style="text-align: center; padding: 40px; color: #94a3b8;">
                            作文评价结果将在这里显示
                        </div>
                        <div class="markdown-preview" style="display: none;"></div>
                    </div>
                    <div class="ai-layout-preview-footer result-actions" style="display: none;">
                        <button class="copy-btn">复制评语</button>
                        <button class="download-btn">下载评语</button>
                    </div>
                </div>
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        // 绑定移动端tab切换事件
        const mobileTabs = document.querySelectorAll('.mobile-tab-item');
        const inputSection = document.querySelector('.ai-layout-input');
        const previewSection = document.querySelector('.ai-layout-preview');

        mobileTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                
                // 更新tab状态
                mobileTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // 更新内容显示
                if (targetTab === 'input') {
                    inputSection.classList.add('active');
                    previewSection.classList.remove('active');
                } else {
                    inputSection.classList.remove('active');
                    previewSection.classList.add('active');
                }
            });
        });

        // 返回按钮事件
        const backButton = document.querySelector('.back-button');
        backButton.addEventListener('click', () => {
            window.location.hash = '/';
        });

        // 文件上传相关事件
        this.bindFileUploadEvents();

        // 评价按钮事件
        const evaluateBtn = document.querySelector('.evaluate-btn');
        evaluateBtn.addEventListener('click', () => this.startEvaluation());

        // 复制按钮事件
        const copyBtn = document.querySelector('.copy-btn');
        copyBtn.addEventListener('click', () => {
            const content = document.querySelector('.markdown-preview').textContent;
            navigator.clipboard.writeText(content)
                .then(() => this.showToast('评语已复制到剪贴板'))
                .catch(() => this.showToast('复制失败，请手动复制'));
        });

        // 下载按钮事件
        const downloadBtn = document.querySelector('.download-btn');
        downloadBtn.addEventListener('click', () => {
            const content = document.querySelector('.markdown-preview').textContent;
            const blob = new Blob([content], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = '作文评价.md';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    bindFileUploadEvents() {
        const uploadArea = document.getElementById('uploadArea');
        const imageInput = document.getElementById('imageInput');
        const fileInfo = document.querySelector('.file-info');
        const fileName = document.querySelector('.file-name');
        const removeFileBtn = document.querySelector('.remove-file');

        // 上传区域点击事件
        uploadArea.addEventListener('click', () => {
            imageInput.click();
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
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (this.validateFile(file)) {
                this.handleFileSelect(file);
            }
        });

        // 删除文件
        removeFileBtn.addEventListener('click', () => {
            this.essayImage = null;
            imageInput.value = '';
            uploadArea.style.display = 'flex';
            fileInfo.style.display = 'none';
            this.updateEvaluateButton();
        });
    }

    validateFile(file) {
        if (!file) return false;
        
        const validTypes = ['image/jpeg', 'image/png'];
        
        if (!validTypes.includes(file.type)) {
            this.showToast('请上传 jpg 或 png 格式的图片');
            return false;
        }
        
        if (file.size > 10 * 1024 * 1024) { // 10MB
            this.showToast('图片大小不能超过 10MB');
            return false;
        }
        
        return true;
    }

    handleFileSelect(file) {
        this.essayImage = file;
        const uploadArea = document.getElementById('uploadArea');
        const fileInfo = document.querySelector('.file-info');
        const fileName = document.querySelector('.file-name');
        
        uploadArea.style.display = 'none';
        fileInfo.style.display = 'flex';
        fileName.textContent = file.name;
        
        this.updateEvaluateButton();
    }

    updateEvaluateButton() {
        const evaluateBtn = document.querySelector('.evaluate-btn');
        evaluateBtn.disabled = !this.essayImage;
    }

    async startEvaluation() {
        this.isEvaluating = true;
        const evaluateBtn = document.querySelector('.evaluate-btn');
        const btnText = evaluateBtn.querySelector('.btn-text');
        const loadingDots = evaluateBtn.querySelector('.loading-dots');
        const resultSection = document.querySelector('.markdown-preview');
        const emptyPreview = document.querySelector('.empty-preview');
        const resultActions = document.querySelector('.result-actions');
        
        btnText.style.display = 'none';
        loadingDots.style.display = 'flex';
        evaluateBtn.disabled = true;

        try {
            // 获取选中的评价角度
            const selectedPrompt = document.querySelector('input[name="prompt"]:checked').value;
            
            // TODO: 实际的评价逻辑
            const result = await this.mockEvaluation(selectedPrompt);
            
            // 显示结果
            resultSection.innerHTML = marked.parse(result);
            resultSection.style.display = 'block';
            emptyPreview.style.display = 'none';
            resultActions.style.display = 'flex';
            
            // 在移动端时滚动到结果区域
            if (window.innerWidth < 1024) {
                resultSection.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            this.showToast('评价失败，请重试');
            console.error('Evaluation error:', error);
        } finally {
            this.isEvaluating = false;
            btnText.style.display = 'block';
            loadingDots.style.display = 'none';
            evaluateBtn.disabled = false;
        }
    }

    // 模拟评价过程
    async mockEvaluation(promptType) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const evaluations = {
            comprehensive: `# 作文综合评价

## 总体评价
这是一篇结构完整、内容充实的作文，展现了作者独特的观察视角和思考深度。

## 内容思想
- 选材新颖，能从日常生活中发现深刻的哲理
- 论述充分，事例具体，说理透彻
- 体现了积极向上的价值观

## 结构布局
- 层次分明，条理清晰
- 过渡自然，承接流畅
- 首尾呼应，首段开门见山，结尾升华主题

## 语言表达
- 用词准确，句式灵活
- 善用修辞，增强表现力
- 语言富有感染力

## 书写规范
- 卷面整洁，字迹工整
- 标点符号使用规范
- 段落划分合理

## 建议改进
1. 个别句子可以更加简练
2. 议论部分可以补充更多论据
3. 结尾升华可以进一步拓展

总体来说，这是一篇优秀的作文，希望继续保持，在后续写作中更上一层楼。`,

            content: `# 作文内容思想评价

## 思想深度
- 观察细致，见微知著
- 思考深入，触及本质
- 论证有力，说服力强

## 材料运用
- 事例选取恰当
- 材料新颖独特
- 论据充分有力

## 创新性
- 视角独特
- 构思新颖
- 见解独到

## 建议改进
1. 可以增加对立面的论述
2. 适当补充社会性思考
3. 拓展思考的维度

整体而言，文章思想内容丰富，体现了较高的思维水平。`,

            structure: `# 作文结构评价

## 整体架构
- 结构完整，三部分布局合理
- 层次分明，逻辑性强
- 详略得当，重点突出

## 段落组织
- 段落划分合理
- 过渡自然流畅
- 首尾呼应

## 行文脉络
- 思路清晰
- 论证有序
- 递进明显

## 建议改进
1. 个别段落可以合并
2. 加强段落之间的关联
3. 可以尝试其他结构方式

总的来说，文章结构布局合理，有条理性。`,

            language: `# 作文语言评价

## 用词评价
- 词语准确，用词恰当
- 词汇丰富，表达生动
- 避免了常见病句

## 句式评价
- 句式灵活多样
- 长短句搭配合理
- 语气表达准确

## 修辞运用
- 比喻生动形象
- 排比气势磅礴
- 拟人富有情趣

## 建议改进
1. 注意避免词语重复
2. 可以增加一些优美词句
3. 适当运用更多修辞手法

整体来看，语言表达流畅自然，富有表现力。`
        };

        return evaluations[promptType] || evaluations.comprehensive;
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
    console.log('作文评价页面初始化');
    const hash = location.hash.slice(1);
    if (hash === '/essay-evaluation') {
        new EssayEvaluation().render();
    }
}

// 暴露到全局
window.essayEvaluation = {
    init
};

// 页面加载时初始化
window.addEventListener('load', init);

// 路由变化时初始化
window.addEventListener('hashchange', init); 