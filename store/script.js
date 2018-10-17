function updateCoinsText() {
    var coins = storage.get("coins");
    if(!coins) coins = 0;
    document.getElementById("bank_account").textContent = `You have ${coins} coin${coins != 1?  "s" : ""}`;
}
updateCoinsText();
