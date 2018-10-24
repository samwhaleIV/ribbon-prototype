var dictionary = {};
fetch("../words_alpha.txt").then(function(response) {
    return response.text();
}).then(function(text) {
    console.log("Processing dictionary words...");
    var lines = text.split("\n");
    for(var i = 0;i<lines.length;i++) {
        dictionary[lines[i]] = true;
    }
    console.log("Done!");      
});
