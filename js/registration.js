function registration() {
    var overlay = document.getElementById("overlay");
    var loading_circle = document.getElementById("loading-circle");
    var result_message = document.getElementById("result-message");
    var after_button = document.getElementById("after-action");
    //
    console.log("registration attempt")
    var username = document.getElementById("nickname-input").value;
    var password = document.getElementById("password-input").value;
    var re_password = document.getElementById("password-repeat").value;
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
    if (username.length > 16) {
        show(overlay);
        hide(loading_circle);
        result_message.removeAttribute("techflag");
        result_message.textContent = "Слишком длинный никнейм! Максимальная допустимая длина - 16 символов.";
        after_button.textContent = "Попробовать снова";
        after_button.setAttribute("onclick", "retry()");
        return;
    }
    if (password.length < 6) {
        show(overlay);
        hide(loading_circle);
        result_message.removeAttribute("techflag");
        result_message.textContent = "Слишком короткий пароль! Минимальная допустимая длина - 6 символов.";
        after_button.textContent = "Попробовать снова";
        after_button.setAttribute("onclick", "retry()");
        return;
    }
    if (password != re_password) {
        show(overlay);
        hide(loading_circle);
        result_message.setAttribute("techflag", "1");
        result_message.textContent = "Пароли не совпадают!";
        after_button.textContent = "Попробовать снова";
        after_button.setAttribute("onclick", "retry()");
        return;
    }
    window.fetch(API+`registration?nickname=${username}&password=${password}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
        while (Date.now() - reveal_time <= 2500) {}
        hide(loading_circle);
        show(after_button);
        if (json === "-1") {
            result_message.removeAttribute("techflag");
            result_message.textContent = "Ошибка! Этот никнейм уже занят.";
            after_button.textContent = "Попробовать снова";
            after_button.setAttribute("onclick", "retry()");
        } else {
            localStorage.setItem("Aether-user", JSON.stringify({"UUID" : json, "timestamp" : Date.now()}));
            result_message.removeAttribute("techflag");
            result_message.textContent = "Регистрация прошла успешно!";
            after_button.textContent = "На главную";
            after_button.setAttribute("onclick", "gotoIndex()");
        }
    });
    //
    var reveal_time = Date.now();
    show(overlay);
    result_message.textContent = "Попытка регистрации...";
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
    window.location.href = window.location.href.replace("registration", "index");
}