var triangle = function() {
  var sides = [].slice.call(arguments, 0, 3).sort();
  if (sides[0] + sides[1] <= sides[2]) {
    return 'Треугольник не существует';
  }

  var sum = (Math.pow(sides[0], 2) + Math.pow(sides[1], 2)).toFixed(2);
  var side = Math.pow(sides[2], 2).toFixed(2);

  if (sum === side) { return 'Треугольник прямоугольный'; }
  if (sum < side) { return 'Треугольник тупоугольный'; }
  if (sum > side) { return 'Треугольник остроугольный'; }
};