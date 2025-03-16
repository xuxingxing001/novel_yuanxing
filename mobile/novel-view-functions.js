/**
 * 小说阅读页面功能文件
 * 实现阅读设置、章节切换等功能
 */

// 当前章节索引
let currentChapterIndex = 0;

// 小说章节数据
let novelChapters = [];

// 阅读设置
const readingSettings = {
    fontSize: 'medium', // small, medium, large, xlarge
    background: 'white', // white, sepia, dark, black
    lineHeight: 'normal' // compact, normal, relaxed
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 从本地存储加载阅读设置
    loadReadingSettings();
    
    // 从本地存储加载小说章节数据
    loadNovelData();
    
    // 初始化阅读设置面板
    initReadingSettings();
    
    // 初始化章节列表面板
    initChapterList();
    
    // 初始化章节导航
    initChapterNavigation();
    
    // 应用阅读设置
    applyReadingSettings();
    
    // 加载当前章节
    loadCurrentChapter();
});

/**
 * 初始化阅读设置面板
 */
function initReadingSettings() {
    // 设置按钮
    const settingsBtn = document.getElementById('settings-btn');
    const settingsPanel = document.getElementById('reading-settings');
    const overlay = document.getElementById('overlay');
    
    // 点击设置按钮显示设置面板
    settingsBtn.addEventListener('click', function() {
        settingsPanel.classList.add('active');
        overlay.classList.add('active');
    });
    
    // 点击遮罩层隐藏设置面板
    overlay.addEventListener('click', function() {
        settingsPanel.classList.remove('active');
        overlay.classList.remove('active');
        document.getElementById('chapter-list').classList.remove('active');
    });
    
    // 字体大小设置
    const fontSizeItems = document.querySelectorAll('.font-size-item');
    fontSizeItems.forEach(item => {
        if (item.dataset.size === readingSettings.fontSize) {
            item.classList.add('active');
        }
        
        item.addEventListener('click', function() {
            fontSizeItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            readingSettings.fontSize = this.dataset.size;
            applyReadingSettings();
            saveReadingSettings();
        });
    });
    
    // 背景颜色设置
    const backgroundItems = document.querySelectorAll('.background-item');
    backgroundItems.forEach(item => {
        if (item.dataset.bg === readingSettings.background) {
            item.classList.add('active');
        }
        
        item.addEventListener('click', function() {
            backgroundItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            readingSettings.background = this.dataset.bg;
            applyReadingSettings();
            saveReadingSettings();
        });
    });
    
    // 行高设置
    const lineHeightItems = document.querySelectorAll('.line-height-item');
    lineHeightItems.forEach(item => {
        if (item.dataset.height === readingSettings.lineHeight) {
            item.classList.add('active');
        }
        
        item.addEventListener('click', function() {
            lineHeightItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            readingSettings.lineHeight = this.dataset.height;
            applyReadingSettings();
            saveReadingSettings();
        });
    });
}

/**
 * 初始化章节列表面板
 */
