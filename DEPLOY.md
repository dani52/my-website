# 部署指南

推荐两种最简单的部署方式：

---

## 🚀 方式一：Vercel 部署（最推荐）

### 优点
- ✅ 完全免费
- ✅ 自动 HTTPS
- ✅ 全球 CDN 加速
- ✅ 部署最快（1分钟内）

### 步骤

#### 1. 注册 Vercel 账号
访问 https://vercel.com 并使用 GitHub 账号登录

#### 2. 上传项目到 GitHub
1. 创建新的 GitHub 仓库（名称例如：`my-website`）
2. 在 `my-website` 文件夹下运行：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/my-website.git
git push -u origin main
```

#### 3. 在 Vercel 导入项目
1. 进入 Vercel Dashboard
2. 点击 "Import Project"
3. 选择刚才创建的 GitHub 仓库
4. 保持默认设置，点击 "Deploy"
5. 等待 30秒，部署完成！

#### 4. 获取访问链接
部署完成后，你会获得类似 `https://my-website-xxx.vercel.app` 的链接

---

## 🌟 方式二：GitHub Pages 部署（完全免费）

### 优点
- ✅ 完全免费
- ✅ 永久有效
- ✅ 自带 HTTPS

### 步骤

#### 1. 创建 GitHub 仓库
1. 访问 https://github.com/new
2. 仓库名称：`my-website`（或其他你喜欢的名字）
3. 选择 "Public" 或 "Private"
4. **不要勾选** "Initialize this repository with" 任何选项
5. 点击 "Create repository"

#### 2. 上传代码

在 `my-website` 文件夹右键，选择 "Git Bash Here" 或打开 PowerShell，运行：

```bash
# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 推送到 GitHub（替换以下信息）
git remote add origin https://github.com/你的用户名/my-website.git
git branch -M main
git push -u origin main
```

**如果遇到问题**，可以手动上传：
1. 在 GitHub 仓库页面点击 "uploading an existing file"
2. 拖拽 `my-website` 文件夹内的所有文件（不是文件夹本身）
3. 点击 "Commit changes"

#### 3. 启用 GitHub Pages

1. 进入你的 GitHub 仓库 → `Settings`（设置）
2. 左侧菜单找到 `Pages`
3. 在 `Branch` 下拉菜单选择 `main` 或 `gh-pages`
4. 点击 `Save`
5. 等待 1-3 分钟，页面会显示访问链接

#### 4. 访问你的网站
链接格式通常是：
```
https://你的用户名.github.io/my-website/
```

---

## 📝 快速操作：如果不想用 Git

你可以直接用 **Netlify Drop**，超级简单：

1. 访问 https://app.netlify.com/drop
2. 把 `my-website` 文件夹内的所有文件拖拽到网页上
3. 等待 10秒，立即获得访问链接！

---

## 🔐 后台登录信息

不管用哪种方式部署，后台登录地址都是：
```
你的网站地址/admin/login.html
```

默认账号：
- 用户名：`admin`
- 密码：`admin123`

---

## 💡 提示

### 如何更新网站？

**Vercel 方式：**
- 只要推送代码到 GitHub，Vercel 会自动重新部署

**GitHub Pages 方式：**
- 修改文件后重新 `git add`、`git commit`、`git push` 即可

### 数据持久化
因为数据存储在浏览器 LocalStorage，访问者的数据不会同步到你后台，这是正常的。
