if(storage.get("blue_theme")) {
    document.body.classList.remove("pink");
    document.body.classList.add("blue");
}
function GoBack() {
    window.location.assign("../index.html");
}
function FocusBackButton() {
    if(!BackButton.classList.contains("selected")) {
        BackButton.classList.add("selected");
        playSound("focus");
    }
}
function UnfocusBackButton() {
    BackButton.classList.remove("selected");
}
const BackButton = document.getElementById("BackButton");
InputSchematic.Enter = GoBack;
InputSchematic.Back = GoBack;
InputSchematic.Up = FocusBackButton;
InputSchematic.Down = UnfocusBackButton;
BackButton.addEventListener("mouseenter", FocusBackButton);
BackButton.addEventListener("click",GoBack);
BackButton.addEventListener("mouseleave",UnfocusBackButton);
if(storage.get("playing_sounds")) {
    enableSoundEngine(true);
    playSound("add");
}
