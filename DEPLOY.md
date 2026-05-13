# GitHub Pages 部署指南

这个指南将帮助你将个人网站部署到 GitHub Pages，完全免费！

## 前置准备

确保你已经安装了：
- Git（[下载地址](https://git-scm.com/downloads)）
- GitHub 账号

---

## 步骤 1：初始化 Git 仓库

在项目目录中打开命令行，运行：

```bash
cd "g:\study\TRAE SOLO CN\project\my\my-website"
git init
```

---

## 步骤 2：创建 GitHub 仓库

1. 访问 https://github.com/new
2. **Repository name**：输入仓库名称，例如：`my-website` 或 `personal-website`
3. **Description**（可选）：输入仓库描述，例如："我的个人网站，带后台管理"
4. 选择 **Public**（公开）或 **Private**（私有）
   - Public：完全免费，所有人可以查看
   - Private：免费，但其他人不能查看
5. **不要勾选** "Initialize this repository with" 下面的任何选项
6. 点击 **Create repository**

---

## 步骤 3：推送代码到 GitHub

创建仓库后，GitHub 会显示设置指南。根据你是否已经设置过 Git，选择下面一种方式：

### 方式 A：首次使用 Git（推荐）

在命令行中运行：

```bash
# 配置你的用户信息（只需要做一次）
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"

# 添加所有文件
git add .

# 创建提交
git commit -m "Initial commit - 个人网站"

# 关联远程仓库（将 YOUR_USERNAME 替换为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/my-website.git

# 重命名分支为 main
git branch -M main

# 推送到 GitHub
git push -u origin main
```

### 方式 B：已有 Git 配置

如果之前已经配置过 Git，直接运行：

```bash
git add .
git commit -m "Initial commit - 个人网站"
git remote add origin https://github.com/YOUR_USERNAME/my-website.git
git branch -M main
git push -u origin main
```

---

## 步骤 4：启用 GitHub Pages

1. 进入你的 GitHub 仓库页面
2. 点击顶部的 **Settings** 标签
3. 在左侧菜单中找到 **Pages**（在 "Code and automation" 下面）
4. 在 **Build and deployment** 部分：
   - **Source**：选择 `Deploy from a branch`
   - **Branch**：选择 `main` 分支
   - **Folder**：选择 `/ (root)`
5. 点击 **Save**
6. 等待 1-2 分钟，页面会刷新，显示部署状态

---

## 步骤 5：访问你的网站

部署成功后，GitHub 会显示你的网站地址：

- 格式：`https://YOUR_USERNAME.github.io/my-website/`
- 或者：`https://YOUR_USERNAME.github.io/仓库名/`

点击链接即可访问你的网站！

---

## 更新网站

以后你修改了代码，只需要运行：

```bash
git add .
git commit -m "更新描述"
git push
```

GitHub Pages 会自动重新部署，通常只需要几秒钟。

---

## 常见问题

### Q: 推送时提示需要登录？

**A:** GitHub 现在不再支持密码登录，你需要使用 Personal Access Token。

获取 Token 的方法：
1. GitHub → 点击头像 → Settings
2. 左侧菜单 → Developer settings → Personal access tokens → Tokens (classic)
3. 点击 **Generate new token** → Generate new token (classic)
4. 勾选 `repo` 权限
5. 点击 Generate token
6. 复制这个 Token（只显示一次！）
7. 推送时，用户名输入你的 GitHub 用户名，密码输入这个 Token

### Q: 可以使用自定义域名吗？

**A:** 可以！在 Settings > Pages 页面，底部有 Custom domain 选项。

### Q: 后台管理还能用吗？

**A:** 可以！后台地址是 `https://你的域名/admin/login.html`，登录信息不变。

**注意**：数据保存在 LocalStorage 中，不同设备/浏览器的数据不互通。

### Q: 部署后数据会保留吗？

**A:** 部署只更新代码，数据保存在浏览器本地，不会受影响。

### Q: 如何备份数据？

**A:** 在后台的仪表盘页面，你可以导出数据（如果功能已实现），或者在浏览器开发者工具 → Application → Local Storage 中手动复制。

---

## 其他部署方式

如果你不想用 GitHub Pages，也可以试试：

- **Vercel**：https://vercel.com - 导入 GitHub 仓库，一键部署
- **Netlify**：https://netlify.com - 拖拽上传或连接 GitHub
- **Cloudflare Pages**：https://pages.cloudflare.com - 全球 CDN，速度快

---

## 需要帮助？

如果遇到问题，可以：
1. 查看 GitHub Pages 文档：https://pages.github.com
2. 或者向我提问！
