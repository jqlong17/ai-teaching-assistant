class PptToDesign {
    constructor() {
        this.pptFile = null;
        this.prompt = '';
        this.isConverting = false;
    }

    render() {
        const container = document.getElementById('page-container');
        container.className = 'ai-layout-container';
        
        container.innerHTML = `
            <div class="ai-layout-header">
                <div class="back-button">←</div>
                <h1>PPT 转教案</h1>
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
                            <input type="file" id="pptInput" accept=".ppt,.pptx" hidden>
                            <div class="upload-icon">📑</div>
                            <div class="upload-text">
                                <div class="primary-text">点击或拖拽上传 PPT</div>
                                <div class="secondary-text">支持 .ppt, .pptx 格式</div>
                            </div>
                        </div>
                        
                        <div class="file-info" style="display: none;">
                            <div class="file-name"></div>
                            <button class="remove-file">删除</button>
                        </div>
                    </div>

                    <div class="prompt-section">
                        <div class="section-title">补充说明</div>
                        <textarea 
                            class="prompt-input" 
                            placeholder="请输入补充说明，例如：&#10;1. 这是一节七年级数学的课&#10;2. 重点讲解相交线的性质&#10;3. 希望以启发式教学为主"
                            rows="5"
                        ></textarea>
                    </div>

                    <div class="action-section">
                        <button class="convert-btn" disabled>
                            <span class="btn-text">开始转换</span>
                            <div class="loading-dots" style="display: none;">
                                <span></span><span></span><span></span>
                            </div>
                        </button>
                    </div>
                </div>

                <div class="ai-layout-preview">
                    <div class="ai-layout-preview-header">
                        <div class="ai-layout-preview-title">教案预览</div>
                    </div>
                    <div class="ai-layout-preview-content">
                        <div class="result-section" style="display: none;">
                            <div class="markdown-preview"></div>
                        </div>
                        <div class="empty-preview" style="text-align: center; padding: 40px; color: #94a3b8;">
                            转换后的教案将在这里显示
                        </div>
                    </div>
                    <div class="ai-layout-preview-footer result-actions" style="display: none;">
                        <button class="copy-btn">复制内容</button>
                        <button class="download-btn">下载文档</button>
                    </div>
                </div>
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        const uploadArea = document.getElementById('uploadArea');
        const pptInput = document.getElementById('pptInput');
        const fileInfo = document.querySelector('.file-info');
        const fileName = document.querySelector('.file-name');
        const removeFileBtn = document.querySelector('.remove-file');
        const promptInput = document.querySelector('.prompt-input');
        const convertBtn = document.querySelector('.convert-btn');
        const backButton = document.querySelector('.back-button');
        const copyBtn = document.querySelector('.copy-btn');
        const downloadBtn = document.querySelector('.download-btn');

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

        // 上传区域点击事件
        uploadArea.addEventListener('click', () => {
            pptInput.click();
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
        pptInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (this.validateFile(file)) {
                this.handleFileSelect(file);
            }
        });

        // 删除文件
        removeFileBtn.addEventListener('click', () => {
            this.pptFile = null;
            pptInput.value = '';
            uploadArea.style.display = 'flex';
            fileInfo.style.display = 'none';
            this.updateConvertButton();
        });

        // 补充说明输入
        promptInput.addEventListener('input', () => {
            this.prompt = promptInput.value.trim();
            this.updateConvertButton();
        });

        // 转换按钮
        convertBtn.addEventListener('click', () => {
            if (!this.isConverting) {
                this.startConversion();
            }
        });

        // 返回按钮
        backButton.addEventListener('click', () => {
            window.location.hash = '#/';
        });

        // 复制内容
        copyBtn.addEventListener('click', () => {
            const content = document.querySelector('.markdown-preview').textContent;
            navigator.clipboard.writeText(content)
                .then(() => this.showToast('内容已复制到剪贴板'))
                .catch(() => this.showToast('复制失败，请手动复制'));
        });

        // 下载文档
        downloadBtn.addEventListener('click', () => {
            const content = document.querySelector('.markdown-preview').textContent;
            const blob = new Blob([content], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = '教学设计.md';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    validateFile(file) {
        if (!file) return false;
        
        const validTypes = [
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ];
        
        if (!validTypes.includes(file.type)) {
            this.showToast('请上传 PPT 格式的文件');
            return false;
        }
        
        if (file.size > 10 * 1024 * 1024) { // 10MB
            this.showToast('文件大小不能超过 10MB');
            return false;
        }
        
        return true;
    }

    handleFileSelect(file) {
        this.pptFile = file;
        const uploadArea = document.getElementById('uploadArea');
        const fileInfo = document.querySelector('.file-info');
        const fileName = document.querySelector('.file-name');
        
        uploadArea.style.display = 'none';
        fileInfo.style.display = 'flex';
        fileName.textContent = file.name;
        
        this.updateConvertButton();
    }

    updateConvertButton() {
        const convertBtn = document.querySelector('.convert-btn');
        convertBtn.disabled = !this.pptFile || !this.prompt;
    }

    async startConversion() {
        this.isConverting = true;
        const convertBtn = document.querySelector('.convert-btn');
        const btnText = convertBtn.querySelector('.btn-text');
        const loadingDots = convertBtn.querySelector('.loading-dots');
        const resultSection = document.querySelector('.result-section');
        const emptyPreview = document.querySelector('.empty-preview');
        const resultActions = document.querySelector('.result-actions');
        
        btnText.style.display = 'none';
        loadingDots.style.display = 'flex';
        convertBtn.disabled = true;

        try {
            // TODO: 实际的转换逻辑
            const result = await this.mockConversion();
            
            // 显示结果
            const markdownPreview = document.querySelector('.markdown-preview');
            markdownPreview.innerHTML = marked.parse(result);
            resultSection.style.display = 'block';
            emptyPreview.style.display = 'none';
            resultActions.style.display = 'flex';
            
            // 在移动端时滚动到结果区域
            if (window.innerWidth < 1024) {
                resultSection.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            this.showToast('转换失败，请重试');
            console.error('Conversion error:', error);
        } finally {
            this.isConverting = false;
            btnText.style.display = 'block';
            loadingDots.style.display = 'none';
            convertBtn.disabled = false;
        }
    }

    // 模拟转换过程
    async mockConversion() {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return `# 七年级数学教案：相交线的性质

## 教学目标
1. 理解相交线的概念和基本性质
2. 掌握相交线所形成的对顶角相等的性质
3. 能够运用相交线的性质解决简单的几何问题

## 教学重点
- 相交线的定义
- 对顶角相等的性质

## 教学难点
- 理解对顶角相等的原理
- 运用性质解决实际问题

## 教学过程

### 一、导入新课
1. 复习直线的基本概念
2. 展示生活中相交线的实例
   - 马路的交叉
   - 窗户的框架
   - 井字格

### 二、新课讲解

#### 1. 相交线的概念
- 两条直线相交于一点
- 相交点的特征
- 板书图示演示

#### 2. 对顶角性质
- 概念引入
- 性质发现
- 证明过程
- 例题讲解

### 三、巩固练习
1. 基础题目演练
2. 应用题解答
3. 小组讨论

### 四、课堂小结
1. 知识点回顾
2. 重点内容强调
3. 布置作业

## 板书设计
[板书内容详细设计]

## 课后反思
- 教学效果分析
- 改进建议
- 学生反馈`;
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

// 导出模块
window.PptToDesign = PptToDesign; 