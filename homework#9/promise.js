// Промисы предоставляют удобный способ организации асинхронного кода.
// Промис - особый объект у которого есть 3 состояния (pending («ожидание»), fulfilled («выполнено успешно»)
// и rejected («выполнено с ошибкой»)).
// Применение (коротко):
// При исполнении кода асинхронно, создаёт объект promise и возвращает его. Др. код получив promis обработывает его.
// После обработки процесса соответсвующими обработчиками во внешнем коде promis = fulfilled или rejected.
function applyForCredit() {
    console.log("Обработка заявления...");
    let promise =  new Promise(function (resolve, reject) {
        setTimeout(function () {
            Math.random() > 0 ? resolve({}) : reject("Отказ");
            resolve();
            reject();
            resolve();
        }, 2000);
    });
    return promise;
}
function checkDocument(credit) {
    console.info("Собираем необходимые документы");
    return new Promise(function (resolve, reject) {
        setTimeout(() => resolve(credit), 2000);
    });
}
function chooseBank(credit) {
    console.log(credit);
    console.log("Выбираем банк");
    return Promise.resolve(credit);
}
function getCredit(get) {
    console.log("Подача заявления");
    console.log("Кредит одобрен", get);
}
applyForCredit({})
    .then(checkDocument)
    .then(chooseBank)
    .then(getCredit)
    .catch(error => console.error(error));
