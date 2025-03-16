// 章节细纲数据

// 示例章节数据
const chapters = [
    {
        id: 1,
        title: "第一章 神秘系统",
        summary: "大学生李天阳在一次偶然的机会下获得了一个神秘的系统，可以看到他人的情感值。",
        scenes: [
            {
                id: 101,
                title: "意外发现",
                setting: "大学校园",
                characters: "李天阳、室友张明",
                goals: "介绍主角李天阳的普通大学生活",
                events: "李天阳在校园里偶然捡到一个奇怪的手环，戴上后发现可以看到他人头顶上方的情感数值。",
                conflicts: "李天阳对这个突如其来的能力感到困惑和不安",
                outcome: "李天阳决定暂时保留这个手环，并开始尝试理解这个能力"
            },
            {
                id: 102,
                title: "初次尝试",
                setting: "大学食堂",
                characters: "李天阳、暗恋对象林小雨",
                goals: "测试情感系统的功能",
                events: "李天阳在食堂偶遇暗恋已久的林小雨，通过系统看到她对自己的好感度数值",
                conflicts: "李天阳发现林小雨对自己的好感度并不高，与自己的预期不符",
                outcome: "李天阳决定利用这个系统来提升林小雨对自己的好感度"
            },
            {
                id: 103,
                title: "系统探索",
                setting: "李天阳的宿舍",
                characters: "李天阳",
                goals: "深入了解系统的功能和限制",
                events: "李天阳尝试研究手环的各种功能，发现除了情感值外，还能看到情感波动和真实想法",
                conflicts: "系统使用过度会导致头痛",
                outcome: "李天阳制定了系统使用的规则，避免过度依赖"
            }
        ]
    },
    {
        id: 2,
        title: "第二章 校园风云",
        summary: "李天阳利用系统在校园中游刃有余，解决各种人际关系问题，同时也引起了某些人的注意。",
        scenes: [
            {
                id: 201,
                title: "解决纠纷",
                setting: "大学教室",
                characters: "李天阳、班长刘洋、几位同学",
                goals: "利用系统能力解决班级纠纷",
                events: "班级内出现矛盾，李天阳通过观察各方情感值，找出问题根源并调解",
                conflicts: "调解过程中需要隐藏自己的能力",
                outcome: "成功化解矛盾，获得同学们的信任和尊重"
            },
            {
                id: 202,
                title: "神秘跟踪",
                setting: "校园、图书馆",
                characters: "李天阳、神秘女子",
                goals: "发现有人在跟踪自己",
                events: "李天阳感觉被人跟踪，通过系统发现一个陌生女子对自己有异常的情感波动",
                conflicts: "无法确定对方的身份和目的",
                outcome: "决定主动接触这个神秘人物"
            }
        ]
    },
    {
        id: 3,
        title: "第三章 危机初现",
        summary: "李天阳发现自己并非唯一拥有特殊能力的人，同时也意识到系统背后可能隐藏着更大的秘密。",
        scenes: [
            {
                id: 301,
                title: "能力者相遇",
                setting: "校外咖啡厅",
                characters: "李天阳、神秘女子苏雨晴",
                goals: "了解神秘女子的身份和目的",
                events: "李天阳约神秘女子见面，发现她也拥有特殊能力，能够感知他人的情绪",
                conflicts: "苏雨晴警告李天阳关于能力的危险性",
                outcome: "李天阳得知还有其他能力者的存在"
            },
            {
                id: 302,
                title: "组织线索",
                setting: "苏雨晴的住所",
                characters: "李天阳、苏雨晴",
                goals: "了解更多关于特殊能力的信息",
                events: "苏雨晴向李天阳透露有一个神秘组织在寻找和研究能力者",
                conflicts: "李天阳不确定是否应该相信苏雨晴",
                outcome: "决定与苏雨晴合作，调查这个组织"
            }
        ]
    }
];

// 获取所有章节
function getAllChapters() {
    return chapters;
}

// 保存章节数据
function saveChapters(updatedChapters) {
    // 在实际应用中，这里应该有保存到服务器或本地存储的逻辑
    console.log("保存章节数据:", updatedChapters);
    // 模拟保存成功
    return true;
}

// 获取当前章节
function getCurrentChapter() {
    // 获取当前选中的章节，默认为第一章
    const currentChapterId = parseInt(localStorage.getItem('currentChapterId')) || 1;
    return chapters.find(chapter => chapter.id === currentChapterId) || chapters[0];
}

// 获取当前场景
function getCurrentScene() {
    const currentChapter = getCurrentChapter();
    const currentSceneId = parseInt(localStorage.getItem('currentSceneId')) || (currentChapter.scenes[0]?.id || 0);
    return currentChapter.scenes.find(scene => scene.id === currentSceneId) || currentChapter.scenes[0];
}

// 导航到上一章
function goToPreviousChapter() {
    const currentChapter = getCurrentChapter();
    const currentIndex = chapters.findIndex(chapter => chapter.id === currentChapter.id);
    
    if (currentIndex > 0) {
        const previousChapter = chapters[currentIndex - 1];
        localStorage.setItem('currentChapterId', previousChapter.id);
        // 默认选择上一章的第一个场景
        if (previousChapter.scenes.length > 0) {
            localStorage.setItem('currentSceneId', previousChapter.scenes[0].id);
        }
        return previousChapter;
    }
    
    return currentChapter;
}

