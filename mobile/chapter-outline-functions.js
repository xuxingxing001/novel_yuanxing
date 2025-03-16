/**
 * 章节大纲页面功能文件
 * 实现章节数量调整、生成和编辑等功能
 */

// 存储章节大纲数据
let chapterOutlines = [];

// 当前章节数量
let chapterCount = 20;

// 最小和最大章节数量
const MIN_CHAPTERS = 10;
const MAX_CHAPTERS = 50;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化章节数量选择器
    initChapterCountSelector();
    
    // 从本地存储加载已保存的章节大纲
    loadSavedChapterOutlines();
    
    // 从URL参数获取故事梗概并显示
    const urlParams = new URLSearchParams(window.location.search);
    const storyOutline = urlParams.get('outline');
    if (storyOutline) {
        document.getElementById('story-outline-preview').textContent = storyOutline;
    }
    
    // 初始化生成按钮
    document.getElementById('generate-outline-btn').addEventListener('click', generateOutline);
});

/**
 * 初始化章节数量选择器
 */
function initChapterCountSelector() {
    const decreaseBtn = document.getElementById('decrease-chapter-btn');
    const increaseBtn = document.getElementById('increase-chapter-btn');
    const countValue = document.getElementById('chapter-count-value');
    
    // 设置初始值
    countValue.textContent = chapterCount;
    
    // 减少章节数量
    decreaseBtn.addEventListener('click', function() {
        if (chapterCount > MIN_CHAPTERS) {
            chapterCount--;
            countValue.textContent = chapterCount;
            updateButtonStates();
        }
    });
    
    // 增加章节数量
    increaseBtn.addEventListener('click', function() {
        if (chapterCount < MAX_CHAPTERS) {
            chapterCount++;
            countValue.textContent = chapterCount;
            updateButtonStates();
        }
    });
    
    // 更新按钮状态
    function updateButtonStates() {
        decreaseBtn.disabled = chapterCount <= MIN_CHAPTERS;
        increaseBtn.disabled = chapterCount >= MAX_CHAPTERS;
    }
    
    // 初始化按钮状态
    updateButtonStates();
}

/**
 * 生成章节大纲
 */
function generateOutline() {
    const generateBtn = document.getElementById('generate-outline-btn');
    
    // 显示加载状态
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 正在生成...';
    generateBtn.disabled = true;
    
    // 模拟API请求延迟
    setTimeout(() => {
        // 生成章节大纲
        chapterOutlines = generateChapterOutlines(chapterCount);
        
        // 渲染章节大纲
        renderChapterOutlines();
        
        // 保存到本地存储
        saveChapterOutlines();
        
        // 恢复按钮状态
        generateBtn.innerHTML = '<i class="fas fa-magic"></i> 重新生成章节大纲';
        generateBtn.disabled = false;
        
        // 显示成功提示
        showToast('章节大纲生成成功', 'success');
        
        // 滚动到章节列表
        document.getElementById('chapter-list').scrollIntoView({ behavior: 'smooth' });
    }, 1500); // 模拟加载延迟
}

/**
 * 渲染章节大纲
 */
function renderChapterOutlines() {
    const chapterList = document.getElementById('chapter-list');
    
    // 清空列表
    chapterList.innerHTML = '';
    
    // 如果没有章节大纲，显示提示信息
    if (!chapterOutlines || chapterOutlines.length === 0) {
        chapterList.innerHTML = `
            <div class="text-center p-4 text-gray-500">
                <i class="fas fa-info-circle mr-2"></i> 请点击"生成章节大纲"按钮生成章节
            </div>
        `;
        return;
    }
    
    // 渲染每个章节
    chapterOutlines.forEach((chapter, index) => {
        const chapterCard = createChapterCard(chapter, index);
        chapterList.appendChild(chapterCard);
    });
}

/**
 * 创建章节卡片
 * @param {Object} chapter - 章节数据
 * @param {number} index - 章节索引
 * @returns {HTMLElement} - 章节卡片元素
 */
