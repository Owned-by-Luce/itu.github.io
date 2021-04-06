function call1() {
    let a = parseInt(window.prompt("a = "));
    let b = parseInt(window.prompt("b = "));
    alert(a + b);
}

function call2() {
    let password = window.prompt("Нууц үг:");
    if (password.length < 10) {
        alert("10-аас урт байх ёстой!")
        return;
    }
    let criteria1 = false, criteria2 = false, criteria3 = false;
    let specialStrings = ["!", "@", "#", "$", "%", "^", "&", "*"]
    let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    for (let i = 0; i < password.length; i++) {
        if (password.charAt(i) === password.charAt(i).toUpperCase()) {
            criteria1 = true;
        }

        for (let j = 0; j < numbers.length; j++) {
            if (password.charAt(i) === numbers[j]) {
                criteria2 = true;
            }
        }

        for (let j = 0; j < specialStrings.length; j++) {
            if (password.charAt(i) === specialStrings[j]) {
                criteria3 = true;
            }
        }
    }
    if (!criteria1) {
        alert("Ядаж 1 том үсэг агуулсан байх ёстой!")
        return;
    }
    if (!criteria2) {
        alert("Ядаж 1 тоо агуулсан байх ёстой!")
        return;
    }
    if (!criteria3) {
        alert("Ядаж 1 тусгай тэмдэгт агуулсан байх ёстой!")
        return;
    }

    alert("Амжилттай");
}

function call3() {
    let j = parseInt(window.prompt("Хэд доторх анхны тоонууд болон нийлбэрийг олох вэ?"))
    if (isNaN(j)) {
        alert("Тоо биш байна!")
        return;
    }
    let numbers = [];
    for (let i = 2; i <= j; i++) {
        numbers.push(i);
    }
    numbers = numbers.filter(n => {
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
        }
        return true;
    });

    alert("Нийлбэр: " + numbers.reduce(function (a, b) {
        return a + b;
    }) + ", Анхны тоонууд: " + numbers.toString());
}

function call4() {
    let sentence = "Архангай Баянхонгор Булган Говь-Алтай Дархан-Уул Дорноговь Дорнод Төв Хөвсгөл";
    let er = ["а", "о", "у"];
    let em = ["э", "ө", "ү"];

    let m = 0, f = 0;
    for (let i = 0; i < sentence.split(" ").length; i++) {
        let word = sentence.split(" ")[i];

        for (let j = 0; j < word.length; j++) {
            let b = false;
            er.forEach(e => {
                if (e === word[j]) {
                    if (!b) m++;
                    b = true;
                }
            });
            if (b) break;

            let bb = false;
            em.forEach(e => {
                if (e === word[j]) {
                    if (!bb) f++;
                    bb = true;
                }
            });
            if (bb) break;
        }

    }

    alert("Өгүүлбэр: " + sentence + "\nЭр үг: " + m + "\nЭм үг: " + f);
}

function call5() {
    let davhar = parseInt(window.prompt("Хэдэн давхар вэ?"));
    let orts = parseInt(window.prompt("Хэдэн орцтой вэ?"))
    let haalga = parseInt(window.prompt("Нэг давхартаа хэдэн хаалгатай вэ?"))
    let n = parseInt(window.prompt("Хайх тоот оруул"));

    let i;//Орц
    let j;//Давхар
    let found = false;//Олдсон эсэх
    let c = 1;//Тоот тоолуур

    for (i = 1; i <= orts; i++) {
        for (j = 1; j <= davhar; j++) {
            for (let k = 1; k <= haalga; k++) {
                if (c === n) {
                    found = true;
                    break;
                }
                c++;
            }
            if (found) break;
        }
        if (found) break;
    }

    if (found) {
        alert(`${i}-р орц ${j}-р давхар ${n}-р хаалга`);
    } else alert("Олдсонгүй тоотоо зөв өгнө үү!");
}