function initChapterList() {
    // 章节列表按钮
    const chaptersBtn = document.getElementById('chapters-btn');
    const chapterList = document.getElementById('chapter-list');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('chapter-list-close');
    
    // 点击章节列表按钮显示章节列表
    chaptersBtn.addEventListener('click', function() {
        chapterList.classList.add('active');
        overlay.classList.add('active');
    });
    
    // 点击关闭按钮隐藏章节列表
    closeBtn.addEventListener('click', function() {
        chapterList.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // 渲染章节列表
    renderChapterList();
}

/**
 * 渲染章节列表
 */
function renderChapterList() {
    const chapterListContent = document.getElementById('chapter-list-content');
    
    // 清空列表
    chapterListContent.innerHTML = '';
    
    // 如果没有章节数据，显示提示信息
    if (!novelChapters || novelChapters.length === 0) {
        chapterListContent.innerHTML = `
            <div class="p-4 text-center text-gray-500">
                <i class="fas fa-info-circle mr-2"></i> 暂无章节数据
            </div>
        `;
        return;
    }
    
    // 渲染章节列表
    novelChapters.forEach((chapter, index) => {
        const chapterItem = document.createElement('div');
        chapterItem.className = `chapter-list-item${index === currentChapterIndex ? ' active' : ''}`;
        chapterItem.textContent = chapter.title;
        chapterItem.addEventListener('click', function() {
            currentChapterIndex = index;
            loadCurrentChapter();
            document.getElementById('chapter-list').classList.remove('active');
            document.getElementById('overlay').classList.remove('active');
        });
        
        chapterListContent.appendChild(chapterItem);
    });
}

/**
 * 初始化章节导航
 */
function initChapterNavigation() {
    const prevBtn = document.getElementById('prev-chapter');
    const nextBtn = document.getElementById('next-chapter');
    
    // 上一章按钮点击事件
    prevBtn.addEventListener('click', function() {
        if (currentChapterIndex > 0) {
            currentChapterIndex--;
            loadCurrentChapter();
            window.scrollTo(0, 0);
        }
    });
    
    // 下一章按钮点击事件
    nextBtn.addEventListener('click', function() {
        if (currentChapterIndex < novelChapters.length - 1) {
            currentChapterIndex++;
            loadCurrentChapter();
            window.scrollTo(0, 0);
        }
    });
}

/**
 * 加载当前章节
 */
function loadCurrentChapter() {
    // 更新导航按钮状态
    updateNavigationButtons();
    
    // 如果没有章节数据，显示提示信息
    if (!novelChapters || novelChapters.length === 0) {
        document.getElementById('chapter-title').textContent = '暂无章节';
        document.getElementById('chapter-content').innerHTML = `
            <div class="text-center p-4 text-gray-500">
                <i class="fas fa-info-circle mr-2"></i> 暂无章节内容
            </div>
        `;
        return;
    }
    
    // 获取当前章节
    const chapter = novelChapters[currentChapterIndex];
    
    // 更新章节标题
    document.getElementById('chapter-title').textContent = chapter.title;
    
    // 更新章节内容
    const contentElement = document.getElementById('chapter-content');
    
    // 如果章节内容是HTML格式，直接设置
    if (chapter.content.startsWith('<')) {
        contentElement.innerHTML = chapter.content;
    } else {
        // 否则将文本转换为段落
        const paragraphs = chapter.content.split('\n').filter(p => p.trim() !== '');
        contentElement.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
    }
    
    // 更新章节列表中的活动项
    const chapterItems = document.querySelectorAll('.chapter-list-item');
    chapterItems.forEach((item, index) => {
        if (index === currentChapterIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // 保存当前阅读进度
    saveReadingProgress();
}

/**
 * 更新导航按钮状态
 */
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-chapter');
    const nextBtn = document.getElementById('next-chapter');
    
    // 禁用或启用上一章按钮
    prevBtn.disabled = currentChapterIndex <= 0;
    
    // 禁用或启用下一章按钮
    nextBtn.disabled = currentChapterIndex >= novelChapters.length - 1;
}

/**
 * 应用阅读设置
 */
function applyReadingSettings() {
    const readingArea = document.getElementById('reading-area');
    
    // 应用字体大小
    readingArea.classList.remove('font-size-small', 'font-size-medium', 'font-size-large', 'font-size-xlarge');
    readingArea.classList.add(`font-size-${readingSettings.fontSize}`);
    
    // 应用背景颜色
    readingArea.classList.remove('bg-white', 'bg-sepia', 'bg-dark', 'bg-black');
    readingArea.classList.add(`bg-${readingSettings.background}`);
    
    // 应用行高
    const lineHeightClass = {
        'compact': 'leading-relaxed',
        'normal': 'leading-loose',
        'relaxed': 'leading-loose'
    }[readingSettings.lineHeight];
    
    readingArea.classList.remove('leading-relaxed', 'leading-loose', 'leading-loose');
    readingArea.classList.add(lineHeightClass);
}

/**
 * 保存阅读设置到本地存储
 */
function saveReadingSettings() {
    localStorage.setItem('readingSettings', JSON.stringify(readingSettings));
}

/**
 * 从本地存储加载阅读设置
 */
function loadReadingSettings() {
    const savedSettings = localStorage.getItem('readingSettings');
    if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        Object.assign(readingSettings, parsedSettings);
    }
}

/**
 * 保存当前阅读进度
 */
function saveReadingProgress() {
    const novelId = getNovelId();
    localStorage.setItem(`readingProgress_${novelId}`, currentChapterIndex.toString());
}

/**
 * 从本地存储加载小说数据
 */
function loadNovelData() {
    // 模拟从本地存储或API加载小说数据
    // 实际应用中，这里应该从API或本地存储加载数据
    const novelId = getNovelId();
    
    // 尝试从本地存储加载
    const savedChapters = localStorage.getItem(`novelChapters_${novelId}`);
    if (savedChapters) {
        novelChapters = JSON.parse(savedChapters);
    } else {
        // 如果没有保存的数据，使用示例数据
        novelChapters = generateSampleChapters();
        localStorage.setItem(`novelChapters_${novelId}`, JSON.stringify(novelChapters));
    }
    
    // 加载阅读进度
    const savedProgress = localStorage.getItem(`readingProgress_${novelId}`);
    if (savedProgress) {
        currentChapterIndex = parseInt(savedProgress);
    }
}

/**
 * 获取小说ID
 */
function getNovelId() {
    // 从URL参数获取小说ID
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || '1';
}

/**
 * 生成示例章节数据
 */
function generateSampleChapters() {
    return [
        {
            title: '第一章 意外获得能力',
            content: '大学生李天阳在一次偶然的机会下获得了一个神秘的系统，可以看到他人的情感值。从此，他的生活发生了翻天覆地的变化，不仅能够轻松应对各种人际关系，还能在危机时刻洞察他人的真实想法。\n\n这一天，李天阳像往常一样在校园里漫步，突然一道刺眼的光芒闪过，他感到一阵头晕目眩，等他恢复意识时，发现周围的人头顶上都浮现出了彩色的光晕，不同的颜色似乎代表着不同的情绪。\n\n"这是怎么回事？"李天阳揉了揉眼睛，以为自己出现了幻觉，但那些光晕依然清晰可见。\n\n就在这时，一个系统提示音在他脑海中响起："恭喜宿主激活情感洞察系统，现在你可以看到他人的情感值了。"'
        },
        {
            title: '第二章 能力初探',
            content: '李天阳开始尝试使用和掌控自己的能力，发现能力的更多特性和使用方法。\n\n他发现不同的情感对应着不同的颜色：红色代表愤怒，蓝色代表悲伤，黄色代表喜悦，绿色代表嫉妒，紫色代表恐惧，而白色则代表平静。颜色的深浅则代表情感的强烈程度。\n\n在食堂排队时，李天阳注意到前面一个同学头顶上的光晕由平静的白色逐渐变成了不耐烦的淡红色。果然，没过多久，那个同学就开始抱怨队伍移动得太慢了。\n\n"这能力真的很神奇，"李天阳心想，"我可以提前预知别人的情绪变化。"\n\n下午的课堂上，李天阳发现自己不仅能看到情感的颜色，还能感知到具体的情感值，这些数值从0到100不等，代表情感的强度。'
        },
        {
            title: '第三章 初显锋芒',
            content: '李天阳利用能力解决一个小困境，初步展示能力的实用价值，引起某些人的注意。\n\n班级里即将举行一次小组讨论，往常这种时候，李天阳总是被动地等待别人邀请。但这次，他主动观察同学们的情感值，找到了几个对讨论话题充满热情（黄色光晕较强）但又有些犹豫不决（带有淡紫色）的同学。\n\n他走上前去，恰到好处地表达了自己的想法，并邀请他们组队。令他惊喜的是，这些同学立刻接受了他的邀请，而且讨论过程异常顺利，因为他能根据大家的情感变化适时调整话题方向。\n\n小组讨论结束后，他们的成果获得了老师的高度评价。班长王明看着李天阳的眼神中带着一丝疑惑和好奇，头顶的光晕显示他对李天阳突然的变化产生了浓厚的兴趣。'
        }
    ];
} 