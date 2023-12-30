let modeToggle = document.querySelector("#modeToggle");

let moonValue = '<i class="fa-solid fa-moon"></i>';

let sunValue = '<i class="fa-solid fa-sun"></i>';

let header = document.querySelector("header");

let resetDiv = document.querySelector("#resetArea");
//Game buttons
let buttons = document.querySelectorAll(".gameButton");
let arrayButtons = Array.from(buttons);

//game over buttons
let gameOverIcon = document.querySelector("#gameOverIcon");
let gameOverDiv = document.querySelector("#gameOver");

//score Counter Buttons

let currentScore = document.querySelector("#currentScoreKeeper");
let topScore = document.querySelector("#topScoreKeeper");

//button colors
cellColor = {
    2: "#EEE4DA",
    4: "#c2b7a3",
    8: "#F2B179",
    16: "#F59563",
    32: "#F67C5F",
    64: "#F65E3B",
    128: "#EDCF72",
    256: "#EDCC61",
    512: "#EDC850",
    1024: "#EDC53F",
    2048: "#EDC22E",
    4096: "#776e65",
    8192: "#f9f6f2",
    16384: "#776e65",
    32768: "#776e65",
    65536: "#f9f6f2",
    "": "rgb(66, 102, 221)",
};
// Reset button

let reset = document.querySelector("#reset");

function resetButtons() {
    buttons.forEach((value, index) => {
        buttons[index].textContent = "";
        if (buttons[index].classList.contains("activeButton")) {
            buttons[index].classList.remove("activeButton");
        }
        buttons[index].classList.add("inactiveButton");
    });

    document.addEventListener("keydown", moveValues);

    if (topScore.textContent < currentScore.textContent) {
        topScore.textContent = currentScore.textContent;
    }

    currentScore.textContent = "0";
    addColors();
}

function disableButtons() {
    document.removeEventListener("keydown", moveValues);
}

let choices = [2, 4];

//random no. generating

function addRandomValue() {
    let availableButtons = arrayButtons.filter((value) => {
        return value.textContent === "";
    });

    if (availableButtons.length > 0) {
        let randomIndex =
            Math.round(Math.random() * 100) % availableButtons.length;

        let randomValue = Math.round(Math.random() * 10) % 2;

        availableButtons[randomIndex].textContent = "" + choices[randomValue];
    }

    addClasses();
    addColors();
}

//adding colors to buttons

function addColors() {
    for (let index in arrayButtons) {
        arrayButtons[index].style.background =
            cellColor[arrayButtons[index].textContent];
    }
}

// moving values

function possibleMerges() {
    let index = 0;

    for (let row = 0; row < 16; row++) {
        if (arrayButtons[index].textContent !== "") {
            //right check
            if (index % 4 !== 3) {
                if (
                    arrayButtons[index].textContent ===
                    arrayButtons[index + 1].textContent
                ) {
                    return true;
                }
            }
            //down check
            if (index + 4 < 16) {
                if (
                    arrayButtons[index].textContent ===
                    arrayButtons[index + 4].textContent
                ) {
                    return true;
                }
            }
        }
        index++;
    }

    return false;
}

