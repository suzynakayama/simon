(function() {
    //----Variables----
    let winner, turn, correct, gamerTurn, computerTurn, flashIndex, interval;

    let timer = 1000;

    let computerArray = [2, 2];

    let gamerArray = [];

    //----Cached elements----

    const outerTL = document.getElementById("outerTL");
    const outerTR = document.getElementById("outerTR");
    const outerBL = document.getElementById("outerBL");
    const outerBR = document.getElementById("outerBR");
    const innerTL = document.getElementById("innerTL");
    const innerTR = document.getElementById("innerTR");
    const innerBL = document.getElementById("innerBL");
    const innerBR = document.getElementById("innerBR");
    const startBtn = document.getElementById("start");
    const strictBtn = document.getElementById("strict");
    const strictCheck = document.getElementById("strictCheck");
    const turnEl = document.getElementById("turn");
    const msg = document.getElementById("msg");

    //----Buttons event listeners----

    startBtn.addEventListener("click", () => {
        startCheck.checked = !startCheck.checked;
        if (startCheck.checked === true) {
            turnEl.innerHTML = "- -";
            setTimeout(() => {
                init();
            }, 500);
        } else {
            turnEl.innerHTML = "";
            clearColors();
            clearInterval();
            clearTimeout();
        }
    });

    strictBtn.addEventListener("click", () => {
        if (startCheck.checked) {
            strictCheck.checked = !strictCheck.checked;
        }
    });

    //---functions---

    function init() {
        flashIndex = 0;
        winner = false;
        turn = 1;
        turnEl.innerHTML = 1;
        correct = true;
        computerTurn = true;
        gamerTurn = false;
        for (let i = 2; i < 30; i++) {
            computerArray.push(Math.floor(Math.random() * 8) + 1);
        }
        console.log(computerArray);
        //interval = setInterval(playTurn, 1000);
        // playTurn();
        compTurn();
    }

    // function playTurn() {
    //     if (computerTurn) {
    //         clearColors();
    //         console.log("turn:" + turn);
    //         console.log("computerTurn:" + computerTurn);
    //         console.log("flashIndex:" + flashIndex);

    //         while (flashIndex < turn) {
    //             setTimeout(() => {
    //                 //setInterval(() => {
    //                 countTimer();
    //                 console.log("timer:" + timer);

    //                 flashColor();
    //                 //flashIndex++;

    //                 console.log("flashIndex:" + flashIndex);
    //                 console.log("turn:" + turn);
    //             }, timer);
    //             flashIndex++;
    //             break;
    //         }
    //     }

    //     // if (flashIndex === turn) {
    //     //     console.log("gamerTurn");
    //     //     // clearInterval(interval);
    //     //     //interval = 0;
    //     //     //console.log(interval);
    //     //     clearColors();
    //     //     computerTurn = false;
    //     //     gamerTurn = true;
    //     // }

    //     gamertime();
    // }

    function compTurn() {
        let flashIndex = 0;
        function flash() {
            clearColors();
            setTimeout(() => {
                countTimer();
                flashColor(flashIndex);
                flashIndex++;
                if (flashIndex < turn) {
                    setTimeout(flash, timer);
                } else {
                    setTimeout(gamertime, timer);
                }
            }, 500);
        }
        setTimeout(flash, 800);
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

    function countTimer(turn) {
        if (turn < 4) timer = 1000;
        if (4 > turn && turn < 9) timer = 850;
        if (8 > turn && turn < 13) timer = 700;
        if (12 > turn && turn < 17) timer = 600;
        if (16 > turn && turn < 21) timer = 500;
        if (20 > turn && turn < 25) timer = 400;
        if (24 > turn && turn < 29) timer = 350;
        if (turn === 29) timer = 250;
        if (turn === 30) timer = 200;
    }

    function gamertime() {
        console.log("gamerTurn");
        // clearInterval(interval);
        //interval = 0;
        //console.log(interval);
        clearColors();
        computerTurn = false;
        gamerTurn = true;
    }

    // function flashColor() {
    //     if (computerArray[flashIndex] === 1) outerTLPlay();
    //     if (computerArray[flashIndex] === 2) outerTRPlay();
    //     if (computerArray[flashIndex] === 3) outerBLPlay();
    //     if (computerArray[flashIndex] === 4) outerBRPlay();
    //     if (computerArray[flashIndex] === 5) innerTLPlay();
    //     if (computerArray[flashIndex] === 6) innerTRPlay();
    //     if (computerArray[flashIndex] === 7) innerBLPlay();
    //     if (computerArray[flashIndex] === 8) innerBRPlay();
    // }

    function outerTLPlay() {
        outerTL.style.backgroundColor = "rgb(62, 122, 242)";
    }

    function outerTRPlay() {
        outerTR.style.backgroundColor = "rgb(255, 217, 102)";
    }

    function outerBLPlay() {
        outerBL.style.backgroundColor = "rgb(255, 102, 102)";
    }

    function outerBRPlay() {
        outerBR.style.backgroundColor = "rgb(129, 255, 127)";
    }

    function innerTLPlay() {
        innerTL.style.backgroundColor = "rgb(128, 255, 128)";
    }

    function innerTRPlay() {
        innerTR.style.backgroundColor = "rgb(244, 93, 247)";
    }

    function innerBLPlay() {
        innerBL.style.backgroundColor = "rgb(255, 191, 53)";
    }

    function innerBRPlay() {
        innerBR.style.backgroundColor = "rgb(97, 244, 244)";
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
                checkWinner();
                playFn();
                if (!winner) {
                    setTimeout(() => {
                        clearColors();
                    }, 400);
                }
            }
        };
    }

    const hpc = (num, playFn) => () => {
        if (gamerTurn) {
            gamerArray.push(num);
            checkWinner();
            playFn();
            if (!winner) {
                setTimeout(() => {
                    clearColors();
                }, 400);
            }
        }
    };

    outerTL.addEventListener("click", handlePlayerClick(1, outerTLPlay));

    // outerTL.addEventListener("click", () => {
    //     if (gamerTurn) {
    //         gamerArray.push(1);
    //         checkWinner();
    //         outerTLPlay();
    //         if (!winner) {
    //             setTimeout(() => {
    //                 clearColors();
    //             }, 400);
    //         }
    //     }
    // });

    outerTR.addEventListener("click", () => {
        if (gamerTurn) {
            gamerArray.push(2);
            checkWinner();
            outerTRPlay();
            if (!winner) {
                setTimeout(() => {
                    clearColors();
                }, 400);
            }
        }
    });

    outerBL.addEventListener("click", () => {
        if (gamerTurn) {
            gamerArray.push(3);
            checkWinner();
            outerBLPlay();
            if (!winner) {
                setTimeout(() => {
                    clearColors();
                }, 400);
            }
        }
    });

    outerBR.addEventListener("click", () => {
        if (gamerTurn) {
            gamerArray.push(4);
            checkWinner();
            outerBRPlay();
            if (!winner) {
                setTimeout(() => {
                    clearColors();
                }, 400);
            }
        }
    });

    innerTL.addEventListener("click", () => {
        if (gamerTurn) {
            gamerArray.push(5);
            checkWinner();
            innerTLPlay();
            if (!winner) {
                setTimeout(() => {
                    clearColors();
                }, 400);
            }
        }
    });

    innerTR.addEventListener("click", () => {
        if (gamerTurn) {
            gamerArray.push(6);
            checkWinner();
            innerTRPlay();
            if (!winner) {
                setTimeout(() => {
                    clearColors();
                }, 400);
            }
        }
    });

    innerBL.addEventListener("click", () => {
        if (gamerTurn) {
            gamerArray.push(7);
            checkWinner();
            innerBLPlay();
            if (!winner) {
                setTimeout(() => {
                    clearColors();
                }, 400);
            }
        }
    });

    innerBR.addEventListener("click", () => {
        if (gamerTurn) {
            gamerArray.push(8);
            checkWinner();
            innerBRPlay();
            if (!winner) {
                setTimeout(() => {
                    clearColors();
                }, 400);
            }
        }
    });

    function checkWinner() {
        if (gamerArray.length === 30 && correct) {
            winner = true;
            turnEl.innerHTML = "WIN!";
        } else if (
            gamerArray[gamerArray.length - 1] !==
            computerArray[gamerArray.length - 1]
        ) {
            if (strictCheck) {
                turnEl.innerHTML = "NO!";
                init();
            } else {
                turnEl.innerHTML = "NO!";
                flashIndex = 0;
                gamerArray = [];
                correct = false;
                computerTurn = true;
                // playTurn();
                compTurn();
            }
        } else if (gamerArray.length === turn) {
            turn++;
            turnEl.innerHTML = turn;
            gamerArray = [];
            flashIndex = 0;
            correct = true;
            computerTurn = true;
            // playTurn();
            compTurn();
        }
    }
})();
