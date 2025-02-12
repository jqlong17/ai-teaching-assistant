# 云小睿 - AI 智能教学助手

云小睿是一个基于人工智能的智能教学助手平台，旨在为教师提供全方位的教学支持。通过多样化的 AI 功能，帮助教师提高教学效率，实现个性化教学。

## 功能特点

### 1. 教学设计辅助
- **单元教学设计**：智能生成完整的数学单元教学设计方案
- **项目式学习设计**：基于项目式学习理念的数学教学设计助手
- **跨学科教学设计**：融合多学科知识的数学教学设计方案
- **PPT 转教案**：上传 PPT 自动转换成完整教案
- **一键 PPT 制作**：输入文本或上传文件，智能生成精美 PPT
- **动画对话**：生成角色动画视频，适用于课堂知识导入

### 2. 作业评价
- **语文作文评价**：智能分析作文，提供全面的评价和修改建议
- **个性化评语**：根据学生特点生成个性化的评语

### 3. 技术特点
- 响应式设计，完美适配移动端和桌面端
- 移动端优化的交互体验
  - 双列卡片布局
  - Tab 切换式配置界面
  - 触摸友好的操作方式
- Web 端保持专业的工作区布局
  - 左右分栏的编辑预览模式
  - 多列卡片布局
  - 丰富的快捷操作

## 技术栈

- **前端框架**：原生 JavaScript
- **样式**：CSS3 + 响应式设计
- **UI 组件**：自定义组件
- **Markdown 渲染**：marked.js
- **构建工具**：无构建，原生开发

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 项目结构

```
src/
├── assets/          # 静态资源
│   ├── css/         # 全局样式
│   └── js/          # 全局脚本
├── lib/             # 第三方库
├── pages/           # 页面组件
│   ├── index/       # 首页
│   ├── chat/        # 对话页面
│   ├── teaching-design/    # 教学设计
│   ├── project-learning/   # 项目式学习
│   ├── interdisciplinary-design/  # 跨学科教学
│   ├── essay-evaluation/   # 作文评价
│   ├── ppt-to-design/     # PPT转教案
│   ├── ppt-generator/     # PPT生成
│   ├── animated-dialogue/ # 动画对话
│   └── my/         # 个人中心
└── config.js       # 配置文件
```

## 开发指南

1. 克隆项目
```bash
git clone https://github.com/your-username/ai-teaching-assistant.git
```

2. 打开项目
```bash
cd ai-teaching-assistant
```

3. 使用本地服务器运行项目
```bash
# 使用 Python 的 SimpleHTTPServer
python -m http.server 8000

# 或使用 Node.js 的 http-server
npx http-server
```

4. 在浏览器中访问
```
http://localhost:8000
```

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

[MIT License](LICENSE)

## 联系我们

- 项目主页：[https://github.com/your-username/ai-teaching-assistant](https://github.com/your-username/ai-teaching-assistant)
- 问题反馈：[https://github.com/your-username/ai-teaching-assistant/issues](https://github.com/your-username/ai-teaching-assistant/issues) 