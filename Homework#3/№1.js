function myCounter() {
    var curCount = 1;
    return function(){
        return curCount++;};
}
var counter = myCounter();
alert( counter() );
alert( counter() );
alert( counter() );