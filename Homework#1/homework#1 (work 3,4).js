// запустить в console
const user = {};

function profile() {

    user.surname = prompt("Ваша фамилия:", "Иванов");
    user.name = prompt("Введите имя:", "Иван");
    user.patronymic= prompt("Введите отчество:", "Иванович");
    user.age= prompt("Введите ваш возраст:", "21");

        while ( user.sex !== "Мужской" && user.sex !== "Женский") {
            user.sex= prompt("Ваш пол:", "Мужской или Женский");
            if (user.sex !== "Мужской" && user.sex !== "Женский"){
                alert("Введенные данные неккоректны");
            }
        }
        console.log (user);

    alert("Фамилия: " + user.surname + ";\n" +
          "Имя: " + user.name + ";\n" +
          "Отчество: " + user.patronymic + ";\n" +
          "Возраст: " + user.age + ";\n" +
          "Пол: " + user.sex + ".");
}
profile();
