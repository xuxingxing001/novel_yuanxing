/**
 * 小说编辑页面功能文件
 * 实现章节管理、编辑等功能
 */

// 小说数据
let novelData = {
    id: '1',
    title: '情感读心者',
    cover: 'https://images.unsplash.com/photo-1518826778770-a729fb53c3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    genre: '都市异能',
    status: '连载中',
    wordCount: 32456,
    chapterCount: 8,
    description: '大学生李天阳在一次偶然的机会下获得了一个神秘的系统，可以看到他人的情感值。从此，他的生活发生了翻天覆地的变化，不仅能够轻松应对各种人际关系，还能在危机时刻洞察他人的真实想法。在都市中游刃有余的同时，他逐渐发现这个系统背后隐藏着更大的秘密...',
    updateTime: '2023-06-15',
    chapters: []
};

// 是否处于排序模式
let isSortMode = false;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 从本地存储加载小说数据
    loadNovelData();
    
    // 初始化小说信息
    initNovelInfo();
    
    // 初始化章节列表
    initChapterList();
    
    // 初始化添加章节模态框
    initAddChapterModal();
    
    // 初始化编辑小说信息模态框
    initEditNovelModal();
    
    // 初始化排序模式
    initSortMode();
});

/**
 * 初始化小说信息
 */
function initNovelInfo() {
    // 设置小说标题
    document.getElementById('novel-title').textContent = novelData.title;
    document.querySelector('.nav-title').textContent = novelData.title;
    
    // 设置小说封面
    document.getElementById('novel-cover').style.backgroundImage = `url(${novelData.cover})`;
    
    // 设置小说元数据
    document.getElementById('novel-genre').textContent = novelData.genre;
    document.getElementById('novel-status').textContent = novelData.status;
    
    // 设置小说统计数据
    document.getElementById('novel-word-count').textContent = formatNumber(novelData.wordCount);
    document.getElementById('novel-chapter-count').textContent = novelData.chapterCount;
    document.getElementById('novel-update-time').textContent = formatDate(novelData.updateTime);
    
    // 设置小说描述
    document.getElementById('novel-description').textContent = novelData.description;
}

/**
 * 初始化章节列表
 */
function initChapterList() {
    // 如果没有章节数据，从示例数据加载
    if (!novelData.chapters || novelData.chapters.length === 0) {
        novelData.chapters = generateSampleChapters();
        saveNovelData();
    }
    
    // 渲染章节列表
    renderChapterList();
    
    // 添加章节按钮点击事件
    document.getElementById('add-chapter-btn').addEventListener('click', function() {
        showAddChapterModal();
    });
}

/**
 * 渲染章节列表
 */
function renderChapterList() {
    const chapterList = document.getElementById('chapter-list');
    
    // 清空列表
    chapterList.innerHTML = '';
    
    // 如果没有章节数据，显示提示信息
    if (!novelData.chapters || novelData.chapters.length === 0) {
        chapterList.innerHTML = `
            <div class="p-4 text-center text-gray-500">
                <i class="fas fa-info-circle mr-2"></i> 暂无章节数据
            </div>
        `;
        return;
    }
    
    // 渲染章节列表
    novelData.chapters.forEach((chapter, index) => {
        const chapterItem = document.createElement('div');
        chapterItem.className = 'chapter-item';
        chapterItem.dataset.index = index;
        
        // 排序手柄
        const sortHandle = document.createElement('div');
        sortHandle.className = 'sort-handle';
        sortHandle.innerHTML = '<i class="fas fa-grip-vertical"></i>';
        
        // 章节信息
        const chapterInfo = document.createElement('div');
        chapterInfo.className = 'chapter-info';
        
        const chapterTitle = document.createElement('div');
        chapterTitle.className = 'chapter-title';
        chapterTitle.textContent = chapter.title;
        
        const chapterMeta = document.createElement('div');
        chapterMeta.className = 'chapter-meta';
        
        const wordCount = document.createElement('span');
        wordCount.innerHTML = `<i class="fas fa-file-alt"></i> ${formatNumber(chapter.wordCount)}字`;
        
        const updateTime = document.createElement('span');
        updateTime.innerHTML = `<i class="fas fa-clock"></i> ${formatDate(chapter.updateTime)}`;
        
        chapterMeta.appendChild(wordCount);
        chapterMeta.appendChild(updateTime);
        
        chapterInfo.appendChild(chapterTitle);
        chapterInfo.appendChild(chapterMeta);
        
        // 章节操作
        const chapterActions = document.createElement('div');
        chapterActions.className = 'chapter-actions';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'chapter-action-btn';
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            editChapter(index);
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'chapter-action-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            deleteChapter(index);
        });
        
        chapterActions.appendChild(editBtn);
        chapterActions.appendChild(deleteBtn);
        
        // 组装章节项
        chapterItem.appendChild(sortHandle);
        chapterItem.appendChild(chapterInfo);
        chapterItem.appendChild(chapterActions);
        
        // 点击章节项跳转到章节编辑页面
        chapterItem.addEventListener('click', function() {
            if (!isSortMode) {
                window.location.href = `chapter-edit.html?id=${novelData.id}&chapter=${index}`;
            }
        });
        
        chapterList.appendChild(chapterItem);
    });
}

