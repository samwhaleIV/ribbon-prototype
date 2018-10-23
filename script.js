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
}

function focusDown() {
    if(!deffoc()) {
        return;
    }
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
}

function userInterfaceClick() {
    if(!deffoc()) {
        return;
    }
    switch(selectedElement.id) {
        case "play_button":
            window.location.assign("game/game.html");
            break;
        case "stats_button":
            break;
        case "store_button":
            window.location.assign("store/store.html");
            break;
        case "about_button":
            break;
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
    document.body.classList.remove("pink");
    document.body.classList.add("blue");
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
    document.getElementById("coins_counter").textContent = `${coins} coin${coins != 1 ? "s" : ""}`
} else {
    storage.set("coins",0);
}
RegisterInputEvents();
