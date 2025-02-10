(function() {
    // 跨学科教学设计表单配置
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
                    label: '主学科', 
                    type: 'text', 
                    value: '数学', 
                    disabled: true 
                },
                { 
                    id: 'relatedSubjects', 
                    label: '关联学科', 
                    type: 'text', 
                    placeholder: '请输入关联的学科，用逗号分隔',
                    required: true 
                },
                { 
                    id: 'theme', 
                    label: '教学主题', 
                    type: 'text', 
                    placeholder: '请输入跨学科教学主题',
                    required: true 
                },
                { 
                    id: 'duration', 
                    label: '课时安排', 
                    type: 'number', 
                    placeholder: '请输入课时数量',
                    required: true 
                }
            ]
        },
        contentDesign: {
            title: '内容设计',
            fields: [
                { 
                    id: 'mathConcepts', 
                    label: '数学概念', 
                    type: 'textarea', 
                    placeholder: '请描述涉及的数学概念和知识点', 
                    required: true 
                },
                { 
                    id: 'subjectConnections', 
                    label: '学科关联', 
                    type: 'textarea', 
                    placeholder: '说明与其他学科的知识关联', 
                    required: true 
                },
                { 
                    id: 'realLifeContext', 
                    label: '实际情境', 
                    type: 'textarea', 
                    placeholder: '描述相关的实际生活情境或应用场景', 
                    required: true 
                }
            ]
        },
        teachingDesign: {
            title: '教学设计',
            fields: [
                { 
                    id: 'objectives', 
                    label: '教学目标', 
                    type: 'textarea', 
                    placeholder: '描述跨学科教学目标', 
                    required: true 
                },
                { 
                    id: 'activities', 
                    label: '教学活动', 
                    type: 'textarea', 
                    placeholder: '设计跨学科教学活动和流程', 
                    required: true 
                },
                { 
                    id: 'resources', 
                    label: '教学资源', 
                    type: 'textarea', 
                    placeholder: '列出需要的教学资源和工具', 
                    required: true 
                }
            ]
        },
        evaluation: {
            title: '评价设计',
            fields: [
                { 
                    id: 'evaluationMethods', 
                    label: '评价方式', 
                    type: 'textarea', 
                    placeholder: '描述跨学科学习评价方式', 
                    required: true 
                },
                { 
                    id: 'evaluationCriteria', 
                    label: '评价标准', 
                    type: 'textarea', 
                    placeholder: '制定跨学科学习评价标准', 
                    required: true 
                }
            ]
        },
        reflection: {
            title: '教学反思',
            fields: [
                { 
                    id: 'challenges', 
                    label: '可能的挑战', 
                    type: 'textarea', 
                    placeholder: '预判可能遇到的教学困难和挑战', 
                    required: true 
                },
                { 
                    id: 'suggestions', 
                    label: '改进建议', 
                    type: 'textarea', 
                    placeholder: '提出教学改进和优化建议', 
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

    // 渲染跨学科教学设计页面
    function renderInterdisciplinary() {
        console.log('开始渲染跨学科教学设计页面');
        const container = document.getElementById('page-container');
        container.className = 'interdisciplinary-container';
        
        // 创建页面结构
        container.innerHTML = `
            <header class="interdisciplinary-header">
                <div class="back-button">←</div>
                <h1>数学跨学科教学设计</h1>
            </header>
            <div class="interdisciplinary-content">
                <div class="form-container">
                    <form class="interdisciplinary-form" id="interdisciplinaryForm">
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
                            <button type="button" class="generate-btn">生成跨学科教学设计方案</button>
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
        bindEvents();
    }

    // 绑定事件
    function bindEvents() {
        const backButton = document.querySelector('.back-button');
        const generateBtn = document.querySelector('.generate-btn');
        const form = document.getElementById('interdisciplinaryForm');
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
# ${data.theme || '跨学科教学设计方案'}

## 基本信息
- 适用年级：${data.grade}
- 主学科：${data.subject}
- 关联学科：${data.relatedSubjects}
- 课时安排：${data.duration}课时

## 内容设计
### 数学概念
${data.mathConcepts}

### 学科关联
${data.subjectConnections}

### 实际情境
${data.realLifeContext}

## 教学设计
### 教学目标
${data.objectives}

### 教学活动
${data.activities}

### 教学资源
${data.resources}

## 评价设计
### 评价方式
${data.evaluationMethods}

### 评价标准
${data.evaluationCriteria}

## 教学反思
### 可能的挑战
${data.challenges}

### 改进建议
${data.suggestions}
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
                generateBtn.textContent = '生成跨学科教学设计方案';
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
            a.download = '跨学科教学设计方案.md';
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
        console.log('跨学科教学设计页面初始化');
        const hash = location.hash.slice(1);
        if (hash === '/interdisciplinary-design') {
            renderInterdisciplinary();
        }
    }

    // 立即暴露到全局
    window.interdisciplinary = {
        renderInterdisciplinary,
        init
    };

    // 页面加载时初始化
    window.addEventListener('load', () => {
        console.log('跨学科教学设计页面加载');
        init();
    });

    // 路由变化时初始化
    window.addEventListener('hashchange', () => {
        console.log('跨学科教学设计页面路由变化');
        init();
    });
})(); 