var i = 0;
var j = 0;
var max = 3;
var nextSym = "";
var grapheme = "";
while (i < max) {
    nextSym = "";
    grapheme = "";
    for (j = 0; j < max - i; j++) nextSym += " ";
    for (j = 0; j < 2 * i + 1; j++) grapheme += "$";
    console.log(nextSym + grapheme);
    i++;
}