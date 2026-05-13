// 工具函数模块

// 生成 UUID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// 生成 URL 友好的 slug
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

// 格式化日期
function formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes);
}

// 防抖函数
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// 节流函数
function throttle(fn, delay) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= delay) {
            fn.apply(this, args);
            lastTime = now;
        }
    };
}

// LocalStorage 操作
function storageGet(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error('Storage get error:', e);
        return defaultValue;
    }
}

function storageSet(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error('Storage set error:', e);
        return false;
    }
}

function storageRemove(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error('Storage remove error:', e);
        return false;
    }
}

// SessionStorage 操作
function sessionGet(key, defaultValue = null) {
    try {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error('Session get error:', e);
        return defaultValue;
    }
}

function sessionSet(key, value) {
    try {
        sessionStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error('Session set error:', e);
        return false;
    }
}

function sessionRemove(key) {
    try {
        sessionStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error('Session remove error:', e);
        return false;
    }
}

// 文件转 Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// 压缩图片
function compressImage(base64, maxWidth = 1200) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            let width = img.width;
            let height = img.height;
            
            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }
            
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            
            resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.src = base64;
    });
}

// XSS 过滤
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 复制到剪贴板
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Copy failed:', err);
        return false;
    }
}

// 显示 Toast 提示
function showToast(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-y-20 opacity-0 z-50 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
    } text-white`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-20', 'opacity-0');
    });
    
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// 确认对话框
function confirmDialog(message) {
    return new Promise((resolve) => {
        const dialog = document.createElement('div');
        dialog.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
        dialog.innerHTML = `
            <div class="bg-[#1e293b] rounded-xl p-6 max-w-md w-full mx-4 border border-[#334155]">
                <p class="text-white mb-6">${escapeHtml(message)}</p>
                <div class="flex justify-end gap-3">
                    <button class="cancel-btn px-4 py-2 rounded-lg bg-[#334155] text-white hover:bg-[#475569] transition-colors">
                        取消
                    </button>
                    <button class="confirm-btn px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                        确认
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        dialog.querySelector('.cancel-btn').addEventListener('click', () => {
            dialog.remove();
            resolve(false);
        });
        
        dialog.querySelector('.confirm-btn').addEventListener('click', () => {
            dialog.remove();
            resolve(true);
        });
        
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.remove();
                resolve(false);
            }
        });
    });
}

// 滚动到元素
function scrollToElement(selector, offset = 80) {
    const element = document.querySelector(selector);
    if (element) {
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

// 观察元素进入视口
function observeElement(element, callback, options = {}) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
                if (!options.repeat) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px'
    });
    
    observer.observe(element);
    return observer;
}

// 初始化页面动画
function initPageAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => {
        el.classList.add('opacity-0', 'translate-y-8');
        observeElement(el, (target) => {
            target.classList.remove('opacity-0', 'translate-y-8');
            target.classList.add('animate-fade-in-up');
        });
    });
}

// 计算阅读时间
function calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const text = content.replace(/[#*`\[\]()]/g, '');
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
}

// 导出函数
window.Utils = {
    generateUUID,
    slugify,
    formatDate,
    debounce,
    throttle,
    storageGet,
    storageSet,
    storageRemove,
    sessionGet,
    sessionSet,
    sessionRemove,
    fileToBase64,
    compressImage,
    escapeHtml,
    copyToClipboard,
    showToast,
    confirmDialog,
    scrollToElement,
    observeElement,
    initPageAnimations,
    calculateReadingTime
};
