/**
 * 故事要素页面功能文件
 * 实现标签切换、生成和选择等交互功能
 */

// 存储用户选择的标签
const selectedTags = {
    plot: [],
    character: [],
    setting: [],
    scene: []
};

// 当前激活的标签页
let activeTab = 'plot';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 从本地存储加载已保存的标签
    loadSavedTags();
    
    // 从URL参数获取故事梗概并显示
    const urlParams = new URLSearchParams(window.location.search);
    const storyOutline = urlParams.get('outline');
    if (storyOutline) {
        document.getElementById('story-outline-preview').textContent = storyOutline;
    }
    
    // 初始化标签页
    switchInspirationTab('plot');
    
    // 为自定义标签输入框添加回车键事件
    document.querySelectorAll('[id^="custom-"]').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const type = this.id.replace('custom-', '').replace('-tag', '');
                addCustomTag(type);
            }
        });
    });
});

/**
 * 切换标签页
 * @param {string} tabName - 标签页名称
 */
function switchInspirationTab(tabName) {
    // 更新当前激活的标签页
    activeTab = tabName;
    
    // 隐藏所有标签页内容
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // 取消所有标签按钮的激活状态
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // 显示选中的标签页内容
    document.getElementById(`content-${tabName}`).classList.remove('hidden');
    
    // 激活对应的标签按钮
    document.getElementById(`tab-${tabName}`).classList.add('active');
    
    // 如果该类型的标签还没有生成过，则自动生成
    if (document.getElementById(`${tabName}-tags`).querySelector('.tag-placeholder')) {
        generateInspirations(tabName);
    }
}

/**
 * 生成灵感标签
 * @param {string} type - 标签类型
 */
function generateInspirations(type) {
    const tagContainer = document.getElementById(`${type}-tags`);
    
    // 显示加载状态
    tagContainer.innerHTML = `
        <div class="tag-loading">
            <i class="fas fa-spinner fa-spin"></i> 正在生成${getTypeLabel(type)}要素...
        </div>
    `;
    
    // 模拟API请求延迟
    setTimeout(() => {
        // 获取预设标签数据
        const tags = getTagsByType(type);
        
        // 清空容器
        tagContainer.innerHTML = '';
        
        // 如果没有标签数据，显示提示信息
        if (!tags || tags.length === 0) {
            tagContainer.innerHTML = `
                <div class="tag-placeholder">
                    暂无${getTypeLabel(type)}要素推荐，请尝试自定义添加
                </div>
            `;
            return;
        }
        
        // 随机选择10个标签显示
        const shuffledTags = shuffleArray(tags);
        const displayTags = shuffledTags.slice(0, 10);
        
        // 创建标签元素
        displayTags.forEach(tag => {
            const isSelected = selectedTags[type].includes(tag);
            const tagElement = createTagElement(tag, type, isSelected);
            tagContainer.appendChild(tagElement);
        });
        
        // 添加刷新按钮
        const refreshButton = document.createElement('button');
        refreshButton.className = 'inspiration-tag';
        refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i> 换一批';
        refreshButton.onclick = () => generateInspirations(type);
        tagContainer.appendChild(refreshButton);
    }, 800); // 模拟加载延迟
}

/**
 * 创建标签元素
 * @param {string} tag - 标签文本
 * @param {string} type - 标签类型
 * @param {boolean} isSelected - 是否已选中
 * @returns {HTMLElement} - 标签元素
 */
function createTagElement(tag, type, isSelected = false) {
    const tagElement = document.createElement('div');
    tagElement.className = `inspiration-tag${isSelected ? ' selected' : ''}`;
    tagElement.dataset.tag = tag;
    tagElement.dataset.type = type;
    
    // 标签文本
    const tagText = document.createElement('span');
    tagText.textContent = tag;
    tagElement.appendChild(tagText);
    
    // 点击事件
    tagElement.addEventListener('click', function() {
        toggleTagSelection(this);
    });
    
    return tagElement;
}

/**
 * 切换标签选中状态
 * @param {HTMLElement} tagElement - 标签元素
 */
function toggleTagSelection(tagElement) {
    const tag = tagElement.dataset.tag;
    const type = tagElement.dataset.type;
    
    if (tagElement.classList.contains('selected')) {
        // 取消选中
        tagElement.classList.remove('selected');
        const index = selectedTags[type].indexOf(tag);
        if (index !== -1) {
            selectedTags[type].splice(index, 1);
        }
    } else {
        // 选中标签
        tagElement.classList.add('selected');
        if (!selectedTags[type].includes(tag)) {
            selectedTags[type].push(tag);
        }
    }
    
    // 保存到本地存储
    saveSelectedTags();
}

/**
 * 添加自定义标签
 * @param {string} type - 标签类型
 */
function addCustomTag(type) {
    const inputElement = document.getElementById(`custom-${type}-tag`);
    const tagText = inputElement.value.trim();
    
    if (!tagText) {
        return;
    }
    
    // 检查是否已存在相同标签
    if (selectedTags[type].includes(tagText)) {
        // 提示用户标签已存在
        alert(`已存在相同的${getTypeLabel(type)}要素`);
        return;
    }
    
    // 创建新标签元素
    const tagElement = createTagElement(tagText, type, true);
    
    // 添加到标签容器
    const tagContainer = document.getElementById(`${type}-tags`);
    
    // 如果容器中有占位符，先清空
    const placeholder = tagContainer.querySelector('.tag-placeholder');
    if (placeholder) {
        tagContainer.innerHTML = '';
    }
    
    // 添加新标签到容器
    tagContainer.appendChild(tagElement);
    
    // 添加到选中标签数组
    selectedTags[type].push(tagText);
    
    // 保存到本地存储
    saveSelectedTags();
    
    // 清空输入框
    inputElement.value = '';
}

/**
 * 保存选中的标签到本地存储
 */
function saveSelectedTags() {
    localStorage.setItem('selectedInspirationTags', JSON.stringify(selectedTags));
}

/**
 * 从本地存储加载已保存的标签
 */
function loadSavedTags() {
    const savedTags = localStorage.getItem('selectedInspirationTags');
    if (savedTags) {
        const parsedTags = JSON.parse(savedTags);
        
        // 合并保存的标签
        Object.keys(parsedTags).forEach(type => {
            selectedTags[type] = parsedTags[type] || [];
        });
    }
}

/**
 * 获取标签类型的中文标签
 * @param {string} type - 标签类型
 * @returns {string} - 中文标签
 */
function getTypeLabel(type) {
    switch (type) {
        case 'plot':
            return '情节';
        case 'character':
            return '角色';
        case 'setting':
            return '设定';
        case 'scene':
            return '场景';
        default:
            return '';
    }
}

/**
 * 打乱数组顺序
 * @param {Array} array - 原数组
 * @returns {Array} - 打乱后的数组
 */
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/**
 * 前往下一步
 */
function goToNextStep() {
    // 检查是否至少选择了一个标签
    let hasSelectedTag = false;
    Object.values(selectedTags).forEach(tags => {
        if (tags.length > 0) {
            hasSelectedTag = true;
        }
    });
    
    if (!hasSelectedTag) {
        alert('请至少选择一个故事要素');
        return;
    }
    
    // 将选中的标签保存到本地存储
    saveSelectedTags();
    
    // 获取故事梗概
    const storyOutline = document.getElementById('story-outline-preview').textContent;
    
    // 跳转到下一页，并传递参数
    window.location.href = `chapter-outline.html?outline=${encodeURIComponent(storyOutline)}`;
} 