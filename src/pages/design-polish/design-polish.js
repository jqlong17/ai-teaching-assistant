class DesignPolish {
    constructor() {
        this.container = null;
        this.configSection = null;
        this.previewSection = null;
        this.teachingDesign = '';
        this.polishOptions = [];
        this.isPolishing = false;
    }

    async init() {
        // 设置页面容器
        this.container = document.createElement('div');
        this.container.className = 'ai-layout-container';
        
        // 添加页面头部
        const header = document.createElement('div');
        header.className = 'ai-layout-header';
        header.innerHTML = `
            <div class="back-button">←</div>
            <h1>教学设计润色</h1>
        `;
        this.container.appendChild(header);
        
        // 添加主要内容区域
        const content = document.createElement('div');
        content.className = 'ai-layout-content';
        
        // 添加移动端 tabs
        content.innerHTML = `
            <div class="mobile-tabs">
                <div class="mobile-tab-item active" data-tab="input">配置</div>
                <div class="mobile-tab-item" data-tab="preview">预览</div>
            </div>
            <div class="ai-layout-input active">
                ${this.getConfigTemplate()}
            </div>
            <div class="ai-layout-preview">
                <div class="preview-header">
                    <div class="preview-title">教学设计预览</div>
                </div>
                <div class="preview-content">
                    <div class="empty-preview" style="text-align: center; padding: 40px; color: #94a3b8;">
                        润色后的教学设计将在这里显示
                    </div>
                    <div class="markdown-preview" style="display: none;"></div>
                </div>
                <div class="preview-footer" style="display: none;">
                    <div class="action-buttons">
                        <button class="action-button secondary-button edit-btn">编辑</button>
                        <button class="action-button primary-button download-btn">下载</button>
                    </div>
                </div>
            </div>
        `;
        
        this.container.appendChild(content);
        
        // 初始化组件引用
        this.configSection = content.querySelector('.ai-layout-input');
        this.previewSection = content.querySelector('.ai-layout-preview');
        
        // 绑定事件
        this.bindEvents();
        
        // 初始化移动端标签切换
        if (window.innerWidth < 1024) {
            this.initMobileTabs();
        }
        
        return this.container;
    }

    getConfigTemplate() {
        return `
            <div class="design-polish-config">
                <div class="config-section">
                    <h3>输入教学设计</h3>
                    <div class="input-area">
                        <div class="file-upload">
                            <input type="file" id="design-file" accept=".txt,.doc,.docx">
                            <label for="design-file">
                                <i class="icon-upload"></i>
                                上传文件（支持Word、TXT格式）
                            </label>
                        </div>
                        <textarea id="design-text" placeholder="或直接输入教学设计内容..."></textarea>
                    </div>
                </div>

                <div class="config-section">
                    <h3>补充教学信息</h3>
                    <div class="form-group">
                        <label>学科信息</label>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
                            <input type="text" id="subject" placeholder="学科">
                            <input type="text" id="grade" placeholder="年级">
                            <input type="text" id="unit" placeholder="单元">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>课程信息</label>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
                            <input type="text" id="textbook" placeholder="教材版本">
                            <input type="text" id="lesson-time" placeholder="课时">
                            <select id="difficulty">
                                <option value="">选择难度</option>
                                <option value="easy">容易</option>
                                <option value="medium">中等</option>
                                <option value="hard">困难</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>教学目标</label>
                        <textarea id="knowledge-goals" placeholder="知识目标"></textarea>
                        <textarea id="ability-goals" placeholder="能力目标"></textarea>
                        <textarea id="quality-goals" placeholder="素养目标"></textarea>
                    </div>
                    <div class="form-group">
                        <label>学情分析</label>
                        <textarea id="class-features" placeholder="班级特点"></textarea>
                        <textarea id="student-base" placeholder="学生基础"></textarea>
                    </div>
                    <div class="form-group">
                        <label>教学重难点</label>
                        <textarea id="key-points" placeholder="重点内容"></textarea>
                        <textarea id="difficult-points" placeholder="难点内容"></textarea>
                    </div>
                </div>

                <div class="config-section">
                    <h3>AI润色要求</h3>
                    <div class="polish-options">
                        <div class="polish-option" data-option="teaching-process">教学环节优化</div>
                        <div class="polish-option" data-option="activities">教学活动丰富</div>
                        <div class="polish-option" data-option="cases">教学案例补充</div>
                        <div class="polish-option" data-option="blackboard">板书设计完善</div>
                        <div class="polish-option" data-option="reflection">教学反思建议</div>
                    </div>
                </div>

                <div class="action-buttons">
                    <button class="action-button primary-button" id="start-polish">开始润色</button>
                    <button class="action-button secondary-button" id="export-word">导出Word</button>
                </div>
            </div>
        `;
    }

    initMobileTabs() {
        const tabs = this.container.querySelectorAll('.mobile-tab-item');
        const inputSection = this.container.querySelector('.ai-layout-input');
        const previewSection = this.container.querySelector('.ai-layout-preview');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                
                // 更新tab状态
                tabs.forEach(t => t.classList.remove('active'));
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
    }

    bindEvents() {
        // 返回按钮
        const backButton = this.container.querySelector('.back-button');
        backButton.addEventListener('click', () => {
            window.location.hash = '/';
        });

        // 文件上传处理
        const fileInput = this.container.querySelector('#design-file');
        fileInput.addEventListener('change', this.handleFileUpload.bind(this));

        // 文本输入处理
        const textArea = this.container.querySelector('#design-text');
        textArea.addEventListener('input', this.handleTextInput.bind(this));

        // 润色选项处理
        const options = this.container.querySelectorAll('.polish-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                option.classList.toggle('active');
                this.updatePolishOptions();
            });
        });

        // 按钮事件
        const startPolishBtn = this.container.querySelector('#start-polish');
        startPolishBtn.addEventListener('click', this.startPolish.bind(this));
        
        const exportWordBtn = this.container.querySelector('#export-word');
        exportWordBtn.addEventListener('click', this.exportToWord.bind(this));
        
        const editBtn = this.container.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                document.querySelector('.mobile-tab-item[data-tab="input"]').click();
            }
        });
    }

    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            if (file.type === 'text/plain') {
                const text = await file.text();
                this.teachingDesign = text;
                this.container.querySelector('#design-text').value = text;
            } else if (file.type.includes('word')) {
                // TODO: 添加Word文件处理逻辑
                alert('Word文件处理功能开发中');
                return;
            }
            this.updatePreview();
        } catch (error) {
            console.error('文件读取错误:', error);
            showToast('文件读取失败，请重试');
        }

    }

    handleTextInput(event) {
        this.teachingDesign = event.target.value;
        this.updatePreview();
    }

    updatePolishOptions() {
        const activeOptions = this.container.querySelectorAll('.polish-option.active');
        this.polishOptions = Array.from(activeOptions).map(option => option.dataset.option);
    }

    async startPolish() {
        if (!this.teachingDesign) {
            showToast('请先输入或上传教学设计内容');
            return;
        }

        if (this.isPolishing) {
            return;
        }

        const startButton = this.container.querySelector('#start-polish');
        const formData = this.collectFormData();
        
        try {
            // 设置加载状态
            this.isPolishing = true;
            startButton.classList.add('loading');
            startButton.disabled = true;
            
            // 调用API进行润色
            const polishedContent = await this.callPolishAPI(formData);
            
            // 更新预览
            this.updatePreview(polishedContent);
            
            // 显示预览区域的操作按钮
            this.container.querySelector('.preview-footer').style.display = 'block';
            
            // 在移动端时切换到预览标签
            if (window.innerWidth < 1024) {
                document.querySelector('.mobile-tab-item[data-tab="preview"]').click();
            }
            
        } catch (error) {
            console.error('润色失败:', error);
            showToast('润色过程出现错误，请重试');
        } finally {
            // 恢复按钮状态
            this.isPolishing = false;
            startButton.classList.remove('loading');
            startButton.disabled = false;
        }
    }

    collectFormData() {
        return {
            content: this.teachingDesign,
            subject: this.container.querySelector('#subject').value,
            grade: this.container.querySelector('#grade').value,
            unit: this.container.querySelector('#unit').value,
            textbook: this.container.querySelector('#textbook').value,
            lessonTime: this.container.querySelector('#lesson-time').value,
            difficulty: this.container.querySelector('#difficulty').value,
            knowledgeGoals: this.container.querySelector('#knowledge-goals').value,
            abilityGoals: this.container.querySelector('#ability-goals').value,
            qualityGoals: this.container.querySelector('#quality-goals').value,
            classFeatures: this.container.querySelector('#class-features').value,
            studentBase: this.container.querySelector('#student-base').value,
            keyPoints: this.container.querySelector('#key-points').value,
            difficultPoints: this.container.querySelector('#difficult-points').value,
            polishOptions: this.polishOptions
        };
    }

    async callPolishAPI(formData) {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // TODO: 实现实际的API调用
        return `# 优化后的教学设计

## 教学目标

### 知识目标
${formData.knowledgeGoals || '- 待补充'}

### 能力目标
${formData.abilityGoals || '- 待补充'}

### 素养目标
${formData.qualityGoals || '- 待补充'}

## 教学重难点

### 重点内容
${formData.keyPoints || '- 待补充'}

### 难点内容
${formData.difficultPoints || '- 待补充'}

## 教学过程

${formData.content || '待补充教学过程'}

## 板书设计

[板书设计示意图]

## 教学反思

1. 教学亮点
   - 课堂结构清晰，层次分明
   - 教学活动设计丰富多样
   - 注重学生参与和互动

2. 改进建议
   - 可以进一步增加实践环节
   - 建议适当增加课堂小结时间
   - 可以补充更多生活实例`;
    }

    updatePreview(content = this.teachingDesign) {
        const emptyPreview = this.container.querySelector('.empty-preview');
        const markdownPreview = this.container.querySelector('.markdown-preview');
        
        if (!content) {
            emptyPreview.style.display = 'block';
            markdownPreview.style.display = 'none';
            return;
        }
        
        emptyPreview.style.display = 'none';
        markdownPreview.style.display = 'block';
        markdownPreview.innerHTML = marked.parse(content);
    }

    async exportToWord() {
        const content = this.container.querySelector('.markdown-preview').innerHTML;
        if (!content) {
            showToast('没有可导出的内容');
            return;
        }
        
        try {
            // TODO: 实现导出Word功能
            showToast('导出Word功能开发中');
        } catch (error) {
            console.error('导出失败:', error);
            showToast('导出失败，请重试');
        }
    }
}

(function() {
    // 创建全局对象
    window.designPolish = {
        render: function() {
            console.log('开始渲染教学设计润色页面');
            const container = document.getElementById('page-container');
            if (!container) {
                console.error('找不到页面容器元素');
                return;
            }
            
            // 清空容器
            container.innerHTML = '';
            
            // 初始化页面
            const page = new DesignPolish();
            page.init().then(content => {
                container.appendChild(content);
                console.log('教学设计润色页面初始化完成');
            }).catch(error => {
                console.error('初始化失败:', error);
                container.innerHTML = '<div class="error-message">页面加载失败，请刷新重试</div>';
            });
        }
    };

    // 路由处理
    window.addEventListener('DOMContentLoaded', () => {
        const hash = location.hash.slice(1);
        if (hash === '/design-polish') {
            window.designPolish.render();
        }
    });

    // 输出日志确认模块加载
    console.log('教学设计润色模块加载完成');
})(); 