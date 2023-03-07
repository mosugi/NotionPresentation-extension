const slideIn =
  "<style>@keyframes transition { from { margin-left: 100%; width: 300%;}to {margin-left: 0%;width: 100%;}}</style>";
const fadeIn =
  "<style>@keyframes transition { from { opacity:0 }to {opacity:1;}}</style>";
const fadeOut =
  "<style>@keyframes fadeOut { from { opacity:1 }to {opacity:0;}}</style>";
const animation =
  "<style>.notion-selectable {animation-duration: 0.5s;animation-name: transition;}</style>";

const requestFullScreen = () => {
  if (!document.fullscreenElement) {
    document.body.requestFullscreen().catch((err) => {
      console.warn(
        `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
      );
    });
  }
};

const exitFullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch();
  }
};

const toggleFullScreen = () => {
  const osc = document.querySelector("#notion-presentation-osc-switchFull");
  if (document.fullscreenElement) {
    exitFullScreen();
    osc.innerText = "□";
  } else {
    requestFullScreen();
    osc.innerText = "◻︎";
  }
};

const slides = (() => {
  let chunkBlocks = [];

  // first page
  chunkBlocks.push(document.querySelector(".pseudoSelection:first-of-type"));
  chunkBlocks.push(
    document.querySelector(".pseudoSelection:first-of-type + div")
  );

  const notionPageContent = Array.from(
    document.querySelectorAll(".notion-page-content .notion-selectable")
  );

  let pages = [];

  notionPageContent.forEach((it, i, arr) => {
    if (!it.className.includes("notion-header-block")) {
      chunkBlocks.push(it);
    } else {
      pages.push(chunkBlocks);
      chunkBlocks = [];
      chunkBlocks.push(it);
    }

    if (i === arr.length - 1) {
      pages.push(chunkBlocks);
    }
  });

  let i = 0;
  return {
    all: () => pages,
    first: () => pages[0],
    last: () => pages[pages.length - 1],
    current: () => pages[i],
    next: () => (i < pages.length - 1 ? pages[++i] : pages[i]),
    previous: () => (i > 0 ? pages[--i] : pages[i]),
  };
})();

const showPageBlocks = (blocks) => {
  blocks.forEach((it) => (it.style.display = "block"));
};

const hidePageBlocks = (blocks) => {
  blocks.forEach((it) => (it.style.display = "none"));
};

const styleFirstPage = () => {
  document.querySelector(".pseudoSelection > div").style.height = "80vh"; // original 30vh
  document.querySelector(".pseudoSelection > div > div > div").style.height =
    "80vh"; // original 30vh
  document.querySelector(
    ".pseudoSelection > div > div > div > div > img"
  ).style.height = "80vh"; // original 30vh
  document.querySelector(
    ".pseudoSelection:first-of-type + div > div"
  ).style.width = "100%"; // original 900px
  document.querySelector(
    ".pseudoSelection:first-of-type + div > div"
  ).style.textAlign = "center"; // original ''
};

const hiddenControls = () => {
  document.querySelector(".notion-topbar").style.display = "none";
  document.querySelector(".notion-page-controls").style.display = "none";
};

const addAnimation = () => {
  document.querySelector("head").insertAdjacentHTML("beforeend", fadeIn);
  document.querySelector("head").insertAdjacentHTML("beforeend", fadeOut);
  document.querySelector("head").insertAdjacentHTML("beforeend", animation);
};

const initSlide = (slides) => {
  styleFirstPage();
  hiddenControls();
  slides.forEach(hidePageBlocks);
  addOsc();
  addAnimation();
};

const nextSlide = () => {
  hidePageBlocks(slides.current());
  showPageBlocks(slides.next());
};

const previousSlide = () => {
  hidePageBlocks(slides.current());
  showPageBlocks(slides.previous());
};

const exitSlide = () => {
  exitFullScreen();
  window.location.reload();
};

const addOsc = () => {
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

initSlide(slides.all());
showPageBlocks(slides.first());
// requestFullScreen();
