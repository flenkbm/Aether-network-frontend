function loadInventory() {
    var invdt = userdata["inventory"];
    var invel = document.getElementById("inventory");
    invel.innerHTML = "";
    for (let item of Object.keys(invdt)) {
        let newitm = document.createElement("button");
        newitm.classList.add("inv-item");
        if (invdt[item] == 0) {
            newitm.innerHTML = `<p>${item}</p><p style="font-size: 14px !important; letter-spacing: -0.5px !important">x0 (archive)</p>`;
        } else {
            newitm.setAttribute("onclick", `selectCraft('${item}')`);
            newitm.innerHTML = `<p>${item}</p><p>x${invdt[item]}</p>`;
        }
        //<button class="inv-item" onclick="selectCraft('___')">___</button>
        invel.appendChild(newitm);
    }
}

function openInventory() {
    loadInventory();
    hide(document.getElementById("inv-open"));
    show(document.getElementById("inventory"));
    show(document.getElementById("craft-block"));
    show(document.getElementById("inv-close"));
    document.getElementById("inventory-block").classList.remove("interactive-cont");
}

function closeInventory() {
    show(document.getElementById("inv-open"));
    hide(document.getElementById("inventory"));
    hide(document.getElementById("craft-block"));
    hide(document.getElementById("inv-close"));
    document.getElementById("inventory-block").classList.add("interactive-cont");
}

function selectCraft(elem) {
    var craftel1 = document.getElementById("craft-1");
    var craftel2 = document.getElementById("craft-2");
    var elm1 = craftel1.textContent;
    var elm2 = craftel2.textContent;
    if (elm1 == "------") {
        craftel1.textContent = elem;
        userdata["inventory"][elem] -= 1;
    } else if (elm2 == "------") {
        userdata["inventory"][elem] -= 1;
        craftel2.textContent = elem;
    } else {
        userdata["inventory"][elm2] += 1;
        craftel2.textContent = elem;
        userdata["inventory"][elem] -= 1;
    }
    loadInventory();
}

function removeCraft(elm) {
    var craftel1 = document.getElementById("craft-1");
    var craftel2 = document.getElementById("craft-2");
    var elm1 = craftel1.textContent;
    var elm2 = craftel2.textContent;
    if (elm == 1) {
        if (elm1 == "------") { return }
        userdata["inventory"][elm1] += 1;
        craftel1.textContent = elm2;
        craftel2.textContent = "------";
    } else if (elm == 2) {
        if (elm2 == "------") { return }
        userdata["inventory"][elm2] += 1;
        craftel2.textContent = "------";
    }
    loadInventory();
}

function tryCraft() {
    var craftel1 = document.getElementById("craft-1");
    var craftel2 = document.getElementById("craft-2");
    var elm1 = craftel1.textContent;
    var elm2 = craftel2.textContent;
    if ((elm1 == "------") || (elm2 == "------")) {
        return -1
    }
    console.log("trying crafting");
    console.log(elm1, "+", elm2);
    fetch("https://88.210.12.42:8000/API/attemptCraft", {
        method: "POST",
        body: JSON.stringify({
            sid: SID,
            el1: elm1,
            el2: elm2
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log(json);
        if (json == "-1") {

        } else if (json == "-2") {
            
        } else if (json == "-3") {

        }
        loadUserData();
        loadInventory();
        loadToplist();
        return;
    });
}