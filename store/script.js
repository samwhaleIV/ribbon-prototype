//Nothing on this line
//Or this line

updateTheme(storage.get("blue_theme"));
updateCoinsText();

const StoreItem1 = document.getElementById("StoreItem1");
const StoreItem2 = document.getElementById("StoreItem2");
const StoreItem3 = document.getElementById("StoreItem3");
const StoreItem4 = document.getElementById("StoreItem4");
const BackButton = document.getElementById("BackButton");

const ownedScramblersElement = StoreItem1.children[1];
const ownedScissorsElement = StoreItem2.children[1];
const ownsColorsElement = StoreItem3.children[1];
const ownsGroceryKingElement = StoreItem4.children[1];

const ScramblersCost = 100;
const ScissorsCost = 150;
const ColorsCost = 1000;

const GroceryKingCost = 10000;
const ScramblersCount = 5;
const ScissorsCount = 5;

//This is overkill and accounts for edge cases but ayyyyy it might be useful in the future in a different project of mine.
function NumberFormatter(number,breakPoint = 3,breakCharacter = ",",decimalCharacter = ".") {
    let decimalSplit = number.split(decimalCharacter);
    number = decimalSplit[0];
    const segments = Math.ceil(number.length / breakPoint); //This is the legit only time I have ever used Math.ceil
    let remainder = number.length % breakPoint;
    let output;
    if(remainder == 0) {
        if(segments === 1) {
            return number;
        } else {
            output = number.substr(0,breakPoint);
            remainder = breakPoint;
        }
    } else {
        output = number.substr(0,remainder);
    }
    for(;remainder<number.length;remainder+=breakPoint) {
        output += breakCharacter + number.substr(remainder,breakPoint);
    }
    decimalSplit.shift();
    decimalSplit.unshift(output);
    return decimalSplit.join(decimalCharacter);
}

function updateOwnedScramblers() {
    ownedScramblersElement.textContent =
        `${storage.exists("owned_scramblers") ? storage.get("owned_scramblers") : "0"}${OwnedText}`;
}
function updateOwnedScissors() {
    ownedScissorsElement.textContent =
        `${storage.exists("owned_scissors") ? storage.get("owned_scissors") : "0"}${OwnedText}`;
}
function updateOwnedColors() {
    if(storage.exists("owns_colors")) {
        StoreItem3.classList.add("purchased");
        ownsColorsElement.textContent = "Toggle";
    } else {
        StoreItem3.classList.remove("purchased");
        ownsColorsElement.textContent = NotPurchasedText;
    }
}
function updateOwnedGroceryKing() {
    if(storage.exists("owns_grocery_king")) {
        StoreItem4.classList.add("purchased");
        ownsGroceryKingElement.textContent = "I am ready";
    } else {
        StoreItem4.classList.remove("purchased");
        ownsGroceryKingElement.textContent = NotPurchasedText;
    }
}
const NotPurchasedText = "Not purchased";
const OwnedText = " owned";
function updateOnInventory() {
    updateOwnedScramblers();
    updateOwnedScissors();
    updateOwnedColors();
    updateOwnedGroceryKing();
}
function updateCoinsText() {
    let coins = storage.get("coins");
    if(!coins) {
        coins = 0;
        storage.set("coins",0);
    }
    document.getElementById("bank_account").textContent = `You have ${NumberFormatter(String(coins))} coin${coins != 1?  "s" : ""}`;
}

