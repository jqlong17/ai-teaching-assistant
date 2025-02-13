// 教学设计表单配置
const formConfig = {
    basicInfo: {
        title: '基本信息',
        fields: [
            { 
                id: 'eduSystem', 
                label: '义教学制', 
                type: 'radio', 
                options: ['六·三学制', '五·四学制'],
                value: '六·三学制',
                required: true 
            },
            { 
                id: 'grade', 
                label: '所教年级', 
                type: 'select',
                options: ['七年级'],
                value: '七年级',
                required: true 
            },
            { 
                id: 'semester', 
                label: '学期', 
                type: 'radio', 
                options: ['上学期', '下学期'],
                value: '下学期',
                required: true 
            },
            { 
                id: 'subject', 
                label: '所教学科', 
                type: 'text', 
                value: '数学', 
                disabled: true,
                required: true 
            },
            { 
                id: 'textbook', 
                label: '教材版本', 
                type: 'radio', 
                options: ['人教版', '其他'],
                value: '人教版',  // 设置默认值
                required: true 
            },
            { 
                id: 'unit', 
                label: '教材内容', 
                type: 'unit-select',
                value: {  // 设置默认值
                    unit: '第五章 相交线与平行线',
                    section: '5.1 相交线'
                }, 
                required: true 
            }
        ]
    },
    courseObjectives: {
        title: '课程目标',
        fields: [
            {
                id: 'objectives',
                label: '课标目标',
                type: 'multi-select',
                placeholder: '请从下拉框中选择新课标中的相关学习目标',
                required: true,
                categories: [
                    {
                        name: '核心素养',
                        options: [
                            '会用数学的眼光观察现实世界',
                            '会用数学的思维思考现实世界',
                            '会用数学的语言表达现实世界',
                            '抽象能力',
                            '运算能力',
                            '几何直观',
                            '空间观念'
                        ]
                    },
                    {
                        name: '学段目标',
                        options: [
                            '理解基本概念',
                            '掌握基本方法',
                            '培养逻辑思维',
                            '发展空间想象'
                        ]
                    },
                    {
                        name: '课程内容',
                        options: [
                            '数与代数',
                            '图形与几何',
                            '统计与概率',
                            '综合与实践'
                        ]
                    },
                    {
                        name: '学业质量',
                        options: [
                            '知识理解',
                            '技能掌握',
                            '问题解决',
                            '创新意识'
                        ]
                    }
                ]
            },
            {
                id: 'additionalInfo',
                label: '补充信息',
                type: 'textarea',
                placeholder: '（选填）如：学生学情、设计要求、相关资源信息等',
                required: false
            }
        ]
    },
    unitConcept: {
        title: '教学内容分析',
        fields: [
            { 
                id: 'unitConcept', 
                label: '', 
                type: 'textarea', 
                placeholder: '请从以下几个方面进行分析：\n1. 内容的本质\n2. 内容蕴含的数学思想和方法\n3. 知识的上下位关系\n4. 内容的育人价值', 
                required: true,
                aiAssist: true,
                description: '通过分析教学内容的本质特征、数学思想方法、知识体系关联以及育人价值，深入理解教学内容的重要性和教学价值。'
            }
        ]
    },
    coreQuestions: {
        title: '核心问题',
        fields: [
            { 
                id: 'coreQuestions', 
                label: '', 
                type: 'textarea', 
                placeholder: '请输入核心问题', 
                required: true,
                aiAssist: true
            }
        ]
    },
    lessonDesign: {
        title: '课时设计',
        fields: [
            { 
                id: 'lessonDesign', 
                label: '', 
                type: 'lesson-design',
                required: true,
                aiAssist: true
            }
        ]
    },
    unitTest: {
        title: '单元检测作业',
        fields: [
            { 
                id: 'unitTest', 
                label: '', 
                type: 'textarea', 
                placeholder: '请输入单元检测作业', 
                required: true,
                aiAssist: true
            }
        ]
    }
};

