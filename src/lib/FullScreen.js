const requestFullScreen = () => {
  if (!document.fullscreenElement) {
    document.body.requestFullscreen().catch((err) => {
      console.warn(
        `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
      );
    });
  }
};
export const exitFullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch();
  }
};
export const toggleFullScreen = () => {
  const osc = document.querySelector("#notion-presentation-osc-switchFull");
  if (document.fullscreenElement) {
    exitFullScreen();
    osc.innerText = "□";
  } else {
    requestFullScreen();
    osc.innerText = "◻︎";
  }
};