/**
 * 初始化添加章节模态框
 */
function initAddChapterModal() {
    const modal = document.getElementById('add-chapter-modal');
    const closeBtn = document.getElementById('add-chapter-close');
    const form = document.getElementById('add-chapter-form');
    
    // 关闭按钮点击事件
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // 表单提交事件
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const titleInput = document.getElementById('chapter-title-input');
        const title = titleInput.value.trim();
        
        if (!title) {
            showToast('请输入章节标题', 'warning');
            return;
        }
        
        // 创建新章节
        const newChapter = {
            title: title,
            content: '',
            wordCount: 0,
            updateTime: new Date().toISOString().split('T')[0]
        };
        
        // 添加到章节列表
        novelData.chapters.push(newChapter);
        novelData.chapterCount = novelData.chapters.length;
        
        // 保存小说数据
        saveNovelData();
        
        // 更新章节列表
        renderChapterList();
        
        // 更新小说信息
        initNovelInfo();
        
        // 关闭模态框
        modal.classList.remove('active');
        
        // 清空表单
        titleInput.value = '';
        
        // 显示成功提示
        showToast('章节添加成功', 'success');
        
        // 跳转到章节编辑页面
        window.location.href = `chapter-edit.html?id=${novelData.id}&chapter=${novelData.chapters.length - 1}`;
    });
}

/**
 * 显示添加章节模态框
 */
function showAddChapterModal() {
    const modal = document.getElementById('add-chapter-modal');
    modal.classList.add('active');
    
    // 聚焦标题输入框
    setTimeout(() => {
        document.getElementById('chapter-title-input').focus();
    }, 300);
}

/**
 * 初始化编辑小说信息模态框
 */
function initEditNovelModal() {
    const modal = document.getElementById('edit-novel-modal');
    const closeBtn = document.getElementById('edit-novel-close');
    const form = document.getElementById('edit-novel-form');
    const editBtn = document.getElementById('edit-novel-btn');
    
    // 编辑按钮点击事件
    editBtn.addEventListener('click', function() {
        // 填充表单
        document.getElementById('novel-title-input').value = novelData.title;
        document.getElementById('novel-genre-input').value = novelData.genre;
        document.getElementById('novel-status-input').value = novelData.status;
        document.getElementById('novel-description-input').value = novelData.description;
        
        // 显示模态框
        modal.classList.add('active');
    });
    
    // 关闭按钮点击事件
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // 表单提交事件
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const title = document.getElementById('novel-title-input').value.trim();
        const genre = document.getElementById('novel-genre-input').value.trim();
        const status = document.getElementById('novel-status-input').value;
        const description = document.getElementById('novel-description-input').value.trim();
        
        // 验证数据
        if (!title) {
            showToast('请输入小说标题', 'warning');
            return;
        }
        
        // 更新小说数据
        novelData.title = title;
        novelData.genre = genre;
        novelData.status = status;
        novelData.description = description;
        
        // 保存小说数据
        saveNovelData();
        
        // 更新小说信息
        initNovelInfo();
        
        // 关闭模态框
        modal.classList.remove('active');
        
        // 显示成功提示
        showToast('小说信息更新成功', 'success');
    });
}

