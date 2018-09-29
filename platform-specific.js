var storage = {
    exists: function(key) {
        return false;
    },
    set: function(key,value) {
        return null;
        //todo
    },
    get: function (key) {
        return null;
        //todo
    }
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
