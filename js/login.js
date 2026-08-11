function hide(el) { el.classList.add('hidden'); }
function show(el) { el.classList.remove('hidden'); }

function login() {
    var overlay = document.getElementById("overlay");
    var loading_circle = document.getElementById("loading-circle");
    var result_message = document.getElementById("result-message");
    var after_button = document.getElementById("after-action");
    //
    console.log("login attempt")
    var username = document.getElementById("nickname-input").value;
    var password = document.getElementById("password-input").value;
    console.log(`nickname ${username}\npassword ${password}`);
    if (!username || !password) {
        show(overlay);
        hide(loading_circle);
        result_message.removeAttribute("techflag");
        result_message.textContent = "Для регистрации необходимо ввести и логин, и пароль.";
        after_button.textContent = "Попробовать снова";
        after_button.setAttribute("onclick", "retry()");
        return;
    }
    window.fetch(`http://88.210.12.42:8000/API/login?nickname=${username}&password=${password}`)
    .then((response) => {
      return response.text();
    })
    .then((text) => {
        while (Date.now() - reveal_time <= 2500) {}
        hide(loading_circle);
        show(after_button);
        if (text === "-1") {
            result_message.removeAttribute("techflag");
            result_message.textContent = "Ошибка! Введён неправильный логин или пароль.";
            after_button.textContent = "Попробовать снова";
            after_button.setAttribute("onclick", "retry()");
        } else {
            localStorage.setItem("Aether-user", JSON.stringify({"UUID" : text.replace("\"", ""), "timestamp" : Date.now()}));
            result_message.removeAttribute("techflag");
            result_message.textContent = "Вход прошёл успешно!";
            after_button.textContent = "На главную";
            after_button.setAttribute("onclick", "gotoIndex()");
        }
    });
    //
    var reveal_time = Date.now();
    show(overlay);
    result_message.textContent = "Попытка входа...";
    result_message.setAttribute("techflag", "1");
    if (Math.random() <= 0.1) {
        document.getElementById("loading-circle-inner").innerHTML = "<p>=)</p>";
    }
    hide(after_button);
}

function retry() {
    var overlay = document.getElementById("overlay");
    var loading_circle = document.getElementById("loading-circle");
    var result_message = document.getElementById("result-message");
    var after_button = document.getElementById("after-action");
    result_message.removeAttribute("techflag");
    hide(overlay);
    show(loading_circle);
    show(result_message);
    show(after_button);
}

function gotoIndex() {
    window.location.href = window.location.href.replace("login", "index");
}