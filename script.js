// script.js

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("snowCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const snowflakes = [];
    const snowflakeCount = 150;
    let snowEnabled = true;

    class Snowflake {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.5;
        }

        update() {
            if (!snowEnabled) return; // 停止雪花更新
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.y > canvas.height || this.x > canvas.width || this.x < 0) {
                this.reset();
            }
        }

        draw() {
            if (!snowEnabled) return; // 停止雪花绘制
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < snowflakeCount; i++) {
        snowflakes.push(new Snowflake());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    const scrollArrow = document.getElementById("scrollArrow");
    const aboutMeSection = document.getElementById("about-me");

    scrollArrow.addEventListener("click", () => {
        aboutMeSection.scrollIntoView({ behavior: "smooth" });
        snowEnabled = false; // 禁止雪花特效
    });

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const switchCn = document.getElementById("switch-cn");
    const switchEn = document.getElementById("switch-en");

    const content = {
        cn: {
            title: "kerrypig",
            description: "世之奇伟、瑰怪、非常之观 常在于险远，而人之所罕至焉，故非有志者不能至也。",
            learnMore: "了解更多",
            aboutTitle: "关于我",
            basic_info_card: `
                <p><strong>本科:</strong> 多伦多大学 (2027届)</p>
                <p><strong>定位:</strong> 多伦多, 安大略省, 加拿大</p>
                <p><strong>专业:</strong> 统计学, 应用数学, 计算机科学</p>
                <p><strong>MBTI:</strong> ENTP</p>
            `,
            resumeButtonText: "查看我的简历",
            project_card:`
                <p><strong>项目经历:</strong></p>
                <div class="project">
                    <h3>1. Java 基于策略模式的绘图程序</h3>
                    <p>设计了一个使用策略、观察者、MVC 和命令设计模式的绘图程序，支持灵活的形状创建、编辑与操作，以及撤销/重做功能。使用 JavaFX 实现图形渲染与用户交互。</p>
                    <p><a href="https://github.com/kerrypig/mysh_MyShell" target="_blank">项目详情</a></p>
                </div>

                <div class="project">
                    <h3>2. mysh - 自定义 Shell 实现 (C 语言)</h3>
                    <p>开发了一个类似 Unix 的 Shell 程序 <code>mysh</code>，支持内建命令执行、环境变量管理与输入/输出处理。实现了变量扩展、命令标记化与自定义错误处理。</p>
                    <p><a href="https://github.com/kerrypig/java_Paint" target="_blank">项目详情</a></p>
                </div>

                <div class="project">
                    <h3>3. 哈夫曼树压缩系统 (Python)</h3>
                    <p>使用哈夫曼编码实现了一个无损数据压缩与解压系统。设计了高效的二叉树结构与算法以优化压缩效率。</p>
                </div>
            `

        },
        en: {
            title: "Kerrypig",
            description: "",
            learnMore: "Learn More",
            aboutTitle: "About Me",
            basic_info_card: `
                <p><strong>University:</strong> University of Toronto (Class of 2027)</p>
                <p><strong>Location:</strong> Toronto, Ontario, Canada</p>
                <p><strong>Specialization:</strong> Statistics, Major: Applied Mathematics, Computer Science</p>
                <p><strong>MBTI:</strong> ENTP</p>
            `,
            resumeButtonText: "View My Resume",
            project_card:`
                <p><strong>Projects:</strong></p>
                <div class="project">
                    <h3>1. Java-Based Drawing App</h3>
                    <p>Designed a drawing application utilizing Strategy, Observer, MVC, and Command design patterns to enable flexible shape creation, editing, and manipulation with undo/redo support. Implemented with JavaFX for graphical rendering and user interaction.</p>
                    <p><a href="https://github.com/kerrypig/java_Paint" target="_blank">Project Details</a></p>
                </div>

                <div class="project">
                    <h3>2. mysh - Custom Shell Implementation (C Language)</h3>
                    <p>Developed a Unix-like shell named <code>mysh</code>, supporting built-in command execution, environment variable management, and input/output handling. Implemented variable expansion, command tokenization, and custom error handling.</p>
                    <p><a href="https://github.com/kerrypig/mysh_MyShell" target="_blank">Project Details</a></p>
                </div>

                <div class="project">
                    <h3>3. Huffman Tree Compression System (Python)</h3>
                    <p>Implemented a lossless data compression and decompression system using Huffman Coding. Designed efficient binary tree structures and algorithms to optimize compression efficiency.</p>
                </div>
            `
            
        }
    };

    function updateLanguage(lang) {
        document.getElementById("title").innerText = content[lang].title;
        document.getElementById("description").innerText = content[lang].description;
        document.getElementById("learnMoreButton").innerText = content[lang].learnMore;
        document.getElementById("aboutTitle").innerText = content[lang].aboutTitle;
        document.getElementById("basic_info_card").innerHTML = content[lang].basic_info_card;
        document.getElementById("resumeButton").innerText = content[lang].resumeButtonText;
        document.getElementById("project_card").innerHTML = content[lang].project_card;

        

        if (lang === "cn") {
            switchCn.classList.add("active");
            switchEn.classList.remove("active");
        } else {
            switchEn.classList.add("active");
            switchCn.classList.remove("active");
        }
    }

    switchCn.addEventListener("click", () => updateLanguage("cn"));
    switchEn.addEventListener("click", () => updateLanguage("en"));

    updateLanguage("cn");
});
document.getElementById("resumeButton").addEventListener("click", () => {
    window.open("Zhu Kairui.pdf", "_blank");
});

function copyToClipboard(element) {
    const textToCopy = element.getAttribute("data-copy");
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert(`${textToCopy} 已复制到剪贴板\n${textToCopy} has copied`);
    }).catch(err => {
        alert('复制失败，请重试。\nPlease try again.');
    });
}
