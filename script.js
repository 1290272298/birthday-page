const button = document.getElementById("surpriseButton");
const message = document.getElementById("message");
//const giftBox = document.getElementById("giftBox");
const giftElements = document.querySelectorAll(".gift-container, .cake");
const fireworkVideo = document.getElementById("fireworkVideo");
const fireworkMovie = document.getElementById("fireworkMovie");
const memoryTimeline = document.getElementById("memoryTimeline");

const letterText = document.getElementById("letterText");

const bgMusic = document.getElementById("bgMusic");
const musicControl = document.getElementById("musicControl");

const birthdayPhoto = document.getElementById("photoSection");
const modal = document.getElementById("blessingVideoModal");
const video = document.getElementById("blessingVideo");
const closeButton = document.getElementById("closeBlessingVideo");

let musicPlaying = false;

document.addEventListener("DOMContentLoaded", function () {

    if (!birthdayPhoto || !modal || !video || !closeButton) {
        console.error("祝福视频所需的 HTML 元素不存在，请检查 ID。");
        return;
    }

    // 点击旋转头像，打开并播放祝福视频
    birthdayPhoto.addEventListener("click", function () {
        pauseMusic();
        musicControl.disabled = true;
        modal.classList.add("show");
        video.muted = false;
        video.volume = 1;
        video.currentTime = 0;

        video.play().catch(function (error) {
            console.error("祝福视频播放失败：", error);
        });
    });

    // 关闭视频
    function closeBlessingVideo() {
        video.pause();
        video.currentTime = 0;
        modal.classList.remove("show");
        musicControl.disabled = false;
    }

    closeButton.addEventListener("click", closeBlessingVideo);

    // 点击视频区域外侧也可以关闭
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeBlessingVideo();
        }
    });

    // 按 Esc 键关闭视频
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.classList.contains("show")) {
            closeBlessingVideo();
        }
    });
});


button.addEventListener("click", function () {

    // 礼物打开动画
    //giftBox.classList.add("open");

    // 按钮隐藏
    button.style.display = "none";
    giftElements.forEach(function (element) {
        element.classList.add("hidden");
    });

    // 播放生日音乐
    //music.play();
    playMusic();

    // 显示烟花视频
    fireworkVideo.classList.remove("hidden");

    fireworkMovie.currentTime = 0;
    fireworkMovie.loop = true;

    fireworkMovie.play().catch(function(error) {
        console.log("视频播放失败:", error);
    });

    // 显示生日祝福
    setTimeout(function () {
    message.classList.remove("hidden");
        message.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        typeLetter();
    }, 1000);

    // 开始爱心飘落
    startHearts();

    // 原来的彩带效果
    createConfetti();

    createFireworks();
});


function startHearts() {

    setInterval(function () {

        const heart = document.createElement("div");

        heart.className = "falling-heart";

        heart.textContent = ["❤️", "💗", "💖", "💕", "💓"][
            Math.floor(Math.random() * 5)
        ];

        heart.style.left = Math.random() * 100 + "vw";

        heart.style.fontSize =
            Math.random() * 20 + 15 + "px";

        const duration =
            Math.random() * 4 + 4;

        heart.style.animationDuration =
            duration + "s";

        document.body.appendChild(heart);

        setTimeout(function () {
            heart.remove();
        }, duration * 1000);

    }, 300);
}


function createConfetti() {

    for (let i = 0; i < 80; i++) {

        const confetti = document.createElement("div");

        confetti.textContent =
            ["🎉", "✨", "💖", "🌸", "🎈"][
                Math.floor(Math.random() * 5)
            ];

        confetti.style.position = "fixed";
        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top = "-50px";

        confetti.style.fontSize =
            Math.random() * 20 + 15 + "px";

        confetti.style.zIndex = "9999";
        confetti.style.pointerEvents = "none";

        document.body.appendChild(confetti);

        const duration =
            Math.random() * 3 + 2;

        confetti.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)"
                },
                {
                    transform:
                        `translateY(110vh) rotate(${Math.random() * 720 - 360}deg)`
                }
            ],
            {
                duration: duration * 1000,
                easing: "linear"
            }
        );

        setTimeout(function () {
            confetti.remove();
        }, duration * 1000);
    }
}

