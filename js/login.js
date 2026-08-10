function login() {
    console.log("login attempt")
    var username = document.getElementById("nickname-input").value;
    var password = document.getElementById("password-input").value;
    console.log(`nickname ${username}\npassword ${password}`)
    window.fetch(`http://88.210.12.42:8000/API/login?nickname=${username}&password=${password}`)
    .then((response) => {
      return response.text();
    })
    .then((text) => {
        localStorage.setItem("Aether-user", JSON.stringify({"UUID" : text, "timestamp" : Date.now()}));
        window.location.href = window.location.href.replace("login", "index");
        //
    });
}