const button = document.getElementById("surpriseButton");
const message = document.getElementById("message");

button.addEventListener("click", function () {
    message.classList.remove("hidden");
    button.textContent = "🎉 生日快乐！";
    button.disabled = true;

    createConfetti();
});

function createConfetti() {
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement("div");

        confetti.textContent = ["🎉", "✨", "💖", "🌸", "🎈"][Math.floor(Math.random() * 5)];

        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-50px";
        confetti.style.fontSize = Math.random() * 20 + 15 + "px";
        confetti.style.zIndex = "9999";
        confetti.style.pointerEvents = "none";

        document.body.appendChild(confetti);

        const duration = Math.random() * 3 + 2;

        confetti.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)"
                },
                {
                    transform: `translateY(110vh) rotate(${Math.random() * 720 - 360}deg)`
                }
            ],
            {
                duration: duration * 1000,
                easing: "linear"
            }
        );

        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}