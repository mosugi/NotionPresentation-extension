export const showPageBlocks = (blocks) => {
  if (blocks) blocks.forEach((it) => (it.style.display = "block"));
};
export const hidePageBlocks = (blocks) => {
  if (blocks) blocks.forEach((it) => (it.style.display = "none"));
};
