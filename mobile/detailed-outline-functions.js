// 章节细纲页面函数

document.addEventListener('DOMContentLoaded', function() {
    // 更新状态栏时间
    updateStatusBarTime();
    
    // 初始化步骤条滚动
    initStepsScroller();
    
    // 初始化章节细纲编辑器
    initDetailedOutlineEditor();
    
    // 绑定按钮事件
    bindButtonEvents();
});

// 初始化步骤条滚动
function initStepsScroller() {
    const scroller = document.getElementById('steps-scroller');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    const activeStep = document.querySelector('.step-item.active');
    
    // 检查是否需要显示左右箭头
    function checkArrows() {
        if (scroller.scrollLeft > 20) {
            scrollLeftBtn.classList.remove('hidden');
        } else {
            scrollLeftBtn.classList.add('hidden');
        }
        
        if (scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 20) {
            scrollRightBtn.classList.add('hidden');
        } else {
            scrollRightBtn.classList.remove('hidden');
        }
    }
    
    // 初始滚动到活动步骤
    if (activeStep) {
        setTimeout(() => {
            activeStep.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        }, 300);
    }
    
    // 左右滚动按钮
    scrollLeftBtn.addEventListener('click', function() {
        scroller.scrollBy({
            left: -120,
            behavior: 'smooth'
        });
    });
    
    scrollRightBtn.addEventListener('click', function() {
        scroller.scrollBy({
            left: 120,
            behavior: 'smooth'
        });
    });
    
    // 监听滚动事件，控制箭头显示
    scroller.addEventListener('scroll', checkArrows);
    
    // 初始触发一次滚动事件来设置箭头状态
    checkArrows();
}

// 初始化章节细纲编辑器
function initDetailedOutlineEditor() {
    // 获取当前章节和场景
    updateChapterInfo();
    
    // 更新场景列表
    updateSceneList();
    
    // 更新场景编辑器
    updateSceneEditor();
    
    // 更新导航按钮状态
    updateNavigationButtons();
}

// 更新章节信息
function updateChapterInfo() {
    const currentChapter = window.detailedOutlineData.getCurrentChapter();
    
    // 更新章节标题和摘要
    document.getElementById('chapter-title').textContent = currentChapter.title;
    document.getElementById('chapter-summary').textContent = currentChapter.summary;
}

// 更新场景列表
function updateSceneList() {
    const currentChapter = window.detailedOutlineData.getCurrentChapter();
    const currentScene = window.detailedOutlineData.getCurrentScene();
    const sceneListContainer = document.getElementById('scene-list');
    
    // 清空场景列表
    sceneListContainer.innerHTML = '';
    
    // 如果没有场景，显示提示信息
    if (currentChapter.scenes.length === 0) {
        sceneListContainer.innerHTML = `
            <div class="text-center p-4 text-gray-500">
                <i class="fas fa-info-circle mr-2"></i> 当前章节没有场景，请添加新场景
            </div>
        `;
        return;
    }
    
    // 添加场景卡片
    currentChapter.scenes.forEach(scene => {
        const isSelected = currentScene && scene.id === currentScene.id;
        
        const sceneCard = document.createElement('div');
        sceneCard.className = `scene-card ${isSelected ? 'selected' : ''}`;
        sceneCard.dataset.sceneId = scene.id;
        
        sceneCard.innerHTML = `
            <div class="scene-header">
                <div class="scene-title">${scene.title}</div>
                <div class="scene-actions">
                    <button class="scene-action-btn edit-scene-btn" data-scene-id="${scene.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="scene-action-btn delete-scene-btn" data-scene-id="${scene.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="scene-content line-clamp-2">${scene.events || '暂无内容'}</div>
            <div class="scene-meta">
                <div class="scene-meta-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${scene.setting || '未设置'}</span>
                </div>
                <div class="scene-meta-item">
                    <i class="fas fa-users"></i>
                    <span>${scene.characters || '未设置'}</span>
                </div>
            </div>
        `;
        
        // 点击场景卡片选择场景
        sceneCard.addEventListener('click', function(e) {
            // 如果点击的是编辑或删除按钮，不触发选择场景
            if (e.target.closest('.scene-action-btn')) {
                return;
            }
            
            selectScene(scene.id);
        });
        
        sceneListContainer.appendChild(sceneCard);
    });
    
    // 绑定编辑和删除按钮事件
    document.querySelectorAll('.edit-scene-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const sceneId = parseInt(this.dataset.sceneId);
            selectScene(sceneId);
        });
    });
    
    document.querySelectorAll('.delete-scene-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const sceneId = parseInt(this.dataset.sceneId);
            confirmDeleteScene(sceneId);
        });
    });
}

