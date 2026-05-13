// 数据管理模块

// Storage Keys
const KEYS = {
    USERS: 'pw_users',
    POSTS: 'pw_posts',
    PROJECTS: 'pw_projects',
    CATEGORIES: 'pw_categories',
    TAGS: 'pw_tags',
    SITE_CONFIG: 'pw_siteConfig'
};

// 初始化默认数据
function initDefaultData() {
    // 初始化分类
    const categories = storageGet(KEYS.CATEGORIES, []);
    if (categories.length === 0) {
        const defaultCategories = [
            { id: generateUUID(), name: '技术', slug: 'tech', description: '技术相关文章', type: 'post' },
            { id: generateUUID(), name: '生活', slug: 'life', description: '生活随笔', type: 'post' },
            { id: generateUUID(), name: 'Web应用', slug: 'web-app', description: 'Web应用程序', type: 'project' },
            { id: generateUUID(), name: '移动应用', slug: 'mobile-app', description: '移动应用程序', type: 'project' },
            { id: generateUUID(), name: '开源项目', slug: 'open-source', description: '开源贡献', type: 'project' }
        ];
        storageSet(KEYS.CATEGORIES, defaultCategories);
    }

    // 初始化站点配置
    const siteConfig = storageGet(KEYS.SITE_CONFIG);
    if (!siteConfig) {
        const defaultConfig = {
            siteName: '我的个人网站',
            siteDescription: '一个展示作品和分享技术的个人空间',
            authorName: '你的名字',
            authorBio: '全栈开发者，热爱技术和设计',
            authorAvatar: '',
            authorTitle: '全栈开发工程师',
            authorLocation: '北京, 中国',
            authorEmail: 'your@email.com',
            // 个人介绍（首页 Hero 区域）
            hero: {
                title: '你好，我是',
                subtitle: '用代码创造无限可能',
                description: '我是一名全栈开发者，专注于构建优雅、高性能的 Web 应用',
                ctaText: '查看我的作品',
                ctaLink: 'projects.html'
            },
            // 技能
            skills: [
                { name: 'JavaScript', level: 95 },
                { name: 'React', level: 90 },
                { name: 'Node.js', level: 85 },
                { name: 'Vue.js', level: 80 },
                { name: 'TypeScript', level: 85 },
                { name: 'Python', level: 75 }
            ],
            // 工作经历
            experiences: [
                {
                    company: '某科技公司',
                    position: '高级前端工程师',
                    startDate: '2022-01',
                    endDate: '至今',
                    description: '负责产品的前端架构设计和核心功能开发'
                },
                {
                    company: '某创业公司',
                    position: '全栈开发工程师',
                    startDate: '2020-06',
                    endDate: '2021-12',
                    description: '从零搭建产品技术栈，从前端到后端全流程开发'
                }
            ],
            // 教育经历
            education: [
                {
                    school: '某大学',
                    degree: '计算机科学学士',
                    startDate: '2016-09',
                    endDate: '2020-06',
                    description: '主修计算机科学与技术'
                }
            ],
            // 社交媒体链接
            socialLinks: {
                github: 'https://github.com/yourusername',
                twitter: '',
                linkedin: '',
                weibo: '',
                zhihu: '',
                email: 'your@email.com'
            },
            // SEO
            seo: {
                title: '我的个人网站',
                description: '一个展示作品和分享技术的个人空间',
                keywords: '个人网站,博客,作品集'
            },
            // 页脚
            footer: {
                copyright: '© 2024 你的名字. All rights reserved.',
                extraLinks: []
            }
        };
        storageSet(KEYS.SITE_CONFIG, defaultConfig);
    }
}

// ==================== 文章操作 ====================

