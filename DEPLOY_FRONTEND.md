# 🚀 前端部署到 Vercel（5 分钟完成）

## 步骤

### 1️⃣ 注册/登录 Vercel
- 访问：https://vercel.com/
- 用 GitHub 账号一键登录

### 2️⃣ 创建新项目
```
在 Vercel 控制台点击 "Add New" → "Project"
→ Import Git Repository → 选择 hello-agents-complete
→ Framework Preset: Vue.js
```

### 3️⃣ 配置环境变量（重要！）

在 Vercel 项目设置中添加以下变量：

```bash
# API 配置
VITE_API_BASE_URL=https://your-backend-url.onrender.com  # 填 Render 的后端 URL
VITE_AMAP_WEB_KEY=你的高德地图 JS API Key

# 可选
VITE_AMAP_WEB_JS_KEY=你的高德地图 Web 端 JS API Key
```

### 4️⃣ 修改 Root Directory
```
Settings → General → Root Directory
设置为: frontend
```

### 5️⃣ Deploy!
点击 Deploy，等待构建完成（约 2-3 分钟）

### 6️⃣ 获取前端 URL
```
https://hello-agents-complete.vercel.app
```

---

## ⚠️ 注意事项

1. **API Base URL** 必须指向你后端的 Render URL（完成后填写）
2. **首次部署**可能慢一些，之后更新代码会自动重新部署
3. **免费额度**：无限静态站点，足够个人使用

---

## 🔧 后续更新

修改代码后直接 push 到 GitHub，Vercel 会自动重新部署：

```bash
git add .
git commit -m "Update frontend"
git push origin main
```
