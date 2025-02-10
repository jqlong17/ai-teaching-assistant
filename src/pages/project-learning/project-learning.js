(function() {
    // 项目式学习表单配置
    const formConfig = {
        basicInfo: {
            title: '基本信息',
            fields: [
                { 
                    id: 'grade', 
                    label: '适用年级', 
                    type: 'select', 
                    options: ['七年级', '八年级', '九年级'], 
                    required: true 
                },
                { 
                    id: 'subject', 
                    label: '学科', 
                    type: 'text', 
                    value: '数学', 
                    disabled: true 
                },
                { 
                    id: 'duration', 
                    label: '项目周期', 
                    type: 'select',
                    options: ['2周', '4周', '6周', '8周'],
                    required: true 
                },
                { 
                    id: 'theme', 
                    label: '项目主题', 
                    type: 'text', 
                    placeholder: '请输入项目主题名称',
                    required: true 
                }
            ]
        },
        projectDesign: {
            title: '项目设计',
            fields: [
                { 
                    id: 'projectBackground', 
                    label: '项目背景', 
                    type: 'textarea', 
                    placeholder: '请描述项目的现实背景和意义', 
                    required: true 
                },
                { 
                    id: 'learningGoals', 
                    label: '学习目标', 
                    type: 'textarea', 
                    placeholder: '请描述知识目标、能力目标、素养目标', 
                    required: true 
                },
                { 
                    id: 'drivingQuestion', 
                    label: '驱动性问题', 
                    type: 'textarea', 
                    placeholder: '设计能引导学生深入探究的核心问题', 
                    required: true 
                }
            ]
        },
        implementation: {
            title: '实施计划',
            fields: [
                { 
                    id: 'preparation', 
                    label: '准备阶段', 
                    type: 'textarea', 
                    placeholder: '描述项目开展前的准备工作', 
                    required: true 
                },
                { 
                    id: 'process', 
                    label: '实施过程', 
                    type: 'textarea', 
                    placeholder: '详细说明项目各阶段的活动安排', 
                    required: true 
                },
                { 
                    id: 'presentation', 
                    label: '成果展示', 
                    type: 'textarea', 
                    placeholder: '说明项目成果的展示方式', 
                    required: true 
                }
            ]
        },
        evaluation: {
            title: '评价设计',
            fields: [
                { 
                    id: 'evaluationMethod', 
                    label: '评价方式', 
                    type: 'textarea', 
                    placeholder: '描述过程性评价和终结性评价的方式', 
                    required: true 
                },
                { 
                    id: 'evaluationCriteria', 
                    label: '评价标准', 
                    type: 'textarea', 
                    placeholder: '列出具体的评价指标和标准', 
                    required: true 
                }
            ]
        },
        resources: {
            title: '资源支持',
            fields: [
                { 
                    id: 'teachingResources', 
                    label: '教学资源', 
                    type: 'textarea', 
                    placeholder: '列出需要的教学资源和工具', 
                    required: true 
                },
                { 
                    id: 'technicalSupport', 
                    label: '技术支持', 
                    type: 'textarea', 
                    placeholder: '说明需要的技术支持', 
                    required: true 
                }
            ]
        }
    };

    // 渲染表单字段
    function renderFormField(field) {
        switch (field.type) {
            case 'select':
                return `
                    <select id="${field.id}" name="${field.id}" ${field.disabled ? 'disabled' : ''} ${field.required ? 'required' : ''}>
                        <option value="">请选择${field.label}</option>
                        ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                `;
            case 'textarea':
                return `
                    <textarea id="${field.id}" name="${field.id}" 
                        placeholder="${field.placeholder || ''}" 
                        ${field.disabled ? 'disabled' : ''}
                        ${field.required ? 'required' : ''}></textarea>
                `;
            default:
                return `
                    <input type="${field.type}" id="${field.id}" name="${field.id}"
                        placeholder="${field.placeholder || ''}" 
                        value="${field.value || ''}"
                        ${field.disabled ? 'disabled' : ''}
                        ${field.required ? 'required' : ''}>
                `;
        }
    }

    // 渲染项目式学习页面
    function renderProjectLearning() {
        console.log('开始渲染项目式学习页面');
        const container = document.getElementById('page-container');
        container.className = 'project-container';
        
        // 创建页面结构
        container.innerHTML = `
            <header class="project-header">
                <div class="back-button">←</div>
                <h1>数学项目式学习设计</h1>
            </header>
            <div class="project-content">
                <div class="form-container">
                    <form class="project-form" id="projectForm">
                        ${Object.entries(formConfig).map(([sectionKey, section]) => `
                            <div class="form-section" data-section="${sectionKey}">
                                <div class="form-section-title">${section.title}</div>
                                ${section.fields.map(field => `
                                    <div class="form-field">
                                        <label for="${field.id}">
                                            ${field.required ? '<span class="required">*</span>' : ''}
                                            ${field.label}
                                        </label>
                                        ${renderFormField(field)}
                                    </div>
                                `).join('')}
                            </div>
                        `).join('')}
                        <div class="form-actions">
                            <button type="button" class="generate-btn">生成项目式学习方案</button>
                        </div>
                    </form>
                </div>
                <div class="preview-container">
                    <div class="preview-header">
                        <div class="preview-title">方案预览</div>
                        <div class="preview-actions">
                            <button class="edit-btn">编辑</button>
                            <button class="download-btn">下载</button>
                        </div>
                    </div>
                    <div class="preview-content markdown-body"></div>
                </div>
            </div>
        `;
        
        // 绑定事件
        bindProjectEvents();
    }

    // 绑定事件
    function bindProjectEvents() {
        const backButton = document.querySelector('.back-button');
        const generateBtn = document.querySelector('.generate-btn');
        const form = document.getElementById('projectForm');
        const previewContainer = document.querySelector('.preview-container');
        const editBtn = document.querySelector('.edit-btn');
        const downloadBtn = document.querySelector('.download-btn');
        
        // 返回按钮
        backButton.addEventListener('click', () => {
            window.location.hash = '/';
        });
        
        // 生成方案
        generateBtn.addEventListener('click', async () => {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // 显示加载状态
            generateBtn.disabled = true;
            generateBtn.textContent = '正在生成...';
            
            try {
                // TODO: 这里应该调用AI接口生成方案
                // 模拟API调用延迟
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // 模拟生成的方案内容
                const markdown = `
# ${data.theme || '项目式学习方案'}

## 基本信息
- 适用年级：${data.grade}
- 学科：${data.subject}
- 项目周期：${data.duration}

## 项目背景
${data.projectBackground}

## 学习目标
${data.learningGoals}

## 驱动性问题
${data.drivingQuestion}

## 实施计划
### 准备阶段
${data.preparation}

### 实施过程
${data.process}

### 成果展示
${data.presentation}

## 评价设计
### 评价方式
${data.evaluationMethod}

### 评价标准
${data.evaluationCriteria}

## 资源支持
### 教学资源
${data.teachingResources}

### 技术支持
${data.technicalSupport}
                `;
                
                // 显示预览
                const isWebView = window.innerWidth >= 1024;
                if (!isWebView) {
                    form.style.display = 'none';
                }
                previewContainer.style.display = 'block';
                
                // 渲染Markdown内容
                const previewContent = document.querySelector('.preview-content');
                previewContent.innerHTML = marked.parse(markdown);
                
                // 滚动到顶部
                if (!isWebView) {
                    window.scrollTo(0, 0);
                }
                
            } catch (error) {
                console.error('生成方案失败:', error);
                showToast('生成方案失败，请重试');
            } finally {
                generateBtn.disabled = false;
                generateBtn.textContent = '生成项目式学习方案';
            }
        });
        
        // 编辑按钮
        editBtn.addEventListener('click', () => {
            const isWebView = window.innerWidth >= 1024;
            if (!isWebView) {
                previewContainer.style.display = 'none';
                form.style.display = 'block';
            }
        });
        
        // 下载按钮
        downloadBtn.addEventListener('click', () => {
            const markdown = document.querySelector('.preview-content').innerHTML;
            const blob = new Blob([markdown], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = '项目式学习方案.md';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
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
        console.log('项目式学习页面初始化');
        const hash = location.hash.slice(1);
        if (hash.startsWith('/project-learning-design')) {
            renderProjectLearning();
        }
    }

    // 立即暴露到全局
    window.projectLearning = {
        renderProjectLearning,
        init
    };

    // 页面加载时初始化
    window.addEventListener('load', () => {
        console.log('项目式学习页面加载');
        init();
    });

    // 路由变化时初始化
    window.addEventListener('hashchange', () => {
        console.log('项目式学习页面路由变化');
        init();
    });
})(); 