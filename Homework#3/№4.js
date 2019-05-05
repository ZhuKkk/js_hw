var term = "lorem ipsum stan";
function toCapitalCase(term) {
    return term.replace(/(^|\s)\S/g, function(a) {return a.toUpperCase()})
}
document.writeln(toCapitalCase(term));