// 灵感生成工具函数

/**
 * 根据频道和流派更新元素标签
 * @param {string} elementType - 元素类型（plot/character/setting/scene/dialogue）
 * @param {string} channel - 频道（男频/女频）
 * @param {string} genre - 流派（如"都市-异能流"）
 */
function updateElementTags(elementType, channel, genre) {
    // 获取对应的标签容器
    const tagContainer = document.getElementById(`${elementType}-tags`);
    if (!tagContainer) return;
    
    // 清空现有标签
    tagContainer.innerHTML = '';
    
    // 解析流派
    const genreParts = genre.split('-');
    if (genreParts.length < 1) return;
    
    const category = genreParts[0].trim(); // 如"都市"、"玄幻"等
    
    // 确定频道对应的数据源
    const channelKey = channel === '男频' ? 'male' : 'female';
    
    // 获取对应的标签数据
    let tagsData = [];
    let categoryKey = getCategoryKey(category);
    
    // 根据元素类型选择不同的数据源
    switch (elementType) {
        case 'plot':
            if (plotTags[channelKey] && plotTags[channelKey][categoryKey]) {
                tagsData = plotTags[channelKey][categoryKey];
            }
            break;
        case 'character':
            if (characterTags[channelKey] && characterTags[channelKey][categoryKey]) {
                tagsData = characterTags[channelKey][categoryKey];
            }
            break;
        case 'setting':
            if (settingTags[channelKey] && settingTags[channelKey][categoryKey]) {
                tagsData = settingTags[channelKey][categoryKey];
            }
            break;
        case 'scene':
            if (sceneTags[channelKey] && sceneTags[channelKey][categoryKey]) {
                tagsData = sceneTags[channelKey][categoryKey];
            }
            break;
        case 'dialogue':
            if (dialogueTags[channelKey] && dialogueTags[channelKey][categoryKey]) {
                tagsData = dialogueTags[channelKey][categoryKey];
            }
            break;
    }
    
    // 如果没有找到对应的标签数据，使用默认标签
    if (tagsData.length === 0) {
        tagsData = getDefaultTags(elementType, channelKey);
    }
    
    // 生成标签HTML
    tagsData.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = `tag tag-${channelKey}`;
        tagElement.textContent = tag.name;
        tagElement.title = tag.description;
        tagElement.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
        tagContainer.appendChild(tagElement);
    });
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
        default: return 'urban'; // 默认返回都市
    }
}

/**
 * 获取默认标签
 * @param {string} elementType - 元素类型
 * @param {string} channelKey - 频道键名（male/female）
 * @returns {Array} 默认标签数组
 */
function getDefaultTags(elementType, channelKey) {
    // 根据元素类型和频道返回默认标签
    const defaultTags = {
        male: {
            plot: [
                { name: "逆袭崛起", description: "主角从底层逐步崛起，获得成功" },
                { name: "意外获能", description: "主角意外获得特殊能力或机遇" },
                { name: "复仇", description: "主角为过去的伤害进行复仇" },
                { name: "守护", description: "主角守护重要的人或事物" }
            ],
            character: [
                { name: "平凡主角", description: "初始平凡，后逐渐成长" },
                { name: "神秘高手", description: "隐藏实力的神秘人物" },
                { name: "对手", description: "与主角对立的强大对手" },
                { name: "红颜知己", description: "主角的红颜知己或爱人" }
            ],
            setting: [
                { name: "特殊能力", description: "主角拥有的特殊能力设定" },
                { name: "组织架构", description: "故事中的组织架构设定" },
                { name: "世界规则", description: "世界运行的基本规则" },
                { name: "背景设定", description: "故事的背景设定" }
            ],
            scene: [
                { name: "关键场所", description: "故事中的关键场所" },
                { name: "对决场景", description: "主角与对手对决的场景" },
                { name: "修炼场所", description: "主角修炼或成长的场所" },
                { name: "日常场景", description: "日常生活的场景" }
            ],
            dialogue: [
                { name: "冲突对话", description: "冲突时的对话" },
                { name: "能力解释", description: "解释能力或设定的对话" },
                { name: "情感表达", description: "表达情感的对话" },
                { name: "身份揭示", description: "揭示身份的关键对话" }
            ]
        },
        female: {
            plot: [
                { name: "身份反转", description: "女主身份反转，扭转命运" },
                { name: "情感成长", description: "女主在情感上的成长" },
                { name: "事业发展", description: "女主在事业上的发展" },
                { name: "身世之谜", description: "女主身世之谜逐渐揭开" }
            ],
            character: [
                { name: "女主角", description: "故事的女主角" },
                { name: "男主角", description: "故事的男主角" },
                { name: "闺蜜", description: "女主的知心闺蜜" },
                { name: "对手", description: "与女主对立的对手" }
            ],
            setting: [
                { name: "社会背景", description: "故事的社会背景设定" },
                { name: "情感规则", description: "情感发展的规则设定" },
                { name: "特殊能力", description: "特殊能力或设定" },
                { name: "世界观", description: "故事的世界观设定" }
            ],
            scene: [
                { name: "情感场景", description: "情感发展的关键场景" },
                { name: "日常场景", description: "日常生活的场景" },
                { name: "冲突场景", description: "冲突发生的场景" },
                { name: "转折场景", description: "故事转折的关键场景" }
            ],
            dialogue: [
                { name: "情感表白", description: "表达情感的对话" },
                { name: "误会澄清", description: "澄清误会的对话" },
                { name: "冲突对话", description: "冲突时的对话" },
                { name: "日常交流", description: "日常的交流对话" }
            ]
        }
    };
    
    return defaultTags[channelKey][elementType] || [];
}

/**
 * 获取选中的标签
 * @param {string} containerId - 标签容器ID
 * @returns {Array} 选中的标签数组
 */
function getSelectedTags(containerId) {
    const tags = [];
    document.querySelectorAll(`#${containerId} .tag.selected`).forEach(tag => {
        tags.push(tag.textContent);
    });
    return tags;
}

/**
 * 初始化标签选择功能
 */
function initTagSelection() {
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
} 