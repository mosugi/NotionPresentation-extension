export const showPageBlocks = (blocks) => {
  blocks.forEach((it) => (it.style.display = "block"));
};
export const hidePageBlocks = (blocks) => {
  blocks.forEach((it) => (it.style.display = "none"));
};
