let SERVICE = "http://124.158.110.117:9965/api"

let pageable = {
    page: 1,
    size: 15,
}

let base64Flag = "data:image/png;base64,"

fetch(SERVICE + "/manga/all/manga/wrapper/pageable", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(pageable),
}).then(r => {
    let container = document.querySelector(".card-container");
    r.json().then(r => {
        r.forEach(e => {
            let poster = null;
            fetch(SERVICE + "/manga/poster?uuid=" + e.uuid, {
                method: "GET",
                headers: {
                    "Content-Type": "image/png"
                }
            }).then(r => {
                r.arrayBuffer().then(buffer => {
                    poster = arrayBufferToBase64(buffer);
                    container.insertAdjacentHTML("afterbegin", `
                        <a href="../lab6/ShowManga.html#${e.uuid}">
                            <div class="card">
                                <img src="${base64Flag + poster}" alt="${e.mangaName}">
                                <span class="chapter">${e.chapter === undefined ? 0 : e.chapter}-р бүлэг</span>
                                <br>
                                <span class="meta" style="color: #7B8698">${e.mangaName}</span>
                                <br>
                                <span class="meta">${e.date}</span>
                            </div>
                        </a>
            `);
                });
            });
        });
    }).catch(e => {
        console.log(e);
        alert("Интернет холболтоо шалгана уу!")
    });
});

function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
}