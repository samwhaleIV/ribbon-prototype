var playingSounds = false;
//dontSave skips writing to app cache
function disableSoundEngine(dontSave) {
    playingSounds = false;
    //set in cache if !dontSave
}
function enableSoundEngine(dontSave) {
    playingSounds = true;
    //set in cache if !dontSave
}
function playSound(name) {
    if(!playingSounds) {
        return;
    }
    switch(name) {
        case "enter":
        case "erase":
            enterSound.currentTime = 0;
            enterSound.play();
            break;
    }
}
var enterSound;
if(window.location.pathname.split("/").indexOf("index.html") !== -1) {
    enterSound = new Audio("pluck.mp3");
} else {
    enterSound = new Audio("../pluck.mp3");
}
