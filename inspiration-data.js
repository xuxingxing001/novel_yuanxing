// 灵感生成数据
// 包含不同频道和分类下的预设标签

// 情节元素预设标签
const plotTags = {
    // 男频情节标签
    male: {
        // 都市类
        urban: [
            { name: "逆袭崛起", description: "主角从底层逐步崛起，获得成功" },
            { name: "身份隐藏", description: "主角隐藏真实身份，低调行事" },
            { name: "意外获能", description: "主角意外获得特殊能力或机遇" },
            { name: "职场竞争", description: "主角在职场中与对手展开竞争" },
            { name: "复仇", description: "主角为过去的伤害进行复仇" },
            { name: "守护", description: "主角守护重要的人或事物" }
        ],
        // 玄幻类
        fantasy: [
            { name: "修炼升级", description: "主角通过修炼不断提升实力" },
            { name: "争夺资源", description: "为了修炼资源与他人争夺" },
            { name: "历练冒险", description: "主角外出历练，经历各种冒险" },
            { name: "宗门竞争", description: "不同宗门之间的竞争与对抗" },
            { name: "天才崛起", description: "主角展现天赋，一路崛起" },
            { name: "逆天改命", description: "主角改变命运，逆天而行" }
        ],
        // 仙侠类
        xianxia: [
            { name: "问道修仙", description: "主角追求长生大道，修炼成仙" },
            { name: "斩妖除魔", description: "主角斩妖除魔，维护正道" },
            { name: "飞升大劫", description: "面对飞升大劫的挑战" },
            { name: "宗门传承", description: "获得或守护宗门传承" },
            { name: "红尘历练", description: "仙人下凡历练或体验红尘" },
            { name: "寻找仙缘", description: "主角寻找仙缘或仙家传承" }
        ],
        // 科幻类
        scifi: [
            { name: "星际探索", description: "探索未知星球或宇宙奥秘" },
            { name: "科技革命", description: "引领或经历科技革命" },
            { name: "末日求生", description: "在末日环境中求生存" },
            { name: "虚拟现实", description: "在虚拟与现实之间的故事" },
            { name: "基因进化", description: "通过基因改造获得进化" },
            { name: "时空穿梭", description: "穿越时空，改变历史" }
        ],
        // 历史类
        history: [
            { name: "乱世争雄", description: "在乱世中争夺天下" },
            { name: "朝堂博弈", description: "在朝堂上的权力博弈" },
            { name: "军事征战", description: "带兵打仗，征战四方" },
            { name: "商贾崛起", description: "通过商业手段崛起" },
            { name: "文人风骨", description: "以文人身份影响时代" },
            { name: "隐世高人", description: "隐世高人出山，改变局势" }
        ],
        // 游戏类
        game: [
            { name: "游戏攻略", description: "主角攻略游戏，成为顶尖高手" },
            { name: "职业竞技", description: "在电竞领域追求巅峰" },
            { name: "公会争霸", description: "带领公会争夺霸主地位" },
            { name: "现实交错", description: "游戏与现实世界的交错" },
            { name: "任务挑战", description: "完成各种游戏任务和挑战" },
            { name: "游戏漏洞", description: "发现并利用游戏漏洞" }
        ],
        // 未来类
        future: [
            { name: "科技革新", description: "引领未来科技革新" },
            { name: "社会重建", description: "在废土上重建社会秩序" },
            { name: "AI觉醒", description: "人工智能觉醒带来的变革" },
            { name: "星际殖民", description: "人类向宇宙扩张殖民" },
            { name: "基因优化", description: "通过基因技术优化人类" },
            { name: "资源争夺", description: "为稀缺资源展开争夺" }
        ]
    },
    
    // 女频情节标签
    female: {
        // 都市类
        urban: [
            { name: "职场逆袭", description: "女主在职场中逆袭成功" },
            { name: "豪门恩怨", description: "与豪门家族的恩怨纠葛" },
            { name: "霸总追爱", description: "霸道总裁对女主的追求" },
            { name: "身世之谜", description: "女主身世之谜逐渐揭开" },
            { name: "事业爱情", description: "在事业与爱情间寻找平衡" },
            { name: "甜宠日常", description: "甜蜜宠溺的生活日常" }
        ],
        // 古代类
        ancient: [
            { name: "宫廷争宠", description: "后宫中的争宠与生存" },
            { name: "权谋较量", description: "朝堂上的权谋较量" },
            { name: "身份反转", description: "女主身份反转，扭转命运" },
            { name: "江湖历练", description: "在江湖中历练成长" },
            { name: "家族兴衰", description: "家族兴衰与女主命运" },
            { name: "爱情考验", description: "爱情经受各种考验" }
        ],
        // 玄幻类
        fantasy: [
            { name: "灵根觉醒", description: "女主灵根觉醒，踏上修炼之路" },
            { name: "凤凰涅槃", description: "女主经历磨难，浴火重生" },
            { name: "仙缘奇遇", description: "获得仙缘或奇遇" },
            { name: "情劫渡化", description: "渡过情劫，获得成长" },
            { name: "身世之谜", description: "女主特殊身世之谜" },
            { name: "逆天改命", description: "改变命运，逆天而行" }
        ],
        // 幻想类
        fantasy_world: [
            { name: "异世重生", description: "在异世界重生或穿越" },
            { name: "魔法学院", description: "在魔法学院学习成长" },
            { name: "种族融合", description: "不同种族间的交流与融合" },
            { name: "王国使命", description: "肩负拯救王国的使命" },
            { name: "身份觉醒", description: "觉醒特殊身份或血脉" },
            { name: "冒险旅程", description: "踏上冒险旅程" }
        ],
        // 现代言情
        modern_romance: [
            { name: "日久生情", description: "朝夕相处，日久生情" },
            { name: "契约婚姻", description: "从契约婚姻到真爱" },
            { name: "青梅竹马", description: "青梅竹马的情感发展" },
            { name: "破镜重圆", description: "曾经分离，再度重逢" },
            { name: "误会解除", description: "解除误会，重修于好" },
            { name: "甜蜜热恋", description: "甜蜜热恋的情感故事" }
        ],
        // 悬疑推理
        mystery: [
            { name: "案件调查", description: "调查各种悬疑案件" },
            { name: "身份揭秘", description: "揭开人物真实身份" },
            { name: "心理博弈", description: "与犯罪者的心理博弈" },
            { name: "灵异事件", description: "调查灵异事件" },
            { name: "真相追寻", description: "追寻隐藏的真相" },
            { name: "阴谋揭露", description: "揭露隐藏的阴谋" }
        ]
    }
};

