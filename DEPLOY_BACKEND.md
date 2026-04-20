# 🚀 后端部署到 Render（10 分钟完成）

## 步骤

### 1️⃣ 注册/登录 Render
- 访问：https://render.com/
- 用 GitHub 账号一键登录

### 2️⃣ 创建新 Web Service
```
在 Dashboard 点击 "New" → "Web Service"
→ Connect hello-agents-complete 仓库
→ Name: hello-agents-backend
```

### 3️⃣ 配置构建命令
```yaml
Build Command: pip install -r backend/requirements.txt
Start Command: cd backend && uvicorn app.api.main:app --host 0.0.0.0 --port $PORT
```

### 4️⃣ 选择免费套餐
```
Instance Type: Free (0 USD/month)
Region: Singapore (离中国较近)
```

### 5️⃣ 添加环境变量（关键！）

| Key | Value |
|-----|-------|
| `LLM_MODEL_ID` | `deepseek-chat` |
| `LLM_API_KEY` | `sk-你的-deepseek-api-key` |
| `LLM_BASE_URL` | `https://api.deepseek.com` |
| `AMAP_API_KEY` | `你的高德地图 Web 服务 API Key` |
| `HOST` | `0.0.0.0` |
| `LOG_LEVEL` | `INFO` |
| `CORS_ORIGINS` | `https://hello-agents-complete.vercel.app,http://localhost:5173,*` |

### 6️⃣ Deploy!
点击 "Create Web Service"，等待构建完成（约 5-8 分钟）

### 7️⃣ 获取后端 URL
```
https://hello-agents-backend.onrender.com
```

---

## ✅ 验证后端是否运行正常

部署完成后，访问：
```
https://hello-agents-backend.onrender.com/docs
```

应该看到 FastAPI 的 Swagger UI 文档页面。

---

## 🔧 更新代码后

```bash
git add .
git commit -m "Update backend"
git push origin main
```

Render 会自动重新构建并部署新版本。

---

## ⚠️ 注意事项

1. **免费服务休眠**：Render 免费版在无请求 15 分钟后会进入休眠状态，首次请求可能需要 30 秒唤醒
2. **每月额度**：免费套餐每月 750 小时足够个人使用
3. **数据持久性**：免费版没有数据库持久化（本项目不需要数据库，所以没问题）

---

## 🔐 安全提醒

- **不要将 API Keys 提交到 Git**
- 已添加到 `.gitignore` 的文件：`backend/.env`, `backend/**/__pycache__`
- 所有敏感配置都通过 Render 环境变量管理