function PurchaseScramblers() {
    let coins = storage.get("coins");
    if(coins >= ScramblersCost) {
        let scramblers = storage.get("owned_scramblers");
        if(!scramblers) {
            scramblers = ScramblersCount;
        } else {
            scramblers = Number(scramblers) + ScramblersCount;
        }
        storage.set("owned_scramblers",scramblers);
        coins -= ScramblersCost;
        storage.set("coins",coins);
        updateCoinsText();
        updateOwnedScramblers();
        playSound("add");
    } else {
        playSound("fail");
    }
}
function PurchaseScissors() {
    let coins = storage.get("coins");
    if(coins >= ScissorsCost) {
        let scissors = storage.get("owned_scissors");
        if(!scissors) {
            scissors = ScissorsCount;
        } else {
            scissors = Number(scissors) + ScissorsCount;
        }
        storage.set("owned_scissors",scissors);
        coins -= ScissorsCost;
        storage.set("coins",coins);
        updateCoinsText();
        updateOwnedScissors();
        playSound("add");
    } else {
        playSound("fail");
    }
}
function updateTheme(isBlue) {
    if(isBlue) {
        document.body.classList.remove("pink");
        document.body.classList.add("blue");
    } else {
        document.body.classList.remove("blue");
        document.body.classList.add("pink");
    }
}
function PurchaseColors() {
    if(storage.get("owns_colors")) {
        if(storage.get("blue_theme")) {
            storage.set("blue_theme",false);
            updateTheme(false);
        } else {
            storage.set("blue_theme",true);
            updateTheme(true);
        }
        playSound("enter");
        return;
    }
    let coins = storage.get("coins");
    if(coins >= ColorsCost) {
        coins -= ColorsCost;
        storage.set("owns_colors",true);
        storage.set("coins",coins);
        updateCoinsText();
        updateOwnedColors();
        playSound("add");
    } else {
        playSound("fail");
    }
}
function PurchaseGroceryKing() {
    if(storage.get("owns_grocery_king")) {
        window.location.assign("../mystery/mystery.html");
        return;
    }
    let coins = storage.get("coins");
    if(coins >= GroceryKingCost) {
        coins -= GroceryKingCost;
        storage.set("owns_grocery_king",true);
        storage.set("coins",coins);
        updateCoinsText();
        updateOwnedGroceryKing();
        playSound("add");
    } else {
        playSound("fail");
    }
}

//Focus boilerplate hell
var selectedElement = null;
function deffoc() {
    if(selectedElement === null) {
        SelectElement(StoreItem1);
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
        case "StoreItem1":
            SelectElement(BackButton);
            break;
        case "StoreItem2":
            SelectElement(StoreItem1);
            break;
        case "StoreItem3":
            SelectElement(StoreItem2);
            break;
        case "StoreItem4":
            SelectElement(StoreItem3);
            break;
    }
}
function focusDown() {
    if(!deffoc()) {
        return;
    }
    switch(selectedElement.id) {
        case "BackButton":
            SelectElement(StoreItem1);
            break;
        case "StoreItem1":
            SelectElement(StoreItem2);
            break;
        case "StoreItem2":
            SelectElement(StoreItem3);
            break;
        case "StoreItem3":
            SelectElement(StoreItem4);
            break;
    }
}
function GoBack() {
    window.location.assign("../index.html");
}
function userInterfaceClick() {
    if(!deffoc()) {
        return;
    }
    switch(selectedElement.id) {
        case "BackButton":
            GoBack();
            break;
        case "StoreItem1":
            PurchaseScramblers();
            break;
        case "StoreItem2":
            PurchaseScissors();
            break;
         case "StoreItem3":
            PurchaseColors();
            break;
        case "StoreItem4":
            PurchaseGroceryKing();
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
    InputSchematic.Back = GoBack;
}

[BackButton,StoreItem1,StoreItem2,StoreItem3,StoreItem4].forEach(item => {

    item.addEventListener("mouseenter", function() {
        SelectElement(item);
    });

    item.addEventListener("click",function() {
        userInterfaceClick(item);
    });

    item.addEventListener("mouseleave",function() {
        if(!selectedElement)return;
        selectedElement.classList.remove("selected");
        selectedElement = null;
    });
});
if(storage.get("playing_sounds")) {
    enableSoundEngine(true);
}
updateOnInventory();
RegisterInputEvents();