// 渲染教学设计页面
function renderTeachingDesign() {
    const container = document.getElementById('page-container');
    container.className = 'ai-layout-container';
    
    // 创建页面结构
    container.innerHTML = `
        <div class="ai-layout-header">
            <div class="back-button">←</div>
            <h1>数学单元教学设计</h1>
        </div>
        <div class="ai-layout-content">
            <div class="ai-layout-input">
                <form class="design-form" id="designForm">
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
                        <button type="button" class="generate-btn">生成教学设计方案</button>
                    </div>
                </form>
            </div>
            <div class="ai-layout-preview">
                <div class="ai-layout-preview-header">
                    <div class="ai-layout-preview-title">教学设计预览</div>
                </div>
                <div class="ai-layout-preview-content">
                    <div class="empty-preview" style="text-align: center; padding: 40px; color: #94a3b8;">
                        生成的教学设计方案将在这里显示
                    </div>
                    <div class="markdown-preview" style="display: none;"></div>
                </div>
                <div class="ai-layout-preview-footer result-actions" style="display: none;">
                    <button class="edit-btn">编辑</button>
                    <button class="download-btn">下载</button>
                </div>
            </div>
        </div>
    `;
    
    // 绑定事件
    bindTeachingDesignEvents();
    
    // 初始化概念图谱
    initConceptMap();
    
    // 初始化单元选择
    initUnitSelect();

    // 初始化移动端tabs
    new MobileTabs();
}