function getPosts(filters = {}) {
    let posts = storageGet(KEYS.POSTS, []);
    
    // 按发布状态筛选
    if (filters.published !== undefined) {
        posts = posts.filter(p => p.published === filters.published);
    }
    
    // 按分类筛选
    if (filters.category) {
        posts = posts.filter(p => p.categories.includes(filters.category));
    }
    
    // 按标签筛选
    if (filters.tag) {
        posts = posts.filter(p => p.tags.some(t => t.slug === filters.tag));
    }
    
    // 搜索
    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        posts = posts.filter(p => 
            p.title.toLowerCase().includes(searchLower) ||
            p.content.toLowerCase().includes(searchLower) ||
            p.excerpt?.toLowerCase().includes(searchLower)
        );
    }
    
    // 排序
    const sortBy = filters.sortBy || 'createdAt';
    const sortOrder = filters.sortOrder || 'desc';
    posts.sort((a, b) => {
        const aVal = new Date(a[sortBy]);
        const bVal = new Date(b[sortBy]);
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });
    
    // 分页
    if (filters.page && filters.limit) {
        const start = (filters.page - 1) * filters.limit;
        const end = start + filters.limit;
        return {
            posts: posts.slice(start, end),
            total: posts.length,
            page: filters.page,
            totalPages: Math.ceil(posts.length / filters.limit)
        };
    }
    
    return { posts, total: posts.length };
}

function getPostBySlug(slug) {
    const posts = storageGet(KEYS.POSTS, []);
    return posts.find(p => p.slug === slug) || null;
}

function getPostById(id) {
    const posts = storageGet(KEYS.POSTS, []);
    return posts.find(p => p.id === id) || null;
}

function createPost(data) {
    const posts = storageGet(KEYS.POSTS, []);
    
    // 检查 slug 是否已存在
    if (posts.some(p => p.slug === data.slug)) {
        return { success: false, message: '文章链接已存在' };
    }
    
    const newPost = {
        id: generateUUID(),
        ...data,
        views: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    posts.push(newPost);
    storageSet(KEYS.POSTS, posts);
    
    return { success: true, post: newPost };
}

function updatePost(id, data) {
    const posts = storageGet(KEYS.POSTS, []);
    const index = posts.findIndex(p => p.id === id);
    
    if (index === -1) {
        return { success: false, message: '文章不存在' };
    }
    
    // 检查 slug 是否与其他文章冲突
    if (data.slug && data.slug !== posts[index].slug) {
        if (posts.some(p => p.slug === data.slug && p.id !== id)) {
            return { success: false, message: '文章链接已存在' };
        }
    }
    
    posts[index] = {
        ...posts[index],
        ...data,
        updatedAt: new Date().toISOString()
    };
    
    storageSet(KEYS.POSTS, posts);
    return { success: true, post: posts[index] };
}

function deletePost(id) {
    const posts = storageGet(KEYS.POSTS, []);
    const filtered = posts.filter(p => p.id !== id);
    
    if (filtered.length === posts.length) {
        return { success: false, message: '文章不存在' };
    }
    
    storageSet(KEYS.POSTS, filtered);
    return { success: true };
}

function incrementPostViews(slug) {
    const posts = storageGet(KEYS.POSTS, []);
    const index = posts.findIndex(p => p.slug === slug);
    
    if (index !== -1) {
        posts[index].views = (posts[index].views || 0) + 1;
        storageSet(KEYS.POSTS, posts);
    }
}

// ==================== 项目操作 ====================

function getProjects(filters = {}) {
    let projects = storageGet(KEYS.PROJECTS, []);
    
    // 按精选筛选
    if (filters.featured !== undefined) {
        projects = projects.filter(p => p.featured === filters.featured);
    }
    
    // 按分类筛选
    if (filters.category) {
        projects = projects.filter(p => p.categoryId === filters.category);
    }
    
    // 搜索
    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        projects = projects.filter(p => 
            p.title.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower) ||
            p.techStack.some(t => t.toLowerCase().includes(searchLower))
        );
    }
    
    // 排序
    projects.sort((a, b) => (a.order || 0) - (b.order || 0));
    
    return projects;
}

function getProjectBySlug(slug) {
    const projects = storageGet(KEYS.PROJECTS, []);
    return projects.find(p => p.slug === slug) || null;
}

function getProjectById(id) {
    const projects = storageGet(KEYS.PROJECTS, []);
    return projects.find(p => p.id === id) || null;
}

