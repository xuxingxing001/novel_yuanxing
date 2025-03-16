// 公共JavaScript函数

// 导航栏切换
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
    }
}

// 模拟AI生成加载
function simulateLoading(element, callback, time = 2000) {
    if (!element) return;
    
    // 显示加载状态
    const originalContent = element.innerHTML;
    element.innerHTML = '<span class="loading"></span> 生成中...';
    element.disabled = true;
    
    // 模拟加载时间
    setTimeout(() => {
        // 恢复按钮状态
        element.innerHTML = originalContent;
        element.disabled = false;
        
        // 执行回调
        if (typeof callback === 'function') {
            callback();
        }
    }, time);
}

// 切换男频/女频
function toggleGenreType(type) {
    const maleGenres = document.getElementById('male-genres');
    const femaleGenres = document.getElementById('female-genres');
    const maleButton = document.getElementById('male-button');
    const femaleButton = document.getElementById('female-button');
    
    if (type === 'male') {
        maleGenres.classList.remove('hidden');
        femaleGenres.classList.add('hidden');
        maleButton.classList.add('btn-male');
        maleButton.classList.remove('btn-secondary');
        femaleButton.classList.remove('btn-female');
        femaleButton.classList.add('btn-secondary');
    } else {
        maleGenres.classList.add('hidden');
        femaleGenres.classList.remove('hidden');
        maleButton.classList.remove('btn-male');
        maleButton.classList.add('btn-secondary');
        femaleButton.classList.add('btn-female');
        femaleButton.classList.remove('btn-secondary');
    }
}

// 选择流派
function selectGenre(element) {
    // 移除其他流派的选中状态
    const genres = document.querySelectorAll('.genre-item');
    genres.forEach(genre => {
        genre.classList.remove('selected');
    });
    
    // 添加当前流派的选中状态
    element.classList.add('selected');
}

// 字数统计
function countWords(inputElement, counterElement) {
    if (!inputElement || !counterElement) return;
    
    const text = inputElement.value;
    const count = text.length;
    counterElement.textContent = count;
    
    // 如果超过限制，添加警告样式
    if (count > 500) {
        counterElement.classList.add('text-red-500');
    } else {
        counterElement.classList.remove('text-red-500');
    }
}

// 扩写梗概
function expandOutline() {
    const outlineInput = document.getElementById('story-outline');
    const expandButton = document.getElementById('expand-button');
    
    if (!outlineInput || !expandButton) return;
    
    simulateLoading(expandButton, () => {
        // 模拟AI扩写结果
        const originalText = outlineInput.value;
        if (originalText.trim() === '') {
            outlineInput.value = '主角李天阳原本是一名普通大学生，在一次偶然的机会下获得了一个神秘的系统，可以看到他人的情感值。从此，他的生活发生了翻天覆地的变化，不仅能够轻松应对各种人际关系，还能在危机时刻洞察他人的真实想法。在都市中游刃有余的同时，他逐渐发现这个系统背后隐藏着更大的秘密...';
        } else {
            // 扩写原有内容
            outlineInput.value = originalText + '\n\n' + '随着能力的不断提升，李天阳发现城市中存在着一个隐秘的超能力者组织，他们利用各自的能力在暗中操控着这座城市。为了揭开真相，保护身边的人，李天阳决定潜入这个组织，同时寻找系统的来源。在这个过程中，他结识了同样拥有特殊能力的女孩林小雨，两人联手对抗组织，并逐渐产生了感情...';
        }
    });
}

