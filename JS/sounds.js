(function() {
    //----Variables----

    let winner, turn, correct, gamerTurn, on;

    let computerArray = [];

    let gamerArray = [];

    let soundPlayer = new Audio();

    let sounds = {
        outerTL: "./Sounds/beep1.wav",
        outerTR: "./Sounds/beep2.wav",
        outerBL: "./Sounds/beep3.wav",
        outerBR: "./Sounds/beep4.wav",
        innerTL: "./Sounds/beep5.wav",
        innerTR: "./Sounds/beep6.wav",
        innerBL: "./Sounds/beep7.wav",
        innerBR: "./Sounds/beep8.wav",
        strictBtn: "./Sounds/strictBtn.wav",
        startBtn: "./Sounds/game-start.wav",
        wrongAnswer: "./Sounds/game-over.wav"
    };

    //----Cached elements----

    const goBack = document.getElementById("goBack");
    const outerTL = document.getElementById("outerTL");
    const outerTR = document.getElementById("outerTR");
    const outerBL = document.getElementById("outerBL");
    const outerBR = document.getElementById("outerBR");
    const innerTL = document.getElementById("innerTL");
    const innerTR = document.getElementById("innerTR");
    const innerBL = document.getElementById("innerBL");
    const innerBR = document.getElementById("innerBR");
    const startBtn = document.getElementById("start");
    const startCheck = document.getElementById("startCheck");
    const strictBtn = document.getElementById("strict");
    const strictCheck = document.getElementById("strictCheck");
    const turnEl = document.getElementById("turn");

    //----Buttons event listeners----

    goBack.addEventListener("click", () => {
        window.open("question.html");
    });

    startBtn.addEventListener("click", () => {
        startCheck.checked = !startCheck.checked;
        if (startCheck.checked) {
            on = true;
            turnEl.innerHTML = "- -";
            playSound("startBtn");
            setTimeout(() => {
                init();
            }, 500);
        } else {
            on = false;
            playSound("startBtn");
            turnEl.innerHTML = "";
            gamerArray = [];
            clearColors();
        }
    });

    strictBtn.addEventListener("click", () => {
        playSound("strictBtn");
        if (startCheck.checked) {
            strictCheck.checked = !strictCheck.checked;
        }
    });

    //----Game functions----

    function init() {
        winner = false;
        turn = 1;
        turnEl.innerHTML = 1;
        correct = true;
        gamerTurn = false;
        for (let i = 0; i < 30; i++) {
            computerArray.push(Math.floor(Math.random() * 8) + 1);
        }
        computerTurn();
    }

    function computerTurn() {
        let flashIndex = 0;
        let timer = countTimer();
        turnEl.innerHTML = turn;
        function flash() {
            clearColors();
            setTimeout(() => {
                flashColor(flashIndex);
                flashIndex++;
                if (flashIndex < turn) {
                    setTimeout(flash, timer);
                } else {
                    setTimeout(gamerTime, timer);
                }
            }, timer);
        }
        setTimeout(flash, timer);
    }

    function flashColor(flashIndex) {
        if (computerArray[flashIndex] === 1) outerTLPlay();
        if (computerArray[flashIndex] === 2) outerTRPlay();
        if (computerArray[flashIndex] === 3) outerBLPlay();
        if (computerArray[flashIndex] === 4) outerBRPlay();
        if (computerArray[flashIndex] === 5) innerTLPlay();
        if (computerArray[flashIndex] === 6) innerTRPlay();
        if (computerArray[flashIndex] === 7) innerBLPlay();
        if (computerArray[flashIndex] === 8) innerBRPlay();
    }

    function countTimer() {
        if (turn < 4) return 850;
        if (4 >= turn && turn < 9) return 750;
        if (9 >= turn && turn < 13) return 650;
        if (13 >= turn && turn < 17) return 550;
        if (17 >= turn && turn < 21) return 450;
        if (21 >= turn && turn < 25) return 350;
        if (25 >= turn && turn < 29) return 250;
        if (turn === 29) return 200;
        if (turn === 30) return 120;
    }

    function gamerTime() {
        clearColors();
        gamerTurn = true;
    }

    function playSound(name) {
        soundPlayer.src = sounds[name];
        soundPlayer.play();
    }

    //----Color changes----

    function outerTLPlay() {
        if (on) {
            playSound("outerTL");
            outerTL.style.backgroundColor = "rgb(62, 122, 242)";
        }
    }

    function outerTRPlay() {
        if (on) {
            playSound("outerTR");
            outerTR.style.backgroundColor = "rgb(255, 217, 102)";
        }
    }

    function outerBLPlay() {
        if (on) {
            playSound("outerBL");
            outerBL.style.backgroundColor = "rgb(255, 102, 102)";
        }
    }

    function outerBRPlay() {
        if (on) {
            playSound("outerBR");
            outerBR.style.backgroundColor = "rgb(129, 255, 127)";
        }
    }

    function innerTLPlay() {
        if (on) {
            playSound("innerTL");
            innerTL.style.backgroundColor = "rgb(128, 255, 128)";
        }
    }

    function innerTRPlay() {
        if (on) {
            playSound("innerTR");
            innerTR.style.backgroundColor = "rgb(244, 93, 247)";
        }
    }

    function innerBLPlay() {
        if (on) {
            playSound("innerBL");
            innerBL.style.backgroundColor = "rgb(255, 191, 53)";
        }
    }

    function innerBRPlay() {
        if (on) {
            playSound("innerBR");
            innerBR.style.backgroundColor = "rgb(97, 244, 244)";
        }
    }

    function clearColors() {
        outerTL.style.backgroundColor = "darkblue";
        outerTR.style.backgroundColor = "darkgoldenrod";
        outerBL.style.backgroundColor = "darkred";
        outerBR.style.backgroundColor = "darkgreen";
        innerTL.style.backgroundColor = "darkolivegreen";
        innerTR.style.backgroundColor = "darkmagenta";
        innerBL.style.backgroundColor = "darkorange";
        innerBR.style.backgroundColor = "darkcyan";
    }

    //----Color event listeners----

    function handlePlayerClick(num, playFn) {
        return function() {
            if (gamerTurn) {
                gamerArray.push(num);
                playFn();
                checkWinner();
                if (!winner) {
                    setTimeout(() => {
                        clearColors();
                    }, 500);
                }
            }
        };
    }

    outerTL.addEventListener("click", handlePlayerClick(1, outerTLPlay));

    outerTR.addEventListener("click", handlePlayerClick(2, outerTRPlay));

    outerBL.addEventListener("click", handlePlayerClick(3, outerBLPlay));

    outerBR.addEventListener("click", handlePlayerClick(4, outerBRPlay));

    innerTL.addEventListener("click", handlePlayerClick(5, innerTLPlay));

    innerTR.addEventListener("click", handlePlayerClick(6, innerTRPlay));

    innerBL.addEventListener("click", handlePlayerClick(7, innerBLPlay));

    innerBR.addEventListener("click", handlePlayerClick(8, innerBRPlay));

    //----Check Winner Function----

    function checkWinner() {
        if (gamerArray.length === 30 && correct) {
            winner = true;
            turnEl.innerHTML = "WIN!";
            setTimeout(() => {
                gamerArray = [];
                init();
            }, 1000);
        } else if (
            gamerArray[gamerArray.length - 1] !==
            computerArray[gamerArray.length - 1]
        ) {
            if (strictCheck.checked) {
                playSound("wrongAnswer");
                turnEl.innerHTML = "NO!";
                setTimeout(() => {
                    gamerArray = [];
                    init();
                }, 800);
            } else {
                playSound("wrongAnswer");
                turnEl.innerHTML = "NO!";
                setTimeout(() => {
                    flashIndex = 0;
                    gamerArray = [];
                    correct = false;
                    computerTurn();
                }, 800);
            }
        } else if (gamerArray.length === turn) {
            turn++;
            turnEl.innerHTML = turn;
            gamerArray = [];
            flashIndex = 0;
            correct = true;
            computerTurn();
        }
    }
})();
