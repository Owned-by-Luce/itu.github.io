let SERVICE = "http://localhost:9965/api"
let table = document.querySelector(".table");
let uuid = window.location.hash.replace("#", "");
let base64Flag = "data:image/png;base64,"

posterImage = document.querySelector("#poster");
posterImage.style.display = "none";

fetch(SERVICE + "/manga/uuid?uuid=" + uuid, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}).then(r => {
    r.json().then(result => {
        document.querySelector("#nameMon").textContent = result.nameMon;
        document.querySelector("#nameEng").textContent = result.nameEng;
        document.querySelector("#author").textContent = result.author;
        document.querySelector("#status").textContent = result.status;
        document.querySelector("#genres").textContent = result.genres;
        document.querySelector("#created").textContent = result.date;
        document.querySelector("#user").textContent = result.user;
        document.querySelector("#summary").textContent = result.summary;

        result.chapters.forEach(e => {
            table.insertAdjacentHTML("afterbegin", `
            <div class="single-chapter">
                <div style="width: 599px; display: inline-block; color: #C7D0D0">Бүлэг ${e.chapter}: ${e.nameMon}</div>
                <div style="display: inline-block; width: 80px; text-align: center; color: #C7D0D0">${e.count}</div>
                <div style="display: inline-block; text-align: right; width: 140px; color: #C7D0D0">${e.date}</div>
            </div>
        `);
            document.querySelector(".single-chapter").addEventListener("click", () => {
                read(result.uuid, e.uuid, e.chapter, e.nameMon);
            })
        });
    });
});

let poster = null;
fetch(SERVICE + "/manga/poster?uuid=" + uuid, {
    method: "GET",
    headers: {
        "Content-Type": "image/png"
    }
}).then(r => {
    r.arrayBuffer().then(buffer => {
        poster = arrayBufferToBase64(buffer);
        posterImage.src = base64Flag + poster;
        posterImage.style.display = "block";
        document.querySelector(".loading-poster").style.display = "none";
    });
});

function read(parentUuid, uuid, chapter, nameMon) {
    document.querySelector("#header").textContent = `Бүлэг: ${chapter}: ${nameMon}`;
    let indicator = document.querySelector(".loading");
    indicator.style.display = "block";

    let w = document.getElementById("myModal");
    w.style.display = "block"
    let s = document.getElementsByClassName("close")[0];
    s.onclick = function () {
        w.style.display = "none";
    }
    window.onclick = ev => {
        if (ev.target === w) {
            w.style.display = "none";
        }
    }

    let image = null;
    let container = document.querySelector("#image-layout");

    container.innerHTML = "";
    fetch(SERVICE + "/manga/chapter?parent_uuid=" + parentUuid + "&uuid=" + uuid, {
        method: "GET",
        headers: {
            "Content-Type": "image/png"
        }
    }).then(r => {
        r.arrayBuffer().then(buffer => {
            image = arrayBufferToBase64(buffer);
            container.insertAdjacentHTML("afterbegin", `
                        <img class="manga" src="${base64Flag + image}" alt="${nameMon}">
            `);
            indicator.style.display = "none";
        });
    });

}

function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
}