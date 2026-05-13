# 个人网站

一个带后台管理的综合性个人网站，采用深色科技感设计风格。

## 功能特性

### 前台展示
- **首页** - 个人介绍、精选项目、最新文章、技能展示
- **作品集** - 项目展示、分类筛选
- **博客** - 文章列表、分类标签、搜索功能
- **关于我** - 个人介绍、工作经历、联系方式

### 后台管理
- **仪表盘** - 数据统计概览
- **文章管理** - 增删改查、Markdown 编辑器、草稿/发布
- **项目管理** - 项目信息、图片上传、精选标记
- **分类管理** - 文章/项目分类管理
- **站点设置** - 个人信息、SEO 配置

## 技术栈

- **前端**: HTML5 + CSS3 + JavaScript (ES6+)
- **样式**: Tailwind CSS (CDN)
- **图标**: Lucide Icons (CDN)
- **Markdown**: marked.js (CDN)
- **代码高亮**: highlight.js (CDN)
- **数据存储**: LocalStorage

## 使用方法

### 本地运行

由于这是纯静态网站，你可以使用任何静态服务器运行：

**使用 Python:**
```bash
cd my-website
python -m http.server 8080
```

**使用 Node.js (http-server):**
```bash
cd my-website
npx http-server -p 8080
```

**使用 VS Code Live Server 插件**

然后访问 http://localhost:8080

### 后台登录

- **默认账号**: admin
- **默认密码**: admin123

登录地址: `/admin/login.html`

### 部署

这个网站可以部署到任何静态托管服务：

- **GitHub Pages** - 免费，推荐
- **Vercel** - 免费，支持自动部署
- **Netlify** - 免费，支持表单功能
- **Cloudflare Pages** - 免费，全球 CDN

#### 部署到 GitHub Pages

1. 创建 GitHub 仓库
2. 上传代码到仓库
3. 进入 Settings > Pages
4. 选择分支（main）和文件夹（/root）
5. 等待部署完成

#### 部署到 Vercel

1. 访问 https://vercel.com
2. 导入 GitHub 仓库
3. 保持默认设置，点击 Deploy
4. 等待部署完成

## 数据说明

所有数据存储在浏览器的 LocalStorage 中：

- `pw_users` - 用户数据
- `pw_posts` - 文章数据
- `pw_projects` - 项目数据
- `pw_categories` - 分类数据
- `pw_siteConfig` - 站点配置

**注意**: 清除浏览器数据会导致所有内容丢失！建议定期导出重要数据。

## 项目结构

```
my-website/
├── index.html              # 首页
├── projects.html           # 作品集
├── blog.html               # 博客列表
├── blog-post.html          # 文章详情
├── about.html              # 关于我
├── admin/
│   ├── login.html          # 登录页
│   ├── index.html          # 仪表盘
│   ├── posts.html          # 文章管理
│   ├── post-edit.html      # 文章编辑
│   ├── projects.html       # 项目管理
│   ├── project-edit.html   # 项目编辑
│   ├── categories.html     # 分类管理
│   └── settings.html       # 站点设置
├── js/
│   ├── utils.js            # 工具函数
│   ├── auth.js             # 认证模块
│   └── data.js             # 数据管理
└── css/
    └── custom.css          # 自定义样式
```

## 自定义配置

### 修改站点信息

登录后台，进入"站点设置"页面，可以修改：
- 站点名称
- 站点描述
- 作者名称
- 作者简介
- 社交链接
- SEO 配置

### 修改主题颜色

编辑 `index.html` 中的 Tailwind 配置：

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                dark: {
                    900: '#0a0a0f',  // 背景色
                    800: '#1e293b',  // 卡片背景
                    700: '#334155',  // 边框色
                }
            }
        }
    }
}
```

### 添加自定义样式

在 `css/custom.css` 中添加自定义 CSS。

## 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 许可证

MIT License
