(function() {
    document.querySelector("h1").addEventListener("click", () => {
        localStorage.clear();
    });

    let level;

    const endless = document.getElementById("endlessRadio");
    const leveled = document.getElementById("leveledRadio");
    const levelInput = document.getElementById("levelInput");
    const playBtn = document.getElementById("playBtn");
    const backBtn = document.getElementById("backBtn");

    leveled.addEventListener("click", appearInput);
    endless.addEventListener("click", endlessLevel);

    function appearInput() {
        if (leveled.checked) {
            setTimeout(() => {
                document.getElementById("leveled").style.display = "none";
                document.getElementById("endless").style.display = "none";
                document.getElementById("levelLabel").style.display = "block";
                backBtn.style.display = "block";
            }, 500);
            setTimeout(() => {
                if (levelInput.value) {
                    level = levelInput.value;
                    localStorage.setItem("level", `${level}`);
                }
            }, 3000);
        }
    }

    function endlessLevel() {
        if (endless.checked) {
            level = "endless";
            localStorage.setItem("level", `${level}`);
        }
    }

    function back() {
        setTimeout(() => {
            document.getElementById("leveled").style.display = "block";
            document.getElementById("endless").style.display = "block";
            document.getElementById("levelLabel").style.display = "none";
            backBtn.style.display = "none";
            leveled.checked = false;
        }, 500);
    }

    playBtn.addEventListener("click", () => {
        if (localStorage.getItem("level") === null) {
            localStorage.setItem("level", "30");
        }
        window.open("index.html");
    });

    backBtn.addEventListener("click", back);
})();
