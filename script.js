/**
 * 高质量学习报告 - 交互功能脚本
 * 增强版 - 提供更流畅的用户体验
 */

// 创建占位图函数
function createPlaceholderImages() {
    // 为图表容器添加渐变背景和文字
    const activitiesChart = document.getElementById('activities-chart');
    const stagesChart = document.getElementById('stages-chart');
    
    if (activitiesChart) {
        activitiesChart.style.background = 'linear-gradient(135deg, #D1EDF1 0%, #B2E5EA 100%)';
        activitiesChart.innerHTML = '<div class="chart-data"><div class="chart-bar" style="height: 70%;" data-label="观看课程" data-value="32"></div><div class="chart-bar" style="height: 90%;" data-label="参与讨论" data-value="42"></div><div class="chart-bar" style="height: 60%;" data-label="实践练习" data-value="28"></div><div class="chart-bar" style="height: 80%;" data-label="阅读资料" data-value="37"></div><div class="chart-bar" style="height: 50%;" data-label="笔记记录" data-value="23"></div></div>';
    }
    
    if (stagesChart) {
        stagesChart.style.background = 'linear-gradient(135deg, #D1EDF1 0%, #B2E5EA 100%)';
        stagesChart.innerHTML = '<div class="chart-pie"><div class="pie-segment" style="--percentage: 15%; --color: #2A6D7C;" data-label="第一阶段" data-value="15%"></div><div class="pie-segment" style="--percentage: 25%; --color: #2ecc71;" data-label="第二阶段" data-value="25%"></div><div class="pie-segment" style="--percentage: 35%; --color: #f39c12;" data-label="第三阶段" data-value="35%"></div><div class="pie-segment" style="--percentage: 25%; --color: #9b59b6;" data-label="第四阶段" data-value="25%"></div></div>';
    }
    
    // 为所有图表添加样式
    addChartStyles();
}