// 生成灵感 - 旧版本，已被新的灵感生成页面替代
/*
function generateInspirations() {
    const inspirationContainer = document.getElementById('inspiration-container');
    const generateButton = document.getElementById('generate-inspirations');
    
    if (!inspirationContainer || !generateButton) return;
    
    simulateLoading(generateButton, () => {
        // 模拟AI生成灵感
        const inspirations = [
            {
                type: '角色',
                content: '李天阳：普通大学生，性格开朗但有些懒散，获得情感系统后逐渐成长为一个有责任感的人。'
            },
            {
                type: '角色',
                content: '林小雨：神秘女孩，拥有感知他人情绪的能力，表面冷漠实则内心温柔，与李天阳一起对抗神秘组织。'
            },
            {
                type: '角色',
                content: '张教授：大学教授，表面和蔼可亲，实则是神秘组织的高层成员，对超能力者有着强烈的研究兴趣。'
            },
            {
                type: '情节',
                content: '李天阳在一次偶然的机会下获得了情感系统，开始能够看到他人的情感值，这让他在人际交往中如鱼得水。'
            },
            {
                type: '情节',
                content: '李天阳发现学校里有多名学生神秘失踪，通过情感系统的帮助，他发现这些学生都与张教授有过接触。'
            },
            {
                type: '情节',
                content: '李天阳与林小雨联手调查张教授，发现他背后的神秘组织正在秘密收集拥有特殊能力的人。'
            },
            {
                type: '设定',
                content: '情感系统：能够直观地看到他人的情感值，包括好感度、敌意、恐惧等多种情绪，并能根据情感变化预测他人行为。'
            },
            {
                type: '设定',
                content: '神秘组织：名为"心灵守护者"的秘密组织，表面上是研究人类潜能的科研机构，实则在寻找和控制拥有特殊能力的人。'
            },
            {
                type: '场景',
                content: '大学校园：故事的主要发生地，看似平凡的校园中隐藏着不为人知的秘密。'
            },
            {
                type: '场景',
                content: '地下实验室：神秘组织的秘密基地，位于学校图书馆地下，进行着各种超能力相关的实验。'
            }
        ];
        
        // 清空容器
        inspirationContainer.innerHTML = '';
        
        // 添加灵感卡片
        inspirations.forEach(inspiration => {
            const card = document.createElement('div');
            card.className = 'inspiration-card';
            card.innerHTML = `
                <div class="inspiration-card-header">
                    <span class="inspiration-card-type">${inspiration.type}</span>
                    <div class="inspiration-card-actions">
                        <button class="btn btn-sm btn-secondary" onclick="expandInspiration(this)">
                        <i class="fas fa-expand"></i>
                        </button>
                        <button class="btn btn-sm btn-secondary">
                        <i class="fas fa-thumbs-up"></i>
                        </button>
                    <button class="btn btn-sm btn-secondary">
                        <i class="fas fa-thumbs-down"></i>
                        </button>
                    </div>
                </div>
                <div class="inspiration-card-content">
                    ${inspiration.content}
                </div>
                <div class="inspiration-card-footer">
                    <button class="btn btn-primary" onclick="expandInspirationContent(this)">
                    <i class="fas fa-magic mr-1"></i> 扩展内容
                    </button>
                </div>
            `;
            inspirationContainer.appendChild(card);
        });
        
        // 显示容器
        inspirationContainer.classList.remove('hidden');
    });
}

// 扩展灵感内容
function expandInspirationContent(button) {
    const card = button.closest('.inspiration-card');
    const content = card.querySelector('.inspiration-card-content');
    
    // 模拟加载
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> 扩展中...';
    button.disabled = true;
    
    setTimeout(() => {
        // 根据不同类型扩展不同内容
        const type = card.querySelector('.inspiration-card-type').textContent;
        const originalContent = content.textContent.trim();
        
        let expandedContent = '';
        
        if (type === '角色') {
            expandedContent = originalContent + ' 他/她的成长经历充满坎坷，这也造就了他/她坚韧不拔的性格。在关键时刻，他/她总能展现出超乎常人的勇气和智慧，成为团队中不可或缺的一员。';
        } else if (type === '情节') {
            expandedContent = originalContent + ' 这一事件成为了故事的转折点，不仅推动了主线剧情的发展，也让主角的内心世界发生了巨大变化，为后续的成长埋下了伏笔。';
        } else if (type === '设定') {
            expandedContent = originalContent + ' 这一设定在故事中起到了关键作用，不仅为情节发展提供了合理性，也为读者展示了一个独特而有深度的世界观。';
        } else if (type === '场景') {
            expandedContent = originalContent + ' 这一场景的描写不仅要注重视觉效果，还要融入角色的情感变化，通过环境的描述衬托人物的心理状态，增强读者的代入感。';
        }
        
        content.textContent = expandedContent;
        
        // 恢复按钮状态并禁用
        button.innerHTML = '<i class="fas fa-check mr-1"></i> 已扩展';
        button.disabled = true;
    }, 1500);
}
*/

