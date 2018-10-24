const elements = document.body.getElementsByClassName("datum");
elements[0].textContent = storage.get("highscore") || 0;
elements[1].textContent = storage.get("longest_word") || "none";
elements[2].textContent = storage.get("total_coins") || 0;
elements[3].textContent = storage.get("rounds_played") || 0;
elements[4].textContent = storage.get("used_scramblers") || 0;
elements[5].textContent = storage.get("used_scissors") || 0;
