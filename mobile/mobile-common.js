// 移动端通用JavaScript函数

// 页面加载完成后执行的初始化函数
document.addEventListener('DOMContentLoaded', function() {
    // 更新状态栏时间
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 60000); // 每分钟更新一次
    
    // 初始化底部导航栏
    initBottomNav();
    
    // 添加通用样式
    addCommonStyles();
    
    // 检测设备类型并添加相应的类
    detectDevice();
    
    // 处理安全区域
    handleSafeArea();
});

// 更新状态栏时间
function updateStatusBarTime() {
    const timeElement = document.querySelector('.status-bar-time');
    if (timeElement) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    }
}

// 初始化底部导航栏
function initBottomNav() {
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        const currentPath = window.location.pathname;
        const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
        
        // 设置当前页面对应的导航项为激活状态
        const navLinks = bottomNav.querySelectorAll('a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === filename || (filename === '' && href === 'index.html') || (filename === 'index.html' && href === 'home.html')) {
                link.classList.add('text-primary');
            } else {
                link.classList.remove('text-primary');
            }
        });
    }
}

// 检测设备类型并添加相应的类
function detectDevice() {
    const html = document.documentElement;
    
    // 检测iOS设备
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
        html.classList.add('ios-device');
    }
    
    // 检测Android设备
    const isAndroid = /Android/.test(navigator.userAgent);
    if (isAndroid) {
        html.classList.add('android-device');
    }
    
    // 检测移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        html.classList.add('mobile-device');
    } else {
        html.classList.add('desktop-device');
    }
}

// 处理安全区域
function handleSafeArea() {
    // 检查是否支持安全区域
    if (CSS.supports('padding-bottom: env(safe-area-inset-bottom)')) {
        document.body.classList.add('has-safe-area');
    }
}

// 模拟加载状态
function simulateLoading(element, callback, time = 1500) {
    if (!element) return;
    
    // 保存原始内容
    const originalContent = element.innerHTML;
    const originalDisabled = element.disabled;
    
    // 显示加载状态
    element.innerHTML = '<span class="loading mr-2"></span> 加载中...';
    element.disabled = true;
    
    // 模拟加载时间
    setTimeout(() => {
        // 恢复按钮状态
        element.innerHTML = originalContent;
        element.disabled = originalDisabled;
        
        // 执行回调
        if (typeof callback === 'function') {
            callback();
        }
    }, time);
}

// 显示提示消息
function showToast(message, type = 'info', duration = 3000) {
    // 创建toast元素
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // 设置内容
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        default:
            icon = '<i class="fas fa-info-circle"></i>';
    }
    
    toast.innerHTML = `
        <div class="toast-content">
            ${icon}
            <span>${message}</span>
        </div>
    `;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // 自动关闭
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, duration);
}

