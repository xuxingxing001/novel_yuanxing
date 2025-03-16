/**
 * 章节大纲页面数据文件
 * 包含章节模板和预设内容
 */

// 当前选择的频道和流派
const currentChannel = localStorage.getItem('selectedChannel') || '男频';
const currentGenre = localStorage.getItem('selectedGenre') || '都市';
const currentSubGenre = localStorage.getItem('selectedSubGenre') || '异能流';

// 章节结构模板
const chapterTemplates = {
    // 男频都市异能流章节模板
    maleUrbanAbility: {
        // 开篇章节
        opening: [
            {
                title: "第一章 意外获得能力",
                description: "主角在平凡的生活中意外获得超能力，初步展示能力的特点和局限性。",
                keyPoints: ["介绍主角背景", "获得能力的契机", "初次使用能力", "能力带来的变化"]
            },
            {
                title: "第二章 能力初探",
                description: "主角开始尝试使用和掌控自己的能力，发现能力的更多特性和使用方法。",
                keyPoints: ["能力的具体表现", "能力的使用条件", "能力的副作用", "主角的心理变化"]
            },
            {
                title: "第三章 初显锋芒",
                description: "主角利用能力解决一个小困境，初步展示能力的实用价值，引起某些人的注意。",
                keyPoints: ["遭遇困境", "巧妙运用能力", "解决问题", "引起关注"]
            }
        ],
        // 中段章节
        middle: [
            {
                title: "第{n}章 能力升级",
                description: "主角的能力出现新的变化或升级，获得更强的力量或新的能力分支。",
                keyPoints: ["能力变化的触发条件", "新能力的表现形式", "主角对新能力的适应", "新能力带来的机遇"]
            },
            {
                title: "第{n}章 强敌出现",
                description: "出现一个拥有类似能力或者针对主角能力的对手，给主角带来挑战。",
                keyPoints: ["对手的背景介绍", "对手的能力特点", "与主角的初次交锋", "主角的应对策略"]
            },
            {
                title: "第{n}章 能力秘密",
                description: "主角发现自己能力的来源或者背后隐藏的秘密，了解到更大的世界观。",
                keyPoints: ["神秘线索出现", "调查能力来源", "惊人的发现", "世界观扩展"]
            },
            {
                title: "第{n}章 能力危机",
                description: "主角的能力出现失控或者副作用，面临能力危机，需要寻找解决方法。",
                keyPoints: ["能力失控的征兆", "危机的具体表现", "主角的恐惧与挣扎", "寻求帮助或解决方案"]
            }
        ],
        // 结尾章节
        ending: [
            {
                title: "第{n}章 最终对决",
                description: "主角与最终BOSS展开决战，充分运用自己的能力与智慧，战胜强大的对手。",
                keyPoints: ["决战的背景", "对手的全力出手", "主角的极限爆发", "战斗的高潮转折"]
            },
            {
                title: "第{n}章 真相揭晓",
                description: "所有谜团得到解答，能力的来源、对手的目的等真相全部揭晓。",
                keyPoints: ["核心谜团解开", "幕后黑手现身", "能力起源真相", "主角的心理变化"]
            },
            {
                title: "第{n}章 新的开始",
                description: "主角战胜一切困难后，以新的姿态面对未来，暗示后续发展。",
                keyPoints: ["主角的成长总结", "与重要角色的告别或重聚", "能力的新变化", "未来的展望"]
            }
        ]
    },
    
    // 女频古代宫廷章节模板
    femaleAncientPalace: {
        // 开篇章节
        opening: [
            {
                title: "第一章 入宫",
                description: "女主角通过选秀或其他方式进入皇宫，初次接触宫廷环境和规则。",
                keyPoints: ["女主角背景介绍", "入宫的契机", "初见皇帝/皇子", "宫廷初印象"]
            },
            {
                title: "第二章 宫规",
                description: "女主角开始学习宫廷规矩，了解后宫等级制度，遇到第一个友人或敌人。",
                keyPoints: ["宫廷规则学习", "后宫等级制度", "初次结交友人", "初遇敌对势力"]
            },
            {
                title: "第三章 初见端倪",
                description: "女主角发现宫中的一些异常现象或秘密，引起她的好奇或警觉。",
                keyPoints: ["偶然发现的线索", "宫中的异常现象", "女主角的好奇心", "初步调查"]
            }
        ],
        // 更多模板...
    }
    
    // 可以添加更多流派的章节模板
};

/**
 * 根据当前频道和流派获取对应的章节模板
 * @returns {Object} - 对应的章节模板
 */
function getChapterTemplate() {
    if (currentChannel === '男频') {
        if (currentGenre === '都市' && currentSubGenre === '异能流') {
            return chapterTemplates.maleUrbanAbility;
        }
        // 可以添加更多男频流派的判断...
    } else if (currentChannel === '女频') {
        if (currentGenre === '古代' && currentSubGenre === '宫廷') {
            return chapterTemplates.femaleAncientPalace;
        }
        // 可以添加更多女频流派的判断...
    }
    
    // 默认返回男频都市异能流的模板
    return chapterTemplates.maleUrbanAbility;
}

/**
 * 生成指定数量的章节大纲
 * @param {number} count - 章节数量
 * @returns {Array} - 章节大纲数组
 */
function generateChapterOutlines(count) {
    const template = getChapterTemplate();
    const chapters = [];
    
    // 添加开篇章节
    const openingCount = Math.min(template.opening.length, Math.ceil(count * 0.2));
    for (let i = 0; i < openingCount; i++) {
        chapters.push(template.opening[i]);
    }
    
    // 添加中段章节
    const middleCount = count - openingCount - Math.min(template.ending.length, 3);
    for (let i = 0; i < middleCount; i++) {
        const middleTemplate = template.middle[i % template.middle.length];
        const chapterNumber = openingCount + i + 1;
        
        chapters.push({
            title: middleTemplate.title.replace('{n}', chapterNumber),
            description: middleTemplate.description,
            keyPoints: [...middleTemplate.keyPoints]
        });
    }
    
    // 添加结尾章节
    const endingCount = Math.min(template.ending.length, 3);
    for (let i = 0; i < endingCount; i++) {
        const endingTemplate = template.ending[i];
        const chapterNumber = count - endingCount + i + 1;
        
        chapters.push({
            title: endingTemplate.title.replace('{n}', chapterNumber),
            description: endingTemplate.description,
            keyPoints: [...endingTemplate.keyPoints]
        });
    }
    
    return chapters;
}

// 导出函数供其他文件使用
window.getChapterTemplate = getChapterTemplate;
window.generateChapterOutlines = generateChapterOutlines; 