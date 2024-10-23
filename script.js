let timer;
let timeRemaining = 18; // 30 minutes in seconds

function startGame() {
    document.getElementById("landingPage").style.display = "none";
    document.getElementById("puzzle1").style.display = "block";
    startTimer();
}

function startTimer() {
    timer = setInterval(function() {
        timeRemaining--;
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;
        if (seconds < 10) seconds = "0" + seconds;
        document.getElementById("timer").innerText = minutes + ":" + seconds;
        
        //if (timeRemaining <= 0) {
        //    clearInterval(timer);
        //    showFailure();
        //}
    }, 1000);
}

function checkPuzzle1() {
    let answer = document.getElementById("puzzle1Input").value;
    if (answer === "1905") {
        document.getElementById("puzzle1").style.display = "none";
        document.getElementById("puzzle2").style.display = "block";
    } else {
        alert("Incorrect! Try again.");
    }
}

function checkPuzzle2() {
    let chemical1 = document.getElementById("chemical1").value;
    let chemical2 = document.getElementById("chemical2").value;
    let chemical3 = document.getElementById("chemical3").value;
    if (chemical1 === "yellow" && chemical2 === "red" && chemical3 === "blue") {
        document.getElementById("puzzle2").style.display = "none";
        document.getElementById("puzzle3").style.display = "block";
    } else {
        alert("Incorrect! Try again.");
    }
}

function checkPuzzle3() {
    let answer = document.getElementById("puzzle3Input").value;
    if (answer === "12:30") {
        document.getElementById("puzzle3").style.display = "none";
        document.getElementById("puzzle4").style.display = "block";
    } else {
        alert("Incorrect! Try again.");
    }
}

function checkPuzzle4() {
    let answer = document.getElementById("puzzle4Input").value.toUpperCase();
    if (answer === "HAWKS") {
        clearInterval(timer);
        document.getElementById("puzzle4").style.display = "none";
        document.getElementById("successPage").style.display = "block";
    } else {
        alert("Incorrect! Try again.");
    }
}

function showFailure() {
    document.getElementById("puzzle1").style.display = "none";
    document.getElementById("puzzle2").style.display = "none";
    document.getElementById("puzzle3").style.display = "none";
    document.getElementById("puzzle4").style.display = "none";
    document.getElementById("failurePage").style.display = "block";
}

function resetGame() {
    timeRemaining = 1800;
    document.getElementById("timer").innerText = "30:00";
    document.getElementById("failurePage").style.display = "none";
    document.getElementById("successPage").style.display = "none";
    document.getElementById("landingPage").style.display = "block";
}
