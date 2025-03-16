/**
 * 创作信息手风琴组件
 * 用于在创作页面中显示当前创作的小说信息
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化创作信息手风琴
    initCreationInfoAccordion();
});

/**
 * 初始化创作信息手风琴
 */
function initCreationInfoAccordion() {
    const accordionHeaders = document.querySelectorAll('.creation-info-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // 切换展开/折叠状态
            const content = this.nextElementSibling;
            const isExpanded = content.classList.contains('expanded');
            
            // 更新图标
            const icon = this.querySelector('.accordion-icon');
            
            if (isExpanded) {
                // 折叠面板
                content.classList.remove('expanded');
                content.style.maxHeight = '0';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                // 展开面板
                content.classList.add('expanded');
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });
} 