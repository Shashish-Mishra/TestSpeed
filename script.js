const testArea = document.querySelector('.text-area');
const resetButton = document.querySelector("#reset");
var timeMinute = 0
var timeSecond = 0
var timeMiSecond = 0
var timeMicroSecond = 0
const theTimer = document.querySelector(".timer");
const originText = document.querySelector('#origin-text');
var interval;
var running = false;
var p1 = "this is a simple paragraph that is meant to be nice and easy to type which is why there will be mommas no periods or any capital letters so i guess this means that it cannot really be considered a paragraph but just a series of run on sentences this should help you get faster at typing."
var p2 = "They rushed out the door, grabbing anything and everything they could think of they might need. There was no time to double-check to make sure they weren't leaving something important behind. Everything was thrown into the car and they sped."
var p3 = 'this a text to enter in box to check speed.'
var paraArr = [p1, p2, p3];


function Zero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}


function Timer() {
    let currentTime = Zero(timeMinute) + ":" + Zero(timeSecond) + ":" + Zero(timeMiSecond);
    theTimer.innerHTML = currentTime;
    timeMicroSecond++;

    timeMinute = Math.floor((timeMicroSecond / 100) / 60);
    timeSecond = Math.floor((timeMicroSecond / 100) - (timeMinute * 60));
    timeMiSecond = Math.floor(timeMicroSecond - (timeSecond * 100) - (timeMinute * 6000))
}

function reset() {
    clearInterval(interval);
    para();
    interval = null;
    timeMinute = 0
    timeSecond = 0
    timeMiSecond = 0
    timeMicroSecond = 0
    running = false;
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testArea.style.borderColor = "gray";
    originText.style.color = "black";
}

function spellcheck() {
    textEntered = testArea.value;
    console.log(originText.textContent)
    let originTextMatch = originText.textContent.substring(0, textEntered.length);
    if (textEntered == originText.textContent) {
        clearInterval(interval);
        testArea.style.borderColor = "#429890"
        originText.style.color = "#429890";
        // alert("time taken is" + (timeMinute * 60 + timeSecond));
        var arr = testArea.value.split(" ");
        var wpm = (arr.length / (timeMinute * 60 + timeSecond)) * 60;
        alert("your speed is: " + wpm + ' words per minute.');

    } else {
        if (textEntered == originTextMatch) {
            testArea.style.borderColor = "#65CCf3";
            originText.style.color = "blue";
        } else {
            testArea.style.borderColor = "#E95D0F"
            originText.style.color = "#E95D0F";
        }
    }
    console.log(textEntered);
}

function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !running) {
        running = true;
        interval = setInterval(Timer, 10);
    }
    console.log(textEnteredLength);
}

para();
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellcheck, false);
resetButton.addEventListener("click", reset, false);


function para() {
    var randomNum = Math.floor(Math.random() * paraArr.length);
    originText.textContent = paraArr[randomNum];
}