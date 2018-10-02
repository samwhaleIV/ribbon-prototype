var playingSounds = false;
//dontSave skips writing to app cache
function disableSoundEngine(dontSave) {
    playingSounds = false;
    if(!dontSave) {
        storage.set("playing_sounds",false);
    }
}
function enableSoundEngine(dontSave) {
    playingSounds = true;
    if(!dontSave) {
        storage.set("playing_sounds",true);
    }
}
function playSound(name) {
    if(!playingSounds) {
        return;
    }
    switch(name) {
        case "add":
            addSound.currentTime = 0;
            addSound.play();
            break;
        case "focus":
            focusSound.currentTime = 0;
            focusSound.play();
            break;
        case "pluck":
        case "enter":
        case "erase"://todo seperate the erase case
            enterSound.currentTime = 0;
            enterSound.play();
            break;
        case "fail":
            failSound.currentTime = 0;
            failSound.play();
            break;
        case "tick":
            tickSound.currentTime = 0;
            tickSound.play();
            break;
    }
}
var enterSound;
var focusSound;
var addSound;
var failSound;
var tickSound;
if(window.location.pathname.split("/").indexOf("index.html") !== -1) {
    enterSound = new Audio("pluck.mp3");
    focusSound = new Audio("click.mp3");
    addSound = new Audio("add.mp3");
    failSound = new Audio("fail.mp3");
    tickSound = new Audio("tick.mp3");
} else {
    enterSound = new Audio("../pluck.mp3");
    focusSound = new Audio("../click.mp3");
    addSound = new Audio("../add.mp3");
    failSound = new Audio("../fail.mp3");
    tickSound = new Audio("../tick.mp3");
}