/**
 * 编辑章节
 * @param {number} index - 章节索引
 */
function editChapter(index) {
    // 跳转到章节编辑页面
    window.location.href = `chapter-edit.html?id=${novelData.id}&chapter=${index}`;
}

/**
 * 删除章节
 * @param {number} index - 章节索引
 */
function deleteChapter(index) {
    // 显示确认对话框
    showConfirm('删除章节', '确定要删除这个章节吗？此操作无法撤销。', '删除', '取消')
        .then(result => {
            if (result) {
                // 删除章节
                novelData.chapters.splice(index, 1);
                novelData.chapterCount = novelData.chapters.length;
                
                // 更新总字数
                updateTotalWordCount();
                
                // 保存小说数据
                saveNovelData();
                
                // 更新章节列表
                renderChapterList();
                
                // 更新小说信息
                initNovelInfo();
                
                // 显示成功提示
                showToast('章节删除成功', 'success');
            }
        });
}

/**
 * 初始化排序模式
 */
function initSortMode() {
    const sortBtn = document.getElementById('sort-chapters-btn');
    const doneBtn = document.getElementById('sort-done-btn');
    const chapterListContainer = document.getElementById('chapter-list-container');
    
    // 排序按钮点击事件
    sortBtn.addEventListener('click', function() {
        // 进入排序模式
        isSortMode = true;
        chapterListContainer.classList.add('sort-mode');
        sortBtn.classList.add('hidden');
        doneBtn.classList.remove('hidden');
        
        // 初始化拖拽排序
        initDragSort();
    });
    
    // 完成按钮点击事件
    doneBtn.addEventListener('click', function() {
        // 退出排序模式
        isSortMode = false;
        chapterListContainer.classList.remove('sort-mode');
        sortBtn.classList.remove('hidden');
        doneBtn.classList.add('hidden');
        
        // 保存小说数据
        saveNovelData();
        
        // 显示成功提示
        showToast('章节顺序已更新', 'success');
    });
}

/**
 * 初始化拖拽排序
 */
function initDragSort() {
    // 这里可以使用第三方库如Sortable.js实现拖拽排序
    // 简化起见，这里只实现基本的拖拽逻辑
    const chapterItems = document.querySelectorAll('.chapter-item');
    let draggedItem = null;
    
    chapterItems.forEach(item => {
        // 拖拽开始
        item.addEventListener('dragstart', function() {
            draggedItem = this;
            setTimeout(() => {
                this.classList.add('opacity-50');
            }, 0);
        });
        
        // 拖拽结束
        item.addEventListener('dragend', function() {
            this.classList.remove('opacity-50');
            draggedItem = null;
        });
        
        // 拖拽经过
        item.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        
        // 拖拽进入
        item.addEventListener('dragenter', function(e) {
            e.preventDefault();
            if (this !== draggedItem) {
                this.classList.add('bg-blue-50');
            }
        });
        
        // 拖拽离开
        item.addEventListener('dragleave', function() {
            this.classList.remove('bg-blue-50');
        });
        
        // 拖拽放置
        item.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('bg-blue-50');
            
            if (this !== draggedItem) {
                const allItems = Array.from(document.querySelectorAll('.chapter-item'));
                const fromIndex = parseInt(draggedItem.dataset.index);
                const toIndex = parseInt(this.dataset.index);
                
                // 更新章节顺序
                const [movedChapter] = novelData.chapters.splice(fromIndex, 1);
                novelData.chapters.splice(toIndex, 0, movedChapter);
                
                // 重新渲染章节列表
                renderChapterList();
            }
        });
        
        // 设置可拖拽
        item.setAttribute('draggable', true);
    });
}

/**
 * 更新总字数
 */
