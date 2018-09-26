var canvas = document.getElementById("overlay_canvas");
var context = canvas.getContext("2d");

//https://stackoverflow.com/a/49371349/3967379
function drawCurve(points, tension) {
    context.beginPath();
    context.lineWidth=canvas.clientWidth * 0.01;
    context.moveTo(points[0].x, points[0].y);

    var t = (tension != null) ? tension : 1;
    for (var i = 0; i < points.length - 1; i++) {
        var p0 = (i > 0) ? points[i - 1] : points[0];
        var p1 = points[i];
        var p2 = points[i + 1];
        var p3 = (i != points.length - 2) ? points[i + 2] : p2;

        var cp1x = p1.x + (p2.x - p0.x) / 6 * t;
        var cp1y = p1.y + (p2.y - p0.y) / 6 * t;

        var cp2x = p2.x - (p3.x - p1.x) / 6 * t;
        var cp2y = p2.y - (p3.y - p1.y) / 6 * t;

        context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }
    context.stroke();
}
//https://stackoverflow.com/a/47593316/3967379
var LCG=s=>()=>(2**31-1&(s=Math.imul(48271,s)))/2**31;

function getRandomRange(rand,min,max) {
    return Math.floor(rand() * (max - min + 1) + min);
}

function usi(value) {
    updateUserInput(value);
}
function updateUserInput(value) {
    userInput = value.split("");
    for(var i = 0;i<7;i++) {
        userLettersElements[i].textContent = userInput[i];
    }
}

function udsi(value) {
    updateDrawStringInput(value);
}
function updateDrawStringInput(value) {
    drawStringInput = value.split("");
    for(var i = 0;i<7;i++) {
        ribbonLettersElements[i].textContent = drawStringInput[i];
    }
    drawString();
}


function drawString() {
    var seed = 0;
    for(var i = 0;i<7;i++) {
        seed += drawStringInput[i].charCodeAt(0);
    }
    var rand = LCG(seed);

    //Horizontal points going across the whole area
    var points = 8;

    var pointArray = [];

    //5 is straight through middle, values are premutiplied with 10 possible positions
    var minHeight = 1;
    var maxHeight = 4;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    for(var i = 0;i<points;i++) {
        pointArray.push({
            x: (i / (points-1)) * canvas.width,
            y: (getRandomRange(rand,minHeight,maxHeight) / 10) * canvas.height,
        });
    }

    drawCurve(pointArray,1);

}

var selectedElement = null;

function SelectElement(element) {
    if(selectedElement === element) {
        selectedElement.className = "";
        selectedElement = null;
        return;
    } else {

        if(selectedElement !== null) {
            selectedElement.className = "";
            selectedElement = null;
        }

        element.className = "selected";
        selectedElement = element;
    }
}

function elementHoverEnd(element) {

    if(selectedElement !== null) {
        selectedElement.className = "";
        selectedElement = null;
    }

}

function defFoc() {
    if(selectedElement === null) {
        SelectElement(defaultFocusElement);
        return false;
    } else {
        return true;
    }
}


function focusUp() {
    if(defFoc) {
        //todo
    }
}

function focusDown() {
    if(defFoc) {
         //todo   
    }
}

function focusLeft() {
    if(defFoc) {
        //todo
    }
}

function focusRight() {
    if(defFoc) {
        //todo
    }
}

function userInterfaceClick() {
    if(selectedElement !== null) {
        //todo
    }
}

function userInterfaceBackClick() {
    if(selectedElement === null) {

    }
}


var userLettersElements;
var ribbonLettersElements;
var userInput;
var drawStringInput;
var leftInsert;
var rightInsert;
var defaultFocusElement;
var middleInput;
function SetupStuffAndDoStuffAndStuff() {

    userLettersElements = document.getElementById("number_bar").children[0].children;
    ribbonLettersElements = document.getElementById("ribbon_letters").children;

    for(var i = 0;i<7;i++) {

        (function(fuckYouJavascript) {

            fuckYouJavascript.addEventListener("mouseover", function() {
                SelectElement(fuckYouJavascript);
            });
            fuckYouJavascript.addEventListener("mouseout", function() {
                elementHoverEnd(fuckYouJavascript);
            });

        })(userLettersElements[i]);

    }

    leftInsert = document.getElementById("left_insert");
    rightInsert = document.getElementById("right_insert");
    middleInput = document.getElementById("middle_input");

    leftInsert.addEventListener("mouseover",function() {
        SelectElement(leftInsert);
    });

    leftInsert.addEventListener("mouseout",function() {
        elementHoverEnd(leftInsert);
    });

    rightInsert.addEventListener("mouseover",function() {
        SelectElement(rightInsert);
    });

    rightInsert.addEventListener("mouseout",function() {
        elementHoverEnd(rightInsert);
    });
    
    defaultFocusElement = userLettersElements[0];

    updateDrawStringInput("abcdefg");
    updateUserInput("abcdefg");

    drawString();
    window.addEventListener("resize", () => {
        drawString();
    });

    document.addEventListener("keypress",function(e){
        middleInput.textContent = e.keyCode;
    });
}
SetupStuffAndDoStuffAndStuff();