function moveValues(e) {
    let anyMerge = false;
    let valuesInRow = [];

    if (e.keyCode === 37) {
        // left key
        let j = 15;
        let lastValue = "";
        for (let i = 0; i < 4; i++) {
            // merging values
            for (let k = 0; k < 4; k++) {
                if (buttons[j].textContent !== "") {
                    if (!lastValue) {
                        lastValue = buttons[j].textContent;
                    } else {
                        if (buttons[j].textContent === lastValue) {
                            lastValue = "";
                            anyMerge = true;
                            valuesInRow.push("" + +buttons[j].textContent * 2);
                        } else {
                            valuesInRow.push("" + +lastValue);
                            lastValue = buttons[j].textContent;
                        }
                    }
                }
                j--;
            }
            if (lastValue) {
                valuesInRow.push(lastValue);
                lastValue = "";
            }
            // adding values in row
            for (let col = j + 1; col < j + 5; col++) {
                if (valuesInRow.length > 0) {
                    buttons[col].textContent = "" + valuesInRow.pop();
                } else {
                    buttons[col].textContent = "";
                }
            }
        }
        
    } else if (e.keyCode === 39) {
        // right key
        let j = 0;
        let lastValue = "";
        for (let i = 0; i < 4; i++) {
            // merging values
            for (let k = 0; k < 4; k++) {
                if (buttons[j].textContent !== "") {
                    if (!lastValue) {
                        lastValue = buttons[j].textContent;
                    } else {
                        if (buttons[j].textContent === lastValue) {
                            lastValue = "";
                            anyMerge = true;
                            valuesInRow.push("" + +buttons[j].textContent * 2);
                        } else {
                            valuesInRow.push("" + +lastValue);
                            lastValue = buttons[j].textContent;
                        }
                    }
                }
                j++;
            }
            if (lastValue) {
                valuesInRow.push(lastValue);
                lastValue = "";
            }
            // adding values in row
            for (let col = j - 1; col >= j - 4; col--) {
                if (valuesInRow.length > 0) {
                    buttons[col].textContent = "" + valuesInRow.pop();
                } else {
                    buttons[col].textContent = "";
                }
            }
        }
        // addRandomValue();
        // addClasses();
    } else if (e.keyCode === 38) {
        // key up
        let lastValue = "";
        for (let i = 12; i < 16; i++) {
            for (let j = i; j > -1; j -= 4) {
                if (buttons[j].textContent !== "") {
                    if (!lastValue) {
                        lastValue = buttons[j].textContent;
                    } else {
                        if (buttons[j].textContent === lastValue) {
                            lastValue = "";
                            anyMerge = true;
                            valuesInRow.push("" + +buttons[j].textContent * 2);
                        } else {
                            valuesInRow.push("" + +lastValue);
                            lastValue = buttons[j].textContent;
                        }
                    }
                }
            }

            if (lastValue) {
                valuesInRow.push(lastValue);
                lastValue = "";
            }
            // adding values in row
            for (let col = i % 4; col <= i; col += 4) {
                if (valuesInRow.length > 0) {
                    buttons[col].textContent = "" + valuesInRow.pop();
                } else {
                    buttons[col].textContent = "";
                }
            }
        }
        // addRandomValue();
        // addClasses();
    } else if (e.keyCode === 40) {
        // down key
        let lastValue = "";
        for (let i = 0; i < 4; i++) {
            for (let j = i; j < 16; j += 4) {
                if (buttons[j].textContent !== "") {
                    if (!lastValue) {
                        lastValue = buttons[j].textContent;
                    } else {
                        if (buttons[j].textContent === lastValue) {
                            lastValue = "";
                            anyMerge = true;
                            valuesInRow.push("" + +buttons[j].textContent * 2);
                        } else {
                            valuesInRow.push("" + +lastValue);
                            lastValue = buttons[j].textContent;
                        }
                    }
                }
            }

            if (lastValue) {
                valuesInRow.push(lastValue);
                lastValue = "";
            }
            // adding values in row

            for (let col = 12 + (i % 4); col >= i; col -= 4) {
                if (valuesInRow.length > 0) {
                    buttons[col].textContent = "" + valuesInRow.pop();
                } else {
                    buttons[col].textContent = "";
                }
            }
        }
        // addRandomValue();
        // addClasses();
    }

    if (
        e.keyCode == 37 ||
        e.keyCode == 38 ||
        e.keyCode == 39 ||
        e.keyCode == 40
    ) {
        if (anyMerge) {

            currentScore.textContent = ""+(+currentScore.textContent + 10);
            addRandomValue();
            addClasses();

            function checkingTextContent(button) {
                return button.textContent === "";
            }

            let ret = arrayButtons.some(checkingTextContent);

            if (!ret) {
                let anyPossibleMerge = possibleMerges();

                if (!anyPossibleMerge) {
                    gameOverDiv.style.display = "flex";
                    disableButtons();
                }
            }
        } else {
            function checkingTextContent(button) {
                return button.textContent === "";
            }

            let ret = arrayButtons.some(checkingTextContent);

            if (ret) {
                //jagah khaali hai
                addRandomValue();
                addClasses();
                function checkingTextContent(button) {
                    return button.textContent === "";
                }

                let InnerRet = arrayButtons.some(checkingTextContent);

                if (!InnerRet) {
                    let anyPossibleMerge = possibleMerges();

                    if (!anyPossibleMerge) {
                        gameOverDiv.style.display = "flex";
                        disableButtons();
                    }
                }
            } else {
                // jagah khaali nai hai
                let anyPossibleMerge = possibleMerges();

                if (!anyPossibleMerge) {
                    gameOverDiv.style.display = "flex";
                    disableButtons();
                }
            }
        }

        addColors();
    }
}

