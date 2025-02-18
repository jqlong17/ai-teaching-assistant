# 云小睿 - AI 智能教学助手

云小睿是一个基于人工智能的智能教学助手平台，旨在为教师提供全方位的教学支持。通过多样化的 AI 功能，帮助教师提高教学效率，实现个性化教学。

## 项目地址
- 演示地址：https://ai-teaching-assistant-three.vercel.app

## 主要功能

### 1. 数学专家数字人
- 提供专业的数学教学指导
- 支持实时对话和问答
- 智能分析教学难点
- 提供个性化教学建议

### 2. 教学设计工具
- **单元教学设计**：智能生成完整的数学单元教学设计方案
- **教学设计润色**：智能优化和完善现有教学设计方案
- **项目式学习设计**：基于项目式学习理念的数学教学设计
- **跨学科教学设计**：融合多学科知识的数学教学设计方案

### 3. 教学辅助工具
- **作文评价**：智能分析和评价学生作文
- **PPT 转教案**：自动将 PPT 转换为教案
- **PPT 生成**：根据文本智能生成教学 PPT
- **动画对话**：生成教学引入动画

## 技术架构

### 前端技术栈
- 原生 JavaScript (ES6+)
- CSS3 + 响应式设计
- 自定义 UI 组件
- Marked.js (Markdown 渲染)

### 项目结构
```
src/
├── assets/          # 静态资源
│   ├── css/         # 全局样式文件
│   │   ├── main.css        # 主样式
│   │   └── layouts.css     # 布局样式
│   ├── js/          # 全局脚本
│   │   └── mobile-tabs.js  # 移动端标签切换
│   └── images/      # 图片资源
│       └── experts/        # 专家头像等
├── lib/             # 第三方库
│   └── marked.min.js      # Markdown 渲染
├── utils/           # 工具类
│   ├── validator.js       # 表单验证
│   └── ai.js             # AI 相关工具
├── api/             # API 接口
│   ├── auth.js           # 认证相关接口
│   └── api.js            # 通用接口
├── config.js        # 全局配置
└── pages/           # 页面组件
    ├── index/            # 首页
    ├── auth/            # 用户认证
    │   ├── auth.js          # 认证逻辑
    │   └── auth.css         # 认证样式
    ├── chat/            # 专家对话
    │   ├── chat.js          # 对话功能
    │   └── immersive.js     # 沉浸式体验
    ├── my/              # 个人中心
    ├── teaching-design/ # 教学设计
    ├── design-polish/   # 设计润色
    ├── project-learning/# 项目学习
    ├── interdisciplinary-design/  # 跨学科设计
    ├── essay-evaluation/  # 作文评价
    ├── ppt-to-design/    # PPT转教案
    ├── ppt-generator/    # PPT生成
    └── animated-dialogue/# 动画对话
```

### 路由结构
```
#/                    # 首页
#/auth               # 用户认证（登录/注册）
#/chat               # 专家对话
#/my                 # 个人中心
#/unit-teaching-design    # 单元教学设计
#/design-polish          # 教学设计润色
#/project-learning       # 项目式学习
#/interdisciplinary-design  # 跨学科教学
#/essay-evaluation      # 作文评价
#/ppt-to-design        # PPT转教案
#/ppt-generator        # PPT生成
#/animated-dialogue    # 动画对话
```

### 主要功能模块

1. **核心功能**
   - `src/pages/chat/`: 专家对话系统
   - `src/pages/teaching-design/`: 教学设计生成
   - `src/pages/design-polish/`: 教学设计润色

2. **用户系统**
   - `src/pages/auth/`: 用户认证
   - `src/pages/my/`: 个人中心
   - `src/api/auth.js`: 认证接口

3. **工具类**
   - `src/utils/validator.js`: 表单验证
   - `src/utils/ai.js`: AI 功能支持
   - `src/api/api.js`: API 调用封装

4. **UI 组件**
   - `src/assets/css/`: 全局样式
   - `src/assets/js/mobile-tabs.js`: 移动端组件

## 开发指南

### 环境要求
- Node.js 14.0+
- 现代浏览器（支持 ES6+）

### 本地开发
1. 克隆项目
```bash
git clone [项目地址]
```

2. 安装依赖（如果有）
```bash
npm install
```

3. 启动开发服务器
```bash
# 使用 Python 的 http.server
python -m http.server 8000

# 或使用 Node.js 的 http-server
npx http-server
```

### 开发规范
1. JavaScript 代码规范
   - 使用 ES6+ 语法
   - 采用类的方式组织代码
   - 遵循模块化开发原则

2. CSS 样式规范
   - 采用 BEM 命名规范
   - 使用 CSS 变量管理主题
   - 移动端优先的响应式设计

3. 组件开发规范
   - 遵循单一职责原则
   - 保持组件的独立性和可复用性
   - 完善的错误处理机制

### 移动端适配
- 采用 flex 布局
- 使用相对单位（rem/em）
- 媒体查询断点设置
- 触摸事件优化

## 部署说明

### 部署要求
- 支持静态网站托管
- 支持 HTTPS
- 支持自定义域名（可选）

### 部署步骤
1. 构建项目（如果需要）
```bash
npm run build
```

2. 上传到托管平台
   - 支持 Vercel、GitHub Pages 等平台
   - 配置环境变量（如果需要）
   - 设置自定义域名（如果需要）

## 贡献指南

1. Fork 本仓库
2. 创建特性分支
3. 提交代码
4. 创建 Pull Request

## 许可证

MIT

## 后端逻辑
1. 用户输入文字
2. 调paas流式大模型，得到返回结果
3. 一句推给数字人，TTS合成
4. webrtc -> stun中转 -> 客户端