// 生成章节大纲
function generateChapterOutline() {
    const chapterContainer = document.getElementById('chapter-container');
    const generateButton = document.getElementById('generate-outline');
    
    if (!chapterContainer || !generateButton) return;
    
    simulateLoading(generateButton, () => {
        // 模拟AI生成章节大纲
        const chapters = [
            {
                title: '意外的礼物',
                summary: '大学生李天阳在一次偶然的机会下救下了一位神秘老人，获得了能够看到他人情感值的系统。'
            },
            {
                title: '初试能力',
                summary: '李天阳开始尝试使用自己的新能力，在校园中化解了几起冲突，引起了同学们的注意。'
            },
            {
                title: '神秘女孩',
                summary: '李天阳遇到了一个他无法看到情感值的女孩林小雨，引起了他的好奇。'
            },
            {
                title: '隐秘组织',
                summary: '李天阳发现城市中存在一个由超能力者组成的隐秘组织，他们似乎对自己的能力很感兴趣。'
            },
            {
                title: '能力升级',
                summary: '在一次危机中，李天阳的能力突然升级，不仅能看到情感值，还能在一定程度上影响他人的情感。'
            },
            {
                title: '真相浮出',
                summary: '李天阳和林小雨联手调查，发现隐秘组织的真正目的是收集各种超能力，用于某个神秘计划。'
            },
            {
                title: '最终对决',
                summary: '李天阳和林小雨与组织首领展开对决，在危机时刻，李天阳的能力再次升级，成功击败对手。'
            },
            {
                title: '新的开始',
                summary: '战斗结束后，李天阳和林小雨决定一起守护这座城市，同时寻找更多像他们一样的人。'
            }
        ];
        
        // 清空容器
        chapterContainer.innerHTML = '';
        
        // 添加章节列表
        chapters.forEach((chapter, index) => {
            const chapterItem = document.createElement('div');
            chapterItem.className = 'chapter-item';
            chapterItem.innerHTML = `
                <div class="chapter-header">
                    <h3 class="chapter-title">第${index + 1}章：${chapter.title}</h3>
                    <div class="chapter-actions">
                        <button class="btn btn-sm btn-secondary">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-secondary">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="chapter-content">
                    ${chapter.summary}
                </div>
            `;
            chapterContainer.appendChild(chapterItem);
        });
    });
}

// 生成章节细纲
function generateDetailedOutline() {
    const detailedOutlineContainer = document.getElementById('detailed-outline-container');
    const generateButton = document.getElementById('generate-detailed');
    
    if (!detailedOutlineContainer || !generateButton) return;
    
    simulateLoading(generateButton, () => {
        // 模拟AI生成章节细纲
        const detailedOutline = `1. 开场：李天阳在大学校园内匆忙赶往教室，途中不小心撞到一位老人。
2. 李天阳扶起老人，并帮助老人捡起散落的物品，老人对他的善举表示感谢。
3. 老人临走前送给李天阳一个看似普通的手环，称这是对他善良的回报。
4. 李天阳戴上手环后，发现自己能看到他人头顶上方的数值和颜色，代表不同的情感和强度。
5. 李天阳尝试理解这种能力，并在宿舍里对室友进行测试，确认这不是幻觉。
6. 第二天，李天阳在食堂遇到两名即将发生冲突的学生，通过观察他们的情感值，成功化解了冲突。
7. 李天阳的行为被同班女生王小美注意到，她对李天阳的突然变化感到好奇。
8. 李天阳开始有意识地利用这种能力帮助身边的人，同时也在思考这种能力的来源和目的。
9. 结尾：李天阳在校园里偶然发现一个女孩林小雨，她是唯一一个他看不到情感值的人，引起了他的极大好奇。`;
        
        // 更新内容
        detailedOutlineContainer.value = detailedOutline;
    });
}

