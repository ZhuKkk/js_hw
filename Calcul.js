let results = document.getElementById("display");
let inputs = ["","",""];
let values = [];
let add = function(a, b) {return a + b;}
let subtract = function(a, b) {return a - b;}
let equals = function() {
    if (inputs[1] === "+") {
        var sum = add(parseFloat(inputs[0]), parseFloat(inputs[2]));
        clear();
        values.push(sum);
    }
    else if (inputs[1] === "-") {
        var difference = subtract(parseFloat(inputs[0]), parseFloat(inputs[2]));
        clear();
        values.push(difference)
    }
    display();
};
let update = function(value) {
    inputs.push(value);
    inputs.shift();
};
let clear = function() {
    inputs = ["","",""];
    values = [];
    display();
};
let del = function() {
    if(values.length > 0) {
        values.pop();
    }
    else {
        for(var i = 2; i >= 0; i--) {
            var x = inputs[i]
            if(inputs[i]) {
                var y = x.slice(0,-1);
                inputs[i] = y;
            }
        }
    }
};
let display = function() {
    results.innerHTML = inputs.join(" ") + " " + values.join("");
};

for (var i = 0; i < 11; i++) {
    document.getElementById(i).addEventListener("click", function() {
        values.push(this.innerHTML);
        display();
    });
}
for (var i = 11; i < 15; i++) {
    document.getElementById(i).addEventListener("click", function() {
        update(values.join(""));
        update(this.innerHTML);
        values = [];
        display();
    });
}
document.getElementById(15).addEventListener("click", function(){
    update(values.join(""));
    values = [];
    equals();
});

document.getElementById(16).addEventListener("click", function(){ clear(); });
document.getElementById(17).addEventListener("click", function(){
    del();
    display();
});


