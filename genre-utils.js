// 流派工具函数

/**
 * 根据流派类别和频道生成HTML内容
 * @param {string} category - 流派类别
 * @param {string} channel - 频道（male/female）
 * @returns {string} HTML内容
 */
function generateGenreHTML(category, channel) {
    let genres = [];
    let channelClass = channel === 'male' ? 'male' : 'female';
    
    // 根据频道选择对应的流派数据
    if (channel === 'male') {
        if (maleGenres[category]) {
            genres = maleGenres[category];
        }
    } else {
        if (femaleGenres[category]) {
            genres = femaleGenres[category];
        } else if (category === 'ancient') {
            // 女频特有的古代类型
            genres = femaleGenres.ancient;
        } else if (category === 'fantasy_world') {
            // 女频特有的幻想类型
            genres = femaleGenres.fantasy_world;
        } else if (category === 'modern_romance') {
            // 女频特有的现代言情
            genres = femaleGenres.modern_romance;
        } else if (category === 'mystery') {
            // 女频特有的悬疑推理
            genres = femaleGenres.mystery;
        }
    }
    
    // 如果没有找到对应的流派数据，返回空字符串
    if (!genres || genres.length === 0) {
        return '';
    }
    
    // 生成HTML内容
    let html = '';
    genres.forEach(genre => {
        html += `
            <div class="genre-card ${channelClass} border rounded-lg p-4" onclick="selectFinalGenre(this, '${category}-${genre.name}')">
                <div class="flex items-center mb-2">
                    <h3 class="font-bold">${genre.name}</h3>
                </div>
                <p class="text-sm text-gray-600">${genre.description}</p>
            </div>
        `;
    });
    
    return html;
}

/**
 * 更新流派大类列表
 * @param {string} channel - 频道（male/female）
 */
function updateCategoryList(channel) {
    const categoriesContainer = document.getElementById('genre-categories');
    let html = '';
    
    if (channel === 'male') {
        // 男频流派大类
        html = `
            <div class="subgenre-item p-2 rounded selected" data-category="urban" onclick="selectCategory(this)">
                <i class="fas fa-building mr-2 text-blue-500"></i> 都市
            </div>
            <div class="subgenre-item p-2 rounded" data-category="fantasy" onclick="selectCategory(this)">
                <i class="fas fa-dragon mr-2 text-blue-500"></i> 玄幻
            </div>
            <div class="subgenre-item p-2 rounded" data-category="xianxia" onclick="selectCategory(this)">
                <i class="fas fa-mountain mr-2 text-blue-500"></i> 仙侠
            </div>
            <div class="subgenre-item p-2 rounded" data-category="scifi" onclick="selectCategory(this)">
                <i class="fas fa-rocket mr-2 text-blue-500"></i> 科幻
            </div>
            <div class="subgenre-item p-2 rounded" data-category="history" onclick="selectCategory(this)">
                <i class="fas fa-landmark mr-2 text-blue-500"></i> 历史
            </div>
            <div class="subgenre-item p-2 rounded" data-category="game" onclick="selectCategory(this)">
                <i class="fas fa-gamepad mr-2 text-blue-500"></i> 游戏
            </div>
            <div class="subgenre-item p-2 rounded" data-category="future" onclick="selectCategory(this)">
                <i class="fas fa-microchip mr-2 text-blue-500"></i> 未来
            </div>
        `;
    } else {
        // 女频流派大类
        html = `
            <div class="subgenre-item p-2 rounded selected" data-category="urban" onclick="selectCategory(this)">
                <i class="fas fa-building mr-2 text-pink-500"></i> 都市
            </div>
            <div class="subgenre-item p-2 rounded" data-category="ancient" onclick="selectCategory(this)">
                <i class="fas fa-crown mr-2 text-pink-500"></i> 古代
            </div>
            <div class="subgenre-item p-2 rounded" data-category="fantasy" onclick="selectCategory(this)">
                <i class="fas fa-dragon mr-2 text-pink-500"></i> 玄幻
            </div>
            <div class="subgenre-item p-2 rounded" data-category="fantasy_world" onclick="selectCategory(this)">
                <i class="fas fa-hat-wizard mr-2 text-pink-500"></i> 幻想
            </div>
            <div class="subgenre-item p-2 rounded" data-category="modern_romance" onclick="selectCategory(this)">
                <i class="fas fa-heart mr-2 text-pink-500"></i> 现代言情
            </div>
            <div class="subgenre-item p-2 rounded" data-category="mystery" onclick="selectCategory(this)">
                <i class="fas fa-search mr-2 text-pink-500"></i> 悬疑推理
            </div>
        `;
    }
    
    categoriesContainer.innerHTML = html;
}

