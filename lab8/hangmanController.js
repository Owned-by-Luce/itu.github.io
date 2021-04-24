let questions =
    [
        "Цэнхэр, шар өнгөний дундаас ямар өнгө гардаг вэ?",
        "Шатарт хүний хэдэн дүрс байдаг вэ?",
        "Шилийг юунаас гарган авдаг вэ?",
        "Монгол улс хэдэн аймагтай вэ?",
        "Англи улсын нийслэл?",
    ];

let answers =
    {
        "0": ["ногоон", "nogoon"],
        "1": ["3", "гурав", "gurav"],
        "2": ["элс", "els"],
        "3": ["21", "хорин нэг", "khorin neg", "horin neg"],
        "4": ["лондон", "london"]
    }

let index = 0;
let second = 10;
let livesContainer = document.querySelector(".lives-container");
let dialog = document.querySelector(".dialog");
let dialogImage = document.querySelector("#dialog-image");
let dialogMsg = document.querySelector("#dialog-msg");
let valueInput = document.querySelector("#value");
let submit = document.querySelector(".submit");
reset();
startTime();

valueInput.addEventListener("keyup", e => {
    if (e.keyCode === 13) {
        submit.click();
    }
})

function next(add) {
    let value = valueInput.value.toLowerCase();
    let i = answers[!add ? index - 1 : index].filter(f => f === value).length;

    if (i !== 0) {
        index++;
        document.querySelector("#question").textContent = questions[index];
        valueInput.value = "";
        if (index === 5) {
            //Ялсан
            dialog.style.display = "block";
            dialogImage.src = "../icons/trophy.png";
            dialogMsg.textContent = "Та хожлоо";
        }
    } else {
        if (livesContainer.children.length > 1) {
            valueInput.value = "";
            livesContainer.removeChild(livesContainer.lastElementChild);
        } else {
            livesContainer.removeChild(livesContainer.lastElementChild);
            //Ялагдсан
            dialogImage.src = "../icons/lose.png";
            dialogMsg.textContent = "Та хожигдлоо";
            dialog.style.display = "block";
        }
    }
    second = 10;
}

function startTime() {
    return setInterval(() => {
        submit.textContent = `Шалгах /${second}/`;
        if (second === 0) {
            index++;
            document.querySelector("#question").textContent = questions[index];
            next(false);
        }
        second--;
    }, 1000);
}

function reset() {
    valueInput.value = "";
    dialog.style.display = "none";
    index = 0;
    second = 10;
    document.querySelector("#question").textContent = questions[index];
    livesContainer.innerHTML = "";
    livesContainer.insertAdjacentHTML("beforeend", `
        <img class="lives" id="1" src="../images/heart.png" alt="heart">
        <img class="lives" id="2" src="../images/heart.png" alt="heart">
        <img class="lives" id="3" src="../images/heart.png" alt="heart">
        <img class="lives" id="4" src="../images/heart.png" alt="heart">
        <img class="lives" id="5" src="../images/heart.png" alt="heart">
    `);
}