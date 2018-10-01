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

var THE_OTHER_DRAW_STRING_PUN_HAHA;
function updateDrawStringInput(value) {
    THE_OTHER_DRAW_STRING_PUN_HAHA = value;
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
var inDropDownMenu = false;
function SelectElement(element) {
    if(selectedElement !== element) {
        if(selectedElement === element) {
            return;
        }
        if(selectedElement !== null) {
            selectedElement.classList.remove("selected");
            selectedElement = null;
        }
        if(element.id != "popout_button") {
            playSound("focus");
        }

        element.classList.add("selected");
        selectedElement = element;
        console.log("Selected: " + element.id);
    }
    hoverDidEnd = false;
}
function elementHoverEnd(element) {
    if(selectedElement !== null) {
        selectedElement.classList.remove("selected");
        selectedElement = null;
    }
}
function defFoc() {
    if(selectedElement === null) {
        if(!inDropDownMenu) {
            SelectElement(defaultFocusElement);       
        } else {
            SelectElement(defaultDropDownElement);
        }
        return false;
    } else {
        return true;
    }
}
function focusUp() {
    if(defFoc()) {
        if(!inDropDownMenu) {
            if(selectedElement.id.startsWith("n")) {
                SelectElement(leftInsert);
            } else if(selectedElement.id.endsWith("insert")) {
                userInterfaceClick(popoutButton);
            } else if(selectedElement.id == "popout_button") {
                userInterfaceClick(popoutButton);
            }
        } else {
            if(selectedElement.id == "popout_button") {
                userInterfaceClick(popoutButton,true);
            } else {
                var number = Number(selectedElement.id.substr(1,1)) - 1;
                if(number < 0) {
                    userInterfaceClick(popoutButton);
                } else {
                    SelectElement(document.getElementById(`p${number}`));
                }
            }
        }
    }
}

function focusDown() {
    if(defFoc()) {
        if(!inDropDownMenu) {
            switch(selectedElement.id) {
                case "popout_button":
                    SelectElement(leftInsert);
                    break;
                case "left_insert":
                    SelectElement(document.getElementById("n0"));
                    break;
                case "right_insert":
                    SelectElement(document.getElementById("n6"));
                    break;
            }
        } else {
            if(selectedElement.id =="popout_button") {
                SelectElement(defaultDropDownElement);
                return;
            }
            var number = Number(selectedElement.id.substr(1,1))+1;
            if(number < dropDownItemCount) {
                SelectElement(document.getElementById(`p${number}`));
            }
        }
    }
}
function focusLeft() {
    if(defFoc()) {
        if(!inDropDownMenu) {
            if(selectedElement.id.startsWith("n")) {
                var number = selectedElement.id.substr(1,1);
                if(number > 0) {
                    number--;
                } else {
                    number = 6;
                }
                SelectElement(document.getElementById(`n${number}`));
            } else if(selectedElement.id == "right_insert") {
                SelectElement(leftInsert);
            } else if(selectedElement.id == "left_insert") {
                SelectElement(rightInsert);
            }
        } else {
            focusUp();
        }
    }
}

function focusRight() {
    if(defFoc()) {
        if(!inDropDownMenu) {
            if(selectedElement.id.startsWith("n")) {
                var number = selectedElement.id.substr(1,1);
                if(number < 6) {
                    number++;
                } else {
                    number = 0;
                }
                SelectElement(document.getElementById(`n${number}`));
            } else if(selectedElement.id == "left_insert") {
                SelectElement(rightInsert);
            } else if(selectedElement.id == "right_insert") {
                SelectElement(leftInsert);
            }
        } else {
            focusDown();
        }
    }
}

function userInterfaceBack() {
    if(inDropDownMenu) {
        userInterfaceClick(popoutButton);
    }
}

var DEBUG_MIDDLE_STRING = "";

function clearUserInput() {
    for(var i = 0;i<7;i++) {
        userLettersElements[i].classList.remove("activated");
    }
    DEBUG_MIDDLE_STRING = "";
    SetMiddleInput();
}

var clearAction = null;

function userInterfaceClick(element,byMouse) {
    if(!element) {
        element = selectedElement;
    } else {
        SelectElement(element);
    }
    if(element) {
        console.log("Clicked: " + element.id);
        if(!inDropDownMenu) {
            switch(element.id) {
                case "popout_button":
                    popout.classList.remove("hidden");
                    inDropDownMenu = true;
                    if(!byMouse) {
                        SelectElement(defaultDropDownElement);
                    }
                    break;
                case "right_insert"://HELLO. THIS ISN'T THE REAL CODE.
                    if(DEBUG_MIDDLE_STRING.length > 0) {
                        playSound("erase");                        
                    }
                    clearUserInput();
                    break;
                case "left_insert"://SERIOUSLY YOU FUCKING BITCH DON'T YOU DARE CONSIDER USING THIS AS THE REAL CODE >:+(

                        if(DEBUG_MIDDLE_STRING.length < 1) {
                            return;
                        }

                        for(var i = 0;i<7;i++) {
                            ribbonLettersElements[i].classList.remove("letter_transition");
                        }

                        for(var i = 6;i>7-DEBUG_MIDDLE_STRING.length-1;i--) {
                            ribbonLettersElements[i].classList.add("letter_transition");
                        }

                        var pointsGainedString = `+${DEBUG_MIDDLE_STRING.length * 100}`;
                        scorePopupContent.textContent = pointsGainedString;

                        if(clearAction === null) {
                            scorePopup.classList.add("shown");
                            clearAction = setTimeout(function() {
                                scorePopup.classList.remove("shown");
                                clearAction = null;
                            },1000);
                        } else {
                            clearTimeout(clearAction);
                            clearAction = setTimeout(function() {
                                scorePopup.classList.remove("shown"); 
                                clearAction = null;
                            },1000);                    
                        }

                        (function(length) {
                            setTimeout(function() {
                                for(var i = 6;i>7-length-1;i--) {
                                    ribbonLettersElements[i].classList.remove("letter_transition");
                                }
                       
                            },500);
                        })(DEBUG_MIDDLE_STRING.length);
                    
                        var originalRemainder = THE_OTHER_DRAW_STRING_PUN_HAHA.substr(DEBUG_MIDDLE_STRING.length,7-DEBUG_MIDDLE_STRING.length);

                        var newString = originalRemainder + DEBUG_MIDDLE_STRING;

                        clearUserInput();

                        updateDrawStringInput(newString);

                        playSound("add");
                    break;
                default:
                    selectedElement.classList.toggle("activated");
                    if(selectedElement.classList.contains("activated")) {
                        DEBUG_MIDDLE_STRING += selectedElement.textContent;
                    } else {
                        DEBUG_MIDDLE_STRING = DEBUG_MIDDLE_STRING.replace(selectedElement.textContent,"");
                    }
                    SetMiddleInput(DEBUG_MIDDLE_STRING);
                    playSound("enter");
                    break;
            }
        } else {
            switch(element.id) {
                case "popout_button":
                    popout.classList.add("hidden");
                    inDropDownMenu = false;
                    if(!byMouse) {
                        SelectElement(leftInsert);
                    }
                    break;
                case "p0":
                    soundToggleElement.checked = !soundToggleElement.checked;
                    if(soundToggleElement.checked) {
                        if(!soundToggleElement.checked) {
                            soundToggleElement.checked = true;
                        }
                        enableSoundEngine();
                    } else {
                        if(soundToggleElement.checked) {
                            soundToggleElement.checked = false;
                        }
                        disableSoundEngine();
                    }
                    break;
                case "p1":
                    musicToggleElement.checked = !musicToggleElement.checked;
                    if(musicToggleElement.checked) {
                        playMusic();
                    } else {
                        stopMusic();
                    }
                    break;
                case "p2":
                    window.location.assign("../index.html");
                    break;
            }
        }
    }
}

function playMusic(dontSave) {
    if(!musicToggleElement.checked) {
        musicToggleElement.checked = true;
    }
    playingMusic = true;
    musicPlayer.play();
    if(!dontSave) {
        storage.set("music_playing",true);
    }
}
function stopMusic(dontSave) {
    if(musicToggleElement.checked) {
        musicToggleElement.checked = false;
    }
    playingMusic = false;
    musicPlayer.pause();
    if(!dontSave) {
        storage.set("music_playing",false);
    }
}

var userLettersElements;
var ribbonLettersElements;
var userInput;
var drawStringInput;
var leftInsert;
var rightInsert;
var defaultFocusElement;
var defaultDropDownElement;
var middleInput;
var canvas;
var context;
var popoutButton;
var scoreSpan;
var popout;
var timerBarChild;
var dropDownItemCount;
var soundToggleElement;
var musicToggleElement;
var musicPlayer;
var scorePopup;
var scorePopupContent;
function RegisterDom() {
    userLettersElements = document.getElementById("number_bar").children[0].children;
    ribbonLettersElements = document.getElementById("ribbon_letters").children;
    leftInsert = document.getElementById("left_insert");
    rightInsert = document.getElementById("right_insert");
    middleInput = document.getElementById("middle_input");
    canvas = document.getElementById("overlay_canvas");
    context = canvas.getContext("2d");
    defaultFocusElement = userLettersElements[0];
    popoutButton = document.getElementById("popout_button");
    popout = document.getElementById("popout");
    timerBarChild = document.getElementById("timer_bar_child");
    defaultDropDownElement = document.getElementById("p0");
    dropDownItemCount = popout.childElementCount;
    soundToggleElement = document.getElementById("sound_effects_toggle");
    musicToggleElement = document.getElementById("music_toggle");
    musicPlayer = document.getElementById("music_player");
    scorePopup = document.getElementById("score_popup");
    scorePopupContent = document.getElementById("score_popup_content");
}
function RegisterInputEvents() {
    InputSchematic.Up = focusUp;
    InputSchematic.Down = focusDown;
    InputSchematic.Left = focusLeft;
    InputSchematic.Right = focusRight;
    InputSchematic.Enter = userInterfaceClick;
    InputSchematic.Back = userInterfaceBack;
}
function SetupStuffAndDoStuffAndStuff() {

    RegisterDom();

    for(var i = 0;i<7;i++) {

        (function(fuckYouJavascript) {

            fuckYouJavascript.addEventListener("mouseover", function() {
                SelectElement(fuckYouJavascript);
            });
            fuckYouJavascript.addEventListener("mouseout", function() {
                elementHoverEnd(fuckYouJavascript);
            });

            fuckYouJavascript.addEventListener("click",function() {
                userInterfaceClick(fuckYouJavascript,true);
            });

        })(userLettersElements[i]);

    }

    for(var i = 0;i<dropDownItemCount;i++) {
        (function(fuckYouJavascript) {

            fuckYouJavascript.addEventListener("mouseenter", function() {
                SelectElement(fuckYouJavascript);
            });

            fuckYouJavascript.addEventListener("click",function() {
                userInterfaceClick(fuckYouJavascript,true);
            });

            fuckYouJavascript.addEventListener("mouseleave",function() {
                if(!selectedElement)return;
                selectedElement.classList.remove("selected");
                selectedElement = null;
            });

        })(popout.children[i]);     
    }

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

    leftInsert.addEventListener("click",function() {
        userInterfaceClick(leftInsert,true);
    });

    rightInsert.addEventListener("click",function() {
        userInterfaceClick(rightInsert,true);
    });

    popoutButton.addEventListener("mouseout",function() {
        elementHoverEnd(popoutButton);
    });

    popoutButton.addEventListener("mouseover",function() {
        SelectElement(popoutButton);
    });

    popoutButton.addEventListener("click",function() {
        userInterfaceClick(popoutButton,true);
    });

    window.addEventListener("resize",function() {
        drawString();
    });
    musicPlayer.volume = 0.2;
    RegisterInputEvents();
    BeginGameRuntime();
}
function SetMiddleInput(input) {
    if(!input) {
        middleInput.classList.add("hidden");
        middleInput.textContent = "";
        return;
    }
    var modifiedInput = input.substr(0,1);
    for(var i = 1;i<input.length;i++) {
        modifiedInput += "-" + input.substr(i,1);
    }
    middleInput.textContent = modifiedInput;
    middleInput.classList.remove("hidden");
}
function SetTimerBar(normalizedPercent) {
    timerBarChild.style.width = `${normalizedPercent * 100}%`;
}
function SetSoundState(musicOn,soundOn) {
    playingMusic = musicOn;
    playingSounds = soundOn;
    musicToggleElement.checked = playingMusic;
    soundToggleElement.checked = playingSounds;
    if(playingSounds) {
        if(!soundToggleElement.checked) {
            soundToggleElement.checked = true;
        }
        enableSoundEngine(true);
    } else {
        if(soundToggleElement.checked) {
            soundToggleElement.checked = false;
        }
        disableSoundEngine(true);
    }
    if(playingMusic) {
        try {
            playMusic(true);
        } catch(err) {
            console.warn("Error playing music. Is Chrome not being nice?");
        }
    } else {
        try {
            stopMusic(true);
        } catch(err) {
            console.warn("Error setting music state. Is Chrome not being nice?");
        }
    }
}
var playingMusic;
function BeginGameRuntime() {
    updateDrawStringInput("abcdefg");
    updateUserInput("abcdefg");
    SetTimerBar(0);
    SetMiddleInput();
    SetSoundState(
        storage.get("playing_music"),
        storage.get("playing_sounds")
    );
    drawString();
}
SetupStuffAndDoStuffAndStuff();