/**
 * 初始化所有流派内容
 */
function initializeGenreContents() {
    console.log("初始化所有流派内容");
    
    // 创建女频内容的容器（如果不存在）
    createFemaleGenreContainers();
    
    // 清空所有容器内容，以便重新生成
    document.querySelectorAll('[id$="-types"]').forEach(container => {
        container.innerHTML = '';
    });
    
    // 初始化男频内容
    document.getElementById('urban-types').innerHTML = generateGenreHTML('urban', 'male');
    document.getElementById('fantasy-types').innerHTML = generateGenreHTML('fantasy', 'male');
    document.getElementById('xianxia-types').innerHTML = generateGenreHTML('xianxia', 'male');
    document.getElementById('scifi-types').innerHTML = generateGenreHTML('scifi', 'male');
    document.getElementById('history-types').innerHTML = generateGenreHTML('history', 'male');
    document.getElementById('game-types').innerHTML = generateGenreHTML('game', 'male');
    document.getElementById('future-types').innerHTML = generateGenreHTML('future', 'male');
}

/**
 * 创建女频内容的容器
 */
function createFemaleGenreContainers() {
    const containerDiv = document.querySelector('.bg-white.rounded-lg.border.p-4');
    
    // 检查女频特有的容器是否存在，如果不存在则创建
    if (!document.getElementById('ancient-types')) {
        const ancientDiv = document.createElement('div');
        ancientDiv.id = 'ancient-types';
        ancientDiv.className = 'grid grid-cols-1 md:grid-cols-3 gap-4 hidden';
        containerDiv.appendChild(ancientDiv);
    }
    
    if (!document.getElementById('fantasy_world-types')) {
        const fantasyWorldDiv = document.createElement('div');
        fantasyWorldDiv.id = 'fantasy_world-types';
        fantasyWorldDiv.className = 'grid grid-cols-1 md:grid-cols-3 gap-4 hidden';
        containerDiv.appendChild(fantasyWorldDiv);
    }
    
    if (!document.getElementById('modern_romance-types')) {
        const modernRomanceDiv = document.createElement('div');
        modernRomanceDiv.id = 'modern_romance-types';
        modernRomanceDiv.className = 'grid grid-cols-1 md:grid-cols-3 gap-4 hidden';
        containerDiv.appendChild(modernRomanceDiv);
    }
    
    if (!document.getElementById('mystery-types')) {
        const mysteryDiv = document.createElement('div');
        mysteryDiv.id = 'mystery-types';
        mysteryDiv.className = 'grid grid-cols-1 md:grid-cols-3 gap-4 hidden';
        containerDiv.appendChild(mysteryDiv);
    }
}

/**
 * 更新流派列表（根据频道）
 * @param {string} channel - 频道（male/female）
 */
function updateGenreList(channel) {
    // 更新流派大类
    updateCategoryList(channel);
    
    // 创建女频内容的容器（如果不存在）
    if (channel === 'female') {
        createFemaleGenreContainers();
    }
    
    // 清空所有容器内容，以便重新生成
    document.querySelectorAll('[id$="-types"]').forEach(container => {
        container.innerHTML = '';
    });
    
    if (channel === 'female') {
        // 初始化女频内容
        document.getElementById('urban-types').innerHTML = generateGenreHTML('urban', 'female');
        document.getElementById('fantasy-types').innerHTML = generateGenreHTML('fantasy', 'female');
        document.getElementById('ancient-types').innerHTML = generateGenreHTML('ancient', 'female');
        document.getElementById('fantasy_world-types').innerHTML = generateGenreHTML('fantasy_world', 'female');
        document.getElementById('modern_romance-types').innerHTML = generateGenreHTML('modern_romance', 'female');
        document.getElementById('mystery-types').innerHTML = generateGenreHTML('mystery', 'female');
        
        // 隐藏男频特有的容器
        document.getElementById('xianxia-types').classList.add('hidden');
        document.getElementById('scifi-types').classList.add('hidden');
        document.getElementById('history-types').classList.add('hidden');
        document.getElementById('game-types').classList.add('hidden');
        document.getElementById('future-types').classList.add('hidden');
    } else {
        // 初始化男频内容
        document.getElementById('urban-types').innerHTML = generateGenreHTML('urban', 'male');
        document.getElementById('fantasy-types').innerHTML = generateGenreHTML('fantasy', 'male');
        document.getElementById('xianxia-types').innerHTML = generateGenreHTML('xianxia', 'male');
        document.getElementById('scifi-types').innerHTML = generateGenreHTML('scifi', 'male');
        document.getElementById('history-types').innerHTML = generateGenreHTML('history', 'male');
        document.getElementById('game-types').innerHTML = generateGenreHTML('game', 'male');
        document.getElementById('future-types').innerHTML = generateGenreHTML('future', 'male');
        
        // 隐藏女频特有的容器
        document.getElementById('ancient-types').classList.add('hidden');
        document.getElementById('fantasy_world-types').classList.add('hidden');
        document.getElementById('modern_romance-types').classList.add('hidden');
        document.getElementById('mystery-types').classList.add('hidden');
    }
    
    // 默认选中第一个类别
    const firstCategory = document.querySelector('#genre-categories .subgenre-item');
    if (firstCategory) {
        selectCategory(firstCategory);
    }
}

