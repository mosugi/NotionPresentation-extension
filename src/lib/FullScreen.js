export const requestFullScreen = () => {
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
