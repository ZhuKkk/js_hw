
//   Асинхронная функция в паттерне Callback Hell не может возвращать значение, так как такие функции выполняются
// с задержкой и позже кода, который за ними последует. Вместо этого они принимают коллбек, который будет запущен,
// когда функция выполнит свою работу.
// Как правило таких коллбеков два - один для случая успешного выполнения, а второй для обработки возникших ошибок.


function getUserInfo(position, check) {
        setTimeout(() => {
            const infoUser = {
             position: "Инженер",
             name: "Василий"
            };
            check (infoUser);
        }, 2000);
}

function permissionMsg(infoUser, check) {
    setTimeout(() => {
        const permissions = {
            password: "1522",
        };
        check (permissions, infoUser);
    }, 1000);
}

function notification(permissions, infoUser) {
    if (permissions.password === "1522") {
        console.log(`${infoUser.name} пароль введен успешно`); //Появится уведомление об успешно введенном пароле.
    }
}

getUserInfo("Инженер", (infoUser) => {
    permissionMsg(infoUser, (permissions, infoUser) => {
        notification(permissions, infoUser);
    });
});
