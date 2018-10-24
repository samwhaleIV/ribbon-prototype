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

function toggleEndScreenFocus() {
    if(selectedElement === stopHereButton) {
        SelectElement(keepPlayingButton);
    } else {
        SelectElement(stopHereButton);
    }
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
        if(onGameEndScreen) {
            SelectElement(keepPlayingButton);
        } else {
            if(!inDropDownMenu) {
                SelectElement(defaultFocusElement);       
            } else {
                SelectElement(defaultDropDownElement);
            }
        }
        return false;
    } else {
        return true;
    }
}
function focusUp() {
    if(defFoc()) {
        if(onGameEndScreen) {
            toggleEndScreenFocus();
        } else {
            if(!inDropDownMenu) {
                if(selectedElement.id.startsWith("n")) {
                    SelectElement(leftInsert);
                } else {
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
}
function focusDown() {
    if(defFoc()) {
        if(onGameEndScreen) {
            toggleEndScreenFocus();
        } else {
            if(!inDropDownMenu) {
                switch(selectedElement.id) {
                    case "popout_button":
                        SelectElement(leftInsert);
                        break;
                    case "left_insert":
                        SelectElement(document.getElementById("n0"));
                        break;
                    case "ScissorsPowerUp":
                    case "ScramblerPowerUp":
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
}
function focusLeft() {
    if(defFoc()) {
        if(onGameEndScreen) {
            toggleEndScreenFocus();
        } else {
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
                    if(hasScissors || hasScramblers) {
                        if(hasScramblers) {
                            SelectElement(ScramblerPowerUp);
                        } else {
                            SelectElement(ScissorsPowerUp);
                        }
                    } else {
                        SelectElement(rightInsert);
                    }
                }
            } else {
                focusUp();
            }
        }
    }
}

function focusRight() {
    if(defFoc()) {
        if(onGameEndScreen) {
            toggleEndScreenFocus();
        } else {
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
                    if(hasScissors || hasScramblers) {
                        if(hasScissors) {
                            SelectElement(ScissorsPowerUp);
                        } else {
                            SelectElement(ScramblerPowerUp);
                        }
                    } else {
                        SelectElement(rightInsert);
                    }
                } else if(selectedElement.id == "right_insert") {
                    SelectElement(leftInsert);
                }
            } else {
                focusDown();
            }
        }
    }
}

function userInterfaceBack() {
    if(inDropDownMenu) {
        userInterfaceClick(popoutButton);
    }
}

var DEBUG_MIDDLE_STRING = "";

function getScore(wordLength,lettersUsed) {
    return ((wordLength - lettersUsed) * 25) + (lettersUsed * 50);
}

var alphabetRegions = [{
        endValue: 0.7,
        letters: "tnsrd"
    },{
        endValue: 0.98,
        letters: "fgpbcmlh"
    },{
        endValue: 1,
        letters: "wkjy"
    }
];

var vowels = "aeiuo";

var vowelCount = 0;

var startWords = ["admires","reality","adheres","shipped","skipped","flipped","isolate","ingrate","treason","senator","inertia"];

function generateRandomStart() {
    return startWords[Math.floor(Math.random() * startWords.length)];
}

function generateNewLetters() {
    var newInputString = "";
    var inputConsonantComposition = {};
    var inputVowelComposition = {};
    for(var  i = 0;i<7;i++) {
        if(!userLettersElements[i].classList.contains("activated")) {
            var sameLetter = userLettersElements[i].textContent;
            if(userLettersElements[i].classList.contains("vowel")) {
                inputVowelComposition[sameLetter] = true;
            } else {
                inputConsonantComposition[sameLetter] = true;
            }
        }
    }
    for(var i = 0;i<7;i++) {
        if(userLettersElements[i].classList.contains("activated")) {
            if(userLettersElements[i].classList.contains("vowel")) {
                var newVowelIndex = Math.floor(Math.random() * vowels.length);
                var newVowel = vowels[newVowelIndex];
                //this can never take more than vowels.length iterations
                while(inputVowelComposition[newVowel]) {
                    newVowelIndex = (newVowelIndex + 1) % vowels.length;
                    newVowel = vowels[newVowelIndex];
                }
                newInputString += newVowel;
                inputVowelComposition[newVowel] = true; 
            } else {
                var randomBucket = Math.random();
                for(var shadow_i = 0;shadow_i<alphabetRegions.length;shadow_i++) {
                    if(randomBucket<=alphabetRegions[shadow_i].endValue) {
                        randomBucket = alphabetRegions[shadow_i].letters;
                        break;
                    }
                }
                var newIndex = Math.floor(Math.random() * randomBucket.length);
                var newLetter = randomBucket[newIndex];
                //this prevents repeat consonants mostttt of the time* yikes
                if(inputConsonantComposition[newLetter]) {
                    newIndex = (newIndex + 1) % randomBucket.length;
                    newLetter = randomBucket[newIndex];
                }
                newInputString += newLetter;
                inputConsonantComposition[newLetter] = true;
            }
        } else {
            var sameLetter = userLettersElements[i].textContent;
            newInputString += sameLetter;
        }
        userLettersElements[i].classList.remove("activated");
    }

    updateUserInput(newInputString);

    DEBUG_MIDDLE_STRING = "";
    SetMiddleInput();
}

function TheLeftInsertCaseThatGotTooBigForTheSwitchStatement() {

    var lengthRequirementMatched = false;
    lengthRequirementMatched = DEBUG_MIDDLE_STRING.length >= 1;

    var foundWord = null;
    var pointsGainedString;
    var wordTooSmall = null;
    
    if(lengthRequirementMatched) {
        var totalString = THE_OTHER_DRAW_STRING_PUN_HAHA + DEBUG_MIDDLE_STRING;
        var totalStringLength = totalString.length;

        for(var i = 0;i<totalStringLength;i++) {

            var word = totalString.substr(i);
            if(dictionary[word]) {
                console.log("Found word: " + word);
                if(word.length <= 2) {
                    wordTooSmall = true;
                    break;
                }
                if(i > THE_OTHER_DRAW_STRING_PUN_HAHA.length-1) {
                    break;
                } else {
                    foundWord = word;
                }
                break;
            }

        }

        if(foundWord !== null) {

            var points = getScore(foundWord.length,DEBUG_MIDDLE_STRING.length);

            score += points;

            pointsGainedString = `+${points}`;

            addedWords.push({
                word: foundWord,
                score: points
            });

            updateScoreCounter();

        } else {
            if(wordTooSmall) {
                pointsGainedString = "word too small";
            } else {
                pointsGainedString = "invalid addition";
            }

        }
    } else {
        pointsGainedString = "missing addition";
    }

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

    if(foundWord === null || !lengthRequirementMatched) {
        clearUserInput();
        playSound("fail");
        return;
    }

    for(var i = 0;i<7;i++) {
        ribbonLettersElements[i].classList.remove("letter_transition");
    }

    for(var i = 6;i>7-DEBUG_MIDDLE_STRING.length-1;i--) {
        ribbonLettersElements[i].classList.add("letter_transition");
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

    generateNewLetters();

    updateDrawStringInput(newString);

    playSound("add");
}

function clearUserInput() {
    for(var i = 0;i<7;i++) {
        userLettersElements[i].classList.remove("activated");
    }
    DEBUG_MIDDLE_STRING = "";
    SetMiddleInput();
}

var clearAction = null;
var addedWords = [];
var score = 0;

function updateScoreCounter() {
    scoreCounter.textContent = `Score ${score}`;
}

function userInterfaceClick(element,byMouse) {
    if(!element) {
        element = selectedElement;
    } else {
        SelectElement(element);
    }
    if(element) {
        if(onGameEndScreen) {
            switch(selectedElement.id) {
                case "keep_playing_button":
                    keepPlaying();
                    playSound("enter");
                    break;
                case "stop_here_button":
                    window.location.assign("../index.html");
                    playSound("enter");
                    break;
            }
        } else if(!inDropDownMenu) {
            switch(element.id) {
                case "popout_button":
                    popout.classList.remove("hidden");
                    inDropDownMenu = true;
                    if(!byMouse) {
                        SelectElement(defaultDropDownElement);
                    }
                    break;
                case "ScramblerPowerUp":
                    UseScrambler();
                    break;
                case "ScissorsPowerUp":
                    UseScissors();
                    break;
                case "right_insert":
                    if(DEBUG_MIDDLE_STRING.length > 0) {
                        playSound("erase");                        
                    }
                    clearUserInput();
                    break;
                case "left_insert":
                        TheLeftInsertCaseThatGotTooBigForTheSwitchStatement();
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
                            enableSoundEngine();
                        } else {
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
        storage.set("playing_music",true);
    }
}
function stopMusic(dontSave) {
    if(musicToggleElement.checked) {
        musicToggleElement.checked = false;
    }
    playingMusic = false;
    musicPlayer.pause();
    if(!dontSave) {
        storage.set("playing_music",false);
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
var scoreCounter;
var endScreen;
var gameSquare;
var totalPointsElement;
var keepPlayingButton;
var stopHereButton;
var endScreenContent;
var ScissorsPowerUp;
var ScramblerPowerUp;
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
    scoreCounter = document.getElementById("score_counter");
    endScreen = document.getElementById("end_screen");
    gameSquare = document.getElementById("game_square");
    totalPointsElement = document.getElementById("total_points_element");
    keepPlayingButton = document.getElementById("keep_playing_button");
    stopHereButton = document.getElementById("stop_here_button");
    endScreenContent = document.getElementById("end_screen_content");
    ScissorsPowerUp = document.getElementById("ScissorsPowerUp");
    ScramblerPowerUp = document.getElementById("ScramblerPowerUp");
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

    const slider1 = document.getElementById("Slider1");
    const slider2 = document.getElementById("Slider2");

    if(storage.get("blue_theme")) {
        document.body.classList.add("blue");
        timerBarChild.classList.add("blue");
        slider1.classList.add("blue");
        slider2.classList.add("blue");
    } else {
        document.body.classList.add("pink");
        timerBarChild.classList.add("pink");
        slider1.classList.add("pink");
        slider2.classList.add("pink");
    }

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

            //this is so we can re-use a function to generate the first random letters
            fuckYouJavascript.classList.add("activated");

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


    [stopHereButton,keepPlayingButton,popoutButton,rightInsert,leftInsert,ScissorsPowerUp,ScramblerPowerUp].forEach(item => {
        item.addEventListener("mouseleave",function() {
            elementHoverEnd(item);
        });
        item.addEventListener("mouseenter",function() {
            SelectElement(item);
        });
        item.addEventListener("click",function() {
            userInterfaceClick(item,true);
        });
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
var elapsedTime = 0;
var endTime = 60;
var timerInterval;
function timerTick() {
    SetTimerBar(++elapsedTime / endTime);
    if(elapsedTime === endTime - 8) {
        timerBarChild.classList.add("flashing");
        playSound("tick");
        return;
    }
    if(elapsedTime > endTime - 8) {
        playSound("tick");
    }
    if(elapsedTime === endTime + 1) {
        timerBarChild.classList.remove("flashing");    
        clearInterval(timerInterval);
        gameEnd();
        return;
    }
}
var onGameEndScreen = false;
function keepPlaying() {
    gameSquare.classList.remove("hidden");
    endScreen.classList.add("hidden");
    popoutButton.classList.remove("hidden");
    keepPlayingButton.classList.remove("selected");
    selectedElement = null;
    scoreCounter.textContent = "0 points";
    score = 0;
    onGameEndScreen = false;
    addedWords = [];
    for(var i = 0;i<7;i++) {
        userLettersElements[i].classList.add("activated");
    }
    generateNewLetters();
    elapsedTime = 0;
    startTimer();
}
function gameEnd() {
    if(storage.exists("highscore")) {
        if(storage.get("highscore") > score) {
            storage.set("highscore",score);
        }
    } else {
        storage.set("highscore",score);
    }
    storage.set("rounds_played",Number(storage.get("rounds_played")) + 1);
    clearUserInput();
    onGameEndScreen = true;
    if(selectedElement !== null) {
        selectedElement.classList.remove("selected");
    }
    selectedElement = null;
    if(inDropDownMenu) {
        popout.classList.add("hidden");
        inDropDownMenu = false;
    }
    scoreCounter.textContent = "Round over";
    popoutButton.classList.add("hidden");
    endScreen.classList.remove("hidden");
    gameSquare.classList.add("hidden");
    for(var i = 1;i<endScreenContent.children.length;i++) {
        endScreenContent.children[i].remove();
    }
    if(addedWords.length < 1) {
        addedWords.push({
            word: "no words made",
            score: "): no points earned"
        });
    } else {
        let longestWord = storage.get("longest_word");
        let longestWordLength;
        if(!longestWord) {
            longestWord = "";
            longestWordLength = 0;
        } else {
            longestWordLength = longestWord.length;
        }
        addedWords.forEach(word => {
            var wordLength = word.length;
            if(wordLength > longestWordLength) {
                longestWord = word;
                longestWordLength = wordLength;
            }
        });
        storage.set("longest_word",longestWord);

        let coins = storage.get("coins");
        if(!coins) {
            coins = 0;
        } else {
            coins = Number(coins);
        }
        let newCoins = Math.floor(score / 50);
        if(newCoins > 0) {
            if(newCoins === 1) {
                addedWords.push({
                    word: "+1",
                    score: "coin"
                });  
            } else {
                addedWords.push({
                    word: `+${newCoins}`,
                    score: "coins"
                });    
            }
            coins += newCoins;
            storage.set("total_coins",Number(storage.get("total_coins")) + newCoins);
            storage.set("coins",coins);
        }    
    }
    for(var i = 0;i<addedWords.length;i++) {
        endScreenContent.appendChild(
            document.createElement("div").appendChild(
                document.createElement("p").appendChild(
                    document.createTextNode(addedWords[i].word)
                ).parentElement).parentElement.appendChild(
                document.createElement("p").appendChild(
                    document.createTextNode(addedWords[i].score)
                ).parentElement).parentElement
        );
    }
    totalPointsElement.textContent = `total: ${score} points`;
    stopHereButton.scrollIntoView();
    SetTimerBar(0);
}
function startTimer() {
    timerInterval = setInterval(timerTick,1000);
}
var playingMusic;

var hasScissors;
var hasScramblers;

function UseScissors() {
    var ownedScissors = Number(storage.get("owned_scissors"));
    if(--ownedScissors >= 0) {
        ScissorsPowerUp.classList.add("hidden");
        hasScissors = false;
        if(selectedElement === ScissorsPowerUp) {
            selectedElement.classList.remove("selected");
            selectedElement = null;
        }
    }
    updateDrawStringInput(generateRandomStart());
    playSound("powerup");
    storage.set("owned_scissors",ownedScissors);
    storage.set("used_scissors",Number(storage.get("used_scissors") + 1));
}
function UseScrambler() {
    var ownedScramblers = Number(storage.get("owned_scramblers"));
    if(--ownedScramblers <= 0) {
        ScramblerPowerUp.classList.add("hidden");
        hasScramblers = false;
        if(selectedElement === ScramblerPowerUp) {
            selectedElement.classList.remove("selected");
            selectedElement = null;
        }
    }
    for(var i = 0;i<7;i++) {
        userLettersElements[i].classList.add("activated");
    }
    generateNewLetters();
    playSound("powerup");
    storage.set("owned_scramblers",ownedScramblers);
    storage.set("used_scramblers",Number(storage.get("used_scramblers") + 1));
}

function BeginGameRuntime() {
    updateDrawStringInput(generateRandomStart());
    generateNewLetters();
    SetTimerBar(0);
    SetMiddleInput();
    SetSoundState(
        storage.get("playing_music"),
        storage.get("playing_sounds")
    );
    const ownedScramblers = storage.get("owned_scramblers");
    if(ownedScramblers && Number(ownedScramblers) > 0) {
        hasScramblers = true;
        ScramblerPowerUp.classList.remove("hidden");
    } else {
        hasScramblers = false;
        storage.set("owned_scramblers",0);
    }

    const ownedScissors = storage.get("owned_scissors");
    if(ownedScissors && Number(ownedScissors) > 0) {
        hasScissors = true;
        ScissorsPowerUp.classList.remove("hidden");
    } else {
        hasScissors = false;
        storage.set("owned_scissors",0);
    }


    drawString();
    startTimer();
}
SetupStuffAndDoStuffAndStuff();