// 生成小说正文
function generateNovelContent() {
    const contentContainer = document.getElementById('content-container');
    const generateButton = document.getElementById('generate-content');
    
    if (!contentContainer || !generateButton) return;
    
    // 获取目标字数范围
    const wordCountTarget = document.getElementById('word-count-target');
    let wordCountRange = '3000-5000'; // 默认值
    
    if (wordCountTarget) {
        wordCountRange = wordCountTarget.textContent;
    }
    
    // 解析字数范围
    const [minCount, maxCount] = wordCountRange.split('-').map(num => parseInt(num));
    
    simulateLoading(generateButton, () => {
        // 模拟AI生成正文
        const chapterTitle = document.querySelector('.card-header .card-title').textContent;
        const outlineContent = document.querySelector('.card-body p').textContent;
        
        // 生成的字数应该在目标范围内
        const targetWordCount = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
        
        // 模拟生成的内容
        let generatedContent = `# ${chapterTitle.split(' - ')[0]}\n\n`;
        
        // 生成足够长度的内容
        generatedContent += `李天阳匆匆穿过校园的林荫道，阳光透过树叶的缝隙洒落在地上，形成斑驳的光影。他看了看手表，距离上课还有不到五分钟的时间。\n\n`;
        generatedContent += `"该死，又要迟到了。"李天阳加快脚步，几乎是小跑着穿过了人群。\n\n`;
        generatedContent += `就在这时，他的视线被前方一个踉跄的身影吸引。一位白发苍苍的老人似乎被什么东西绊倒，正摇摇晃晃地向前倾倒。李天阳几乎是本能地冲了上去，及时扶住了老人。\n\n`;
        generatedContent += `"老人家，您没事吧？"李天阳关切地问道。\n\n`;
        generatedContent += `老人抬起头，露出一张布满皱纹却透着慈祥的脸。"谢谢你，年轻人。"他的声音有些颤抖，但眼神却异常明亮。\n\n`;
        generatedContent += `李天阳弯腰帮老人捡起散落在地上的物品——几本古旧的书籍和一个看起来年代久远的木盒。当他的手触碰到那个木盒时，似乎感觉到一丝奇异的能量流过指尖，但他很快就将这种感觉归结为错觉。\n\n`;
        generatedContent += `"不用谢，举手之劳。"李天阳将东西递给老人，"您一个人没问题吗？需要我送您去目的地吗？"\n\n`;
        generatedContent += `老人摇了摇头，从口袋里掏出一个看似普通的手环。"不必了，我住得不远。这个送给你，算是对你善良的回报。"\n\n`;
        generatedContent += `李天阳有些犹豫，"这不太好吧..."\n\n`;
        generatedContent += `"收下吧，"老人坚持道，"它会在你需要的时候帮助你。"说完，不等李天阳回应，老人就将手环塞进了他的手中，然后转身离去，步伐出奇地稳健，与刚才的蹒跚判若两人。\n\n`;
        generatedContent += `李天阳愣在原地，低头看着手中的手环。它看起来很普通，银色的金属环上刻着一些他看不懂的符号。正当他思考时，远处传来上课铃声。\n\n`;
        generatedContent += `"糟了！"李天阳将手环随手戴在手腕上，然后飞奔向教学楼。\n\n`;
        generatedContent += `当他气喘吁吁地冲进教室时，课已经开始了。李天阳低着头，在教授不赞同的目光中找到了自己的座位。\n\n`;
        generatedContent += `"李天阳同学，又迟到了？"教授推了推眼镜，语气中带着责备。\n\n`;
        generatedContent += `"对不起，教授，我在路上遇到了一位需要帮助的老人。"李天阳诚恳地解释道。\n\n`;
        generatedContent += `就在这时，他突然注意到了一件奇怪的事情——教授头顶上方似乎漂浮着一个数字"75"，而且是红色的。李天阳眨了眨眼睛，以为是自己眼花了，但那个数字依然清晰可见。\n\n`;
        generatedContent += `"又是这种老掉牙的借口。"教授摇了摇头，"坐下吧，不要再打扰课堂。"\n\n`;
        generatedContent += `当李天阳坐下后，他惊讶地发现，教室里的每个人头顶上都有不同颜色和数值的数字。他的室友张明头上是绿色的"82"，前排的女生王小美则是粉色的"60"。\n\n`;
        generatedContent += `"我疯了吗？"李天阳小声自语，下意识地摸了摸手腕上的手环。就在他触碰手环的瞬间，一个信息突然在他脑海中浮现：\n\n`;
        generatedContent += `【情感系统已激活。红色代表愤怒，绿色代表友善，粉色代表好感，数值代表强度。】\n\n`;
        generatedContent += `李天阳震惊地瞪大了眼睛。这是什么情况？他能看到别人的情感值？那个老人给他的不是普通手环，而是某种神奇的装置？\n\n`;
        generatedContent += `课堂上，李天阳完全无法集中注意力。他的目光不断在同学们头顶的数字间游移，尝试理解这些信息。随着教授讲解的深入，他发现那个红色的"75"逐渐降低到了"65"，似乎教授的怒气正在消退。\n\n`;
        generatedContent += `下课铃响起，李天阳仍然沉浸在对这个神奇能力的思考中。\n\n`;
        generatedContent += `"嘿，天阳，你今天怎么了？上课一直心不在焉的。"张明拍了拍他的肩膀，头顶的绿色数字显示为"85"，比刚才还高了一些。\n\n`;
        generatedContent += `"没什么，可能是有点累了。"李天阳敷衍道，同时观察着张明的反应。\n\n`;
        generatedContent += `"那要不要一起去食堂吃饭？我请客。"张明提议道，数字保持不变。\n\n`;
        generatedContent += `"好啊，谢了。"李天阳点点头，决定利用这个机会测试一下自己的新能力。\n\n`;
        generatedContent += `在食堂里，李天阳发现这个能力比他想象的还要有用。他可以清楚地看到谁对他有敌意，谁对他友善，甚至可以通过观察数值的变化来判断自己的言行对他人情绪的影响。\n\n`;
        generatedContent += `正当他和张明吃饭时，食堂里突然传来一阵骚动。两名学生似乎因为插队问题起了争执，眼看就要动手。\n\n`;
        generatedContent += `李天阳注意到，其中一个高个子学生头顶的红色数字高达"95"，而另一个矮个子学生虽然表面强硬，但头顶的数字只有"60"，而且还带着一丝黄色，似乎是恐惧的成分。\n\n`;
        generatedContent += `"我去看看。"李天阳对张明说，然后走向那两人。\n\n`;
        generatedContent += `"各位同学，有什么事情不能好好说呢？"李天阳站在两人中间，语气平和地说道。\n\n`;
        generatedContent += `高个子学生瞪了他一眼，"关你什么事？滚开！"\n\n`;
        generatedContent += `李天阳注意到，尽管这名学生表面凶狠，但当他介入后，对方头顶的数字已经从"95"降到了"85"。这给了他信心。\n\n`;
        generatedContent += `"我只是不想看到同学之间因为一点小事动手。"李天阳看向矮个子学生，发现他的恐惧值正在上升，便对他微微点头，示意他可以先离开。\n\n`;
        generatedContent += `矮个子学生似乎领会了李天阳的意思，低声说了句"算了"，然后快步离开了。\n\n`;
        generatedContent += `高个子学生愣了一下，似乎没想到事情会这样结束。他的怒气值迅速下降到了"70"。\n\n`;
        generatedContent += `"有种，敢管闲事。"高个子学生丢下这句话，也转身离开了。\n\n`;
        generatedContent += `回到座位上，张明一脸佩服地看着李天阳，"天阳，你什么时候变得这么会处理冲突了？"\n\n`;
        generatedContent += `李天阳笑了笑，"可能是最近看了一些心理学书籍吧。"\n\n`;
        generatedContent += `就在这时，李天阳注意到食堂门口走进来一个女孩。令他惊讶的是，这个女孩头顶上没有任何数字或颜色。她是唯一一个他看不到情感值的人。\n\n`;
        generatedContent += `"那个女生是谁？"李天阳指着门口问道。\n\n`;
        generatedContent += `张明顺着他的手指看去，"哦，那是林小雨，计算机系的，听说她很厉害，但很少和人交流。怎么，你对她有兴趣？"\n\n`;
        generatedContent += `李天阳没有回答，他的目光紧紧跟随着那个神秘的女孩。为什么只有她没有情感值显示？这个系统是有缺陷，还是说...她有什么特别之处？\n\n`;
        generatedContent += `这一天，李天阳的生活因为那个神秘的手环而彻底改变了。他不知道这个能力会带给他什么，但他隐隐感觉到，这只是一个开始，一个通往更大秘密的开始。\n\n`;
        
        // 设置生成的内容
        contentContainer.value = generatedContent;
        
        // 计算并显示实际字数
        const actualWordCount = generatedContent.length;
        const wordCountInfo = document.createElement('div');
        wordCountInfo.className = 'text-right text-sm text-gray-500 mt-2';
        wordCountInfo.innerHTML = `已生成 <span class="font-bold">${actualWordCount}</span> 字`;
        
        const cardBody = contentContainer.parentElement;
        const existingInfo = cardBody.querySelector('.text-right.text-sm');
        if (existingInfo) {
            cardBody.removeChild(existingInfo);
        }
        cardBody.appendChild(wordCountInfo);
    });
}

