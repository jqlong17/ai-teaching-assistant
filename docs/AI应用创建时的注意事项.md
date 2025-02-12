# AI应用开发注意事项

在开发新的AI应用时，需要关注以下关键文件和函数的修改：

## 1. index.js 文件中的两处关键修改

### a. handleFeatureClick 函数中的 availableFeatures 对象：
- 添加新功能的路由映射
- 格式：'feature-id': '#/feature-route'  // 注意：路径必须带 # 前缀
- 注意：确保 feature-id 与 features 数组中定义的 id 一致
- 注意：确保 feature-route 与路由处理函数中的 case 一致

### b. handleRoute 函数中添加新的路由处理 case：
```javascript
case '#/feature-route':  // 注意：路径必须带 # 前缀
    console.log('准备渲染XX页面');
    if (window.featureName && typeof window.featureName.render === 'function') {
        window.featureName.render();
    } else {
        console.error('XX页面渲染函数未定义');
        renderHomePage();
    }
    break;
```

## 2. 新功能的 JavaScript 文件（src/pages/feature-name/feature-name.js）

### a. 使用立即执行函数（IIFE）包装代码：
```javascript
(function() {
    // 创建全局对象
    window.featureName = {
        render: function() {
            console.log('开始渲染XX页面');
            const container = document.getElementById('page-container');
            if (!container) {
                console.error('找不到页面容器元素');
                return;
            }
            
            // 清空容器
            container.innerHTML = '';
            
            // 初始化页面
            const page = new FeatureName();
            page.init().then(content => {
                container.appendChild(content);
                console.log('XX页面初始化完成');
            }).catch(error => {
                console.error('初始化失败:', error);
                container.innerHTML = '<div class="error-message">页面加载失败，请刷新重试</div>';
            });
        }
    };

    // 输出日志确认模块加载
    console.log('XX模块加载完成');
})();
```

## 3. index.html 文件
- 添加新功能的 CSS 和 JavaScript 文件引用

## 4. 路由处理统一规范
1. 路由名称统一：
   - 所有路由必须以 '#/' 开头
   - 路由名称使用小写字母和连字符，如 '#/feature-name'
   - 确保 availableFeatures 中的路径与 handleRoute 中的 case 完全匹配

2. 渲染函数检查统一：
   - 检查 window.xxx 对象是否存在
   - 检查 render 方法是否为函数
   - 使用统一的错误处理方式

3. 错误处理统一：
   - 如果页面容器不存在，显示错误日志并返回
   - 如果渲染函数未定义，返回首页
   - 如果初始化失败，显示友好的错误提示

## 5. 代码组织规范
1. 使用立即执行函数（IIFE）包装代码，避免全局变量污染
2. 统一的日志输出格式
3. 统一的错误处理方式
4. 统一的页面初始化流程

## 开发流程建议
1. 先在 index.js 的 features 数组中添加新功能配置
2. 创建新功能的目录和文件（js、css）
3. 在 index.html 中添加文件引用
4. 修改 handleFeatureClick 中的 availableFeatures
5. 添加路由处理 case
6. 使用 IIFE 实现功能类和全局对象
7. 确保路由名称统一且正确映射

## 关键注意事项
1. 路由名称必须完全匹配
2. 功能 ID 与路由映射正确
3. 全局对象名称与路由处理中的判断一致
4. render 方法正确实现
5. 使用 IIFE 避免全局变量污染
6. 统一的错误处理方式
7. 完整的日志输出

## 6. 移动端适配关键事项

### a. 布局结构规范
```html
<div class="ai-layout-container">
    <div class="ai-layout-header">...</div>
    <div class="ai-layout-content">
        <!-- 移动端必须添加 tabs -->
        <div class="mobile-tabs">
            <div class="mobile-tab-item active" data-tab="input">配置</div>
            <div class="mobile-tab-item" data-tab="preview">预览</div>
        </div>
        <!-- 输入区域使用统一类名 -->
        <div class="ai-layout-input active">
            <!-- 输入表单内容 -->
        </div>
        <!-- 预览区域使用统一类名 -->
        <div class="ai-layout-preview">
            <!-- 预览内容 -->
        </div>
    </div>
</div>
```

### b. 样式规范
```css
/* Web端布局 */
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

    .mobile-tabs {
        display: none;  /* Web端隐藏tabs */
    }
}

/* 移动端布局 */
@media (max-width: 1023px) {
    .mobile-tabs {
        display: flex;
        background: #fff;
        border-bottom: 1px solid var(--border-color);
    }
    
    .mobile-tab-item {
        flex: 1;
        text-align: center;
        padding: 12px;
        color: #64748b;
    }
    
    .mobile-tab-item.active {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
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

### c. 移动端开发注意事项
1. 类名统一规范：
   - 输入区域必须使用 `.ai-layout-input`
   - 预览区域必须使用 `.ai-layout-preview`
   - 移动端标签必须使用 `.mobile-tabs` 和 `.mobile-tab-item`

2. 标签切换必备元素：
   - 必须添加移动端标签栏
   - 必须实现标签切换逻辑
   - 必须处理活跃状态样式

3. 常见错误：
   - 忘记添加移动端标签栏
   - 使用自定义类名而不是统一规范的类名
   - 忘记处理标签切换逻辑
   - 忘记在Web端隐藏标签栏

4. 调试检查清单：
   - [ ] 检查移动端标签是否存在
   - [ ] 检查类名是否符合规范
   - [ ] 检查切换逻辑是否正确
   - [ ] 检查Web端是否正常显示
   - [ ] 检查移动端是否可以正常切换
   - [ ] 检查内容区域高度是否正确

5. 实现步骤：
   ```javascript
   // 1. 在 init 方法中添加移动端标签
   content.innerHTML = `
       <div class="mobile-tabs">...</div>
       <div class="ai-layout-input active">...</div>
       <div class="ai-layout-preview">...</div>
   `;

   // 2. 实现标签切换逻辑
   initMobileTabs() {
       const tabs = this.container.querySelectorAll('.mobile-tab-item');
       const inputSection = this.container.querySelector('.ai-layout-input');
       const previewSection = this.container.querySelector('.ai-layout-preview');
       
       tabs.forEach(tab => {
           tab.addEventListener('click', () => {
               const targetTab = tab.dataset.tab;
               tabs.forEach(t => t.classList.remove('active'));
               tab.classList.add('active');
               
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

   // 3. 在需要切换到预览时调用
   if (window.innerWidth < 1024) {
       document.querySelector('.mobile-tab-item[data-tab="preview"]').click();
   }
   ```

### d. 质量保证
1. 开发前：
   - 仔细阅读样式指南
   - 检查现有实现的参考代码
   - 确保理解移动端适配要求

2. 开发中：
   - 严格遵循类名规范
   - 实现完整的切换逻辑
   - 测试不同屏幕尺寸下的显示效果

3. 开发后：
   - 进行完整的移动端测试
   - 确保与其他页面风格统一
   - 验证所有功能在移动端是否正常

### e. 最佳实践
1. 始终参考样式指南中的示例代码
2. 使用统一的类名和结构
3. 确保移动端标签始终存在
4. 实现完整的切换逻辑
5. 在关键节点（如提交、预览等）自动切换到相应标签
6. 定期进行移动端测试
