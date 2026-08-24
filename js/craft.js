function loadInventory() {
    var invdt = userdata["inventory"];
    var invel = document.getElementById("inventory");
    for (let item of Object.keys(invdt)) {
        let newitm = document.createElement("button");
        newitm.setAttribute("onclick", `selectCraft('${item}')`);
        newitm.classList.add("inv-item");
        newitm.innerHTML = `<p>${item}</p><p>x${invdt[item]}</p>`
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

function selectCraft() {

}

function tryCraft() {

}