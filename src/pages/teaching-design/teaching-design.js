// 教学设计表单配置
const formConfig = {
    basicInfo: {
        title: '基本信息',
        fields: [
            { 
                id: 'eduSystem', 
                label: '义教学制', 
                type: 'radio', 
                options: ['六三学制', '五四学制'],
                required: true 
            },
            { 
                id: 'grade', 
                label: '所教年级', 
                type: 'select', 
                options: ['七年级', '八年级', '九年级'], 
                required: true 
            },
            { 
                id: 'semester', 
                label: '学期', 
                type: 'radio', 
                options: ['上学期', '下学期'], 
                required: true 
            },
            { 
                id: 'subject', 
                label: '所教学科', 
                type: 'text', 
                value: '数学', 
                disabled: true 
            },
            { 
                id: 'textbook', 
                label: '教材版本', 
                type: 'radio', 
                options: ['统编版', '其他'], 
                required: true 
            },
            { 
                id: 'unit', 
                label: '教材内容', 
                type: 'unit-select', 
                required: true 
            },
            { 
                id: 'duration', 
                label: '课时安排', 
                type: 'number', 
                placeholder: '请输入课时数量', 
                value: '6', 
                required: true 
            }
        ]
    },
    conceptDesign: {
        title: '概念体系',
        fields: [
            { 
                id: 'coreConcept', 
                label: '核心概念', 
                type: 'text', 
                placeholder: '请输入本单元的核心数学概念', 
                required: true 
            },
            { 
                id: 'conceptIntension', 
                label: '概念内涵', 
                type: 'textarea', 
                placeholder: '请描述该数学概念的严格定义和数学特征', 
                required: true 
            },
            { 
                id: 'conceptExtension', 
                label: '概念外延', 
                type: 'textarea', 
                placeholder: '请说明该概念的应用范围和具体实例', 
                required: true 
            },
            { 
                id: 'conceptMap', 
                label: '概念关联', 
                type: 'custom', 
                component: 'concept-map',
                description: '展示与其他数学概念的联系',
                required: true 
            }
        ]
    },
    coreQuestions: {
        title: '核心问题',
        fields: [
            { 
                id: 'conceptQuestion', 
                label: '概念理解问题', 
                type: 'textarea', 
                placeholder: '设计引导学生理解概念本质的问题', 
                required: true 
            },
            { 
                id: 'methodQuestion', 
                label: '方法思维问题', 
                type: 'textarea', 
                placeholder: '设计培养数学思维方法的问题', 
                required: true 
            },
            { 
                id: 'applicationQuestion', 
                label: '应用价值问题', 
                type: 'textarea', 
                placeholder: '设计体现数学应用价值的问题', 
                required: true 
            }
        ]
    },
    teachingDesign: {
        title: '教学设计',
        fields: [
            { 
                id: 'teachingGoals', 
                label: '教学目标', 
                type: 'textarea', 
                placeholder: '请描述知识目标、能力目标、素养目标', 
                required: true 
            },
            { 
                id: 'keyPoints', 
                label: '教学重点', 
                type: 'textarea', 
                placeholder: '请列出教学重点内容和关键环节', 
                required: true 
            },
            { 
                id: 'difficulties', 
                label: '教学难点', 
                type: 'textarea', 
                placeholder: '请列出教学难点及突破策略', 
                required: true 
            },
            { 
                id: 'preparation', 
                label: '教学准备', 
                type: 'textarea', 
                placeholder: '请列出所需的教具、工具等', 
                required: true 
            }
        ]
    },
    activityDesign: {
        title: '活动设计',
        fields: [
            { 
                id: 'explorationActivity', 
                label: '操作探索活动', 
                type: 'textarea', 
                placeholder: '设计帮助学生发现数学规律的探索活动', 
                required: true 
            },
            { 
                id: 'reasoningActivity', 
                label: '推理论证活动', 
                type: 'textarea', 
                placeholder: '设计培养逻辑推理能力的活动', 
                required: true 
            },
            { 
                id: 'practiceActivity', 
                label: '应用实践活动', 
                type: 'textarea', 
                placeholder: '设计数学应用问题的实践活动', 
                required: true 
            },
            { 
                id: 'examples', 
                label: '典型例题', 
                type: 'textarea', 
                placeholder: '请列举具有代表性的例题', 
                required: true 
            }
        ]
    },
    evaluation: {
        title: '评价设计',
        fields: [
            { 
                id: 'thinkingEvaluation', 
                label: '思维评价', 
                type: 'textarea', 
                placeholder: '数学思维水平的评价方式', 
                required: true 
            },
            { 
                id: 'abilityEvaluation', 
                label: '能力评价', 
                type: 'textarea', 
                placeholder: '数学核心素养的评价方式', 
                required: true 
            },
            { 
                id: 'processEvaluation', 
                label: '过程评价', 
                type: 'textarea', 
                placeholder: '学习过程的评价方式', 
                required: true 
            }
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
            <h1>数学单元教学设计</h1>
        </header>
        <div class="design-container">
            <div class="form-container">
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
            <div class="preview-container">
                <div class="preview-header">
                    <div class="preview-title">教学设计预览</div>
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
    bindTeachingDesignEvents();
    
    // 初始化概念图谱
    initConceptMap();
}

// 渲染表单字段
function renderFormField(field) {
    switch (field.type) {
        case 'radio':
            return `
                <div class="radio-group">
                    ${field.options.map(opt => `
                        <label class="radio-label">
                            <input type="radio" name="${field.id}" value="${opt}" ${field.required ? 'required' : ''}>
                            <span>${opt}</span>
                        </label>
                    `).join('')}
                </div>
            `;
        case 'select':
            return `
                <select id="${field.id}" name="${field.id}" ${field.disabled ? 'disabled' : ''} ${field.required ? 'required' : ''}>
                    <option value="">请选择${field.label}</option>
                    ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                </select>
            `;
        case 'unit-select':
            return `
                <div class="unit-select-group">
                    <select name="${field.id}_unit" class="unit-select" ${field.required ? 'required' : ''}>
                        <option value="">请选择单元</option>
                    </select>
                    <select name="${field.id}_section" class="section-select" ${field.required ? 'required' : ''}>
                        <option value="">请选择课时</option>
                    </select>
                </div>
            `;
        case 'textarea':
            return `
                <textarea id="${field.id}" name="${field.id}" 
                    placeholder="${field.placeholder || ''}" 
                    ${field.disabled ? 'disabled' : ''}
                    ${field.required ? 'required' : ''}></textarea>
                ${field.description ? `<div class="field-description">${field.description}</div>` : ''}
            `;
        case 'custom':
            if (field.component === 'concept-map') {
                return `
                    <div id="${field.id}" class="concept-map"></div>
                    ${field.description ? `<div class="field-description">${field.description}</div>` : ''}
                `;
            }
            return '';
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
    const previewSection = document.querySelector('.lesson-plan-preview');
    const editBtn = document.querySelector('.edit-btn');
    const downloadBtn = document.querySelector('.download-btn');
    
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
            const response = await fetch('./docs/教学设计示例/七年级数学相交线教学设计方案.md');
            if (!response.ok) {
                throw new Error('获取教学设计方案失败');
            }
            const markdown = await response.text();
            
            // 显示教学设计方案预览
            form.style.display = 'none';
            previewSection.style.display = 'block';
            
            // 渲染Markdown内容
            const previewContent = document.querySelector('.preview-content');
            previewContent.innerHTML = marked.parse(markdown);
            
            // 滚动到顶部
            window.scrollTo(0, 0);
            
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
        a.download = '教学设计方案.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
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
    init
};

// 页面加载时初始化
window.addEventListener('load', init);

// 路由变化时初始化
window.addEventListener('hashchange', init);

// 初始化单元选择
function initUnitSelect() {
    const unitSelects = document.querySelectorAll('.unit-select');
    const sectionSelects = document.querySelectorAll('.section-select');
    
    // 这里应该根据年级和学期动态获取单元数据
    const mockUnits = {
        '七年级': {
            '上学期': [
                { id: 1, name: '第一单元 有理数' },
                { id: 2, name: '第二单元 整式的加减' },
                { id: 3, name: '第三单元 一元一次方程' }
            ],
            '下学期': [
                { id: 4, name: '第四单元 相交线' },
                { id: 5, name: '第五单元 实数' },
                { id: 6, name: '第六单元 平行线' }
            ]
        }
        // 可以添加更多年级的单元数据
    };

    unitSelects.forEach((unitSelect, index) => {
        const sectionSelect = sectionSelects[index];
        
        // 监听年级变化
        document.querySelector('select[name="grade"]').addEventListener('change', (e) => {
            updateUnits(e.target.value);
        });
        
        // 监听学期变化
        document.querySelectorAll('input[name="semester"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                updateUnits(document.querySelector('select[name="grade"]').value);
            });
        });
        
        // 监听单元变化
        unitSelect.addEventListener('change', (e) => {
            updateSections(e.target.value);
        });
        
        function updateUnits(grade) {
            const semester = document.querySelector('input[name="semester"]:checked')?.value;
            if (!grade || !semester) return;
            
            const units = mockUnits[grade]?.[semester] || [];
            unitSelect.innerHTML = `
                <option value="">请选择单元</option>
                ${units.map(unit => `
                    <option value="${unit.id}">${unit.name}</option>
                `).join('')}
            `;
            
            // 清空课时选择
            sectionSelect.innerHTML = '<option value="">请选择课时</option>';
        }
        
        function updateSections(unitId) {
            if (!unitId) return;
            
            // 这里应该根据单元ID获取课时数据
            const mockSections = [
                { id: 1, name: '第一课时' },
                { id: 2, name: '第二课时' },
                { id: 3, name: '第三课时' },
                { id: 4, name: '第四课时' }
            ];
            
            sectionSelect.innerHTML = `
                <option value="">请选择课时</option>
                ${mockSections.map(section => `
                    <option value="${section.id}">${section.name}</option>
                `).join('')}
            `;
        }
    });
}

// 在页面加载完成后初始化单元选择
document.addEventListener('DOMContentLoaded', () => {
    initUnitSelect();
}); 