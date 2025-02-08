// 教学设计表单配置
const formConfig = {
    basicInfo: {
        title: '基本信息',
        fields: [
            { id: 'knowledge', label: '教学内容', type: 'text', placeholder: '请输入本节课的教学内容', required: true },
            { id: 'grade', label: '年级', type: 'select', options: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三', '高一', '高二', '高三'], required: true },
            { id: 'subject', label: '学科', type: 'text', value: '数学', disabled: true },
            { id: 'goal', label: '教学目标', type: 'textarea', placeholder: '请输入本节课的教学目标', required: true },
            { id: 'duration', label: '所需课时', type: 'number', placeholder: '请输入课时数量', value: '1', required: true }
        ]
    }
};

// 渲染教学设计页面
function renderTeachingDesign() {
    const container = document.getElementById('page-container');
    
    // 创建页面结构
    container.innerHTML = `
        <header class="design-header">
            <div class="back-button">←</div>
            <h1>数学教学设计</h1>
        </header>
        <div class="design-content">
            <form class="design-form" id="designForm">
                <div class="form-section">
                    ${formConfig.basicInfo.fields.map(field => `
                        <div class="form-field">
                            <label for="${field.id}">
                                ${field.required ? '<span class="required">*</span>' : ''}
                                ${field.label}
                            </label>
                            ${renderFormField(field)}
                        </div>
                    `).join('')}
                </div>
                <div class="form-actions">
                    <button type="button" class="generate-btn">一键生成</button>
                </div>
            </form>
            <div class="lesson-plan-preview" style="display: none">
                <div class="preview-header">
                    <h2>教案预览</h2>
                    <div class="preview-actions">
                        <button class="edit-btn">修改</button>
                        <button class="download-btn">下载</button>
                    </div>
                </div>
                <div class="preview-content markdown-body"></div>
            </div>
        </div>
    `;
    
    // 绑定事件
    bindTeachingDesignEvents();
}

// 渲染表单字段
function renderFormField(field) {
    switch (field.type) {
        case 'select':
            return `
                <select id="${field.id}" name="${field.id}" ${field.disabled ? 'disabled' : ''}>
                    <option value="">请选择${field.label}</option>
                    ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                </select>
            `;
        case 'textarea':
            return `
                <textarea id="${field.id}" name="${field.id}" 
                    placeholder="${field.placeholder}" rows="4"
                    ${field.disabled ? 'disabled' : ''}></textarea>
            `;
        default:
            return `
                <input type="${field.type}" id="${field.id}" name="${field.id}"
                    placeholder="${field.placeholder || ''}" 
                    value="${field.value || ''}"
                    ${field.disabled ? 'disabled' : ''}>
            `;
    }
}

// 绑定事件
function bindTeachingDesignEvents() {
    const backButton = document.querySelector('.back-button');
    const generateBtn = document.querySelector('.generate-btn');
    const form = document.getElementById('designForm');
    const previewSection = document.querySelector('.lesson-plan-preview');
    const editBtn = document.querySelector('.edit-btn');
    const downloadBtn = document.querySelector('.download-btn');
    
    // 返回按钮
    backButton.addEventListener('click', () => {
        window.location.hash = '/';
    });
    
    // 生成教案
    generateBtn.addEventListener('click', async () => {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // 显示加载状态
        generateBtn.disabled = true;
        generateBtn.textContent = '正在生成...';
        
        try {
            // TODO: 这里应该调用AI接口生成教案
            // 模拟API调用延迟
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // 获取示例教案内容
            const response = await fetch('./docs/教案示例/七年级数学相交线教案.md');
            if (!response.ok) {
                throw new Error('获取教案失败');
            }
            const markdown = await response.text();
            
            // 显示教案预览
            form.style.display = 'none';
            previewSection.style.display = 'block';
            
            // 渲染Markdown内容
            const previewContent = document.querySelector('.preview-content');
            previewContent.innerHTML = marked.parse(markdown);
            
            // 滚动到顶部
            window.scrollTo(0, 0);
            
        } catch (error) {
            console.error('生成教案失败:', error);
            showToast('生成教案失败，请重试');
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = '一键生成';
        }
    });
    
    // 修改按钮
    editBtn.addEventListener('click', () => {
        previewSection.style.display = 'none';
        form.style.display = 'block';
    });
    
    // 下载按钮
    downloadBtn.addEventListener('click', () => {
        const markdown = document.querySelector('.preview-content').textContent;
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '教案.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// 初始化
function init() {
    const hash = location.hash.slice(1);
    if (hash.startsWith('/teaching-design')) {
        renderTeachingDesign();
    }
}

// 暴露到全局
window.teachingDesign = {
    renderTeachingDesign,
    init
};

// 页面加载时初始化
window.addEventListener('load', init);

// 路由变化时初始化
window.addEventListener('hashchange', init); 