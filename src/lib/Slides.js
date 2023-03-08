export const slides = (() => {
  let slideBlocks = [];

  // first page
  slideBlocks.push(document.querySelector(".pseudoSelection:first-of-type"));
  slideBlocks.push(
    document.querySelector(".pseudoSelection:first-of-type + div")
  );

  const notionPageBlocks = Array.from(
    document.querySelectorAll(".notion-page-content .notion-selectable")
  );

  let internalSlides = [];

  notionPageBlocks.forEach((it, i, arr) => {
    if (!it.className.includes("notion-header-block")) {
      slideBlocks.push(it);
    } else {
      internalSlides.push(slideBlocks);
      slideBlocks = [];
      slideBlocks.push(it);
    }

    if (i === arr.length - 1) {
      internalSlides.push(slideBlocks);
    }
  });

  let i = 0;
  return {
    all: () => internalSlides,
    first: () => internalSlides[0],
    last: () => internalSlides[internalSlides.length - 1],
    current: () => internalSlides[i],
    next: () =>
      i < internalSlides.length - 1 ? internalSlides[++i] : internalSlides[i],
    previous: () => (i > 0 ? internalSlides[--i] : internalSlides[i]),
  };
})();
