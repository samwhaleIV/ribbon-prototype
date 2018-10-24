//Sets the default values if storage_secure is missing. Could be used to clear all data.
if(localStorage.getItem("storage_secured") !== "Yep") {

    localStorage.clear();

    localStorage.setItem("storage_secured","Yep");

    localStorage.setItem("playing_music",true);
    localStorage.setItem("playing_sounds",true);

    localStorage.setItem("highscore",0);
    localStorage.setItem("coins",0);
    localStorage.setItem("owned_scramblers",0);
    localStorage.setItem("owned_scissors",0);
    localStorage.setItem("owns_colors",false);
    localStorage.setItem("owns_grocery_king",false);
    localStorage.setItem("blue_theme",false);

    localStorage.setItem("total_coins",0);
    localStorage.setItem("rounds_played",0);
    localStorage.setItem("used_scramblers",0);
    localStorage.setItem("used_scissors",0);
    localStorage.setItem("longest_word","none");

}
var storage = {
    set: function(key,value) {
        localStorage.setItem(key,value);
    },
    get: function (key) {
        var value = localStorage.getItem(key);
        switch(value) {
            case "true":
                return true;
            case "false":
                return false;
            default:
                if(value === null) {
                    return false;
                } else {
                    return value;
                }
        }
    },
    exists: function(key) {
        switch(storage.get(key)) {
            case true:
                return true;
            case false:
                return false;
            default:
                return true;
        }
    },
}
var InputSchematic = {
    Up: null,
    Down: null,
    Left: null,
    Right: null,
    Enter: null,
    Back: null,
}
document.addEventListener("keypress",function(e){
    switch(e.keyCode) {
        case 119://w
            if(InputSchematic.Up) {
                InputSchematic.Up();
            }
            break;
        case 115://s
        if(InputSchematic.Down) {
            InputSchematic.Down();
        }
            break;
        case 97://a
            if(InputSchematic.Left) {
                InputSchematic.Left();
            }
            break;
        case 100://d
            if(InputSchematic.Right) {
                InputSchematic.Right();
            }
            break;
        case 32://space
        case 13://enter
            if(InputSchematic.Enter) {
                InputSchematic.Enter();
            }
            break; 
        case 8://backspace
        case 98://b
            if(InputSchematic.Back) {
                InputSchematic.Back();
            }
            break;
    }
});