document.addEventListener("keydown", moveValues);

document.addEventListener("DOMContentLoaded", () => {
    addRandomValue();
    addClasses();
});

function addClasses() {
    buttons.forEach((value, index) => {
        if (buttons[index].textContent === "") {
            if (buttons[index].classList.contains("activeButton")) {
                buttons[index].classList.remove("activeButton");
            }
            buttons[index].classList.add("inactiveButton");
        } else {
            if (buttons[index].classList.contains("inactiveButton")) {
                buttons[index].classList.remove("inactiveButton");
            }
            buttons[index].classList.add("activeButton");
        }
    });

    // for(let index in buttons){
    //     // console.log(index)
    //     // console.log(buttons[index])
    //     if(buttons[index].textContent===""){
    //         if(buttons[index].classList.contains("activeButton")){
    //             buttons[index].classList.remove("activeButton");
    //         }
    //         buttons[index].classList.add("inactiveButton")
    //     }
    //     else{
    //         if(buttons[index].classList.contains("inactiveButton")){
    //             buttons[index].classList.remove("inactiveButton");
    //         }
    //         buttons[index].classList.add("activeButton")
    //     }

    // }
}

reset.addEventListener("click", () => {
    resetButtons();

    addRandomValue();
});

//navbar buttons

let play = document.querySelector("#play");
let aboutGame = document.querySelector("#aboutGame");
let rules = document.querySelector("#rules");
let info = document.querySelector("#info");

//div buttons

let gameDiv = document.querySelector("#container");
let aboutGameDiv = document.querySelector("#aboutGameDiv");
let rulesDiv = document.querySelector("#rulesDiv");
let aboutMeDiv = document.querySelector("#aboutMeDiv");

play.addEventListener("click", () => {
    aboutGameDiv.style.display = "none";
    gameDiv.style.display = "grid";
    rulesDiv.style.display = "none";
    aboutMeDiv.style.display = "none";
});

aboutGame.addEventListener("click", () => {
    aboutGameDiv.style.display = "flex";
    gameDiv.style.display = "none";
    rulesDiv.style.display = "none";
    aboutMeDiv.style.display = "none";
});

rules.addEventListener("click", () => {
    aboutGameDiv.style.display = "none";
    gameDiv.style.display = "none";
    rulesDiv.style.display = "flex";
    aboutMeDiv.style.display = "none";
});

info.addEventListener("click", () => {
    aboutGameDiv.style.display = "none";
    gameDiv.style.display = "none";
    rulesDiv.style.display = "none";
    aboutMeDiv.style.display = "flex";
});

gameOverIcon.addEventListener("click", () => {
    resetButtons();

    addRandomValue();

    gameOverDiv.style.display = "none";
});

modeToggle.addEventListener("click", (e) => {
    if (modeToggle.innerHTML === sunValue) {
        console.log("in sun");

        header.style.background = "rgb(204 178 178)";

        gameDiv.style.background = "rgb(181 151 166)";

        resetDiv.style.background = "#9b7d8e";
        modeToggle.innerHTML = moonValue;

        aboutGameDiv.style.background = "rgb(196 183 158)";
        rulesDiv.style.background = "rgb(196 183 158)";
        aboutMeDiv.style.background = "rgb(196 183 158)";
    } else {
        header.style.background = "#212121";

        gameDiv.style.background = "rgb(73, 82, 118)";

        resetDiv.style.background = "#2f2762";

        modeToggle.innerHTML = sunValue;
        aboutGameDiv.style.background = "rgb(125, 101, 55)";
        rulesDiv.style.background = "rgb(125, 101, 55)";
        aboutMeDiv.style.background = "rgb(125, 101, 55)";
    }
});
