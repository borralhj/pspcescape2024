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

async function checkPuzzle1() {
    let answer = await getHash(document.getElementById("puzzle1Input").value);
    if (answer === "517945f7aac9794e4c1b89dc35311d18d389b3a91bdf14ff72ce30d58068f576") {
        document.getElementById("puzzle1").style.display = "none";
        document.getElementById("puzzle2").style.display = "block";
    } else {
        alert(`Incorrect! Try again. ${PENALTY} second penalty`);
        currentTime += PENALTY;
    }
}

async function checkPuzzle2() {
    let artifact = await getHash(document.getElementById("artifact").value);
    let location = await getHash(document.getElementById("location").value);
    let guardian = await getHash(document.getElementById("guardian").value);
    console.log(artifact, location, guardian);
    if (artifact === "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"
        && location === "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a"
        && guardian === "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35") {
        document.getElementById("puzzle2").style.display = "none";
        document.getElementById("puzzle3").style.display = "block";
    } else {
        alert(`Incorrect! Try again. ${PENALTY} second penalty`);
        currentTime += PENALTY;
    }
}

async function checkPuzzle3() {
    let answer = await getHash(document.getElementById("puzzle3Input").value);
    if (answer === "b90e3a3de552ac608eeb9c69f44aded8e5cc55ca34fef8d05d37f85d25dd2080") {
        document.getElementById("puzzle3").style.display = "none";
        document.getElementById("puzzle4").style.display = "block";
    } else {
        alert(`Incorrect! Try again. ${PENALTY} second penalty`);
        currentTime += PENALTY;
    }
}

async function checkPuzzle4() {
    let answer = await getHash(document.getElementById("puzzle4Input").value.toUpperCase());
    if (answer === "08bbf16ddb2ce558c67809bf23226fe60cec175fd63b999d7c0cec96e677438a") {
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
    document.getElementById("artifact").value = 1;
    document.getElementById("location").value = 1;
    document.getElementById("guardian").value = 1;
    document.getElementById("puzzle3Input").value = "";
    document.getElementById("puzzle4Input").value = "";
}

async function getHash(text) {
    if (typeof text === "number") {
        text = new Number(text).toString();
    }
    const encoder = new TextEncoder();
    const encodedText = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", encodedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("timer").innerHTML = getTimeString(MAX_TIME);
    document.getElementById("gamePasswordStart").oninput = async () => {
        const hash = await getHash(document.getElementById("gamePasswordStart").value);
        if (hash == "bf962f8b5704fcb1048c08d16183a14b6ee418e5921eca6139e34cc46700d2a5") {
            document.getElementById("startButton").disabled = false;
        } else {
            document.getElementById("startButton").disabled = true;
        }
    }
});
