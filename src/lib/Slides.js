import properties from "./Properties";
import { isNotIncludes } from "./Util";

export const slides = (() => {
  let slideBlocks = [];

  // first page
  slideBlocks.push(document.querySelector(properties.pageCoverSelector));
  slideBlocks.push(document.querySelector(properties.pageTitleAndPropSelector));

  const notionPageBlocks = Array.from(
    document.querySelectorAll(properties.blockSelector)
  );

  let internalSlides = [];

  notionPageBlocks.forEach((it, i, arr) => {
    if (isNotIncludes(it.className, properties.separatorsBlocks)) {
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
