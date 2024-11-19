let timer;
let currentTime = 0;
const MAX_TIME = 1800; // 30 minutes in seconds
//const MAX_TIME = 18; // 18 seconds for testing
const PENALTY = 5; // seconds penalty for wrong guess

function startGame() {
    document.getElementById("landingPage").style.display = "none";
    document.getElementById("puzzle1").style.display = "block";
    startTimer();
}

function startTimer() {
    timer = setInterval(function() {
        currentTime++;

        let timeRemaining = MAX_TIME - currentTime;
        const timeString = getTimeString(timeRemaining);

        if (timeRemaining >= 0) {
            document.getElementById("timer").innerText = timeString;
        } else { // timeRemaining < 0
            document.getElementById("timer").innerText = getTimeString(0);

            //clearInterval(timer);
            //showFailure();
        }
    }, 1000);
}

function checkPuzzle1() {
    let answer = document.getElementById("puzzle1Input").value;
    if (answer === "452713") {
        document.getElementById("puzzle1").style.display = "none";
        document.getElementById("puzzle2").style.display = "block";
    } else {
        alert(`Incorrect! Try again. ${PENALTY} second penalty`);
        currentTime += PENALTY;
    }
}

function checkPuzzle2() {
    let artifact = document.getElementById("artifact").value;
    let location = document.getElementById("location").value;
    let guardian = document.getElementById("guardian").value;
    if (artifact === "1" && location === "4" && guardian === "2") {
        document.getElementById("puzzle2").style.display = "none";
        document.getElementById("puzzle3").style.display = "block";
    } else {
        alert(`Incorrect! Try again. ${PENALTY} second penalty`);
        currentTime += PENALTY;
    }
}

function checkPuzzle3() {
    let answer = document.getElementById("puzzle3Input").value;
    if (answer === "10:30") {
        document.getElementById("puzzle3").style.display = "none";
        document.getElementById("puzzle4").style.display = "block";
    } else {
        alert(`Incorrect! Try again. ${PENALTY} second penalty`);
        currentTime += PENALTY;
    }
}

function checkPuzzle4() {
    let answer = document.getElementById("puzzle4Input").value.toUpperCase();
    if (answer === "BRAVE") {
        clearInterval(timer);
        document.getElementById("puzzle4").style.display = "none";
        document.getElementById("successPage").style.display = "block";
        displayFinalTime();
    } else {
        alert(`Incorrect! Try again. ${PENALTY} second penalty`);
        currentTime += PENALTY;
    }
}

function getTimeString(timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return `${minutes}:${seconds}`;
}

function displayFinalTime() {
    const timeString = getTimeString(currentTime);
    document.getElementById("finalTime").innerHTML = timeString;
}

function showFailure() {
    document.getElementById("puzzle1").style.display = "none";
    document.getElementById("puzzle2").style.display = "none";
    document.getElementById("puzzle3").style.display = "none";
    document.getElementById("puzzle4").style.display = "none";
    document.getElementById("failurePage").style.display = "block";
}

function resetGame() {
    currentTime = 0;
    document.getElementById("timer").innerText = getTimeString(MAX_TIME)
    document.getElementById("failurePage").style.display = "none";
    document.getElementById("successPage").style.display = "none";
    document.getElementById("landingPage").style.display = "block";

    document.getElementById("puzzle1Input").value = "";
    document.getElementById("chemical1").value = "red";
    document.getElementById("chemical2").value = "red";
    document.getElementById("chemical3").value = "red";
    document.getElementById("puzzle3Input").value = "";
    document.getElementById("puzzle4Input").value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("timer").innerHTML = getTimeString(MAX_TIME);
    document.getElementById("gamePasswordStart").oninput = () => {
        if (document.getElementById("gamePasswordStart").value == "escape2024") {
            document.getElementById("startButton").disabled = false;
        } else {
            document.getElementById("startButton").disabled = true;
        }
    }
});
