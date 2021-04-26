let lastname = document.querySelector("#lastname");
let firstname = document.querySelector("#firstname");
let password = document.querySelector("#password");
let email = document.querySelector("#email");
let regnum = document.querySelector("#regnum");
let birthDate = document.querySelector("#birthDate");
let p = null;

function submit() {
    if (lastname.value === "") {
        notificationShow("Алдаа!", "Овог тодорхойгүй байна!", 2, "red");
        return;
    }
    if (firstname.value === "") {
        notificationShow("Алдаа!", "Нэр тодорхойгүй байна!", 2, "red");
        return;
    }
    if (password.value === "") {
        notificationShow("Алдаа!", "Нууц үг тодорхойгүй байна!", 2, "red");
        return;
    }
    if (email.value === "") {
        notificationShow("Алдаа!", "И-мэйл тодорхойгүй байна!", 2, "red");
        return;
    }
    if (regnum.value === "") {
        notificationShow("Алдаа!", "Регистр тодорхойгүй байна!", 2, "red");
        return;
    }
    if (birthDate.value === "") {
        notificationShow("Алдаа!", "Төрсөн огноо тодорхойгүй байна!", 2, "red");
        return;
    }
    p = checkPassword(password.value);
    if (p !== "success") {
        notificationShow("Алдаа!", p, 4, "red");
        return;
    }
    p = checkEmail(email.value);
    if (p !== "success") {
        notificationShow("Алдаа!", p, 4, "red");
        return;
    }
    p = checkRegnum(regnum.value);
    if (p !== "success") {
        notificationShow("Алдаа!", p, 4, "red");
        return;
    }
    p = checkRegnumAndBirthDay(regnum.value, new Date(birthDate.value));
    if (!p) {
        notificationShow("Алдаа!", "Регистрийн дугаар ба төрсөн огноо таарсангүй", 4, "red");
        return;
    }

    notificationShow("Амжилттай!", "Үнэн зөв бөглөгдлөө", 2, "green")
}

function checkRegnum(regnumTxt) {
    if (regnumTxt.length !== 10) return "Регистрийн дугаар 10 оронтой байдаг";
    if (isNaN(regnumTxt.substring(2, 10))) {
        return "1 Регистрийн дугаар буруу форматтай байна! (АА00000000)";
    }
    if (!isNaN(parseInt(regnumTxt.substring(0, 2)))) {
        return "2 Регистрийн дугаар буруу форматтай байна! (АА00000000)";
    }
    return "success"
}

function checkRegnumAndBirthDay(regnumTxt, birthDateDate) {
    let reg = parseInt(regnumTxt.substring(2, 4));
    let pek = parseInt(regnumTxt.substring(4, 5));
    let mek = parseInt(regnumTxt.substring(4, 6));
    let dek = parseInt(regnumTxt.substring(6, 8));
    let y, m, d;

    if (pek > 1 && mek >= 20 && reg >= 0) {
        y = 2000 + reg;
        m = mek - 20;
        d = dek;
    } else {
        y = 1900 + reg;
        m = mek;
        d = dek;
    }
    return birthDateDate.getFullYear() === y && birthDateDate.getMonth() + 1 === m && birthDateDate.getDate() === d;
}

function checkEmail(emailTxt) {
    let hasAt = false, hasDot = false;
    for (let i = 0; i < emailTxt.length; i++) {
        if (emailTxt.charAt(i) === "@") hasAt = true;
        if (hasAt && emailTxt.charAt(i) === ".") hasDot = true;
    }
    if (!hasAt || !hasDot) return "Зөв и-мэйл биш байна (@example.com)";
    return "success"
}

/**
 * Нууц үг validator
 * @param passwordTxt шалгах нууц үг
 * @returns {string} Зөв нууц үг бол "success" гэсэн String буцна. Буруу бол алдааны мессеж буцна
 */
function checkPassword(passwordTxt) {
    if (passwordTxt.length < 10) {
        return "Нууц үг 10-аас их оронтой байх ёстой!";
    }
    let criteria1 = false, criteria2 = false, criteria3 = false;
    let specialStrings = ["!", "@", "#", "$", "%", "^", "&", "*"]
    let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    for (let i = 0; i < passwordTxt.length; i++) {
        if (passwordTxt.charAt(i) === passwordTxt.charAt(i).toUpperCase()) {
            criteria1 = true;
        }

        for (let j = 0; j < numbers.length; j++) {
            if (passwordTxt.charAt(i) === numbers[j]) {
                criteria2 = true;
            }
        }

        for (let j = 0; j < specialStrings.length; j++) {
            if (passwordTxt.charAt(i) === specialStrings[j]) {
                criteria3 = true;
            }
        }
    }
    if (!criteria1) {
        return "Нууц үг ядаж 1 том үсэг агуулсан байх ёстой!";
    }
    if (!criteria2) {
        return "Нууц үг ядаж 1 тоо агуулсан байх ёстой!";
    }
    if (!criteria3) {
        return "Нууц үг ядаж 1 тусгай тэмдэгт агуулсан байх ёстой!";
    }
    return "success";
}

/**
 *  Notification харуулах
 * @param caption Гарчиг
 * @param description Мэдээлэл
 * @param second Хэдэн секунд харуулах
 */
function notificationShow(caption, description, second, captionColor) {
    let captionComponent = document.querySelector(".caption");
    let descriptionComponent = document.querySelector(".desc");
    let notification = document.querySelector(".notification");

    if (captionColor !== undefined)
        captionComponent.style.color = captionColor;
    captionComponent.textContent = caption;
    descriptionComponent.textContent = description;
    notification.style.opacity = "1";
    notification.style.bottom = "20px";
    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.bottom = "0";
    }, second * 1000);
}