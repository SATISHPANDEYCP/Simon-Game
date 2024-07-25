let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let score = 0;

let hiScores = 0;

let h2 = document.querySelector("h2");

document.addEventListener("click", function () {

    if (started == false) {
        console.log("Game Started");
        started = true;

        levelup();
    }

});

function levelup() {
    userSeq = [];//resetting user sequences
    level++;
    h2.innerHTML = `level ${level} <br> Score is:<b>${level * score}</b>`;
    // Generate random index
    let randInd = Math.floor(Math.random() * 4);
    // Store button 
    let randCol = btns[randInd];
    // select random button
    let randbtn = document.querySelector(`.${randCol}`);

    btnflash(randbtn);

    // pushing color in array
    gameSeq.push(randCol);

    console.log("Game:", gameSeq);//this is use to print game sequence
    console.log("user:", userSeq);

}

function scoreup() {
    ++score; // Increment score and return it
}

// For flashing purpose and flsh is define in flash class
function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash")
    }, 250);

};



function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash")
    }, 250)
};

// Tracking high score
let highScoreDisplay = document.querySelector("#high-score");
function updateHiScore() {
    let currentScore = level * score;
    if (currentScore > hiScores) {
        hiScores = currentScore;
        highScoreDisplay.innerText = `High Score: ${hiScores}`;
        return true; // Indicate that a new high score was achieved
    }
    return false; // No new high score
}


//Check wining Status
function winner(isHighScore) {
    let currentScore = level * score;
    if (isHighScore) {
        h2.innerHTML = `Game Over! Your score was: <b>${currentScore}</b> <br>You win the Game with a new high score!<br> Press any key to Start again.`;
    } else {
        h2.innerHTML = `Game Over! Your score was: <b>${currentScore}</b> <br>You lose the Game.<br> Press any Key to Start again.`;
    }
}

function Checkans(idx) {

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 1000);
            scoreup();
        }
    }
    else {

        let isHighScore = updateHiScore(); // Check and update high score
        winner(isHighScore); // Determine if the player won or lost

        document.querySelector(".all").classList.add("flash");

        setTimeout(function () {
            document.querySelector(".all").classList.remove("flash");
        }, 500);

        reset();
    }
}

function btnpress() {
    let btn = this;
    userflash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    //Calling check ans functon
    Checkans(userSeq.length - 1);
}


let allbtn = document.querySelectorAll(".btn");
for (let btn of allbtn) {
    btn.addEventListener("click", btnpress);
}



//reset when game over
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    score = 0; // Reset score as well
}