function updateTotalWordCount() {
    let totalWordCount = 0;
    
    novelData.chapters.forEach(chapter => {
        totalWordCount += chapter.wordCount;
    });
    
    novelData.wordCount = totalWordCount;
}

/**
 * 从本地存储加载小说数据
 */
function loadNovelData() {
    // 从URL参数获取小说ID
    const urlParams = new URLSearchParams(window.location.search);
    const novelId = urlParams.get('id') || '1';
    
    // 尝试从本地存储加载
    const savedNovel = localStorage.getItem(`novel_${novelId}`);
    if (savedNovel) {
        novelData = JSON.parse(savedNovel);
    } else {
        // 如果没有保存的数据，使用默认数据
        novelData.id = novelId;
        saveNovelData();
    }
}

/**
 * 保存小说数据到本地存储
 */
function saveNovelData() {
    localStorage.setItem(`novel_${novelData.id}`, JSON.stringify(novelData));
}

/**
 * 生成示例章节数据
 */
function generateSampleChapters() {
    return [
        {
            title: '第一章 意外获得能力',
            content: '大学生李天阳在一次偶然的机会下获得了一个神秘的系统，可以看到他人的情感值。从此，他的生活发生了翻天覆地的变化，不仅能够轻松应对各种人际关系，还能在危机时刻洞察他人的真实想法。\n\n这一天，李天阳像往常一样在校园里漫步，突然一道刺眼的光芒闪过，他感到一阵头晕目眩，等他恢复意识时，发现周围的人头顶上都浮现出了彩色的光晕，不同的颜色似乎代表着不同的情绪。\n\n"这是怎么回事？"李天阳揉了揉眼睛，以为自己出现了幻觉，但那些光晕依然清晰可见。\n\n就在这时，一个系统提示音在他脑海中响起："恭喜宿主激活情感洞察系统，现在你可以看到他人的情感值了。"',
            wordCount: 5000,
            updateTime: '2023-06-01'
        },
        {
            title: '第二章 能力初探',
            content: '李天阳开始尝试使用和掌控自己的能力，发现能力的更多特性和使用方法。\n\n他发现不同的情感对应着不同的颜色：红色代表愤怒，蓝色代表悲伤，黄色代表喜悦，绿色代表嫉妒，紫色代表恐惧，而白色则代表平静。颜色的深浅则代表情感的强烈程度。\n\n在食堂排队时，李天阳注意到前面一个同学头顶上的光晕由平静的白色逐渐变成了不耐烦的淡红色。果然，没过多久，那个同学就开始抱怨队伍移动得太慢了。\n\n"这能力真的很神奇，"李天阳心想，"我可以提前预知别人的情绪变化。"\n\n下午的课堂上，李天阳发现自己不仅能看到情感的颜色，还能感知到具体的情感值，这些数值从0到100不等，代表情感的强度。',
            wordCount: 4800,
            updateTime: '2023-06-03'
        },
        {
            title: '第三章 初显锋芒',
            content: '李天阳利用能力解决一个小困境，初步展示能力的实用价值，引起某些人的注意。\n\n班级里即将举行一次小组讨论，往常这种时候，李天阳总是被动地等待别人邀请。但这次，他主动观察同学们的情感值，找到了几个对讨论话题充满热情（黄色光晕较强）但又有些犹豫不决（带有淡紫色）的同学。\n\n他走上前去，恰到好处地表达了自己的想法，并邀请他们组队。令他惊喜的是，这些同学立刻接受了他的邀请，而且讨论过程异常顺利，因为他能根据大家的情感变化适时调整话题方向。\n\n小组讨论结束后，他们的成果获得了老师的高度评价。班长王明看着李天阳的眼神中带着一丝疑惑和好奇，头顶的光晕显示他对李天阳突然的变化产生了浓厚的兴趣。',
            wordCount: 5200,
            updateTime: '2023-06-05'
        }
    ];
}

/**
 * 格式化数字（添加千位分隔符）
 * @param {number} num - 要格式化的数字
 * @returns {string} - 格式化后的字符串
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 格式化日期
 * @param {string} dateString - 日期字符串
 * @returns {string} - 格式化后的日期字符串
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
} 