// 导航到下一章
function goToNextChapter() {
    const currentChapter = getCurrentChapter();
    const currentIndex = chapters.findIndex(chapter => chapter.id === currentChapter.id);
    
    if (currentIndex < chapters.length - 1) {
        const nextChapter = chapters[currentIndex + 1];
        localStorage.setItem('currentChapterId', nextChapter.id);
        // 默认选择下一章的第一个场景
        if (nextChapter.scenes.length > 0) {
            localStorage.setItem('currentSceneId', nextChapter.scenes[0].id);
        }
        return nextChapter;
    }
    
    return currentChapter;
}

// 选择特定章节
function selectChapter(chapterId) {
    const chapter = chapters.find(chapter => chapter.id === chapterId);
    if (chapter) {
        localStorage.setItem('currentChapterId', chapterId);
        // 默认选择该章的第一个场景
        if (chapter.scenes.length > 0) {
            localStorage.setItem('currentSceneId', chapter.scenes[0].id);
        }
        return chapter;
    }
    return null;
}

// 选择特定场景
function selectScene(sceneId) {
    const currentChapter = getCurrentChapter();
    const scene = currentChapter.scenes.find(scene => scene.id === sceneId);
    if (scene) {
        localStorage.setItem('currentSceneId', sceneId);
        return scene;
    }
    return null;
}

// 更新场景内容
function updateScene(sceneId, updatedData) {
    const currentChapter = getCurrentChapter();
    const sceneIndex = currentChapter.scenes.findIndex(scene => scene.id === sceneId);
    
    if (sceneIndex !== -1) {
        // 更新场景数据
        chapters.forEach(chapter => {
            if (chapter.id === currentChapter.id) {
                chapter.scenes[sceneIndex] = {
                    ...chapter.scenes[sceneIndex],
                    ...updatedData
                };
            }
        });
        
        // 保存更新后的数据
        saveChapters(chapters);
        return true;
    }
    
    return false;
}

// 添加新场景
function addNewScene(sceneData) {
    const currentChapter = getCurrentChapter();
    
    // 生成新的场景ID
    const newSceneId = currentChapter.scenes.length > 0 
        ? Math.max(...currentChapter.scenes.map(scene => scene.id)) + 1 
        : currentChapter.id * 100 + 1;
    
    const newScene = {
        id: newSceneId,
        title: sceneData.title || `场景 ${newSceneId}`,
        setting: sceneData.setting || "",
        characters: sceneData.characters || "",
        goals: sceneData.goals || "",
        events: sceneData.events || "",
        conflicts: sceneData.conflicts || "",
        outcome: sceneData.outcome || ""
    };
    
    // 添加新场景到当前章节
    chapters.forEach(chapter => {
        if (chapter.id === currentChapter.id) {
            chapter.scenes.push(newScene);
        }
    });
    
    // 保存更新后的数据
    saveChapters(chapters);
    
    // 选择新创建的场景
    selectScene(newSceneId);
    
    return newScene;
}

// 删除当前场景
function deleteCurrentScene() {
    const currentChapter = getCurrentChapter();
    const currentScene = getCurrentScene();
    
    if (currentChapter.scenes.length <= 1) {
        // 不允许删除章节的最后一个场景
        return false;
    }
    
    // 找到当前场景的索引
    const sceneIndex = currentChapter.scenes.findIndex(scene => scene.id === currentScene.id);
    
    if (sceneIndex !== -1) {
        // 删除场景
        chapters.forEach(chapter => {
            if (chapter.id === currentChapter.id) {
                chapter.scenes.splice(sceneIndex, 1);
            }
        });
        
        // 选择前一个或后一个场景
        const nextSceneIndex = sceneIndex === 0 ? 0 : sceneIndex - 1;
        const nextScene = currentChapter.scenes[nextSceneIndex];
        
        if (nextScene) {
            selectScene(nextScene.id);
        }
        
        // 保存更新后的数据
        saveChapters(chapters);
        return true;
    }
    
    return false;
}

// 生成场景内容
function generateSceneContent(sceneId, field) {
    // 在实际应用中，这里应该调用AI接口生成内容
    // 这里只是模拟生成内容
    const placeholders = {
        setting: "一个繁华的都市咖啡厅，阳光透过落地窗洒在木质桌椅上，周围人来人往，氛围温馨而私密。",
        characters: "李天阳（主角）、苏雨晴（神秘女子）、咖啡厅服务员",
        goals: "李天阳希望了解更多关于自己能力的信息，同时试探苏雨晴的真实意图。",
        events: "李天阳与苏雨晴在咖啡厅会面，两人交流各自的能力经历。苏雨晴透露出关于能力来源的线索，并警告李天阳有人在寻找像他们这样的人。",
        conflicts: "李天阳不确定是否应该完全信任苏雨晴，而苏雨晴似乎也在隐瞒某些重要信息。期间，李天阳注意到有可疑人物在监视他们。",
        outcome: "李天阳决定与苏雨晴建立初步合作关系，共同调查能力的来源和那个神秘组织。两人约定下次见面的时间和地点，分头行动。"
    };
    
    return placeholders[field] || "AI生成的内容将在这里显示。";
}

// 导出函数和数据
window.detailedOutlineData = {
    getAllChapters,
    saveChapters,
    getCurrentChapter,
    getCurrentScene,
    goToPreviousChapter,
    goToNextChapter,
    selectChapter,
    selectScene,
    updateScene,
    addNewScene,
    deleteCurrentScene,
    generateSceneContent
}; 