/**
 * 选择最终流派
 * @param {HTMLElement} element - 被点击的元素
 * @param {string} genreName - 流派名称
 */
function selectFinalGenre(element, genreName) {
    // 移除所有选中状态
    document.querySelectorAll('.genre-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // 添加选中状态
    element.classList.add('selected');
    
    // 更新当前选择
    document.getElementById('selected-genre').textContent = genreName;
    
    // 从流派名称中提取大类和小类
    const parts = genreName.split('-');
    if (parts.length !== 2) return;
    
    const category = parts[0].trim();
    const subtype = parts[1].trim();
    
    // 查找对应的描述
    let description = '';
    const channel = document.getElementById('selected-channel-tag').textContent === '女频' ? 'female' : 'male';
    
    if (channel === 'male') {
        const categoryData = maleGenres[getCategoryKey(category)];
        if (categoryData) {
            const subtypeData = categoryData.find(item => item.name === subtype);
            if (subtypeData) {
                description = subtypeData.description;
                // 添加更详细的描述
                if (typeof getDetailedDescription === 'function') {
                    description += '。这类小说通常' + getDetailedDescription(category, subtype);
                }
            }
        }
    } else {
        const categoryData = femaleGenres[getCategoryKey(category)];
        if (categoryData) {
            const subtypeData = categoryData.find(item => item.name === subtype);
            if (subtypeData) {
                description = subtypeData.description;
                // 添加更详细的描述
                if (typeof getDetailedDescription === 'function') {
                    description += '。这类小说通常' + getDetailedDescription(category, subtype);
                }
            }
        }
    }
    
    if (description) {
        document.getElementById('selected-description').textContent = description;
    } else {
        document.getElementById('selected-description').textContent = '您选择的是' + genreName + '类型的小说，AI将根据该类型的特点为您提供创作建议。';
    }
}

/**
 * 获取类别键名
 * @param {string} category - 中文类别名
 * @returns {string} 对应的键名
 */
function getCategoryKey(category) {
    // 将中文类别名转换为对应的键名
    switch (category) {
        case '都市': return 'urban';
        case '玄幻': return 'fantasy';
        case '仙侠': return 'xianxia';
        case '科幻': return 'scifi';
        case '历史': return 'history';
        case '游戏': return 'game';
        case '未来': return 'future';
        case '古代': return 'ancient';
        case '幻想': return 'fantasy_world';
        case '现代言情': return 'modern_romance';
        case '悬疑推理': return 'mystery';
        default: return '';
    }
}

/**
 * 选择流派大类
 * @param {HTMLElement} element - 被点击的元素
 */
function selectCategory(element) {
    // 移除所有选中状态
    document.querySelectorAll('#genre-categories .subgenre-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // 添加选中状态
    element.classList.add('selected');
    
    // 获取选中的类别
    const category = element.getAttribute('data-category');
    
    // 隐藏所有类型
    document.querySelectorAll('[id$="-types"]').forEach(item => {
        item.classList.add('hidden');
    });
    
    // 显示选中类别的类型
    const categoryContainer = document.getElementById(category + '-types');
    if (categoryContainer) {
        categoryContainer.classList.remove('hidden');
        
        // 检查容器内容是否为空，如果为空则重新生成内容
        if (!categoryContainer.innerHTML.trim()) {
            const channel = document.getElementById('selected-channel-tag').textContent === '女频' ? 'female' : 'male';
            categoryContainer.innerHTML = generateGenreHTML(category, channel);
            console.log(`重新生成 ${category} 类别的内容，频道: ${channel}`);
        }
    } else {
        console.error(`找不到 ${category} 类别的容器`);
    }
} 