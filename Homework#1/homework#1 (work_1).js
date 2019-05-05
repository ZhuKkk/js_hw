// запустить в console
function words() {
    let counter = 0;
    const russianVowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я",
        "А", "О", "И", "Е", "Ё", "Э", "Ы", "У", "Ю", "Я"];
    const result = prompt("Подсчёта количества русских гласных букв:", "Напиши что-нибудь");

        if ( result === null || result === "Напиши что-нибудь" || result === "") {
            alert (":(");
            return;
        } else {
            for (let o = 0; o < result.length; o++)
            for (let i = 0; i < russianVowels.length; i++)
                if (result[o] === russianVowels[i]) {
                    counter++;
                }
        }
    alert(counter);
}
words();