function createProject(data) {
    const projects = storageGet(KEYS.PROJECTS, []);
    
    // 检查 slug 是否已存在
    if (projects.some(p => p.slug === data.slug)) {
        return { success: false, message: '项目链接已存在' };
    }
    
    const newProject = {
        id: generateUUID(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    projects.push(newProject);
    storageSet(KEYS.PROJECTS, projects);
    
    return { success: true, project: newProject };
}

function updateProject(id, data) {
    const projects = storageGet(KEYS.PROJECTS, []);
    const index = projects.findIndex(p => p.id === id);
    
    if (index === -1) {
        return { success: false, message: '项目不存在' };
    }
    
    // 检查 slug 是否与其他项目冲突
    if (data.slug && data.slug !== projects[index].slug) {
        if (projects.some(p => p.slug === data.slug && p.id !== id)) {
            return { success: false, message: '项目链接已存在' };
        }
    }
    
    projects[index] = {
        ...projects[index],
        ...data,
        updatedAt: new Date().toISOString()
    };
    
    storageSet(KEYS.PROJECTS, projects);
    return { success: true, project: projects[index] };
}

function deleteProject(id) {
    const projects = storageGet(KEYS.PROJECTS, []);
    const filtered = projects.filter(p => p.id !== id);
    
    if (filtered.length === projects.length) {
        return { success: false, message: '项目不存在' };
    }
    
    storageSet(KEYS.PROJECTS, filtered);
    return { success: true };
}

// ==================== 分类操作 ====================

function getCategories(type = null) {
    const categories = storageGet(KEYS.CATEGORIES, []);
    if (type) {
        return categories.filter(c => c.type === type);
    }
    return categories;
}

function getCategoryById(id) {
    const categories = storageGet(KEYS.CATEGORIES, []);
    return categories.find(c => c.id === id) || null;
}

function getCategoryBySlug(slug) {
    const categories = storageGet(KEYS.CATEGORIES, []);
    return categories.find(c => c.slug === slug) || null;
}

function createCategory(data) {
    const categories = storageGet(KEYS.CATEGORIES, []);
    
    // 检查 slug 是否已存在
    if (categories.some(c => c.slug === data.slug)) {
        return { success: false, message: '分类链接已存在' };
    }
    
    const newCategory = {
        id: generateUUID(),
        ...data
    };
    
    categories.push(newCategory);
    storageSet(KEYS.CATEGORIES, categories);
    
    return { success: true, category: newCategory };
}

function updateCategory(id, data) {
    const categories = storageGet(KEYS.CATEGORIES, []);
    const index = categories.findIndex(c => c.id === id);
    
    if (index === -1) {
        return { success: false, message: '分类不存在' };
    }
    
    // 检查 slug 是否与其他分类冲突
    if (data.slug && data.slug !== categories[index].slug) {
        if (categories.some(c => c.slug === data.slug && c.id !== id)) {
            return { success: false, message: '分类链接已存在' };
        }
    }
    
    categories[index] = { ...categories[index], ...data };
    storageSet(KEYS.CATEGORIES, categories);
    
    return { success: true, category: categories[index] };
}

function deleteCategory(id) {
    const categories = storageGet(KEYS.CATEGORIES, []);
    const filtered = categories.filter(c => c.id !== id);
    
    if (filtered.length === categories.length) {
        return { success: false, message: '分类不存在' };
    }
    
    storageSet(KEYS.CATEGORIES, filtered);
    return { success: true };
}

// ==================== 站点配置操作 ====================

function getSiteConfig() {
    return storageGet(KEYS.SITE_CONFIG, {});
}

function updateSiteConfig(data) {
    const config = storageGet(KEYS.SITE_CONFIG, {});
    const updated = { ...config, ...data };
    storageSet(KEYS.SITE_CONFIG, updated);
    return { success: true, config: updated };
}

// ==================== 统计信息 ====================

function getStats() {
    const posts = storageGet(KEYS.POSTS, []);
    const projects = storageGet(KEYS.PROJECTS, []);
    const categories = storageGet(KEYS.CATEGORIES, []);
    
    return {
        totalPosts: posts.length,
        publishedPosts: posts.filter(p => p.published).length,
        draftPosts: posts.filter(p => !p.published).length,
        totalProjects: projects.length,
        featuredProjects: projects.filter(p => p.featured).length,
        totalCategories: categories.length,
        totalViews: posts.reduce((sum, p) => sum + (p.views || 0), 0)
    };
}

// 导出
window.Data = {
    KEYS,
    initDefaultData,
    // 文章
    getPosts,
    getPostBySlug,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    incrementPostViews,
    // 项目
    getProjects,
    getProjectBySlug,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    // 分类
    getCategories,
    getCategoryById,
    getCategoryBySlug,
    createCategory,
    updateCategory,
    deleteCategory,
    // 配置
    getSiteConfig,
    updateSiteConfig,
    // 统计
    getStats
};