// 选择场景
function selectScene(sceneId) {
    window.detailedOutlineData.selectScene(sceneId);
    
    // 更新UI
    updateSceneList();
    updateSceneEditor();
}

// 确认删除场景
function confirmDeleteScene(sceneId) {
    if (confirm('确定要删除这个场景吗？此操作不可恢复。')) {
        window.detailedOutlineData.deleteCurrentScene();
        
        // 更新UI
        updateSceneList();
        updateSceneEditor();
        
        // 显示提示
        showToast('场景已删除', 'success');
    }
}

// 更新场景编辑器
function updateSceneEditor() {
    const currentScene = window.detailedOutlineData.getCurrentScene();
    
    if (!currentScene) {
        document.getElementById('scene-editor').classList.add('hidden');
        return;
    }
    
    document.getElementById('scene-editor').classList.remove('hidden');
    
    // 更新表单字段
    document.getElementById('scene-title-input').value = currentScene.title || '';
    document.getElementById('scene-setting-input').value = currentScene.setting || '';
    document.getElementById('scene-characters-input').value = currentScene.characters || '';
    document.getElementById('scene-goals-input').value = currentScene.goals || '';
    document.getElementById('scene-events-input').value = currentScene.events || '';
    document.getElementById('scene-conflicts-input').value = currentScene.conflicts || '';
    document.getElementById('scene-outcome-input').value = currentScene.outcome || '';
    
    // 更新字数统计
    updateWordCounts();
}

// 更新导航按钮状态
function updateNavigationButtons() {
    const currentChapter = window.detailedOutlineData.getCurrentChapter();
    const chapters = window.detailedOutlineData.getAllChapters();
    const currentIndex = chapters.findIndex(chapter => chapter.id === currentChapter.id);
    
    // 上一章按钮
    const prevChapterBtn = document.getElementById('prev-chapter-btn');
    if (currentIndex <= 0) {
        prevChapterBtn.disabled = true;
        prevChapterBtn.classList.add('opacity-50');
    } else {
        prevChapterBtn.disabled = false;
        prevChapterBtn.classList.remove('opacity-50');
    }
    
    // 下一章按钮
    const nextChapterBtn = document.getElementById('next-chapter-btn');
    if (currentIndex >= chapters.length - 1) {
        nextChapterBtn.disabled = true;
        nextChapterBtn.classList.add('opacity-50');
    } else {
        nextChapterBtn.disabled = false;
        nextChapterBtn.classList.remove('opacity-50');
    }
}

// 绑定按钮事件
function bindButtonEvents() {
    // 上一章按钮
    document.getElementById('prev-chapter-btn').addEventListener('click', function() {
        if (!this.disabled) {
            window.detailedOutlineData.goToPreviousChapter();
            initDetailedOutlineEditor();
        }
    });
    
    // 下一章按钮
    document.getElementById('next-chapter-btn').addEventListener('click', function() {
        if (!this.disabled) {
            window.detailedOutlineData.goToNextChapter();
            initDetailedOutlineEditor();
        }
    });
    
    // 添加场景按钮
    document.getElementById('add-scene-btn').addEventListener('click', function() {
        const newSceneTitle = prompt('请输入新场景标题：');
        if (newSceneTitle) {
            const newScene = window.detailedOutlineData.addNewScene({ title: newSceneTitle });
            
            // 更新UI
            updateSceneList();
            updateSceneEditor();
            
            // 显示提示
            showToast('新场景已添加', 'success');
        }
    });
    
    // 保存场景按钮
    document.getElementById('save-scene-btn').addEventListener('click', function() {
        saveCurrentScene();
    });
    
    // 生成内容按钮
    document.querySelectorAll('.generate-content-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const field = this.dataset.field;
            generateContent(field);
        });
    });
    
    // 场景表单字段变化时自动保存（使用防抖）
    const formInputs = document.querySelectorAll('#scene-editor input, #scene-editor textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', debounce(function() {
            saveCurrentScene();
            updateWordCounts();
        }, 1000));
    });
    
    // 下一步按钮
    document.getElementById('next-button').addEventListener('click', function() {
        goToNextStep();
    });
}

