# 云小睿 - AI智能教学助手

这是一个基于 Web 的智能教学助手系统，旨在为教师提供全方位的教学支持。目前支持数学、德育等多个学科领域的智能对话和教学设计辅助。

🌐 [在线演示](https://jqlong17.github.io/ai-teaching-assistant)

## 系统功能

### 1. 智能教学应用
- 📚 教学设计生成：快速生成专业的教学设计方案
- 🎯 项目式学习指导：个性化的项目学习规划与指导
- 🔬 数学实验模拟：交互式数学概念可视化体验
- 📊 数学可视化工具：数学函数与图形可视化
- 🧩 思维训练题库：针对性的数学思维训练
- 📖 学习资源推荐：精选数学学习资源与教材

### 2. 数字人对话系统
- 多领域专家：数学、德育等多个学科的专业教师
- 双模式对话：支持普通对话和沉浸式体验
- 语音交互：实时语音识别，波形动画反馈
- 上下文理解：保持对话连贯性和专业性

## 技术实现

### 前端架构
- 原生技术栈：JavaScript + CSS3
- 响应式设计：移动端/桌面端自适应
- 模块化组织：
  - `/pages/index`: 应用功能导航
  - `/pages/chat`: 数字人对话系统
  - `/pages/teaching-design`: 教学设计生成
  - `/pages/my`: 个人中心

### 核心特性
- Web Speech API 实现语音识别
- CSS Grid + Flex 响应式布局
- CSS Animation 流畅交互动画
- 路由系统：Hash 路由实现

## 快速开始

1. 克隆仓库
```bash
git clone https://github.com/jqlong17/ai-teaching-assistant.git
```

2. 使用任意 Web 服务器运行项目
```bash
# 例如使用 Python 的简单 HTTP 服务器
python -m http.server 8080
```

3. 在浏览器中访问 `http://localhost:8080`

## 开发计划
- [ ] 语音合成：支持数字人发音
- [ ] 优化语音识别准确率
- [ ] 扩展更多学科专家
- [ ] 增加教学场景模拟

## 在线体验

访问 [https://jqlong17.github.io/ai-teaching-assistant](https://jqlong17.github.io/ai-teaching-assistant) 体验完整功能。 