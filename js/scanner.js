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
    window.fetch(API+`scan?code=${res}&uuid=${UUID}`)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log(json);
        if (json == "-1" || json == "-2") {
            qrScanner.start();
            return;
        }
        loadUserData();
        stopScanner(true);
        return;
    });
}

function startScanner() {
    console.log("scanner trying to work");
    qrScanner.start();
    show(document.getElementById("vid-cont"));
    show(document.getElementById("stop-scan"));
    hide(document.getElementById("start-scan"));
}

async function stopScanner(success) {
    let startScan = document.getElementById("start-scan");
    qrScanner.stop();
    console.log("scanner stopped trying to work");
    hide(document.getElementById("vid-cont"));
    hide(document.getElementById("stop-scan"));
    show(startScan);
    if (success) {
        startScan.textContent = "Код прочитан успешно!";
    } else {
        startScan.textContent = "Сканирование отменено.";
    }
    startScan.setAttribute("disabled", "");
    setTimeout(function () {
        animRewrite(startScan, "Начать сканирование");
        startScan.removeAttribute("disabled");
    }, 1500)   
}