// 角色元素预设标签
const characterTags = {
    // 男频角色标签
    male: {
        // 都市类
        urban: [
            { name: "平凡主角", description: "初始平凡，后逐渐成长" },
            { name: "神秘高手", description: "隐藏实力的神秘人物" },
            { name: "商业精英", description: "商场上的成功人士" },
            { name: "隐世家族", description: "来自有背景的隐世家族" },
            { name: "对手", description: "与主角对立的强大对手" },
            { name: "红颜知己", description: "主角的红颜知己或爱人" }
        ],
        // 玄幻类
        fantasy: [
            { name: "天才少年", description: "天赋异禀的少年" },
            { name: "废材逆袭", description: "被认为是废材后逆袭" },
            { name: "上古传人", description: "上古强者的传人" },
            { name: "神秘老者", description: "指点主角的神秘老者" },
            { name: "宗门长老", description: "宗门中的权威长老" },
            { name: "邪派魁首", description: "邪派的领袖人物" }
        ],
        // 其他类型...
    },
    
    // 女频角色标签
    female: {
        // 都市类
        urban: [
            { name: "职场女强人", description: "在职场中独当一面的女性" },
            { name: "霸道总裁", description: "霸道专横但内心柔软的总裁" },
            { name: "豪门千金", description: "出身豪门的千金小姐" },
            { name: "平凡女主", description: "初始平凡但有特殊品质" },
            { name: "闺蜜", description: "女主的知心闺蜜" },
            { name: "情敌", description: "与女主争夺爱情的对手" }
        ],
        // 古代类
        ancient: [
            { name: "宫廷女子", description: "生活在宫廷中的女子" },
            { name: "世家小姐", description: "出身世家的大家闺秀" },
            { name: "江湖侠女", description: "行走江湖的女侠" },
            { name: "皇族成员", description: "皇族中的成员" },
            { name: "神秘医女", description: "精通医术的女子" },
            { name: "商贾之女", description: "富商之家的女儿" }
        ],
        // 其他类型...
    }
};

// 设定元素预设标签
const settingTags = {
    // 男频设定标签
    male: {
        // 都市类
        urban: [
            { name: "异能体系", description: "都市中的异能力量体系" },
            { name: "隐秘组织", description: "隐藏在都市中的神秘组织" },
            { name: "商业帝国", description: "庞大的商业帝国结构" },
            { name: "都市规则", description: "都市中的生存规则" },
            { name: "特殊职业", description: "都市中的特殊职业设定" },
            { name: "家族势力", description: "有背景的家族势力" }
        ],
        // 玄幻类
        fantasy: [
            { name: "修炼体系", description: "详细的修炼等级与体系" },
            { name: "宗门制度", description: "宗门的组织结构与制度" },
            { name: "神通法术", description: "各种神通法术的设定" },
            { name: "种族设定", description: "不同种族的特点与关系" },
            { name: "天地规则", description: "世界运行的基本规则" },
            { name: "秘境空间", description: "特殊的秘境或空间" }
        ],
        // 其他类型...
    },
    
    // 女频设定标签
    female: {
        // 都市类
        urban: [
            { name: "职场规则", description: "职场中的规则与文化" },
            { name: "豪门家规", description: "豪门家族的规矩与传统" },
            { name: "社交圈层", description: "不同社交圈层的特点" },
            { name: "时尚产业", description: "时尚产业的运作方式" },
            { name: "都市传说", description: "流传在都市中的传说" },
            { name: "特殊能力", description: "主角拥有的特殊能力" }
        ],
        // 古代类
        ancient: [
            { name: "后宫制度", description: "后宫的等级与规则" },
            { name: "朝堂制度", description: "古代朝廷的运作方式" },
            { name: "门阀世家", description: "古代门阀世家的势力" },
            { name: "科举制度", description: "科举考试的规则与影响" },
            { name: "礼教规范", description: "古代礼教对人物的约束" },
            { name: "江湖帮派", description: "江湖中各帮派的设定" }
        ],
        // 其他类型...
    }
};