// 切换章节
function switchChapter(chapterIndex) {
    const chapterTabs = document.querySelectorAll('.chapter-tab');
    const chapterContents = document.querySelectorAll('.chapter-content-section');
    
    // 移除所有活跃状态
    chapterTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    chapterContents.forEach(content => {
        content.classList.add('hidden');
    });
    
    // 设置当前章节为活跃
    chapterTabs[chapterIndex].classList.add('active');
    chapterContents[chapterIndex].classList.remove('hidden');
}

// 切换阅读设置
function toggleReadingSettings() {
    const settingsPanel = document.getElementById('reading-settings');
    if (settingsPanel.classList.contains('hidden')) {
        settingsPanel.classList.remove('hidden');
    } else {
        settingsPanel.classList.add('hidden');
    }
}

// 更改字体大小
function changeFontSize(size) {
    const contentContainer = document.querySelector('.novel-content');
    if (!contentContainer) return;
    
    // 移除所有字体大小类
    contentContainer.classList.remove('text-sm', 'text-md', 'text-lg', 'text-xl');
    
    // 添加选择的字体大小类
    contentContainer.classList.add(`text-${size}`);
}

// 更改背景颜色
function changeBackground(color) {
    const contentContainer = document.querySelector('.novel-content');
    if (!contentContainer) return;
    
    // 移除所有背景颜色类
    contentContainer.classList.remove('bg-white', 'bg-gray-100', 'bg-yellow-50', 'bg-green-50');
    
    // 添加选择的背景颜色类
    contentContainer.classList.add(`bg-${color}`);
}

