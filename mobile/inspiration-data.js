/**
 * 故事要素数据文件
 * 包含各类型的预设灵感标签和按流派分类的标签数据
 */

// 当前选择的频道和流派
const currentChannel = localStorage.getItem('selectedChannel') || '男频';
const currentGenre = localStorage.getItem('selectedGenre') || '都市';
const currentSubGenre = localStorage.getItem('selectedSubGenre') || '异能流';

// 男频都市-异能流预设情节标签
const maleUrbanAbilityPlotTags = [
    "意外获得超能力", "能力逐渐增强", "隐藏能力身份", "能力暴露危机", 
    "能力失控", "能力被窃取", "能力有副作用", "能力有使用限制",
    "拯救危难中的人", "对抗同类能力者", "揭露阴谋", "守护亲人朋友",
    "商业竞争", "地下势力冲突", "能力组织招募", "政府机构追查",
    "能力起源之谜", "能力者之间的较量", "普通人的嫉妒", "能力带来的责任"
];

// 男频都市-异能流预设角色标签
const maleUrbanAbilityCharacterTags = [
    "普通大学生", "隐世家族传人", "落魄富二代", "神秘研究员",
    "能力组织首领", "政府特工", "黑道大佬", "商业巨头",
    "天才黑客", "医学奇才", "军方背景", "古武传人",
    "能力猎人", "能力研究专家", "神秘导师", "能力实验体",
    "青梅竹马", "高冷女总裁", "邻家女孩", "能力少女",
    "反派科学家", "腹黑对手", "神秘老者", "双面间谍"
];

// 男频都市-异能流预设设定标签
const maleUrbanAbilitySettingTags = [
    "能力分级制度", "能力使用消耗", "能力觉醒条件", "能力互相克制",
    "能力遗传规则", "能力与情绪关联", "能力与身体素质关联", "能力使用后遗症",
    "秘密能力组织", "政府能力管控", "能力者登记制度", "能力药剂研发",
    "能力者黑市", "能力者竞技场", "能力者庇护所", "能力者猎杀令",
    "普通人与能力者共存", "能力者歧视现象", "能力起源事件", "能力者伦理问题"
];

// 男频都市-异能流预设场景标签
const maleUrbanAbilitySceneTags = [
    "繁华都市街头", "高档写字楼", "豪华别墅区", "破旧城中村",
    "地下实验室", "秘密训练基地", "能力者酒吧", "黑市交易所",
    "医院急诊室", "大学校园", "高端会所", "废弃工厂",
    "政府特殊部门", "能力者监狱", "能力者避难所", "能力者墓地",
    "高速公路追逐", "摩天大楼顶部", "地下停车场", "隐秘山庄"
];

// 女频古代-宫廷预设情节标签
const femaleAncientPalacePlotTags = [
    "选秀入宫", "宫斗争宠", "皇子夺嫡", "权臣谋逆",
    "后宫毒杀", "身世之谜", "复仇布局", "政治联姻",
    "宫变危机", "外敌入侵", "奇遇逆袭", "失宠危机",
    "太后干政", "皇帝昏庸", "朝堂博弈", "边关战事",
    "和亲远嫁", "宫中禁忌", "秘密身份", "宫闱秘闻"
];

// 更多流派的标签数据...

/**
 * 根据当前频道和流派获取对应的标签数据
 * @param {string} type - 标签类型：'plot', 'character', 'setting', 'scene'
 * @returns {Array} - 对应类型的标签数组
 */
function getTagsByType(type) {
    // 根据当前频道和流派返回对应的标签数据
    if (currentChannel === '男频') {
        if (currentGenre === '都市' && currentSubGenre === '异能流') {
            switch (type) {
                case 'plot':
                    return maleUrbanAbilityPlotTags;
                case 'character':
                    return maleUrbanAbilityCharacterTags;
                case 'setting':
                    return maleUrbanAbilitySettingTags;
                case 'scene':
                    return maleUrbanAbilitySceneTags;
                default:
                    return [];
            }
        }
        // 可以添加更多男频流派的判断...
    } else if (currentChannel === '女频') {
        if (currentGenre === '古代' && currentSubGenre === '宫廷') {
            switch (type) {
                case 'plot':
                    return femaleAncientPalacePlotTags;
                // 可以添加更多女频宫廷类型的标签...
                default:
                    return [];
            }
        }
        // 可以添加更多女频流派的判断...
    }
    
    // 默认返回男频都市异能流的标签
    switch (type) {
        case 'plot':
            return maleUrbanAbilityPlotTags;
        case 'character':
            return maleUrbanAbilityCharacterTags;
        case 'setting':
            return maleUrbanAbilitySettingTags;
        case 'scene':
            return maleUrbanAbilitySceneTags;
        default:
            return [];
    }
}

// 导出函数供其他文件使用
window.getTagsByType = getTagsByType; 