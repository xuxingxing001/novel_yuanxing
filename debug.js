// 调试脚本
function debugGenres() {
    console.log("调试流派数据:");
    
    // 检查男频流派数据
    console.log("男频流派数据:");
    console.log("都市:", maleGenres.urban ? maleGenres.urban.length + "个子类型" : "未定义");
    console.log("玄幻:", maleGenres.fantasy ? maleGenres.fantasy.length + "个子类型" : "未定义");
    console.log("仙侠:", maleGenres.xianxia ? maleGenres.xianxia.length + "个子类型" : "未定义");
    console.log("科幻:", maleGenres.scifi ? maleGenres.scifi.length + "个子类型" : "未定义");
    console.log("历史:", maleGenres.history ? maleGenres.history.length + "个子类型" : "未定义");
    console.log("游戏:", maleGenres.game ? maleGenres.game.length + "个子类型" : "未定义");
    console.log("未来:", maleGenres.future ? maleGenres.future.length + "个子类型" : "未定义");
    
    // 检查女频流派数据
    console.log("\n女频流派数据:");
    console.log("都市:", femaleGenres.urban ? femaleGenres.urban.length + "个子类型" : "未定义");
    console.log("古代:", femaleGenres.ancient ? femaleGenres.ancient.length + "个子类型" : "未定义");
    console.log("玄幻:", femaleGenres.fantasy ? femaleGenres.fantasy.length + "个子类型" : "未定义");
    console.log("幻想:", femaleGenres.fantasy_world ? femaleGenres.fantasy_world.length + "个子类型" : "未定义");
    console.log("现代言情:", femaleGenres.modern_romance ? femaleGenres.modern_romance.length + "个子类型" : "未定义");
    console.log("悬疑推理:", femaleGenres.mystery ? femaleGenres.mystery.length + "个子类型" : "未定义");
    
    // 检查HTML容器
    console.log("\nHTML容器:");
    console.log("都市容器:", document.getElementById('urban-types') ? "存在" : "不存在");
    console.log("玄幻容器:", document.getElementById('fantasy-types') ? "存在" : "不存在");
    console.log("仙侠容器:", document.getElementById('xianxia-types') ? "存在" : "不存在");
    console.log("科幻容器:", document.getElementById('scifi-types') ? "存在" : "不存在");
    console.log("历史容器:", document.getElementById('history-types') ? "存在" : "不存在");
    console.log("游戏容器:", document.getElementById('game-types') ? "存在" : "不存在");
    console.log("未来容器:", document.getElementById('future-types') ? "存在" : "不存在");
    console.log("古代容器:", document.getElementById('ancient-types') ? "存在" : "不存在");
    console.log("幻想容器:", document.getElementById('fantasy_world-types') ? "存在" : "不存在");
    console.log("现代言情容器:", document.getElementById('modern_romance-types') ? "存在" : "不存在");
    console.log("悬疑推理容器:", document.getElementById('mystery-types') ? "存在" : "不存在");
    
    // 检查生成的HTML内容
    console.log("\n生成的HTML内容:");
    console.log("都市HTML:", document.getElementById('urban-types').innerHTML ? "有内容" : "无内容");
    console.log("玄幻HTML:", document.getElementById('fantasy-types').innerHTML ? "有内容" : "无内容");
    console.log("仙侠HTML:", document.getElementById('xianxia-types').innerHTML ? "有内容" : "无内容");
    console.log("科幻HTML:", document.getElementById('scifi-types').innerHTML ? "有内容" : "无内容");
    console.log("历史HTML:", document.getElementById('history-types').innerHTML ? "有内容" : "无内容");
    console.log("游戏HTML:", document.getElementById('game-types').innerHTML ? "有内容" : "无内容");
    console.log("未来HTML:", document.getElementById('future-types').innerHTML ? "有内容" : "无内容");
} 