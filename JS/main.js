(function() {
    //---- Variables and Cached Elements ----
    let level;

    const endless = document.getElementById("endlessRadio");
    const leveled = document.getElementById("leveledRadio");
    const levelInput = document.getElementById("levelInput");
    const playBtn = document.getElementById("playBtn");
    const backBtn = document.getElementById("backBtn");

    //---- Functions ----

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
            levelInput.value = "";
        }, 500);
    }

    //---- Event Listeners ----
    leveled.addEventListener("click", appearInput);

    endless.addEventListener("click", endlessLevel);

    playBtn.addEventListener("click", () => {
        if (localStorage.getItem("level") === null) {
            localStorage.setItem("level", "30");
        }
        window.open("question1.html");
    });

    backBtn.addEventListener("click", back);

    //---- Clearing local storage for testing ----
    document.querySelector("h1").addEventListener("click", () => {
        localStorage.clear();
    });
})();
