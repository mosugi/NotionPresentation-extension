import {hidePageBlocks, showPageBlocks} from "./Style";
import {slides} from "./Slides";
import {exitFullScreen, toggleFullScreen} from "./FullScreen";

export const nextSlide = () => {
    hidePageBlocks(slides.current());
    showPageBlocks(slides.next());
};
export const previousSlide = () => {
    hidePageBlocks(slides.current());
    showPageBlocks(slides.previous());
};
export const exitSlide = () => {
    exitFullScreen();
    window.location.reload();
};
export const addOsc = () => {
    document
        .querySelector("head")
        .insertAdjacentHTML(
            "beforeend",
            "<style>.notion-presentation-osc {animation-duration: 3s;animation-name: fadeOut;}</style>"
        );

    const oscStyle =
        "user-select: none; transition: opacity 700ms ease 0s, color 700ms ease 0s, transform 200ms ease 0s; cursor: pointer; opacity: 1; position: absolute; display: flex; align-items: center; justify-content: center; background: white; width: 36px; height: 36px; border-radius: 100%; font-size: 20px; box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px; z-index: 200;";
    document
        .querySelector(".notion-frame")
        .insertAdjacentHTML(
            "afterend",
            `<div id="notion-presentation-osc-previous" class="notion-presentation-osc" style="${oscStyle}; bottom: 16px; left: 50%;transform:translateX(-200%)">←</div>`
        );
    document
        .querySelector(".notion-frame")
        .insertAdjacentHTML(
            "afterend",
            `<div id="notion-presentation-osc-switchFull" class="notion-presentation-osc" style="${oscStyle}; bottom: 16px; left: 50%;transform:translateX(-50%)">□</div>`
        );
    document
        .querySelector(".notion-frame")
        .insertAdjacentHTML(
            "afterend",
            `<div id="notion-presentation-osc-next" class="notion-presentation-osc" style="${oscStyle}; bottom: 16px; left: 50%;transform:translateX(100%)">→</div>`
        );
    document
        .querySelector(".notion-frame")
        .insertAdjacentHTML(
            "afterend",
            `<div id="notion-presentation-osc-exit" class="notion-presentation-osc" style="${oscStyle}; top: 16px; right: 16px">×</div>`
        );

    document
        .querySelector("#notion-presentation-osc-previous")
        .addEventListener("click", () => previousSlide());
    document
        .querySelector("#notion-presentation-osc-switchFull")
        .addEventListener("click", () => toggleFullScreen());
    document
        .querySelector("#notion-presentation-osc-next")
        .addEventListener("click", () => nextSlide());
    document
        .querySelector("#notion-presentation-osc-exit")
        .addEventListener("click", () => exitSlide());

    let timeoutId = null;
    let timeoutLastUpdateTime = 0;

    document.body.addEventListener("mousemove", (it) => {
        document
            .querySelectorAll(".notion-presentation-osc")
            .forEach((it) => (it.style.opacity = 1));

        const diffMillis = Date.now() - timeoutLastUpdateTime;

        if (diffMillis >= 3000) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                document
                    .querySelectorAll(".notion-presentation-osc")
                    .forEach((it) => (it.style.opacity = 0));
            }, 3000);
            timeoutLastUpdateTime = Date.now();
        }
    });
};

export const addKeyDownListener = () => {
    document.body.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight" || event.key === "s" || event.key === "d") {
            nextSlide();
        }

        if (event.key === "ArrowLeft" || event.key === "w" || event.key === "a") {
            previousSlide();
        }
        if (event.key === "f") {
            toggleFullScreen();
        }
        if (event.key === "Escape" || event.key === "e") {
            exitSlide();
        }
    });
}