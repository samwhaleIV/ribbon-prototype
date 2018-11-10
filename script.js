var selectedElement = null;

function deffoc() {
    if(selectedElement === null) {
        SelectElement(menuButtons.children[0]);
        return false;
    } else {
        return true;
    }
}

function focusUp() {
    if(!deffoc()) {
        return;
    }
    if(!doingTutorial) {
        switch(selectedElement.id) {
            case "play_button":
                SelectElement(menuButtons.children[3]);
                break;
            case "stats_button":
                SelectElement(menuButtons.children[0]);
                break;
            case "store_button":
                SelectElement(menuButtons.children[1]);
                break;
            case "about_button":
                SelectElement(menuButtons.children[2]);
                break;
        }
    } else {
        previousTutorialPage();
    }
}

function focusDown() {
    if(!deffoc()) {
        return;
    }
    if(!doingTutorial) {
        switch(selectedElement.id) {
            case "play_button":
                SelectElement(menuButtons.children[1]);
                break;
            case "stats_button":
                SelectElement(menuButtons.children[2]);
                break;
            case "store_button":
                SelectElement(menuButtons.children[3]);
                break;
            case "about_button":
                SelectElement(menuButtons.children[0]);
                break;
        }
    } else {
        nextTutorialPage();
    }
}

function userInterfaceClick() {
    if(!deffoc()) {
        return;
    }
    if(!doingTutorial) {
        switch(selectedElement.id) {
            case "play_button":
                window.location.assign("game/game.html");
                break;
            case "stats_button":
                window.location.assign("stats/stats.html");
                break;
            case "store_button":
                window.location.assign("store/store.html");
                break;
            case "about_button":
                window.location.assign("about/about.html");
                break;
        }
    } else {
        nextTutorialPage();
    }
}

function SelectElement(element) {
    if(selectedElement !== null) {
        selectedElement.classList.remove("selected");
    }
    if(element !== selectedElement) {
        playSound("focus");
    }
    selectedElement = element;
    selectedElement.classList.add("selected");
}

function RegisterInputEvents() {
    InputSchematic.Up = focusUp;
    InputSchematic.Down = focusDown;
    InputSchematic.Right = focusDown;
    InputSchematic.Left = focusUp;
    InputSchematic.Enter = userInterfaceClick;
}

var menuButtons = document.getElementById("menu_buttons");

for(var i = 0;i<menuButtons.children.length;i++) {
    (function(punchthrough) {

        punchthrough.addEventListener("mouseenter", function() {
            SelectElement(punchthrough);
        });

        punchthrough.addEventListener("click",function() {
            userInterfaceClick(punchthrough);
        });

        punchthrough.addEventListener("mouseleave",function() {
            if(!selectedElement)return;
            selectedElement.classList.remove("selected");
            selectedElement = null;
        });

    })(menuButtons.children[i]);  
}
if(storage.get("blue_theme")) {
    document.body.classList.add("blue");
} else {
    document.body.classList.add("pink");
}
if(storage.get("playing_sounds")) {
    enableSoundEngine(true);
    playSound("add");
}
if(storage.exists("highscore")) {
    document.getElementById("high_score").textContent = `High score: ${storage.get("highscore")} points`;
}
if(storage.exists("coins")) {
    var coins = storage.get("coins");
    document.getElementById("coins_counter").textContent = `${coins} coin${coins != 1 ? "s" : ""}`;
} else {
    storage.set("coins",0);
}

var doingTutorial = !storage.get("did_tutorial");
var tutorialOverlay = document.getElementById("tutorial_overlay");

for(var i = 0;i<tutorialOverlay.children.length;i++) {
    tutorialOverlay.children[i].addEventListener("click",nextTutorialPage);
}

var tutorialPage = -1;
const endTutorialPage = 5;

if(doingTutorial) {
    var splashText = document.getElementById("splash_text");
    splashText.textContent = "Welcome to Ribbon!";
    tutorialPage = 0;
    selectedElement = tutorialOverlay.children[0];
    selectedElement.classList.add("selected");
    selectedElement.classList.remove("hidden");
    tutorialOverlay.classList.remove("hidden");
}

function endTutorial() {
    splashText.textContent = "a word game not really about ribbons,";
    doingTutorial = false;
    storage.set("did_tutorial",true);
    selectedElement = null;
    tutorialOverlay.classList.add("hidden");
}
function nextTutorialPage() {
    selectedElement.classList.remove("selected");
    selectedElement.classList.add("hidden");
    if(++tutorialPage >= tutorialOverlay.children.length) {
        endTutorial();
    } else {
        selectedElement = tutorialOverlay.children[tutorialPage];
        selectedElement.classList.remove("hidden");
        selectedElement.classList.add("selected");
    }
}
function previousTutorialPage() {
    if(tutorialPage > 0) {
        selectedElement.classList.remove("selected");
        selectedElement.classList.add("hidden");
        selectedElement = tutorialOverlay.children[--tutorialPage];
        selectedElement.classList.add("selected");
        selectedElement.classList.remove("hidden");
    }
}
RegisterInputEvents();
