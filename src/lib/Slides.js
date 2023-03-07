export const slides = (() => {
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