function createFireworks() {

    const fireworkCount = 5;

    for (let i = 0; i < fireworkCount; i++) {

        setTimeout(function () {

            const centerX =
                Math.random() * window.innerWidth;

            const centerY =
                Math.random() * window.innerHeight * 0.5 + 50;

            const particleCount = 35;

            for (let j = 0; j < particleCount; j++) {

                const particle =
                    document.createElement("div");

                particle.className = "firework";

                particle.style.left =
                    centerX + "px";

                particle.style.top =
                    centerY + "px";

                const angle =
                    Math.random() * Math.PI * 2;

                const distance =
                    Math.random() * 120 + 50;

                const x =
                    Math.cos(angle) * distance;

                const y =
                    Math.sin(angle) * distance;

                particle.style.setProperty(
                    "--x",
                    x + "px"
                );

                particle.style.setProperty(
                    "--y",
                    y + "px"
                );

                document.body.appendChild(particle);

                setTimeout(function () {
                    particle.remove();
                }, 1200);
            }

        }, i * 500);
    }
}

function typeLetter() {

    const text =
`小孩儿，生日快乐！

新的一岁，希望你可以继续做自己喜欢的事情，
去见想见的人，去看想看的风景。

愿你的每一天都有小小的惊喜，
愿开心的时候有人分享，
难过的时候也有人陪伴。

愿未来的日子里，
所有美好的事情都慢慢发生。

最重要的是——
希望你一直都能开心。❤️`;

    let index = 0;
    const name = "小孩儿";

    letterText.textContent = "";

    const cursor = document.createElement("span");
    cursor.className = "letter-cursor";

    letterText.appendChild(cursor);

    const timer = setInterval(function () {

        if (index < text.length) {
            if (index === 0 && text.startsWith(name)) {
                const nameButton = document.createElement("button");
                nameButton.type = "button";
                nameButton.className = "memory-name-link";
                nameButton.textContent = name;
                nameButton.setAttribute("aria-label", "查看生日回忆照片墙");
                nameButton.addEventListener("click", function () {
                    if (!memoryTimeline) {
                        console.error("照片墙区域不存在，请检查 ID。");
                        return;
                    }

                    memoryTimeline.classList.remove("hidden");
                    memoryTimeline.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                });
                cursor.before(nameButton);
                index += name.length;
            } else {
                cursor.insertAdjacentText(
                    "beforebegin",
                    text[index]
                );

                index++;
            }

        } else {

            clearInterval(timer);

        }

    }, 80);
}

// ==============================
// 开始播放音乐
// ==============================
function playMusic() {
    if (modal.classList.contains("show")) {
        return;
    }

    bgMusic.volume = 0.6;

    bgMusic.play()
        .then(() => {
            musicPlaying = true;

            musicControl.textContent = "🎵";
            musicControl.classList.add("playing");
        })
        .catch(error => {
            console.log("音乐播放失败:", error);
        });
}


// ==============================
// 暂停音乐
// ==============================
function pauseMusic() {

    bgMusic.pause();

    musicPlaying = false;

    musicControl.textContent = "🔇";
    musicControl.classList.remove("playing");
}


// ==============================
// 手机/PC 点击音乐按钮
// ==============================
musicControl.addEventListener("click", function (event) {

    event.stopPropagation();

    if (musicPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }

});


