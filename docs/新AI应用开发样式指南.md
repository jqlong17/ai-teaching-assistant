# AI应用开发样式指南

## 一、布局架构设计

### 1. 基础布局结构
```html
<div class="ai-layout-container">
    <!-- 头部 -->
    <div class="ai-layout-header">
        <div class="back-button">←</div>
        <h1>应用标题</h1>
    </div>
    
    <!-- 主内容区域 -->
    <div class="ai-layout-content">
        <!-- 左侧输入区域 -->
        <div class="ai-layout-input">
            <!-- 输入表单 -->
        </div>
        
        <!-- 右侧预览区域 -->
        <div class="ai-layout-preview">
            <!-- 预览内容 -->
        </div>
    </div>
</div>
```

### 2. 响应式布局策略

#### Web端(≥1024px)
- 采用左右分栏布局
- 左右各占50%宽度
- 两侧内容可独立滚动

```css
@media (min-width: 1024px) {
    .ai-layout-content {
        display: flex;
        gap: 24px;
        padding: 24px;
        height: calc(100vh - 72px);
    }
    
    .ai-layout-input,
    .ai-layout-preview {
        width: 50%;
        border-radius: 12px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
}
```

#### 移动端(<1024px)
- 采用标签页切换式布局
- 通过标签切换"配置"和"预览"
- 内容区域占满屏幕宽度

```css
@media (max-width: 1023px) {
    .mobile-tabs {
        display: flex;
        background: #fff;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .mobile-tab-item {
        flex: 1;
        text-align: center;
        padding: 12px;
        color: #64748b;
    }
    
    .mobile-tab-item.active {
        color: #4F46E5;
        border-bottom: 2px solid #4F46E5;
    }
    
    .ai-layout-input,
    .ai-layout-preview {
        display: none;
        width: 100%;
        height: calc(100vh - 125px);
        overflow-y: auto;
    }
    
    .ai-layout-input.active,
    .ai-layout-preview.active {
        display: block;
    }
}
```

## 二、样式系统设计

### 1. 颜色变量
```css
:root {
    --primary-color: #4F46E5;    /* 主题色 */
    --secondary-color: #f8fafc;  /* 次要背景色 */
    --border-color: #e2e8f0;     /* 边框色 */
    --text-color: #1e293b;      /* 文本色 */
    --bg-color: #fff;           /* 背景色 */
    --hover-color: #f1f5f9;     /* 悬停色 */
}
```

### 2. 组件样式规范

#### 表单元素
```css
/* 输入框 */
.form-field input,
.form-field select,
.form-field textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.3s ease;
}

/* 聚焦状态 */
.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
}
```

#### 按钮样式
```css
.action-button {
    height: 44px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.primary-button {
    background: var(--primary-color);
    color: white;
}

.secondary-button {
    background: var(--secondary-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
}
```

## 三、交互体验优化

### 1. 加载状态
```css
.loading {
    position: relative;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s infinite linear;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
```

### 2. 提示消息
使用 `showToast` 代替 `alert`：
```javascript
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
```

## 四、JavaScript最佳实践

### 1. 类结构组织
```javascript
class AIApplication {
    constructor() {
        this.container = null;
        this.isProcessing = false;
    }

    async init() {
        // 初始化布局
        this.container = document.createElement('div');
        this.container.className = 'ai-layout-container';
        
        // 创建结构
        this.container.innerHTML = `
            <div class="ai-layout-header">...</div>
            <div class="ai-layout-content">...</div>
        `;
        
        // 初始化移动端标签
        if (window.innerWidth < 1024) {
            new MobileTabs();
        }
        
        // 绑定事件
        this.bindEvents();
        
        return this.container;
    }

    bindEvents() {
        // 事件处理
    }

    async processData() {
        if (this.isProcessing) return;
        
        try {
            this.isProcessing = true;
            this.setLoading(true);
            
            // 处理数据
            
        } catch (error) {
            this.handleError(error);
        } finally {
            this.isProcessing = false;
            this.setLoading(false);
        }
    }
}
```

### 2. 移动端标签切换实现
```javascript
class MobileTabs {
    constructor() {
        this.container = document.querySelector('.ai-layout-content');
        if (!this.container) return;
        
        this.createTabs();
        this.bindEvents();
    }

    createTabs() {
        const tabsHtml = `
            <div class="mobile-tabs">
                <div class="mobile-tab-item active" data-tab="input">配置</div>
                <div class="mobile-tab-item" data-tab="preview">预览</div>
            </div>
        `;
        
        this.container.insertAdjacentHTML('afterbegin', tabsHtml);
        
        const input = this.container.querySelector('.ai-layout-input');
        const preview = this.container.querySelector('.ai-layout-preview');
        
        if (input) input.classList.add('active');
        if (preview) preview.classList.remove('active');
    }

    bindEvents() {
        const tabs = this.container.querySelectorAll('.mobile-tab-item');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchTab(tab.dataset.tab);
            });
        });
    }

    switchTab(tabName) {
        // 更新标签状态
        const tabs = this.container.querySelectorAll('.mobile-tab-item');
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        // 更新内容显示
        const input = this.container.querySelector('.ai-layout-input');
        const preview = this.container.querySelector('.ai-layout-preview');
        
        if (tabName === 'input') {
            input?.classList.add('active');
            preview?.classList.remove('active');
        } else {
            input?.classList.remove('active');
            preview?.classList.add('active');
        }
    }
}
```

## 五、开发注意事项

1. **布局适配**
   - Web端保持左右分栏布局
   - 移动端实现标签页切换
   - 注意内容区域的滚动处理

2. **样式统一**
   - 使用CSS变量管理主题
   - 保持组件样式一致性
   - 注意交互反馈的视觉效果

3. **交互优化**
   - 添加适当的加载状态
   - 使用友好的提示信息
   - 优化表单输入体验
   - 实现平滑的动画过渡

4. **代码组织**
   - 采用类的方式组织代码
   - 分离业务逻辑和视图逻辑
   - 实现优雅的错误处理
   - 注意代码复用和维护性

5. **性能优化**
   - 避免不必要的DOM操作
   - 优化事件监听器
   - 实现节流或防抖处理
   - 注意内存泄漏问题

## 六、开发流程建议

1. **布局搭建**
   - 先搭建基础布局结构
   - 实现响应式布局适配
   - 确保移动端标签切换正常

2. **样式开发**
   - 定义全局样式变量
   - 开发基础组件样式
   - 实现交互反馈效果

3. **功能实现**
   - 编写核心业务逻辑
   - 实现数据处理功能
   - 添加错误处理机制

4. **优化改进**
   - 优化用户交互体验
   - 完善错误提示信息
   - 提升代码可维护性

5. **测试验证**
   - 进行跨设备测试
   - 验证各种异常情况
   - 收集用户使用反馈

按照以上指南开发的AI应用将具有：
- 统一的设计风格
- 良好的用户体验
- 可靠的功能实现
- 优秀的代码质量 