// 渲染表单字段
function renderFormField(field) {
    switch (field.type) {
        case 'radio':
            return `
                <div class="radio-group">
                    ${field.options.map(opt => `
                        <label class="radio-label">
                            <input type="radio" name="${field.id}" value="${opt}" 
                                ${field.value === opt ? 'checked' : ''} 
                                ${field.required ? 'required' : ''}>
                            <span>${opt}</span>
                        </label>
                    `).join('')}
                </div>
            `;
        case 'multi-select':
            return `
                <div class="multi-select-container">
                    <div class="category-tabs">
                        ${field.categories.map((category, index) => `
                            <div class="category-tab ${index === 0 ? 'active' : ''}" 
                                 data-category="${category.name}">
                                ${category.name}
                            </div>
                        `).join('')}
                    </div>
                    <div class="options-container">
                        ${field.categories.map((category, index) => `
                            <div class="options-list ${index === 0 ? 'active' : ''}" 
                                 data-category="${category.name}">
                                ${category.options.map(option => `
                                    <label class="option-item">
                                        <input type="checkbox" 
                                               name="${field.id}" 
                                               value="${option}"
                                               data-category="${category.name}">
                                        <span>${option}</span>
                                    </label>
                                `).join('')}
                            </div>
                        `).join('')}
                    </div>
                    <div class="selected-options">
                        <div class="selected-options-header">已选择的目标：</div>
                        <div class="selected-options-list"></div>
                    </div>
                </div>
            `;
        case 'select':
            return `
                <select id="${field.id}" name="${field.id}" ${field.disabled ? 'disabled' : ''} ${field.required ? 'required' : ''}>
                    <option value="">请选择${field.label}</option>
                    ${field.options ? field.options.map(opt => `
                        <option value="${opt}" ${field.value === opt ? 'selected' : ''}>${opt}</option>
                    `).join('') : ''}
                </select>
            `;
        case 'unit-select':
            const defaultUnits = {
                '七年级': {
                    '下学期': [
                        { id: 4, name: '第四章 几何图形初步' },
                        { id: 5, name: '第五章 相交线与平行线' },
                        { id: 6, name: '第六章 实数' }
                    ]
                }
            };
            
            const defaultSections = {
                '第五章 相交线与平行线': [
                    { id: 1, name: '5.1 相交线' },
                    { id: 2, name: '5.2 平行线的性质' },
                    { id: 3, name: '5.3 平行线的判定' },
                    { id: 4, name: '5.4 平行线的应用' }
                ]
            };

            const defaultUnit = '第五章 相交线与平行线';
            const defaultSection = '5.1 相交线';
            
            const units = defaultUnits['七年级']['下学期'];
            const sections = defaultSections[defaultUnit];

            return `
                <div class="unit-select-groups-container">
                    <div class="unit-select-group-wrapper">
                        <div class="unit-select-group">
                            <select name="${field.id}_unit[]" class="unit-select" ${field.required ? 'required' : ''}>
                                ${units.map(unit => `
                                    <option value="${unit.name}" ${unit.name === defaultUnit ? 'selected' : ''}>
                                        ${unit.name}
                                    </option>
                                `).join('')}
                            </select>
                            <select name="${field.id}_section[]" class="section-select" ${field.required ? 'required' : ''}>
                                ${sections.map(section => `
                                    <option value="${section.name}" ${section.name === defaultSection ? 'selected' : ''}>
                                        ${section.name}
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="unit-select-group-actions">
                            <button type="button" class="unit-select-add-btn" title="添加教材内容">+</button>
                            <button type="button" class="unit-select-remove-btn" title="删除教材内容">-</button>
                        </div>
                    </div>
                </div>
            `;
        case 'textarea':
            return `
                <div class="textarea-wrapper" style="position: relative;">
                    <textarea id="${field.id}" name="${field.id}" 
                        placeholder="${field.placeholder || ''}" 
                        ${field.disabled ? 'disabled' : ''}
                        ${field.required ? 'required' : ''}></textarea>
                    ${field.aiAssist ? `
                        <button type="button" class="ai-assist-btn" title="AI辅助分析" onclick="teachingDesign.generate${field.id.charAt(0).toUpperCase() + field.id.slice(1)}()">
                            <span>AI补充</span>
                        </button>
                    ` : ''}
                    ${field.description ? `<div class="field-description">${field.description}</div>` : ''}
                </div>
            `;
        case 'custom':
            if (field.component === 'concept-map') {
                return `
                    <div id="${field.id}" class="concept-map"></div>
                    ${field.description ? `<div class="field-description">${field.description}</div>` : ''}
                `;
            }
            return '';
        case 'lesson-design':
            return `
                <div id="lesson-design-container">
                </div>
            `;
        default:
            return `
                <input type="${field.type}" id="${field.id}" name="${field.id}"
                    placeholder="${field.placeholder || ''}" 
                    value="${field.value || ''}"
                    ${field.disabled ? 'disabled' : ''}
                    ${field.required ? 'required' : ''}>
                ${field.description ? `<div class="field-description">${field.description}</div>` : ''}
            `;
    }
}

// 初始化概念图谱
function initConceptMap() {
    // TODO: 实现概念图谱的可视化
    const conceptMap = document.querySelector('.concept-map');
    if (conceptMap) {
        conceptMap.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">概念图谱可视化区域</div>';
    }
}

// 绑定事件
function bindTeachingDesignEvents() {
    const backButton = document.querySelector('.back-button');
    const generateBtn = document.querySelector('.generate-btn');
    const form = document.getElementById('designForm');
    const editBtn = document.querySelector('.edit-btn');
    const downloadBtn = document.querySelector('.download-btn');
    const markdownPreview = document.querySelector('.markdown-preview');
    const emptyPreview = document.querySelector('.empty-preview');
    const resultActions = document.querySelector('.result-actions');
    
    // 返回按钮
    backButton.addEventListener('click', () => {
        window.location.hash = '/';
    });
    
    // 生成教学设计方案
    generateBtn.addEventListener('click', async () => {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // 显示加载状态
        generateBtn.disabled = true;
        generateBtn.textContent = '正在生成...';
        
        try {
            // TODO: 这里应该调用AI接口生成教学设计方案
            // 模拟API调用延迟
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // 获取示例教学设计方案内容
            const response = await fetch('docs/教案示例/七年级数学相交线教案.md');
            if (!response.ok) {
                throw new Error('获取教学设计方案失败');
            }
            const markdown = await response.text();
            
            // 显示教学设计方案预览
            markdownPreview.innerHTML = marked.parse(markdown);
            markdownPreview.style.display = 'block';
            emptyPreview.style.display = 'none';
            resultActions.style.display = 'flex';
            
            // 在移动端时滚动到结果区域
            if (window.innerWidth < 1024) {
                markdownPreview.scrollIntoView({ behavior: 'smooth' });
            }
            
        } catch (error) {
            console.error('生成教学设计方案失败:', error);
            showToast('生成教学设计方案失败，请重试');
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = '生成教学设计方案';
        }
    });
    
    // 修改按钮
    editBtn.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
            markdownPreview.style.display = 'none';
            emptyPreview.style.display = 'block';
            resultActions.style.display = 'none';
        }
    });
    
    // 下载按钮
    downloadBtn.addEventListener('click', () => {
        const markdown = markdownPreview.textContent;
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '教学设计方案.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // 绑定多级选择事件
    const multiSelectContainers = document.querySelectorAll('.multi-select-container');
    multiSelectContainers.forEach(container => {
        const tabs = container.querySelectorAll('.category-tab');
        const optionsLists = container.querySelectorAll('.options-list');
        const selectedList = container.querySelector('.selected-options-list');
        
        // 切换分类标签
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.category;
                
                // 更新标签激活状态
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // 更新选项列表显示
                optionsLists.forEach(list => {
                    if (list.dataset.category === category) {
                        list.classList.add('active');
                    } else {
                        list.classList.remove('active');
                    }
                });
            });
        });
        
        // 处理选项选择
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                updateSelectedOptions(container);
            });
        });
    });

    // 在 bindTeachingDesignEvents 函数中添加以下代码
    function bindUnitSelectEvents() {
        const container = document.querySelector('.unit-select-groups-container');
        if (!container) return;

        // 初始化默认的两个教材内容选择
        const defaultUnits = [
            {
                unit: '第五章 相交线与平行线',
                section: '5.1 相交线'
            },
            {
                unit: '第五章 相交线与平行线',
                section: '5.2 平行线的性质'
            }
        ];

        // 清空现有内容
        container.innerHTML = '';

        // 添加默认的两个选择组
        defaultUnits.forEach((defaultUnit, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'unit-select-group-wrapper';
            wrapper.innerHTML = `
                <div class="unit-select-group">
                    <select name="unit_select[]" class="unit-select" required>
                        <option value="${defaultUnit.unit}" selected>${defaultUnit.unit}</option>
                    </select>
                    <select name="section_select[]" class="section-select" required>
                        <option value="${defaultUnit.section}" selected>${defaultUnit.section}</option>
                    </select>
                </div>
                <div class="unit-select-group-actions">
                    <button type="button" class="unit-select-add-btn" title="添加教材内容">+</button>
                    <button type="button" class="unit-select-remove-btn" title="删除教材内容">-</button>
                </div>
            `;
            container.appendChild(wrapper);
        });

        // 添加教材内容
        container.addEventListener('click', (e) => {
            if (e.target.matches('.unit-select-add-btn')) {
                const wrapper = e.target.closest('.unit-select-group-wrapper');
                const newWrapper = wrapper.cloneNode(true);
                
                // 清除新添加项的选中状态
                const selects = newWrapper.querySelectorAll('select');
                selects.forEach(select => {
                    select.selectedIndex = 0;
                });
                
                wrapper.parentNode.insertBefore(newWrapper, wrapper.nextSibling);
                
                // 更新删除按钮状态
                updateRemoveButtons();
                // 更新课时设计
                updateLessonDesign();
            }
            
            if (e.target.matches('.unit-select-remove-btn')) {
                const wrapper = e.target.closest('.unit-select-group-wrapper');
                const allWrappers = container.querySelectorAll('.unit-select-group-wrapper');
                
                if (allWrappers.length > 1) {
                    wrapper.remove();
                    // 更新课时设计
                    updateLessonDesign();
                }
                
                // 更新删除按钮状态
                updateRemoveButtons();
            }
        });

        // 监听选择变化
        container.addEventListener('change', (e) => {
            if (e.target.matches('select')) {
                updateLessonDesign();
            }
        });

        // 更新删除按钮状态
        function updateRemoveButtons() {
            const wrappers = container.querySelectorAll('.unit-select-group-wrapper');
            const removeButtons = container.querySelectorAll('.unit-select-remove-btn');
            
            removeButtons.forEach(btn => {
                btn.style.visibility = wrappers.length === 1 ? 'hidden' : 'visible';
            });
        }

        // 初始化删除按钮状态
        updateRemoveButtons();
        // 初始化课时设计
        updateLessonDesign();
    }

    // 在 bindTeachingDesignEvents 函数末尾添加
    bindUnitSelectEvents();
}

// 更新已选择的选项
function updateSelectedOptions(container) {
    const selectedList = container.querySelector('.selected-options-list');
    const checkboxes = container.querySelectorAll('input[type="checkbox"]:checked');
    
    selectedList.innerHTML = Array.from(checkboxes).map(checkbox => `
        <div class="selected-option">
            <span class="category-tag">${checkbox.dataset.category}</span>
            <span class="option-text">${checkbox.value}</span>
            <span class="remove-option" data-value="${checkbox.value}">×</span>
        </div>
    `).join('');
    
    // 绑定移除选项事件
    const removeButtons = selectedList.querySelectorAll('.remove-option');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;
            const checkbox = container.querySelector(`input[type="checkbox"][value="${value}"]`);
            if (checkbox) {
                checkbox.checked = false;
                updateSelectedOptions(container);
            }
        });
    });
}

// 初始化
function init() {
    const hash = location.hash.slice(1);
    if (hash.startsWith('/unit-teaching-design')) {
        renderTeachingDesign();
    }
}

// 暴露到全局
window.teachingDesign = {
    renderTeachingDesign,
    init,
    generateAnalysis: async function() {
        const button = document.querySelector('.ai-assist-btn');
        const textarea = document.getElementById('unitConcept');
        const unit = document.querySelector('.unit-select')?.value || '';
        const section = document.querySelector('.section-select')?.value || '';
        
        // 显示加载状态
        button.classList.add('loading');
        
        try {
            // 模拟API调用延迟
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // 这里是模拟的AI生成内容
            const analysis = `1. 内容的本质：
- 相交线与平行线是初中数学中重要的几何概念
- 通过观察、实验和推理，认识相交线的位置关系和性质
- 理解相交线所形成的对顶角相等的性质

2. 内容蕴含的数学思想和方法：
- 观察与直观想象思想
- 转化与变换思想
- 分类讨论思想
- 演绎推理方法

3. 知识的上下位关系：
- 上位知识：平面几何基本图形
- 同位知识：射线、直线、线段
- 下位知识：垂线、平行线

4. 内容的育人价值：
- 培养学生的空间想象能力
- 发展学生的逻辑推理能力
- 提高学生的几何直观能力
- 培养学生的数学抽象思维`;
            
            textarea.value = analysis;
            
            // 添加动画效果
            textarea.style.backgroundColor = '#f0f7ff';
            setTimeout(() => {
                textarea.style.backgroundColor = '';
            }, 1000);
            
        } catch (error) {
            console.error('生成分析失败:', error);
            showToast('生成分析失败，请重试');
        } finally {
            button.classList.remove('loading');
        }
    },
    generateCoreQuestions: async function() {
        const button = document.querySelector('#coreQuestions')?.previousElementSibling.querySelector('.ai-assist-btn');
        const textarea = document.getElementById('coreQuestions');
        if (!button || !textarea) return;
        
        button.classList.add('loading');
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const questions = `1. 如何通过观察和实验发现两条直线相交时的特征？

2. 相交线形成的对顶角有什么性质？如何证明？

3. 在实际生活中，哪些地方会用到相交线的知识？

4. 如何利用相交线的性质解决实际问题？

5. 相交线的概念和性质对学习后续几何知识有什么帮助？`;
            
            textarea.value = questions;
            textarea.style.backgroundColor = '#f0f7ff';
            setTimeout(() => {
                textarea.style.backgroundColor = '';
            }, 1000);
            
        } catch (error) {
            console.error('生成核心问题失败:', error);
            showToast('生成核心问题失败，请重试');
        } finally {
            button.classList.remove('loading');
        }
    },
    generateSingleLessonDesign: async function(index) {
        const textarea = document.getElementById(`lessonDesign_${index}`);
        const button = textarea.nextElementSibling;
        if (!textarea || !button) return;

        button.classList.add('loading');
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const lessonPlan = `教学目标：
1. 知识目标：
   - 理解相交线的概念
   - 掌握对顶角相等的性质
   - 会运用相交线的性质解决简单的几何问题

2. 能力目标：
   - 培养空间观察能力
   - 提高逻辑推理能力
   - 发展几何直观能力

3. 情感目标：
   - 培养严谨的数学思维
   - 增强数学学习兴趣
   - 体会数学与生活的联系

教学重点：
- 相交线的概念和特征
- 对顶角相等的性质及证明

教学难点：
- 对顶角相等性质的理解和证明
- 相交线性质的应用

教学过程：
1. 情境导入（5分钟）
   通过生活中的实例引入相交线概念

2. 新课讲授（20分钟）
   - 观察相交线的特征
   - 探究对顶角相等的性质
   - 证明对顶角相等

3. 例题讲解（10分钟）
   展示相交线性质的典型应用

4. 课堂练习（10分钟）
   巩固所学知识

5. 总结提升（5分钟）
   归纳本节课重点内容`;
            
            textarea.value = lessonPlan;
            textarea.style.backgroundColor = '#f0f7ff';
            setTimeout(() => {
                textarea.style.backgroundColor = '';
            }, 1000);
            
        } catch (error) {
            console.error('生成课时设计失败:', error);
            showToast('生成课时设计失败，请重试');
        } finally {
            button.classList.remove('loading');
        }
    },
    generateLessonDesign: async function() {
        const button = document.querySelector('.lesson-design-actions .ai-assist-btn');
        if (!button) return;
        
        button.classList.add('loading');
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const textareas = document.querySelectorAll('.lesson-design-textarea');
            textareas.forEach(textarea => {
                const lessonPlan = `教学目标：
1. 知识目标：
   - 理解相交线的概念
   - 掌握对顶角相等的性质
   - 会运用相交线的性质解决简单的几何问题

2. 能力目标：
   - 培养空间观察能力
   - 提高逻辑推理能力
   - 发展几何直观能力

3. 情感目标：
   - 培养严谨的数学思维
   - 增强数学学习兴趣
   - 体会数学与生活的联系

教学重点：
- 相交线的概念和特征
- 对顶角相等的性质及证明

教学难点：
- 对顶角相等性质的理解和证明
- 相交线性质的应用

教学过程：
1. 情境导入（5分钟）
   通过生活中的实例引入相交线概念

2. 新课讲授（20分钟）
   - 观察相交线的特征
   - 探究对顶角相等的性质
   - 证明对顶角相等

3. 例题讲解（10分钟）
   展示相交线性质的典型应用

4. 课堂练习（10分钟）
   巩固所学知识

5. 总结提升（5分钟）
   归纳本节课重点内容`;
                
                textarea.value = lessonPlan;
                textarea.style.backgroundColor = '#f0f7ff';
                setTimeout(() => {
                    textarea.style.backgroundColor = '';
                }, 1000);
            });
            
        } catch (error) {
            console.error('生成课时设计失败:', error);
            showToast('生成课时设计失败，请重试');
        } finally {
            button.classList.remove('loading');
        }
    },
    generateUnitTest: async function() {
        const button = document.querySelector('#unitTest')?.previousElementSibling.querySelector('.ai-assist-btn');
        const textarea = document.getElementById('unitTest');
        if (!button || !textarea) return;
        
        button.classList.add('loading');
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const test = `一、选择题（每题3分，共12分）

1. 下列说法正确的是（  ）
   A. 两条直线相交必然形成4个等角
   B. 对顶角一定相等
   C. 相交线形成的邻角互补
   D. 相交线形成的对顶角互补

2. 如图，两直线相交于点O，∠1=50°，则∠2等于（  ）
   A. 50°  B. 130°  C. 140°  D. 40°

二、填空题（每空2分，共10分）

3. 两条直线相交时，所形成的对顶角_______。

4. 两条直线相交时，相邻两个角的和等于_______度。

三、解答题（每题6分，共18分）

5. 如图，直线AB与直线CD相交于点O，已知∠AOC=62°，求：
   (1) ∠BOD的度数；
   (2) ∠AOD的度数。

6. 在日常生活中，找出两个相交线的实例，并说明其中蕴含的数学原理。

四、探究题（10分）

7. 探究并证明：两条直线相交时，对顶角相等的性质。要求：
   (1) 画出相交线示意图
   (2) 说明证明思路
   (3) 写出完整证明过程
   (4) 总结证明中用到的数学知识`;
            
            textarea.value = test;
            textarea.style.backgroundColor = '#f0f7ff';
            setTimeout(() => {
                textarea.style.backgroundColor = '';
            }, 1000);
            
        } catch (error) {
            console.error('生成单元检测失败:', error);
            showToast('生成单元检测失败，请重试');
        } finally {
            button.classList.remove('loading');
        }
    }
};

// 页面加载时初始化
window.addEventListener('load', init);

// 路由变化时初始化
window.addEventListener('hashchange', init);

// 初始化单元选择
function initUnitSelect() {
    const unitSelects = document.querySelectorAll('.unit-select');
    const sectionSelects = document.querySelectorAll('.section-select');
    
    // 模拟教材数据结构
    const mockUnits = {
        '七年级': {
            '上学期': [
                { id: 1, name: '第一章 有理数' },
                { id: 2, name: '第二章 整式的加减' },
                { id: 3, name: '第三章 一元一次方程' }
            ],
            '下学期': [
                { id: 4, name: '第四章 几何图形初步' },
                { id: 5, name: '第五章 相交线与平行线' },
                { id: 6, name: '第六章 实数' }
            ]
        }
    };

    const mockSections = {
        '第五章 相交线与平行线': [
            { id: 1, name: '5.1 相交线' },
            { id: 2, name: '5.2 平行线的性质' },
            { id: 3, name: '5.3 平行线的判定' },
            { id: 4, name: '5.4 平行线的应用' }
        ]
    };

    unitSelects.forEach((unitSelect, index) => {
        const sectionSelect = sectionSelects[index];
        const defaultUnit = '第五章 相交线与平行线';
        const defaultSection = '5.1 相交线';
        
        function updateUnits(grade, semester) {
            if (!grade || !semester) return;
            
            const units = mockUnits[grade]?.[semester] || [];
            
            unitSelect.innerHTML = `
                ${units.map(unit => `
                    <option value="${unit.name}" ${unit.name === defaultUnit ? 'selected' : ''}>
                        ${unit.name}
                    </option>
                `).join('')}
            `;
            
            // 如果是下学期，更新章节内容
            if (semester === '下学期') {
                updateSections(defaultUnit);
            }
        }
        
        function updateSections(unitName) {
            if (!unitName) return;
            
            const sections = mockSections[unitName] || [];
            
            sectionSelect.innerHTML = `
                ${sections.map(section => `
                    <option value="${section.name}" ${section.name === defaultSection ? 'selected' : ''}>
                        ${section.name}
                    </option>
                `).join('')}
            `;
        }

        // 初始化默认选择
        const grade = '七年级';
        const semester = '下学期';
        
        // 设置默认年级
        const gradeSelect = document.querySelector('select[name="grade"]');
        if (gradeSelect) {
            gradeSelect.value = grade;
        }
        
        // 设置默认学期
        const semesterRadios = document.querySelectorAll('input[name="semester"]');
        semesterRadios.forEach(radio => {
            if (radio.value === semester) {
                radio.checked = true;
            }
        });
        
        // 设置默认教材版本
        const textbookRadios = document.querySelectorAll('input[name="textbook"]');
        textbookRadios.forEach(radio => {
            if (radio.value === '人教版') {
                radio.checked = true;
            }
        });
        
        // 更新单元和章节
        updateUnits(grade, semester);
        
        // 绑定事件监听
        if (gradeSelect) {
            gradeSelect.addEventListener('change', (e) => {
                const selectedSemester = document.querySelector('input[name="semester"]:checked')?.value;
                updateUnits(e.target.value, selectedSemester);
            });
        }
        
        semesterRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                updateUnits(grade, e.target.value);
            });
        });
        
        unitSelect.addEventListener('change', (e) => {
            updateSections(e.target.value);
        });
    });
}

// 在页面加载完成后初始化单元选择
document.addEventListener('DOMContentLoaded', () => {
    initUnitSelect();
});

// 更新课时设计
function updateLessonDesign() {
    const container = document.querySelector('.unit-select-groups-container');
    const lessonDesignContainer = document.getElementById('lesson-design-container');
    if (!container || !lessonDesignContainer) return;

    const wrappers = container.querySelectorAll('.unit-select-group-wrapper');
    let lessonDesigns = [];

    wrappers.forEach((wrapper, index) => {
        const unitSelect = wrapper.querySelector('.unit-select');
        const sectionSelect = wrapper.querySelector('.section-select');
        
        if (unitSelect.value && sectionSelect.value) {
            lessonDesigns.push({
                unit: unitSelect.value,
                section: sectionSelect.value,
                index: index + 1
            });
        }
    });

    // 渲染课时设计输入框
    const html = lessonDesigns.map(design => `
        <div class="form-field">
            <label>${design.index}、${design.unit} <${design.section}></label>
            <div class="textarea-wrapper" style="position: relative;">
                <textarea id="lessonDesign_${design.index - 1}" 
                        name="lessonDesign_${design.index - 1}" 
                        class="lesson-design-textarea"
                        required></textarea>
                <button type="button" class="ai-assist-btn" title="AI辅助分析" 
                        onclick="teachingDesign.generateSingleLessonDesign(${design.index - 1})">
                    <span>AI补充</span>
                </button>
            </div>
        </div>
    `).join('');

    lessonDesignContainer.innerHTML = html;
} 