// 保存当前场景
function saveCurrentScene() {
    const currentScene = window.detailedOutlineData.getCurrentScene();
    
    if (!currentScene) return;
    
    const updatedData = {
        title: document.getElementById('scene-title-input').value,
        setting: document.getElementById('scene-setting-input').value,
        characters: document.getElementById('scene-characters-input').value,
        goals: document.getElementById('scene-goals-input').value,
        events: document.getElementById('scene-events-input').value,
        conflicts: document.getElementById('scene-conflicts-input').value,
        outcome: document.getElementById('scene-outcome-input').value
    };
    
    const success = window.detailedOutlineData.updateScene(currentScene.id, updatedData);
    
    if (success) {
        // 更新场景列表以反映更改
        updateSceneList();
        
        // 显示保存成功提示
        showToast('场景已保存', 'success');
    }
}

// 生成内容
function generateContent(field) {
    const currentScene = window.detailedOutlineData.getCurrentScene();
    
    if (!currentScene) return;
    
    // 显示加载状态
    const btn = document.querySelector(`.generate-content-btn[data-field="${field}"]`);
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> 生成中...';
    btn.disabled = true;
    
    // 模拟生成延迟
    setTimeout(() => {
        // 获取生成的内容
        const generatedContent = window.detailedOutlineData.generateSceneContent(currentScene.id, field);
        
        // 更新表单字段
        document.getElementById(`scene-${field}-input`).value = generatedContent;
        
        // 保存场景
        saveCurrentScene();
        
        // 更新字数统计
        updateWordCounts();
        
        // 恢复按钮状态
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1500);
}

// 更新字数统计
function updateWordCounts() {
    const textareas = document.querySelectorAll('#scene-editor textarea');
    
    textareas.forEach(textarea => {
        const counterId = textarea.dataset.counter;
        if (counterId) {
            const counter = document.getElementById(counterId);
            if (counter) {
                const text = textarea.value;
                const wordCount = text.length;
                counter.textContent = wordCount;
            }
        }
    });
}

// 前往下一步
function goToNextStep() {
    // 保存当前场景
    saveCurrentScene();
    
    // 跳转到下一步
    window.location.href = 'content-generation.html';
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// 显示提示消息
function showToast(message, type = 'info', duration = 3000) {
    // 如果已经存在toast，先移除
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 创建toast元素
    const toast = document.createElement('div');
    toast.className = 'toast fixed top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg px-4 py-3 z-50 flex items-center max-w-xs';
    
    // 设置内容
    let icon = '';
    let bgColor = '';
    
    switch (type) {
        case 'success':
            icon = '<i class="fas fa-check-circle text-green-500 mr-2"></i>';
            bgColor = 'bg-green-50 border-l-4 border-green-500';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle text-red-500 mr-2"></i>';
            bgColor = 'bg-red-50 border-l-4 border-red-500';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>';
            bgColor = 'bg-yellow-50 border-l-4 border-yellow-500';
            break;
        default:
            icon = '<i class="fas fa-info-circle text-blue-500 mr-2"></i>';
            bgColor = 'bg-blue-50 border-l-4 border-blue-500';
    }
    
    toast.className += ` ${bgColor}`;
    toast.innerHTML = `${icon}<span>${message}</span>`;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translate(-50%, 0)';
    }, 10);
    
    // 自动关闭
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, -20px)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, duration);
} 