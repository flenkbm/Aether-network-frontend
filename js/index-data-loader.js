// var init
var SID;
var userdata;
var appdata;
let initial_loading = true;

function gotoLogin() {
    if (window.location.href.endsWith("index.html")) {
        window.location.href = window.location.href.replace("index", "login");
    } else {
        window.location.href += "login.html";
    }
}

function loadUserData() {
    window.fetch(API+"userdata/"+SID)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        if (json == "-1") {
            localStorage.removeItem("Aether-user");
            gotoLogin();
            return;
        }
        userdata = json;
        console.log(userdata);//test thing
        // Data loading onto the page part
        let nickplace = document.getElementById("username");
        let lvlplace = document.getElementById("lvl");
        let xpbar = document.getElementById("xp-bar");
        let xpplace = document.getElementById("xp-disp");
        let progressplace = document.getElementById("total-progress");
        if (nickplace.textContent != userdata["username"]) {
            animRewrite(document.getElementById("username"), userdata["username"]);
        }
        animRewrite(lvlplace, `lvl ${userdata["LVL"]}`, 6);
        xpbar.style.setProperty("--xp-percent", `${userdata["EXP"]/appdata["levelup-EXP"][userdata["LVL"]+1]*100}%`);
        animRewrite(xpplace, `EXP ${userdata["EXP"]}/${appdata["levelup-EXP"][userdata["LVL"]+1]}`);
        let elem_cnt = 0;
        progressplace.textContent = `Прогресс сбора элементов: ${Object.keys(userdata["inventory"]).length} из ${appdata["total-elements"]}`;
    });
}

function loadToplist() {
    window.fetch(API+"toplist")
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log(json);
        var toplist = document.getElementById("toplist");
        for (let i = 0; i < 10; i += 1) {
            if (json[i] == null) {
                toplist.children[i].classList.add("hidden");
            } else {
                toplist.children[i].innerHTML=`${json[i][0]}<span id="toplist-LVL-disp">LVL ${json[i][1]}</span>`
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    window.fetch(openfiles+"appdata.json").then((response) => {
        return response.json();
    }).then((json) => {
        appdata = json;
        console.log(appdata);
        //
        SID = localStorage.getItem("Aether-user");
        if (SID == null) {
            gotoLogin();
        } else {
            loadUserData();
        }
        loadToplist();
    })
});