// 处理会员订阅
function subscribeToMembership(plan) {
    // 创建付款弹窗
    const paymentModal = document.createElement('div');
    paymentModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    paymentModal.id = 'payment-modal';
    
    // 设置付款内容
    let planName = '';
    let planPrice = '';
    switch(plan) {
        case 'monthly':
            planName = '月度会员';
            planPrice = '¥29.9';
            break;
        case 'quarterly':
            planName = '季度会员';
            planPrice = '¥79.9';
            break;
        case 'annual':
            planName = '年度会员';
            planPrice = '¥299.9';
            break;
        default:
            planName = '会员';
            planPrice = '¥0';
    }
    
    paymentModal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold">订阅${planName}</h3>
                <button class="text-gray-500 hover:text-gray-700" onclick="document.getElementById('payment-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="border-b pb-4 mb-4">
                <div class="flex justify-between items-center mb-2">
                    <span class="font-semibold">订阅方案</span>
                    <span>${planName}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="font-semibold">价格</span>
                    <span class="text-xl font-bold text-blue-600">${planPrice}</span>
                </div>
            </div>
            
            <div class="mb-6">
                <h4 class="font-semibold mb-3">选择支付方式</h4>
                <div class="grid grid-cols-2 gap-4">
                    <label class="border rounded-lg p-3 flex items-center cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="payment-method" value="wechat" class="mr-2" checked>
                        <div class="flex items-center">
                            <i class="fab fa-weixin text-green-500 text-xl mr-2"></i>
                            <span>微信支付</span>
                        </div>
                    </label>
                    <label class="border rounded-lg p-3 flex items-center cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="payment-method" value="alipay" class="mr-2">
                        <div class="flex items-center">
                            <i class="fab fa-alipay text-blue-500 text-xl mr-2"></i>
                            <span>支付宝</span>
                        </div>
                    </label>
                </div>
            </div>
            
            <button class="btn btn-primary w-full" onclick="processPayment('${plan}')">
                确认支付
            </button>
            
            <p class="text-xs text-gray-500 text-center mt-4">
                点击"确认支付"，表示您同意我们的<a href="#" class="text-blue-600 hover:underline">服务条款</a>和<a href="#" class="text-blue-600 hover:underline">隐私政策</a>
            </p>
        </div>
    `;
    
    // 添加到页面
    document.body.appendChild(paymentModal);
}

// 处理支付流程
function processPayment(plan) {
    // 获取选中的支付方式
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    
    // 移除付款弹窗
    const paymentModal = document.getElementById('payment-modal');
    if (paymentModal) {
        paymentModal.remove();
    }
    
    // 创建支付二维码弹窗
    const qrcodeModal = document.createElement('div');
    qrcodeModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    qrcodeModal.id = 'qrcode-modal';
    
    // 设置支付内容
    let planName = '';
    let planPrice = '';
    switch(plan) {
        case 'monthly':
            planName = '月度会员';
            planPrice = '¥29.9';
            break;
        case 'quarterly':
            planName = '季度会员';
            planPrice = '¥79.9';
            break;
        case 'annual':
            planName = '年度会员';
            planPrice = '¥299.9';
            break;
        default:
            planName = '会员';
            planPrice = '¥0';
    }
    
    // 根据支付方式设置不同的图标和颜色
    const paymentIcon = paymentMethod === 'wechat' ? 'fa-weixin' : 'fa-alipay';
    const paymentColor = paymentMethod === 'wechat' ? 'text-green-500' : 'text-blue-500';
    const paymentName = paymentMethod === 'wechat' ? '微信支付' : '支付宝';
    
    qrcodeModal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold">${paymentName}</h3>
                <button class="text-gray-500 hover:text-gray-700" onclick="document.getElementById('qrcode-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="text-center mb-4">
                <p class="mb-2">请使用${paymentName}扫描以下二维码完成支付</p>
                <p class="font-bold text-xl text-blue-600 mb-4">${planPrice}</p>
                
                <div class="bg-gray-100 p-4 rounded-lg inline-block mb-4">
                    <i class="fab ${paymentIcon} ${paymentColor} text-6xl mb-4"></i>
                    <div class="w-48 h-48 bg-white mx-auto flex items-center justify-center border">
                        <div class="text-center">
                            <i class="fas fa-qrcode text-6xl text-gray-300 mb-2"></i>
                            <p class="text-sm text-gray-500">模拟二维码</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="flex gap-4">
                <button class="btn btn-secondary w-1/2" onclick="document.getElementById('qrcode-modal').remove()">
                    取消支付
                </button>
                <button class="btn btn-primary w-1/2" onclick="completePayment('${plan}')">
                    模拟支付成功
                </button>
            </div>
        </div>
    `;
    
    // 添加到页面
    document.body.appendChild(qrcodeModal);
    
    // 模拟自动检测支付状态
    const checkPaymentInterval = setInterval(() => {
        // 实际项目中，这里应该调用后端API检查支付状态
        // 这里仅作为演示，不做实际检测
    }, 2000);
    
    // 确保在关闭弹窗时清除定时器
    qrcodeModal.addEventListener('remove', () => {
        clearInterval(checkPaymentInterval);
    });
}