(() => {
    "use strict";

    // 修改这里：填写你自己的照片、日期、标题和回忆文字
    const memories = [
        {
            src: "images/memory-01.jpg",
            date: "2024.01",
            title: "第一次留下的回忆",
            text: "那一天的点点滴滴，现在想起来依然很温暖。"
        },
        {
            src: "images/memory-02.jpg",
            date: "2024.03",
            title: "一起度过的时光",
            text: "平凡的小事，也成为了珍贵的回忆。"
        },
        {
            src: "images/memory-03.jpg",
            date: "2024.06",
            title: "开心的一天",
            text: "希望这样的笑容，可以一直延续下去。"
        },
        {
            src: "images/memory-04.jpg",
            date: "2024.09",
            title: "难忘的瞬间",
            text: "每一次相遇，都值得好好珍惜。"
        },
        {
            src: "images/memory-05.jpg",
            date: "2025.01",
            title: "新的回忆",
            text: "感谢一路上的陪伴，让生活变得更加美好。"
        },
        {
            src: "images/memory-06.jpg",
            date: "2025.06",
            title: "未来还有很多故事",
            text: "愿未来的每一天，都有值得记录的幸福。"
        }
    ];

    const list = document.getElementById("memoryList");
    const counter = document.getElementById("memoryCounter");
    const playBtn = document.getElementById("memoryPlayBtn");
    const modal = document.getElementById("memoryLightbox");
    const largeImage = document.getElementById("memoryLargeImage");
    const largeDate = document.getElementById("memoryLargeDate");
    const largeTitle = document.getElementById("memoryLargeTitle");
    const largeText = document.getElementById("memoryLargeText");
    const largeCount = document.getElementById("memoryLargeCount");
    const closeBtn = document.getElementById("memoryClose");
    const prevBtn = document.getElementById("memoryPrev");
    const nextBtn = document.getElementById("memoryNext");

    if (
        !list || !counter || !playBtn || !modal ||
        !largeImage || !largeDate || !largeTitle ||
        !largeText || !largeCount || !closeBtn ||
        !prevBtn || !nextBtn
    ) {
        return;
    }

    let currentIndex = 0;
    let timer = null;
    let lastFocusedElement = null;
    const autoplayDelay = 4000;

    // 生成时间轴卡片
    memories.forEach((memory, index) => {
        const item = document.createElement("article");
        item.className = "memory-item";

        const card = document.createElement("div");
        card.className = "memory-card";

        const imageButton = document.createElement("button");
        imageButton.type = "button";
        imageButton.className = "memory-photo-button";
        imageButton.setAttribute(
            "aria-label",
            "查看回忆：" + memory.title
        );

        const image = document.createElement("img");
        image.className = "memory-photo";
        image.src = memory.src;
        image.alt = memory.title;
        image.loading = "lazy";
        image.decoding = "async";

        imageButton.appendChild(image);

        const content = document.createElement("div");
        content.className = "memory-card-content";

        const date = document.createElement("p");
        date.className = "memory-date";
        date.textContent = memory.date;

        const title = document.createElement("h3");
        title.className = "memory-card-title";
        title.textContent = memory.title;

        const text = document.createElement("p");
        text.className = "memory-card-text";
        text.textContent = memory.text;

        const hint = document.createElement("p");
        hint.className = "memory-open-hint";
        hint.textContent = "点击照片，重温这段回忆 ↗";

        content.append(date, title, text, hint);
        card.append(imageButton, content);
        item.appendChild(card);
        list.appendChild(item);

        imageButton.addEventListener("click", () => {
            openMemory(index, imageButton);
        });
    });

    counter.textContent = "共 " + memories.length + " 段回忆";

    function showMemory(index) {
        if (!memories.length) return;

        currentIndex =
            (index + memories.length) % memories.length;

        const memory = memories[currentIndex];

        largeImage.src = memory.src;
        largeImage.alt = memory.title;
        largeDate.textContent = memory.date;
        largeTitle.textContent = memory.title;
        largeText.textContent = memory.text;
        largeCount.textContent =
            (currentIndex + 1) + " / " + memories.length;
    }

    function openMemory(index, triggerElement) {
        lastFocusedElement = triggerElement;
        showMemory(index);
        modal.classList.add("is-open");
        document.body.style.overflow = "hidden";
        closeBtn.focus();
    }

    function closeMemory() {
        stopAutoplay();
        modal.classList.remove("is-open");
        document.body.style.overflow = "";

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    function startAutoplay() {
        if (memories.length < 2) return;

        stopAutoplay();

        // 打开照片查看器后开始自动切换
        if (!modal.classList.contains("is-open")) {
            openMemory(currentIndex, playBtn);
        }

        playBtn.textContent = "❚❚ 暂停播放";

        timer = window.setInterval(() => {
            showMemory(currentIndex + 1);
        }, autoplayDelay);
    }

    function stopAutoplay() {
        if (timer !== null) {
            window.clearInterval(timer);
            timer = null;
        }

        playBtn.textContent = "▶ 自动播放";
    }

    playBtn.addEventListener("click", () => {
        if (timer !== null) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    prevBtn.addEventListener("click", () => {
        showMemory(currentIndex - 1);
    });

    nextBtn.addEventListener("click", () => {
        showMemory(currentIndex + 1);
    });

    closeBtn.addEventListener("click", closeMemory);

    // 点击弹窗空白处关闭，不影响照片内部点击
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeMemory();
        }
    });

    // 键盘操作
    document.addEventListener("keydown", (event) => {
        if (!modal.classList.contains("is-open")) return;

        if (event.key === "Escape") {
            closeMemory();
        } else if (event.key === "ArrowLeft") {
            showMemory(currentIndex - 1);
        } else if (event.key === "ArrowRight") {
            showMemory(currentIndex + 1);
        }
    });

    // 离开页面时清除定时器
    window.addEventListener("pagehide", stopAutoplay);
})();
