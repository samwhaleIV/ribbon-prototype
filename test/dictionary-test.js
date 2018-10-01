var dictionary = {};
function loadDictionary() {
    readTextFile("../words_alpha.txt");
}
function readTextFile(file) {
    var request = new XMLHttpRequest();
    request.open("GET", file, false);
    request.onreadystatechange = function () {
        if(request.readyState === 4) {
            if(request.status === 200 || request.status == 0) {
                console.log("Loading words...");
                var lines = request.responseText.split("\n");
                for(var i = 0;i<lines.length;i++) {
                    dictionary[lines[i]] = true;
                }
                console.log("Done!");
            }
        }
    }
    request.send(null);
}
loadDictionary();