// 完成支付流程
function completePayment(plan) {
    // 移除二维码弹窗
    const qrcodeModal = document.getElementById('qrcode-modal');
    if (qrcodeModal) {
        qrcodeModal.remove();
    }
    
    // 设置会员信息
    let planName = '';
    let expiryDate = new Date();
    let dailyLimit = '';
    
    switch(plan) {
        case 'monthly':
            planName = '月度会员';
            expiryDate.setMonth(expiryDate.getMonth() + 1);
            dailyLimit = '10,000字';
            break;
        case 'quarterly':
            planName = '季度会员';
            expiryDate.setMonth(expiryDate.getMonth() + 3);
            dailyLimit = '30,000字';
            break;
        case 'annual':
            planName = '年度会员';
            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
            dailyLimit = '无限';
            break;
        default:
            planName = '会员';
            expiryDate.setMonth(expiryDate.getMonth() + 1);
            dailyLimit = '10,000字';
    }
    
    // 格式化到期日期
    const formattedDate = `${expiryDate.getFullYear()}-${String(expiryDate.getMonth() + 1).padStart(2, '0')}-${String(expiryDate.getDate()).padStart(2, '0')}`;
    
    // 保存会员信息到localStorage（实际项目中应该保存到后端数据库）
    const membershipInfo = {
        planName: planName,
        expiryDate: formattedDate,
        dailyLimit: dailyLimit
    };
    
    localStorage.setItem('membershipData', JSON.stringify(membershipInfo));
    
    // 更新用户会员信息显示
    const membershipStatusElement = document.getElementById('membership-status');
    if (membershipStatusElement) {
        membershipStatusElement.innerHTML = `
            <div class="flex items-center mb-2">
                <i class="fas fa-crown text-yellow-500 mr-2"></i>
                <span class="font-bold">${planName}</span>
            </div>
            <p class="text-sm text-gray-600">有效期至：${formattedDate}</p>
            <p class="text-sm text-gray-600">每日AI创作额度：${dailyLimit}</p>
        `;
    }
    
    // 显示支付成功提示
    const successAlert = document.createElement('div');
    successAlert.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md z-50';
    successAlert.setAttribute('role', 'alert');
    
    successAlert.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span class="font-bold">支付成功!</span>
        </div>
        <span class="block sm:inline">您已成功订阅${planName}，感谢您的支持!</span>
        <button class="absolute top-0 right-0 mt-2 mr-2" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // 添加到页面
    document.body.appendChild(successAlert);
    
    // 5秒后自动移除
    setTimeout(() => {
        if (document.body.contains(successAlert)) {
            document.body.removeChild(successAlert);
        }
    }, 5000);
}

/**
 * 初始化小说标题功能
 */
