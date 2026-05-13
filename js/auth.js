// 认证模块

const AUTH_TOKEN_KEY = 'pw_auth_token';
const USER_KEY = 'pw_user';

// 简单的密码哈希（兼容 HTTP 环境）
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // 转换为 32 位整数
    }
    return Math.abs(hash).toString(16);
}

// Base64 编码（兼容所有浏览器）
function base64Encode(str) {
    try {
        return btoa(unescape(encodeURIComponent(str)));
    } catch (e) {
        return btoa(str);
    }
}

// Base64 解码
function base64Decode(str) {
    try {
        return decodeURIComponent(escape(atob(str)));
    } catch (e) {
        return atob(str);
    }
}

// 生成 Token（简化版）
function generateToken(user) {
    const header = base64Encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = base64Encode(JSON.stringify({
        sub: user.id,
        username: user.username,
        name: user.name,
        iat: Date.now(),
        exp: Date.now() + 24 * 60 * 60 * 1000
    }));
    const signature = base64Encode(`${header}.${payload}.${generateUUID()}`);
    return `${header}.${payload}.${signature}`;
}

// 解析 Token
function parseToken(token) {
    try {
        const [, payload] = token.split('.');
        return JSON.parse(base64Decode(payload));
    } catch (e) {
        return null;
    }
}

// 检查 Token 是否过期
function isTokenExpired(token) {
    const payload = parseToken(token);
    if (!payload || !payload.exp) return true;
    return Date.now() > payload.exp;
}

// 登录
function login(username, password) {
    const users = storageGet('pw_users', []);
    const hashedPassword = hashPassword(password);
    
    const user = users.find(u => u.username === username && u.password === hashedPassword);
    
    if (!user) {
        return { success: false, message: '用户名或密码错误' };
    }
    
    const token = generateToken(user);
    sessionSet(AUTH_TOKEN_KEY, token);
    
    // 不存储密码
    const { password: _, ...userWithoutPassword } = user;
    sessionSet(USER_KEY, userWithoutPassword);
    
    return { success: true, user: userWithoutPassword };
}

// 登出
function logout() {
    sessionRemove(AUTH_TOKEN_KEY);
    sessionRemove(USER_KEY);
}

// 检查是否已登录
function checkAuth() {
    const token = sessionGet(AUTH_TOKEN_KEY);
    if (!token || isTokenExpired(token)) {
        logout();
        return false;
    }
    return true;
}

// 获取当前用户
function getCurrentUser() {
    if (!checkAuth()) return null;
    return sessionGet(USER_KEY);
}

// 创建初始管理员账号
function initDefaultUser() {
    const users = storageGet('pw_users', []);
    
    if (users.length === 0) {
        const defaultUser = {
            id: generateUUID(),
            username: 'admin',
            password: hashPassword('admin123'),
            name: '管理员',
            email: '',
            avatar: '',
            bio: '网站管理员',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        storageSet('pw_users', [defaultUser]);
        console.log('默认管理员账号已创建: admin / admin123');
    }
}

// 更新用户信息
function updateUser(userId, data) {
    const users = storageGet('pw_users', []);
    const index = users.findIndex(u => u.id === userId);
    
    if (index === -1) {
        return { success: false, message: '用户不存在' };
    }
    
    // 如果要更新密码，需要哈希
    if (data.password) {
        data.password = hashPassword(data.password);
    }
    
    users[index] = {
        ...users[index],
        ...data,
        updatedAt: new Date().toISOString()
    };
    
    storageSet('pw_users', users);
    
    // 更新当前会话
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
        const { password: _, ...userWithoutPassword } = users[index];
        sessionSet(USER_KEY, userWithoutPassword);
    }
    
    return { success: true, user: users[index] };
}

// 更改密码
function changePassword(userId, oldPassword, newPassword) {
    const users = storageGet('pw_users', []);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        return { success: false, message: '用户不存在' };
    }
    
    const hashedOldPassword = hashPassword(oldPassword);
    if (user.password !== hashedOldPassword) {
        return { success: false, message: '原密码错误' };
    }
    
    return updateUser(userId, { password: newPassword });
}

// 保护路由（在后台页面调用）
function protectRoute() {
    if (!checkAuth()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// 导出
window.Auth = {
    hashPassword,
    login,
    logout,
    checkAuth,
    getCurrentUser,
    initDefaultUser,
    updateUser,
    changePassword,
    protectRoute
};