// 显示确认对话框
function showConfirm(title, message, confirmText = '确认', cancelText = '取消') {
    return new Promise((resolve) => {
        // 创建对话框元素
        const modal = document.createElement('div');
        modal.className = 'modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="text-lg font-bold">${title}</h3>
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline cancel-btn">${cancelText}</button>
                    <button class="btn btn-primary confirm-btn">${confirmText}</button>
                </div>
            </div>
        `;
        
        // 添加到页面
        document.body.appendChild(modal);
        
        // 显示对话框
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // 绑定按钮事件
        const cancelBtn = modal.querySelector('.cancel-btn');
        const confirmBtn = modal.querySelector('.confirm-btn');
        
        cancelBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
                resolve(false);
            }, 300);
        });
        
        confirmBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
                resolve(true);
            }, 300);
        });
    });
}

// 切换标签页
function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-button');
    
    // 隐藏所有标签内容
    tabs.forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // 移除所有标签按钮的激活状态
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // 显示选中的标签内容
    const selectedTab = document.getElementById(`tab-${tabId}`);
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
    }
    
    // 激活对应的标签按钮
    const selectedButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
}

// 字数统计
function countWords(inputElement, counterElement, maxLength = 500) {
    if (!inputElement || !counterElement) return;
    
    // 更新字数显示
    function updateCounter() {
        const text = inputElement.value || '';
        const count = text.length;
        
        // 更新计数器
        counterElement.textContent = `${count}/${maxLength}`;
        
        // 根据字数设置样式
        if (count > maxLength) {
            counterElement.classList.add('text-danger');
        } else {
            counterElement.classList.remove('text-danger');
        }
    }
    
    // 初始更新
    updateCounter();
    
    // 监听输入事件
    inputElement.addEventListener('input', updateCounter);
    
    // 限制最大字数
    inputElement.addEventListener('keydown', function(e) {
        const text = inputElement.value || '';
        if (text.length >= maxLength && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
            e.preventDefault();
        }
    });
}

// 添加通用样式
function addCommonStyles() {
    // 添加Toast样式
    if (!document.getElementById('common-toast-styles')) {
        const style = document.createElement('style');
        style.id = 'common-toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                top: 16px;
                left: 50%;
                transform: translateX(-50%) translateY(-20px);
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                padding: 12px 16px;
                z-index: 1000;
                opacity: 0;
                transition: all 0.3s ease;
                max-width: 90%;
            }
            
            .toast.show {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            
            .toast-content {
                display: flex;
                align-items: center;
            }
            
            .toast-content i {
                margin-right: 8px;
            }
            
            .toast-info i {
                color: var(--info-color);
            }
            
            .toast-success i {
                color: var(--success-color);
            }
            
            .toast-warning i {
                color: var(--warning-color);
            }
            
            .toast-error i {
                color: var(--danger-color);
            }
            
            .loading {
                display: inline-block;
                width: 16px;
                height: 16px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: white;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                to {
                    transform: rotate(360deg);
                }
            }
            
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .modal.show {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-content {
                width: 85%;
                max-width: 320px;
                background-color: white;
                border-radius: 12px;
                overflow: hidden;
                transform: scale(0.9);
                transition: all 0.3s ease;
            }
            
            .modal.show .modal-content {
                transform: scale(1);
            }
            
            .modal-header {
                padding: 16px;
                border-bottom: 1px solid var(--border-light);
            }
            
            .modal-body {
                padding: 24px 16px;
            }
            
            .modal-footer {
                padding: 16px;
                display: flex;
                justify-content: flex-end;
                gap: 8px;
                border-top: 1px solid var(--border-light);
            }
        `;
        document.head.appendChild(style);
    }
    
    // 添加加载动画样式
    if (!document.getElementById('common-loading-styles')) {
        const style = document.createElement('style');
        style.id = 'common-loading-styles';
        style.textContent = `
            .page-loading {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(255, 255, 255, 0.8);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }
            
            .page-loading-spinner {
                width: 40px;
                height: 40px;
                border: 4px solid rgba(79, 70, 229, 0.2);
                border-radius: 50%;
                border-top-color: var(--primary-color);
                animation: spin 1s linear infinite;
            }
            
            .page-loading-text {
                margin-top: 16px;
                font-size: 14px;
                color: var(--text-secondary);
            }
        `;
        document.head.appendChild(style);
    }
}

// 显示页面加载动画
function showPageLoading(message = '加载中...') {
    // 创建加载元素
    const loading = document.createElement('div');
    loading.className = 'page-loading';
    loading.id = 'page-loading';
    
    loading.innerHTML = `
        <div class="page-loading-spinner"></div>
        <div class="page-loading-text">${message}</div>
    `;
    
    // 添加到页面
    document.body.appendChild(loading);
}

// 隐藏页面加载动画
function hidePageLoading() {
    const loading = document.getElementById('page-loading');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loading);
        }, 300);
    }
}

// 防抖函数
function debounce(func, wait = 300) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// 节流函数
function throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 获取URL参数
function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// 格式化日期
function formatDate(date, format = 'YYYY-MM-DD') {
    if (!date) return '';
    
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const seconds = d.getSeconds().toString().padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

// 格式化数字（如：1000 -> 1k）
function formatNumber(num) {
    if (num < 1000) return num;
    if (num < 10000) return (num / 1000).toFixed(1) + 'k';
    if (num < 1000000) return (num / 10000).toFixed(1) + 'w';
    return (num / 1000000).toFixed(1) + 'm';
}

// 复制文本到剪贴板
function copyToClipboard(text) {
    return new Promise((resolve, reject) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    showToast('复制成功', 'success');
                    resolve(true);
                })
                .catch(err => {
                    showToast('复制失败', 'error');
                    console.error('复制失败:', err);
                    reject(err);
                });
        } else {
            // 兼容不支持clipboard API的浏览器
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                const successful = document.execCommand('copy');
                document.body.removeChild(textarea);
                
                if (successful) {
                    showToast('复制成功', 'success');
                    resolve(true);
                } else {
                    showToast('复制失败', 'error');
                    reject(new Error('复制失败'));
                }
            } catch (err) {
                document.body.removeChild(textarea);
                showToast('复制失败', 'error');
                console.error('复制失败:', err);
                reject(err);
            }
        }
    });
}

// 导出函数
window.updateStatusBarTime = updateStatusBarTime;
window.simulateLoading = simulateLoading;
window.showToast = showToast;
window.showConfirm = showConfirm;
window.switchTab = switchTab;
window.countWords = countWords;
window.showPageLoading = showPageLoading;
window.hidePageLoading = hidePageLoading;
window.debounce = debounce;
window.throttle = throttle;
window.getUrlParam = getUrlParam;
window.formatDate = formatDate;
window.formatNumber = formatNumber;
window.copyToClipboard = copyToClipboard; 