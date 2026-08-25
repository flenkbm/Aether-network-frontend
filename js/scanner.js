var scannedCode = -1;
var qrScanner;

window.addEventListener('load', () => {
    var videoDisp = document.getElementById("scan-vid-disp");
    qrScanner = new QrScanner(
        videoDisp,
        result => resultProcess(result),
        {maxScansPerSecond: 10, highlightScanRegion: true, preferredCamera: 'environment', highlightCodeOutline: true},
    );
    console.log("scanner junk loaded");
    qrScanner.stop();
});

async function resultProcess(res) {
    qrScanner.stop()
    console.log(res);
    res = res.data;
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(res)) {
        qrScanner.start();
        console.log("code failed");
        return;
    }
    console.log("trying verifying")
    fetch(API+"scan", {
        method: "POST",
        body: JSON.stringify({
            code: res,
            sid: SID
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
        if (json == "-2") {
            qrScanner.start();
            return
        } else if (json == "-3") {
            stopScanner("cooldown", Math.ceil((userdata["scans"][res]-Date.now())/1000/60));
            return
        } else if (json == "-1") {
            stopScanner("sid error");
            return
        }
        loadUserData();
        setTimeout(() => {loadToplist()}, 500);
        setTimeout(() => {loadToplist()}, 2500);
        stopScanner("success");
        return;
    });
}

function startScanner() {
    console.log("scanner trying to work");
    qrScanner.start();
    show(document.getElementById("vid-cont"));
    show(document.getElementById("stop-scan"));
    hide(document.getElementById("start-scan"));
    document.getElementById("scanner-block").classList.remove("interactive-cont");
}

async function stopScanner(res, dt=0) {
    let startScan = document.getElementById("start-scan");
    qrScanner.stop();
    console.log("scanner stopped trying to work");
    hide(document.getElementById("vid-cont"));
    hide(document.getElementById("stop-scan"));
    show(startScan);
    document.getElementById("scanner-block").classList.add("interactive-cont");
    var btn_text = "Включить сканер";
    var timetoread = 1500;
    if (res == "success") {
        startScan.textContent = "Код прочитан успешно!";
    } else if (res == "cancel") {
        startScan.textContent = "Сканирование отменено.";
    } else if (res == "cooldown") {
        startScan.textContent = `Точка восстанавливается.\nПопробуйте через ${Math.floor(dt/60)}ч ${dt%60}мин`;
        startScan.style.setProperty("height", "60px");
        timetoread = 2500;
    } else if (res == "sid error") {
        startScan.textContent = "Произошла ошибка!\nНеобходимо перезагрузить страницу.";
        btn_text = "Нажмите чтобы перезагрузить";
        startScan.setAttribute("onclick", "window.location.reload()");
        startScan.style.setProperty("height", "60px");
        localStorage.removeItem("Aether-user");
        timetoread = 2500;
    }
    startScan.setAttribute("disabled", "");
    setTimeout(function () {
        animRewrite(startScan, btn_text);
        startScan.removeAttribute("disabled");
        startScan.style.removeProperty("height");
    }, timetoread)   
}