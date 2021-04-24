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
        "1": ["3"],
        "2": ["элс", "els"],
        "3": ["21"],
        "4": ["лондон", "london"]
    }

let index = 0;
let livesContainer = document.querySelector(".lives-container");
let dialog = document.querySelector(".dialog");
let dialogImage = document.querySelector("#dialog-image");
let dialogMsg = document.querySelector("#dialog-msg");
reset();

function next() {
    let value = document.querySelector("#value").value.toLowerCase();
    let i = answers[index].filter(f => f === value).length;

    if (i !== 0) {
        index++;
        document.querySelector("#question").textContent = questions[index];
        document.querySelector("#value").value = "";
        if (index === 5) {
            //Ялсан
            dialog.style.display = "block";
            dialogImage.src = "../icons/trophy.png";
            dialogMsg.textContent = "Та хожлоо";
        }
    } else {
        console.log()
        if (livesContainer.children.length > 1) {
            document.querySelector("#value").value = "";
            livesContainer.removeChild(livesContainer.lastElementChild)
        } else {
            livesContainer.removeChild(livesContainer.lastElementChild)
            //Ялагдсан
            dialogImage.src = "../icons/lose.png"
            dialogMsg.textContent = "Та хожигдлоо";
            dialog.style.display = "block";
        }
    }
}

function reset() {
    dialog.style.display = "none";
    index = 0;
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