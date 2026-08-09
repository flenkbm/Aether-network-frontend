// var init
var userdata;
var userlogdata;
var appdata;

function gotoLogin() {
    if (window.location.href.endsWith("index.html")) {
      window.location.href = window.location.href.replace("index", "login");
    } else {
      window.location.href += "login.html";
    }
}

function loadUserData() {
  var raw_userlogdata = localStorage.getItem("Aether-user");
  console.log(raw_userlogdata);
  if (!raw_userlogdata) {
    gotoLogin();
    return;
  }
  userlogdata = JSON.parse(raw_userlogdata);
  const now = Date.now();
  console.log(`Now: ${now}`);
  const timeout = 12 * 60 * 60 * 1000; // 12hrs timeout (times minutes, seconds, milliseconds)
  //const timeout = 5 * 1000; // 5sec test timeout
  if (now - userlogdata["timestamp"] >= timeout) {
    localStorage.removeItem("Aether-user");
    gotoLogin();
    return;
  }
  // Data loading from server part
  // (may change)
  window.fetch(`http://88.210.12.42/API/openfiles/${userlogdata["UUID"]}.json`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      userdata = json;
      console.log(userdata);//test thing
      // Data loading onto the page part
      let nickplace = document.getElementById("nickname");
      let lvlplace = document.getElementById("lvl");
      let xpbar = document.getElementById("xp-bar");
      let xpplace = document.getElementById("xp-disp");
      let progressplace = document.getElementById("total-progress");
      nickplace.textContent = userdata["nickname"];
      lvlplace.textContent = `lvl ${userdata["LVL"]}`;
      xpbar.style.setProperty('--xp-percent', `${userdata["EXP"]/appdata["levelup-exp"][userdata["LVL"]+1]*100}%`);
      xpplace.textContent = `EXP ${userdata["EXP"]}/${appdata["levelup-exp"][userdata["LVL"]+1]}`;
      progressplace.textContent = `Прогресс сбора элементов: ${userdata["created"].length} из ${appdata["total-elements"]}`;
    });
  
}

document.addEventListener('DOMContentLoaded', () => {
  window.fetch(`http://88.210.12.42/API/openfiles/appdata.json`).then((response) => {
    return response.json();
  }).then((json) => {
    appdata = json;
    console.log(appdata);
    loadUserData();
  })
});