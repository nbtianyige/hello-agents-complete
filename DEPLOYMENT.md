# 🌍 HelloAgents 智能旅行助手 - 完整版部署指南

> 这是一个真正可用的全栈应用，不是演示版本！

---

## 📋 准备条件

| 要求 | 说明 |
|------|------|
| **Python** | 3.10+ |
| **Node.js** | 16+ |
| **LLM API Key** | OpenAI / DeepSeek / 其他兼容接口 |
| **高德地图 API Key** | Web 服务 API + Web 端 JS API |

---

## 🔑 API Key 获取

### 1️⃣ LLM API Key（二选一即可）

#### Option A: OpenAI
- 注册：https://platform.openai.com/
- 获取 Key: https://platform.openai.com/api-keys

#### Option B: DeepSeek（推荐，中文效果更好）
- 注册：https://cloud.deepseek.com/
- 创建 API Key

### 2️⃣ 高德地图 API Key（两个都需要）

1. **Web 服务 API**（用于后端调用）
   - 控制台：https://console.amap.com/dev/key/app
   - 类型选择："Web 服务"

2. **Web 端 (JS API)**（用于前端地图显示）
   - 控制台：https://console.amap.com/dev/key/app
   - 类型选择："Web 端 (JS API)"

---

## 🚀 快速部署（5 步搞定）

### Step 1: 克隆代码

```bash
git clone https://github.com/nbtianyige/hello-agents-complete.git
cd hello-agents-complete
```

### Step 2: 配置后端环境

```bash
# 进入后端目录
cd backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 复制配置文件
cp .env.example .env

# 编辑.env 文件，填入你的 API Keys
# vi .env  或  nano .env
```

编辑 `.env` 文件内容示例：

```bash
# LLM 配置（使用 DeepSeek）
LLM_MODEL_ID=deepseek-chat
LLM_API_KEY=sk-your-deepseek-api-key-here
LLM_BASE_URL=https://api.deepseek.com

# 或者使用 OpenAI：
# LLM_MODEL_ID=gpt-4o-mini
# LM_API_KEY=sk-your-openai-api-key-here
# LLM_BASE_URL=https://api.openai.com/v1

# 高德地图 Web 服务 API（后端使用）
AMAP_API_KEY=your-amap-web-service-key

# 服务器配置
HOST=0.0.0.0
PORT=8000

# CORS 配置（允许前端访问）
CORS_ORIGINS=http://localhost:5173,http://localhost:3000,https://nbtianyige.github.io
```

### Step 3: 启动后端服务

```bash
# 确保在 backend 目录下且虚拟环境已激活

# 方法 A: 使用 uvicorn 直接启动
uvicorn app.api.main:app --reload --host 0.0.0.0 --port 8000

# 方法 B: 使用提供的脚本
python run.py
```

✅ 成功后会看到：
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

**保持这个终端窗口打开！** 后端服务持续运行中。

---

### Step 4: 启动前端

打开**另一个终端窗口**：

```bash
# 回到项目根目录
cd ..

# 进入前端目录
cd frontend

# 安装依赖
npm install

# 复制环境变量
cp .env.example .env

# 编辑.env（可选，如需修改 API 地址）
# VITE_API_BASE_URL=http://localhost:8000
# VITE_AMAP_WEB_KEY=your-amap-js-api-key

# 启动开发服务器
npm run dev
```

✅ 成功后会看到：
```
VITE v6.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

### Step 5: 开始使用！

在浏览器中打开：**http://localhost:5173/**

🎉 你现在拥有了一个真正可用的 AI 旅行规划助手！

---

## 📊 功能测试清单

| 步骤 | 操作 | 预期结果 |
|------|------|---------|
| 1 | 输入目的地城市 | 可以正常输入 |
| 2 | 设置天数、预算、偏好 | 可以选择 |
| 3 | 点击"生成旅行计划" | 显示加载中... |
| 4 | 等待几秒后 | 展示详细的行程单 |
| 5 | 查看每日安排 | 包含景点、餐厅、交通建议 |
| 6 | 点击下载/分享 | 可导出 PDF |

---

## 🛠️ 故障排查

### 问题 1: 后端启动失败

```bash
# 检查 Python 版本
python --version  # 应该 >= 3.10

# 检查是否激活虚拟环境
which python      # 应该指向 venv/bin/python

# 重新安装依赖
pip install -r requirements.txt --force-reinstall
```

### 问题 2: 前端无法连接后端

```bash
# 检查后端是否在运行
curl http://localhost:8000/docs

# 如果返回 404 或 HTML，说明后端正常
# 如果连接被拒绝，请检查端口
```

### 问题 3: API Key 无效

- 登录对应平台检查 Key 是否正确
- 确认 Key 没有被冻结/过期
- 检查 `.env` 文件中没有多余的空格或换行

### 问题 4: CORS 错误

在 `backend/.env` 中确认：
```bash
CORS_ORIGINS=http://localhost:5173,http://localhost:3000,https://nbtianyige.github.io
```

---

## 🌐 部署到线上（可选）

### 方案 A: Vercel（前端）+ Render/Railway（后端）

**前端（Vercel）:**
```bash
npm install -g vercel
vercel deploy
```

**后端（Render）:**
1. 在 Render.com 创建新服务
2. 选择 GitHub 仓库
3. Build Command: `pip install -r backend/requirements.txt`
4. Start Command: `uvicorn app.api.main:app --host 0.0.0.0 --port $PORT`
5. 添加环境变量（LLM_API_KEY 等）

### 方案 B: Docker 容器化

见 `docker-compose.yml`（需创建）

---

## 💰 API 调用成本估算

| 服务 | 价格 | 单次旅行计划成本 |
|------|------|-----------------|
| **DeepSeek Chat** | ¥0.001/1K tokens | ~¥0.05-0.10 |
| **OpenAI GPT-4o-mini** | $0.00015/1K tokens | ~$0.01-0.02 |
| **高德地图 API** | 免费额度 30 万/天 | 超出后 ¥0.004/次 |

**每月使用几次完全免费！**

---

## 📚 学习资源

- HelloAgents 框架文档: https://github.com/datawhalechina/hello-agents
- 高德开放平台: https://lbs.amap.com/
- FastAPI 官方文档: https://fastapi.tiangolo.com/
- Vue 3 文档: https://vuejs.org/

---

## ❓ 需要帮助？

如果遇到任何问题，可以：
1. 查看后端日志输出
2. 访问 `/docs` 查看 API 文档（后端启动后）
3. 提交 Issue 到 GitHub 仓库

---

**祝你玩得开心！✈️🌍**
