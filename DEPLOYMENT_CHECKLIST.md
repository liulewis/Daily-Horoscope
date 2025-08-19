# Vercel 部署检查清单

## ✅ 已完成的配置

### 1. Vercel 配置文件
- ✅ 创建了 `vercel.json` 配置文件
- ✅ 配置了正确的构建命令和输出目录
- ✅ 添加了 SPA 路由重写规则

### 2. 服务端渲染兼容性修复
- ✅ 修复了 `useTheme.ts` 中的 `window` 和 `localStorage` 使用
- ✅ 修复了 `useDailyFortune.ts` 中的 `localStorage` 使用
- ✅ 添加了 `typeof window !== 'undefined'` 检查

### 3. 项目结构
- ✅ 正确的 Vite + React + TypeScript 配置
- ✅ Tailwind CSS 配置完整
- ✅ 路由配置正确（React Router）

## ⚠️ 需要注意的问题

### 1. 依赖安装
- TypeScript 错误显示找不到 React 模块
- 需要确保在部署前运行 `pnpm install`

### 2. 环境变量
- 当前项目没有使用环境变量
- 如果需要添加，请在 Vercel 控制台配置

### 3. 构建优化
- 项目使用了 Framer Motion 动画库，可能影响包大小
- 粒子动画效果可能在移动设备上影响性能

## 🚀 部署步骤

1. **推送代码到 Git 仓库**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **连接 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 导入 Git 仓库
   - Vercel 会自动检测到 Vite 项目

3. **部署设置**
   - Framework Preset: Vite
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Install Command: `pnpm install`

4. **验证部署**
   - 检查所有页面是否正常加载
   - 测试运势刷新功能
   - 测试复制功能
   - 检查移动端适配

## 📱 功能测试清单

- [ ] 首页加载正常
- [ ] 运势数据显示正确
- [ ] 刷新功能工作正常
- [ ] 复制功能工作正常
- [ ] 响应式设计在移动端正常
- [ ] 路由跳转正常
- [ ] 动画效果流畅

## 🔧 可选优化

1. **性能优化**
   - 考虑懒加载 Framer Motion
   - 优化粒子动画性能
   - 添加图片压缩

2. **SEO 优化**
   - 添加 meta 标签
   - 配置 Open Graph 标签
   - 添加 favicon

3. **PWA 支持**
   - 添加 Service Worker
   - 配置 manifest.json
   - 支持离线使用