// 初始化男频和女频流派对象
var maleGenres = {};
var femaleGenres = {};

// 男频都市流派
maleGenres.urban = [
    {
        name: "异能流",
        description: "主角在都市中获得超能力，逆袭崛起"
    },
    {
        name: "职场流",
        description: "主角在职场中凭借能力和智慧，成就传奇"
    },
    {
        name: "医生流",
        description: "主角是医术高超的医生，解决各种疑难杂症"
    },
    {
        name: "学生流",
        description: "主角是学生，在校园中展开的故事"
    },
    {
        name: "商战流",
        description: "主角在商业世界中运筹帷幄，决胜千里"
    },
    {
        name: "保镖流",
        description: "主角是身怀绝技的保镖，保护重要人物"
    }
];

// 男频玄幻流派
maleGenres.fantasy = [
    {
        name: "升级流",
        description: "主角获得神秘传承，一路升级打怪"
    },
    {
        name: "无敌流",
        description: "主角拥有碾压一切的实力，横扫诸天"
    },
    {
        name: "系统流",
        description: "主角获得神秘系统，辅助修炼成长"
    },
    {
        name: "重生流",
        description: "主角重生回到过去，改变命运"
    },
    {
        name: "穿越流",
        description: "主角穿越到异世界，开启新的人生"
    },
    {
        name: "种田流",
        description: "主角在异世界发展领地，建设家园"
    }
];

// 男频仙侠流派
maleGenres.xianxia = [
    {
        name: "修真流",
        description: "主角通过修炼成仙，追求长生不老"
    },
    {
        name: "山门流",
        description: "主角在仙门宗派中修炼，经历各种考验"
    },
    {
        name: "洪荒流",
        description: "故事背景设定在远古洪荒时期，讲述开天辟地的神话"
    },
    {
        name: "剑修流",
        description: "主角以剑为伴，修炼剑道，追求剑道极致"
    },
    {
        name: "气运流",
        description: "主角拥有逆天气运，能够改变命运走向"
    },
    {
        name: "丹修流",
        description: "主角专注于炼丹之道，成为炼丹大师"
    }
];

// 男频科幻流派
maleGenres.scifi = [
    {
        name: "星际流",
        description: "故事发生在浩瀚宇宙中，主角在星际间冒险"
    },
    {
        name: "末世流",
        description: "人类文明面临灭绝危机，主角在末世中求生存"
    },
    {
        name: "机甲流",
        description: "主角驾驶或研发机甲，与敌人或怪物战斗"
    },
    {
        name: "基因流",
        description: "主角通过基因改造获得超能力，探索生命奥秘"
    },
    {
        name: "时空流",
        description: "涉及时间旅行或平行宇宙，探索时空奥秘"
    },
    {
        name: "黑科技流",
        description: "主角掌握超前科技，引领科技革命"
    }
];

// 男频历史流派
maleGenres.history = [
    {
        name: "争霸流",
        description: "主角在历史背景下争夺天下，成就霸业"
    },
    {
        name: "军事流",
        description: "主角带兵打仗，运筹帷幄，决胜千里"
    },
    {
        name: "官场流",
        description: "主角在古代官场中步步高升，施展才华"
    },
    {
        name: "谋略流",
        description: "主角以智谋为主，运用计谋达成目标"
    },
    {
        name: "文人流",
        description: "主角是文人墨客，以才学闻名天下"
    },
    {
        name: "武将流",
        description: "主角是勇猛武将，征战沙场，建功立业"
    }
];

// 男频游戏流派
maleGenres.game = [
    {
        name: "网游流",
        description: "主角在虚拟网游世界中冒险，成为顶尖高手"
    },
    {
        name: "电竞流",
        description: "主角在电子竞技领域奋斗，追求冠军梦想"
    },
    {
        name: "游戏开发流",
        description: "主角开发游戏，创造虚拟世界"
    },
    {
        name: "模拟器流",
        description: "主角获得模拟器，可以模拟各种技能或场景"
    },
    {
        name: "游戏主播流",
        description: "主角是游戏主播，通过直播游戏获得成功"
    },
    {
        name: "游戏穿越流",
        description: "主角穿越到游戏世界中，成为游戏角色"
    }
];

