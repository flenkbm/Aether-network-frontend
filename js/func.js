function hide(el) { el.classList.add('hidden'); }
function show(el) { el.classList.remove('hidden'); }

function rand(mn, mx) { return Math.floor(Math.random() * (mx - mn) + mn); }

async function animRewrite(el=HTMLElement, totext=String, fpl=3) {//fpl - frames per letter
    //
    function animation() {
        if (step <= totext.length) {
            while (now < next_frame) {
                now = Date.now();
            }
            frame();
            step += sdl;
            next_frame = now + fdl;
            requestAnimationFrame(animation);
        } else {
            step = 0;
            el.textContent = totext;
        }
    }
    function frame() {
        var newtext = "";
        for (let i = 0; i <= currenttext.length - (step == totext.length); i += 1) {
            if (i < Math.floor(step)) {
                if (i < totext.length) { newtext += totext[i] }
            } else if (i == Math.floor(step)) {
                newtext += alph[rand(0, alph.length)];
            } else {
                if (i < currenttext.length) { newtext += currenttext[i] }
            }
        }
        el.textContent = newtext;
        currenttext = el.textContent
    }
    const alph = "!@#$%^&*()\"№<>/\\?§¶£"+"##########@@@@@$$$$$&&**********<>§§§§";
    var step = 0;
    var now = Date.now();
    const
    fps = 40,
    fdl = 1000 / fps,// frame delay
    sdl = 1 / fpl;// step delay 
    var next_frame = now + fps;
    //
    var currenttext = el.textContent;
    animation();
}

const API = "https://88.210.12.42.sslip.io:8000/API/";
const openfiles = "https://88.210.12.42.sslip.io/API/openfiles/";
