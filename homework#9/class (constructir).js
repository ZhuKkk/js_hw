class Car {
    constructor (mark, model, year, body) {
        this.mark = mark;
        this.model = model;
        this.year = year;
        this.body = "седан";
    }
    getCarInfo() {
        return "Марка: " + this.mark + ", " + "модель: " + this.model + ", " + "год выпуска: " +  this.year + ", " + "кузов: " + this.body + ".";
    }
}
let audi = new Car("Audi", "A4", 2018);
let volkswagen = new Car ("Volkswagen", "Polo", 2018);
let mersedes = new Car("Mersedes", "GL550", 2016);
mersedes.body= "Внедорожник";

console.log (audi.getCarInfo());
console.log (volkswagen.getCarInfo());
console.log (mersedes.getCarInfo());