# 每日运势 - 今日运势播报

一个基于 React + TypeScript + Vite 构建的每日运势应用，提供个性化的运势播报、幸运元素推荐等功能。

## ✨ 功能特色

- 🎯 **每日运势生成** - 智能生成今日宜忌事项
- 🎨 **幸运元素** - 推荐幸运色、幸运物品和幸运词
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🎭 **精美动画** - 流畅的 Framer Motion 动画效果
- 💾 **数据持久化** - 本地存储每日运势数据
- 📋 **一键复制** - 快速分享运势内容
- 🔄 **实时刷新** - 随时生成新的运势内容

## 🚀 在线体验

### Vercel 部署
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/daily-fortune)

项目已优化支持 Vercel 一键部署，包含：
- 自动构建配置
- SPA 路由支持
- 服务端渲染兼容性
- 全球 CDN 加速

## 🛠️ 技术栈

- **前端框架**: React 18
- **开发语言**: TypeScript
- **构建工具**: Vite 6
- **样式方案**: Tailwind CSS
- **动画库**: Framer Motion
- **路由管理**: React Router DOM
- **UI 组件**: 自定义组件 + Sonner Toast
- **图标库**: Font Awesome

## 📦 本地开发

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 7.0.0 (推荐) 或 npm/yarn

### 快速开始

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd daily-fortune
   ```

2. **安装依赖**
   ```bash
   pnpm install
   # 或
   npm install
   ```

3. **启动开发服务器**
   ```bash
   pnpm dev
   # 或
   npm run dev
   ```

4. **访问应用**
   
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建部署

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 🌐 部署指南

### Vercel 部署（推荐）

1. **推送代码到 Git 仓库**
2. **访问 [Vercel](https://vercel.com) 并导入项目**
3. **使用默认配置部署**

项目已包含 `vercel.json` 配置文件，支持：
- 自动构建和部署
- SPA 路由重写
- 环境变量配置
- 性能优化

### 其他平台部署

- **Netlify**: 支持拖拽部署 `dist` 目录
- **GitHub Pages**: 需要配置 GitHub Actions
- **EdgeOne Pages**: 已包含 `.edgeonerc` 配置

## 📁 项目结构

```
├── public/                 # 静态资源
├── src/
│   ├── components/        # 可复用组件
│   │   ├── FortuneDisplay.tsx
│   │   └── Empty.tsx
│   ├── contexts/          # React Context
│   │   └── authContext.ts
│   ├── hooks/             # 自定义 Hooks
│   │   ├── useDailyFortune.ts
│   │   └── useTheme.ts
│   ├── lib/               # 工具库
│   │   ├── fortuneData.ts
│   │   └── utils.ts
│   ├── pages/             # 页面组件
│   │   └── Home.tsx
│   ├── App.tsx            # 根组件
│   ├── main.tsx           # 应用入口
│   └── index.css          # 全局样式
├── vercel.json            # Vercel 配置
├── .edgeonerc             # EdgeOne 配置
└── package.json           # 项目配置
```

## 🎨 功能说明

### 运势生成算法
- 基于日期种子的伪随机算法
- 每日固定运势，刷新可重新生成
- 包含宜忌事项、幸运元素等多维度内容

### 数据持久化
- 使用 localStorage 存储每日运势
- 自动检测日期变化，生成新运势
- 支持手动刷新重新生成

### 响应式设计
- 移动端优先的设计理念
- 流畅的触摸交互体验
- 自适应不同屏幕尺寸

## 🔧 自定义配置

### 修改运势数据

编辑 `src/lib/fortuneData.ts` 文件：

```typescript
export const fortuneData = {
  suitableActivities: [...], // 宜做事项
  avoidActivities: [...],    // 忌做事项
  luckyColors: [...],        // 幸运色
  luckyItems: [...],         // 幸运物品
  luckyWords: [...]          // 幸运词
};
```

### 主题定制

项目使用 Tailwind CSS，可在 `tailwind.config.js` 中自定义主题：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // 自定义颜色
      }
    }
  }
}
```

## 🐛 问题排查

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本是否 >= 16
   - 清除 node_modules 重新安装依赖
   - 检查 TypeScript 配置

2. **路由不工作**
   - 确认部署平台支持 SPA 路由
   - 检查 `vercel.json` 重写规则

3. **样式异常**
   - 确认 Tailwind CSS 正确加载
   - 检查 PostCSS 配置

### 开发调试

```bash
# 类型检查
pnpm type-check

# 代码格式化
pnpm format

# 依赖分析
pnpm analyze
```

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！