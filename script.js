const button = document.getElementById("surpriseButton");
const message = document.getElementById("message");
//const giftBox = document.getElementById("giftBox");
const giftElements = document.querySelectorAll(".gift-container, .cake");
const fireworkVideo = document.getElementById("fireworkVideo");
const fireworkMovie = document.getElementById("fireworkMovie");

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

    letterText.textContent = "";

    const cursor = document.createElement("span");
    cursor.className = "letter-cursor";

    letterText.appendChild(cursor);

    const timer = setInterval(function () {

        if (index < text.length) {

            cursor.insertAdjacentText(
                "beforebegin",
                text[index]
            );

            index++;

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