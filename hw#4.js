let americanStates = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware"
};
function transfromObject(obj) {
    for (x in this) {
        if (this.hasOwnProperty(x)) {
            this[ this[x] ] = x
            delete(this[x])
        }
    }
}
Object.prototype.go = transfromObject;
americanStates.go()
console.dir(americanStates);