// 男频未来流派
maleGenres.future = [
    {
        name: "科技流",
        description: "描绘未来科技发展，主角引领科技革命"
    },
    {
        name: "赛博朋克流",
        description: "高科技与低生活的对比，探讨科技与人性"
    },
    {
        name: "后启示录流",
        description: "文明重建，主角在废土世界中求生存"
    },
    {
        name: "人工智能流",
        description: "探讨AI与人类的关系，思考科技伦理"
    },
    {
        name: "虚拟现实流",
        description: "现实与虚拟世界的界限模糊，主角在两个世界中穿梭"
    },
    {
        name: "太空殖民流",
        description: "人类移民太空，开拓新的生存空间"
    }
];

// 女频都市流派
femaleGenres.urban = [
    {
        name: "职场流",
        description: "女主在职场中奋斗成长，事业爱情双丰收"
    },
    {
        name: "总裁流",
        description: "女主与霸道总裁相遇，展开浪漫爱情故事"
    },
    {
        name: "豪门流",
        description: "女主进入豪门，面对复杂的家族关系与争斗"
    },
    {
        name: "医疗流",
        description: "女主是医术高超的医生，在医院中展开故事"
    },
    {
        name: "娱乐圈流",
        description: "女主在娱乐圈打拼，面对明星生活的挑战"
    },
    {
        name: "甜宠流",
        description: "轻松甜蜜的爱情故事，男女主角互相宠爱"
    }
];

// 女频古代流派
femaleGenres.ancient = [
    {
        name: "宫廷流",
        description: "女主在宫廷中步步为营，成就传奇"
    },
    {
        name: "穿越流",
        description: "现代女性穿越到古代，凭借现代知识改变命运"
    },
    {
        name: "重生流",
        description: "女主重生回到过去，改写人生轨迹"
    },
    {
        name: "种田流",
        description: "女主在古代乡村发展产业，改善生活"
    },
    {
        name: "权谋流",
        description: "女主运用智谋在复杂的权力斗争中生存"
    },
    {
        name: "医女流",
        description: "女主精通医术，在古代行医救人"
    }
];

// 女频玄幻流派
femaleGenres.fantasy = [
    {
        name: "仙侠流",
        description: "女主修炼成仙，在仙侠世界中冒险"
    },
    {
        name: "灵异流",
        description: "女主拥有特殊能力，能够看到灵异现象"
    },
    {
        name: "异能流",
        description: "女主觉醒超能力，在现代或异世界中冒险"
    },
    {
        name: "魔法流",
        description: "女主掌握魔法，在魔法世界中成长"
    },
    {
        name: "神话流",
        description: "故事背景融入神话元素，女主与神明互动"
    },
    {
        name: "妖精流",
        description: "女主是妖精或与妖精相关，探索人与妖的关系"
    }
];

// 女频幻想流派
femaleGenres.fantasy_world = [
    {
        name: "西幻流",
        description: "故事背景设定在西方奇幻世界，有骑士、魔法等元素"
    },
    {
        name: "校园流",
        description: "故事发生在魔法学校或特殊学院中"
    },
    {
        name: "异世界流",
        description: "女主穿越到异世界，开启全新冒险"
    },
    {
        name: "星际流",
        description: "故事背景设定在未来星际世界，有浪漫元素"
    },
    {
        name: "末世流",
        description: "在末世背景下，女主求生存并寻找爱情"
    },
    {
        name: "游戏流",
        description: "女主进入游戏世界或以游戏为背景的故事"
    }
];

// 女频现代言情流派
femaleGenres.modern_romance = [
    {
        name: "青春校园流",
        description: "以校园为背景的青春恋爱故事"
    },
    {
        name: "暖婚流",
        description: "已婚夫妻的甜蜜生活和相处之道"
    },
    {
        name: "契约婚姻流",
        description: "男女主角因某种原因签订婚姻契约，假戏真做"
    },
    {
        name: "闪婚流",
        description: "男女主角快速结婚，在婚后慢慢了解彼此"
    },
    {
        name: "破镜重圆流",
        description: "曾经分手或离婚的情侣重新走到一起"
    },
    {
        name: "日久生情流",
        description: "男女主角朝夕相处，慢慢产生感情"
    }
];

// 女频悬疑推理流派
femaleGenres.mystery = [
    {
        name: "侦探流",
        description: "女主是侦探，解决各种悬疑案件"
    },
    {
        name: "推理流",
        description: "女主凭借推理能力解开谜团"
    },
    {
        name: "悬疑流",
        description: "充满悬疑元素的故事，女主揭开真相"
    },
    {
        name: "惊悚流",
        description: "带有惊悚元素的故事，女主面对恐怖事件"
    },
    {
        name: "犯罪心理流",
        description: "女主研究犯罪心理，破解案件"
    },
    {
        name: "灵异悬疑流",
        description: "结合灵异元素的悬疑故事"
    }
]; 