// 添加图表样式
function addChartStyles() {
    // 创建样式表
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .chart-data {
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            height: 80%;
            padding: 10px;
        }
        
        .chart-bar {
            width: 15%;
            background: linear-gradient(to top, #2A6D7C, #3A8D9E);
            border-radius: 4px 4px 0 0;
            position: relative;
            transition: height 1s ease-out;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            animation: growUp 1.5s ease-out forwards;
        }
        
        .chart-bar::before {
            content: attr(data-value);
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 12px;
            font-weight: bold;
            color: #34495e;
        }
        
        .chart-bar::after {
            content: attr(data-label);
            position: absolute;
            bottom: -25px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 12px;
            color: #7f8c8d;
            white-space: nowrap;
        }
        
        @keyframes growUp {
            from { height: 0; }
            to { height: var(--height); }
        }
        
        .chart-pie {
            position: relative;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin: 0 auto;
            background: #f8f9fa;
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }
        
        .pie-segment {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform-origin: 50% 50%;
            background: conic-gradient(var(--color) 0%, var(--color) var(--percentage), transparent var(--percentage));
            animation: reveal 1.5s ease-out forwards;
        }
        
        @keyframes reveal {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
        }
        
        .placeholder-chart {
            position: relative;
        }
        
        .placeholder-chart::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: radial-gradient(circle at 10% 20%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%);
        }
    `;
    document.head.appendChild(styleSheet);
}

// 初始化图表数据动画
function initChartAnimations() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    chartBars.forEach(bar => {
        bar.style.setProperty('--height', bar.style.height);
        bar.style.height = '0';
        
        setTimeout(() => {
            bar.style.height = bar.style.getPropertyValue('--height');
        }, 500);
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化AOS动画库
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out',
        delay: 100
    });
    
    // 创建占位图
    createPlaceholderImages();
    
    // 延迟初始化图表动画
    setTimeout(initChartAnimations, 1000);
    
    // 加载动画
    setTimeout(function() {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 600);
    }, 1500);
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // 更新URL哈希但不触发滚动
                history.pushState(null, null, targetId);
                
                // 更新导航栏活动项
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // 向下滚动按钮
    const scrollDownButton = document.querySelector('.scroll-down-btn');
    if (scrollDownButton) {
        scrollDownButton.addEventListener('click', function() {
            const summarySection = document.querySelector('#summary');
            if (summarySection) {
                window.scrollTo({
                    top: summarySection.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // 更新URL哈希
                history.pushState(null, null, '#summary');
            }
        });
    }
    
    // 返回顶部按钮
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // 更新URL哈希
        history.pushState(null, null, ' ');
    });
    
    // 内容展开/折叠功能
    const stageHeaders = document.querySelectorAll('.stage-header');
    
    stageHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            // 阻止事件冒泡，避免触发其他事件
            e.preventDefault();
            e.stopPropagation();
            
            const content = this.nextElementSibling;
            const toggleIcon = this.querySelector('.toggle-icon');
            const allContents = document.querySelectorAll('.stage-content');
            const allToggleIcons = document.querySelectorAll('.toggle-icon');
            
            // 先关闭所有已打开的内容
            if (!content.style.display || content.style.display === 'none') {
                allContents.forEach(item => {
                    item.style.display = 'none';
                });
                
                allToggleIcons.forEach(icon => {
                    icon.textContent = '+';
                });
            }
            
            // 切换当前内容显示状态
            if (content.style.display === 'block') {
                content.style.display = 'none';
                toggleIcon.textContent = '+';
            } else {
                content.style.display = 'block';
                toggleIcon.textContent = '-';
                
                // 滚动到内容区域 - 使用较小的偏移以确保不会滚动太远
                setTimeout(() => {
                    const headerRect = header.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const headerTop = headerRect.top + scrollTop;
                    
                    window.scrollTo({
                        top: headerTop - 80,
                        behavior: 'smooth'
                    });
                }, 100);
            }
            
            // 阻止默认行为，避免触发其他事件
            return false;
        });
    });
    
    // 默认展开第一个学习阶段
    if (stageHeaders.length > 0) {
        const firstContent = stageHeaders[0].nextElementSibling;
        const firstToggleIcon = stageHeaders[0].querySelector('.toggle-icon');
        
        firstContent.style.display = 'block';
        firstToggleIcon.textContent = '-';
    }
    
    // 卡片悬停效果
    const cards = document.querySelectorAll('.achievement-card, .ability-card, .insight-card, .summary-content, .summary-stats');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // 响应式导航栏
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // 点击导航链接后自动关闭菜单（在移动设备上）
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
    }
    
    // 添加触摸支持（针对移动设备）
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // 为卡片添加触摸效果
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                }, 300);
            });
        });
    }
    
    // 首页动画效果
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(function() {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
            heroContent.style.transition = 'all 1.5s ease';
        }, 300);
    }
    
    // 导航栏当前位置指示
    function updateCurrentSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // 初始化时执行一次
    updateCurrentSection();
    
    // 滚动时执行
    window.addEventListener('scroll', updateCurrentSection);
    
    // 添加图片懒加载
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // 备用方案
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    // 能力标签动画
    const abilityTags = document.querySelectorAll('.ability-tag');
    
    abilityTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
            tag.style.transition = 'all 0.5s ease';
        }, 500 + (index * 200));
    });
    
    // 监听哈希变化
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash;
        
        if (hash) {
            const targetElement = document.querySelector(hash);
            
            if (targetElement) {
                // 稍微延迟，让浏览器默认行为完成
                setTimeout(() => {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    });
    
    // 检查URL中是否有哈希
    if (window.location.hash) {
        // 延迟执行，确保页面已完全加载
        setTimeout(() => {
            const hash = window.location.hash;
            const targetElement = document.querySelector(hash);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }, 1000);
    }
});

// 添加窗口加载完成事件，处理加载完成后的操作
window.addEventListener('load', function() {
    // 隐藏加载动画
    document.querySelector('.loading-screen').style.opacity = '0';
    setTimeout(function() {
        document.querySelector('.loading-screen').style.display = 'none';
    }, 600);
});