function initNovelTitle() {
    // 获取标题显示元素
    const titleDisplay = document.getElementById('novel-title-display');
    const titleEditBtn = document.getElementById('novel-title-edit-btn');
    
    if (!titleDisplay || !titleEditBtn) return;
    
    // 从localStorage获取保存的标题，如果没有则使用默认值
    const savedTitle = localStorage.getItem('novelTitle') || '未命名作品';
    titleDisplay.textContent = savedTitle;
    
    // 双击标题文本进入编辑模式
    titleDisplay.addEventListener('dblclick', function() {
        enterTitleEditMode();
    });
    
    // 点击编辑按钮进入编辑模式
    titleEditBtn.addEventListener('click', function() {
        enterTitleEditMode();
    });
    
    // 进入标题编辑模式
    function enterTitleEditMode() {
        const titleContainer = document.querySelector('.novel-title-display');
        const currentTitle = titleDisplay.textContent;
        
        // 创建编辑界面
        titleContainer.innerHTML = `
            <input type="text" id="novel-title-input" class="novel-title-input" value="${currentTitle}" maxlength="50">
            <button id="novel-title-save-btn" class="novel-title-save-btn">保存</button>
        `;
        
        // 获取输入框和保存按钮
        const titleInput = document.getElementById('novel-title-input');
        const titleSaveBtn = document.getElementById('novel-title-save-btn');
        
        // 聚焦输入框并选中所有文本
        titleInput.focus();
        titleInput.select();
        
        // 按下回车键保存
        titleInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                saveTitle();
            } else if (e.key === 'Escape') {
                exitEditMode(false);
            }
        });
        
        // 点击保存按钮
        titleSaveBtn.addEventListener('click', saveTitle);
        
        // 点击其他区域退出编辑模式
        document.addEventListener('click', function handleClickOutside(e) {
            if (e.target !== titleInput && e.target !== titleSaveBtn) {
                document.removeEventListener('click', handleClickOutside);
                exitEditMode(false);
            }
        });
        
        // 保存标题
        function saveTitle() {
            let newTitle = titleInput.value.trim();
            if (!newTitle) {
                newTitle = '未命名作品';
            }
            
            // 保存到localStorage
            localStorage.setItem('novelTitle', newTitle);
            
            // 退出编辑模式并显示新标题
            exitEditMode(true);
        }
        
        // 退出编辑模式
        function exitEditMode(saved) {
            const newTitle = saved ? localStorage.getItem('novelTitle') || '未命名作品' : currentTitle;
            
            // 恢复显示界面
            titleContainer.innerHTML = `
                <h1 id="novel-title-display" class="novel-title-text">${newTitle}</h1>
                <button id="novel-title-edit-btn" class="novel-title-edit-btn">
                    <i class="fas fa-edit"></i>
                </button>
            `;
            
            // 重新绑定事件
            initNovelTitle();
        }
    }
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航栏
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }
    
    // 初始化字数统计
    const outlineInput = document.getElementById('story-outline');
    const wordCounter = document.getElementById('word-counter');
    if (outlineInput && wordCounter) {
        outlineInput.addEventListener('input', () => countWords(outlineInput, wordCounter));
    }
    
    // 初始化扩写按钮
    const expandButton = document.getElementById('expand-button');
    if (expandButton) {
        expandButton.addEventListener('click', expandOutline);
    }
    
    // 初始化生成大纲按钮
    const generateOutlineButton = document.getElementById('generate-outline');
    if (generateOutlineButton) {
        generateOutlineButton.addEventListener('click', generateChapterOutline);
    }
    
    // 初始化生成细纲按钮
    const generateDetailedButton = document.getElementById('generate-detailed');
    if (generateDetailedButton) {
        generateDetailedButton.addEventListener('click', generateDetailedOutline);
    }
    
    // 初始化生成正文按钮
    const generateContentButton = document.getElementById('generate-content');
    if (generateContentButton) {
        generateContentButton.addEventListener('click', generateNovelContent);
    }
    
    // 检查会员状态
    checkMembershipStatus();
    
    // 初始化小说标题功能
    initNovelTitle();
});

// 检查会员状态
function checkMembershipStatus() {
    // 实际项目中，这里应该调用API获取用户的会员状态
    // 这里仅作为演示，检查localStorage中是否有会员信息
    const membershipData = localStorage.getItem('membershipData');
    
    if (membershipData) {
        try {
            const membershipInfo = JSON.parse(membershipData);
            
            // 检查会员是否过期
            const expiryDate = new Date(membershipInfo.expiryDate);
            const currentDate = new Date();
            
            if (expiryDate > currentDate) {
                // 会员未过期，更新会员信息显示
                const membershipStatusElement = document.getElementById('membership-status');
                if (membershipStatusElement) {
                    membershipStatusElement.innerHTML = `
                        <div class="flex items-center mb-2">
                            <i class="fas fa-crown text-yellow-500 mr-2"></i>
                            <span class="font-bold">${membershipInfo.planName}</span>
                        </div>
                        <p class="text-sm text-gray-600">有效期至：${membershipInfo.expiryDate}</p>
                    `;
                }
            } else {
                // 会员已过期，清除会员信息
                localStorage.removeItem('membershipData');
            }
        } catch (error) {
            console.error('解析会员数据出错:', error);
            localStorage.removeItem('membershipData');
        }
    }
} 