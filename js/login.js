function login() {
    var overlay = document.getElementById("overlay");
    var loading_circle = document.getElementById("loading-circle");
    var result_message = document.getElementById("result-message");
    var after_button = document.getElementById("after-action");
    //
    console.log("login attempt")
    var username = document.getElementById("username-input").value;
    var password = document.getElementById("password-input").value;
    console.log(`username ${username}\npassword ${password}`);
    if (!username || !password) {
        show(overlay);
        hide(loading_circle);
        result_message.removeAttribute("techflag");
        result_message.textContent = "Для регистрации необходимо ввести и логин, и пароль.";
        after_button.textContent = "Попробовать снова";
        after_button.setAttribute("onclick", "retry()");
        return;
    }
    fetch(API+"login", {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password
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
        while (Date.now() - reveal_time <= 1500) {}
        hide(loading_circle);
        show(after_button);
        if (json == "-1") {
            result_message.removeAttribute("techflag");
            result_message.textContent = "Ошибка! Введён неправильный логин или пароль.";
            after_button.textContent = "Попробовать снова";
            after_button.setAttribute("onclick", "retry()");
        } else {
            localStorage.setItem("Aether-user", json);
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