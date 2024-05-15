const progress = document.querySelector(".progress");

document.querySelector("#value").addEventListener("change", (ev) => {
    progress.setAttribute("value", Number(ev.target.value));
});

document.querySelector("#animate").addEventListener("change", (ev) => {
    if (ev.target.checked) {
        progress.setAttribute("animated", true);
    } else {
        progress.removeAttribute("animated");
    }
});

document.querySelector("#hide").addEventListener("change", (ev) => {
    if (ev.target.checked) {
        progress.setAttribute("hidden", true);
    } else {
        progress.removeAttribute("hidden");
    }
});