// 场景元素预设标签
const sceneTags = {
    // 男频场景标签
    male: {
        // 都市类
        urban: [
            { name: "高级写字楼", description: "现代化的高级写字楼" },
            { name: "豪华会所", description: "上流社会的豪华会所" },
            { name: "隐秘基地", description: "隐藏在都市中的秘密基地" },
            { name: "都市暗角", description: "都市中的阴暗角落" },
            { name: "商业谈判", description: "紧张的商业谈判场景" },
            { name: "能力对决", description: "异能者之间的对决场景" }
        ],
        // 玄幻类
        fantasy: [
            { name: "宗门大殿", description: "宏伟的宗门主殿" },
            { name: "秘境洞天", description: "神秘的秘境或洞天" },
            { name: "试炼场", description: "考验修炼者的试炼场" },
            { name: "远古遗迹", description: "充满机缘的远古遗迹" },
            { name: "修炼密室", description: "闭关修炼的密室" },
            { name: "宗门大比", description: "宗门间的比试场景" }
        ],
        // 其他类型...
    },
    
    // 女频场景标签
    female: {
        // 都市类
        urban: [
            { name: "高级办公室", description: "总裁的豪华办公室" },
            { name: "豪宅", description: "富豪的豪华住宅" },
            { name: "高级餐厅", description: "浪漫的高级餐厅" },
            { name: "时尚派对", description: "上流社会的时尚派对" },
            { name: "购物中心", description: "繁华的购物中心" },
            { name: "咖啡厅", description: "安静的咖啡厅" }
        ],
        // 古代类
        ancient: [
            { name: "皇宫大殿", description: "威严的皇宫大殿" },
            { name: "后宫寝宫", description: "精致的后宫寝宫" },
            { name: "世家庭院", description: "古典的世家庭院" },
            { name: "江湖客栈", description: "热闹的江湖客栈" },
            { name: "花园亭台", description: "优美的花园亭台" },
            { name: "宫廷宴会", description: "奢华的宫廷宴会" }
        ],
        // 其他类型...
    }
};

// 对话元素预设标签
const dialogueTags = {
    // 男频对话标签
    male: {
        // 都市类
        urban: [
            { name: "简洁有力", description: "简短有力的对话风格" },
            { name: "商场博弈", description: "商场上的博弈对话" },
            { name: "能力解释", description: "解释异能或特殊能力" },
            { name: "身份试探", description: "试探对方身份的对话" },
            { name: "冲突对峙", description: "正面冲突时的对峙" },
            { name: "指点迷津", description: "前辈对后辈的指点" }
        ],
        // 玄幻类
        fantasy: [
            { name: "修炼心得", description: "交流修炼心得的对话" },
            { name: "道法论辩", description: "关于道法的辩论" },
            { name: "威胁挑衅", description: "敌对者间的威胁挑衅" },
            { name: "传功授艺", description: "传授功法的对话" },
            { name: "身份揭露", description: "揭露真实身份的对话" },
            { name: "生死对话", description: "生死关头的重要对话" }
        ],
        // 其他类型...
    },
    
    // 女频对话标签
    female: {
        // 都市类
        urban: [
            { name: "情感表白", description: "表达情感的对话" },
            { name: "职场交锋", description: "职场上的言语交锋" },
            { name: "甜蜜互动", description: "恋人间的甜蜜对话" },
            { name: "误会澄清", description: "澄清误会的关键对话" },
            { name: "家庭争执", description: "家庭成员间的争执" },
            { name: "闺蜜倾诉", description: "与闺蜜倾诉心事" }
        ],
        // 古代类
        ancient: [
            { name: "宫廷对白", description: "宫廷中含蓄的对话" },
            { name: "身份揭示", description: "揭示真实身份的对话" },
            { name: "情感表达", description: "古代背景下的情感表达" },
            { name: "权谋对话", description: "涉及权谋的对话" },
            { name: "礼数周旋", description: "讲究礼数的周旋" },
            { name: "诗词唱和", description: "通过诗词表达情感" }
        ],
        // 其他类型...
    }
}; 