function createChapterCard(chapter, index) {
    const chapterCard = document.createElement('div');
    chapterCard.className = 'chapter-card';
    chapterCard.dataset.index = index;
    
    // 章节卡片头部
    const cardHeader = document.createElement('div');
    cardHeader.className = 'chapter-card-header';
    
    const cardTitle = document.createElement('div');
    cardTitle.className = 'chapter-card-title';
    cardTitle.innerHTML = `<span class="mr-2">${chapter.title}</span>`;
    
    const cardActions = document.createElement('div');
    cardActions.className = 'chapter-card-actions';
    
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-sm btn-outline';
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.onclick = () => editChapter(index);
    
    const moveUpBtn = document.createElement('button');
    moveUpBtn.className = 'btn btn-sm btn-outline';
    moveUpBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    moveUpBtn.onclick = () => moveChapter(index, 'up');
    moveUpBtn.disabled = index === 0;
    
    const moveDownBtn = document.createElement('button');
    moveDownBtn.className = 'btn btn-sm btn-outline';
    moveDownBtn.innerHTML = '<i class="fas fa-arrow-down"></i>';
    moveDownBtn.onclick = () => moveChapter(index, 'down');
    moveDownBtn.disabled = index === chapterOutlines.length - 1;
    
    cardActions.appendChild(editBtn);
    cardActions.appendChild(moveUpBtn);
    cardActions.appendChild(moveDownBtn);
    
    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(cardActions);
    
    // 章节卡片内容
    const cardBody = document.createElement('div');
    cardBody.className = 'chapter-card-body';
    
    const description = document.createElement('p');
    description.className = 'text-sm text-gray-600 mb-3';
    description.textContent = chapter.description;
    
    const keyPointsTitle = document.createElement('div');
    keyPointsTitle.className = 'text-sm font-semibold mb-2';
    keyPointsTitle.textContent = '关键点：';
    
    const keyPointsList = document.createElement('ul');
    keyPointsList.className = 'text-sm text-gray-600 pl-5 list-disc';
    
    chapter.keyPoints.forEach(point => {
        const listItem = document.createElement('li');
        listItem.textContent = point;
        keyPointsList.appendChild(listItem);
    });
    
    cardBody.appendChild(description);
    cardBody.appendChild(keyPointsTitle);
    cardBody.appendChild(keyPointsList);
    
    // 组装章节卡片
    chapterCard.appendChild(cardHeader);
    chapterCard.appendChild(cardBody);
    
    return chapterCard;
}

/**
 * 编辑章节
 * @param {number} index - 章节索引
 */
function editChapter(index) {
    const chapter = chapterOutlines[index];
    
    // 创建编辑表单
    const formHTML = `
        <div class="form-group mb-3">
            <label class="form-label">章节标题</label>
            <input type="text" id="edit-chapter-title" class="form-control" value="${chapter.title}">
        </div>
        <div class="form-group mb-3">
            <label class="form-label">章节描述</label>
            <textarea id="edit-chapter-description" class="form-control" rows="3">${chapter.description}</textarea>
        </div>
        <div class="form-group mb-3">
            <label class="form-label">关键点（每行一个）</label>
            <textarea id="edit-chapter-keypoints" class="form-control" rows="4">${chapter.keyPoints.join('\n')}</textarea>
        </div>
    `;
    
    // 显示确认对话框
    showConfirm('编辑章节', formHTML, '保存', '取消', true)
        .then(result => {
            if (result) {
                // 获取表单数据
                const title = document.getElementById('edit-chapter-title').value.trim();
                const description = document.getElementById('edit-chapter-description').value.trim();
                const keyPointsText = document.getElementById('edit-chapter-keypoints').value.trim();
                
                // 验证数据
                if (!title || !description) {
                    showToast('标题和描述不能为空', 'warning');
                    return;
                }
                
                // 更新章节数据
                chapterOutlines[index] = {
                    title: title,
                    description: description,
                    keyPoints: keyPointsText.split('\n').filter(point => point.trim() !== '')
                };
                
                // 重新渲染章节大纲
                renderChapterOutlines();
                
                // 保存到本地存储
                saveChapterOutlines();
                
                // 显示成功提示
                showToast('章节已更新', 'success');
            }
        });
}

/**
 * 移动章节位置
 * @param {number} index - 章节索引
 * @param {string} direction - 移动方向：'up' 或 'down'
 */
function moveChapter(index, direction) {
    if (direction === 'up' && index > 0) {
        // 向上移动
        [chapterOutlines[index], chapterOutlines[index - 1]] = [chapterOutlines[index - 1], chapterOutlines[index]];
    } else if (direction === 'down' && index < chapterOutlines.length - 1) {
        // 向下移动
        [chapterOutlines[index], chapterOutlines[index + 1]] = [chapterOutlines[index + 1], chapterOutlines[index]];
    } else {
        return;
    }
    
    // 重新渲染章节大纲
    renderChapterOutlines();
    
    // 保存到本地存储
    saveChapterOutlines();
}

/**
 * 保存章节大纲到本地存储
 */
function saveChapterOutlines() {
    localStorage.setItem('chapterOutlines', JSON.stringify(chapterOutlines));
}

/**
 * 从本地存储加载已保存的章节大纲
 */
function loadSavedChapterOutlines() {
    const savedOutlines = localStorage.getItem('chapterOutlines');
    if (savedOutlines) {
        chapterOutlines = JSON.parse(savedOutlines);
        renderChapterOutlines();
    }
}

/**
 * 前往下一步
 */
function goToNextStep() {
    // 检查是否已生成章节大纲
    if (!chapterOutlines || chapterOutlines.length === 0) {
        showToast('请先生成章节大纲', 'warning');
        return;
    }
    
    // 保存章节大纲
    saveChapterOutlines();
    
    // 跳转到下一页
    window.location.href = 'detailed-outline.html';
} 