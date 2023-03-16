import options from "./Options";
import properties from "./Properties";
import { isNotIncludes } from "./Util";
import { Slide } from "./Slide";

class Slideshow {
  constructor() {
    this.currentSlideIndex = 0;
    this.slides = this.createSlides();
  }

  createSlides() {
    let slide = new Slide();
    if (options.useCoverAsFirstSlide) {
      slide.add(document.querySelector(properties.pageCoverSelector));
      slide.add(document.querySelector(properties.pageTitleAndPropSelector));
    }

    const notionPageBlocks = Array.from(
      document.querySelectorAll(properties.blockSelector)
    );

    let internalSlides = [];

    notionPageBlocks.forEach((it, i, arr) => {
      if (isNotIncludes(it.className, options.separatorsBlocks)) {
        slide.add(it);
      } else {
        if (slide.blocks.length > 0) internalSlides.push(slide);
        slide = new Slide();
        slide.add(it);
      }

      if (i === arr.length - 1) {
        internalSlides.push(slide);
      }
    });
    return internalSlides;
  }

  init() {
    this.all().forEach((it) => it.hidePageBlocks());
    this.first().showPageBlocks();
  }

  all() {
    return this.slides;
  }
  first() {
    return this.slides[0];
  }
  last() {
    return this.slides[this.slides.length - 1];
  }
  current() {
    return this.slides[this.currentSlideIndex];
  }
  next() {
    this.currentSlideIndex = this.hasNext()
      ? this.currentSlideIndex + 1
      : this.currentSlideIndex;
    return this.current();
  }
  hasNext() {
    return this.currentSlideIndex < this.slides.length - 1;
  }
  previous() {
    this.currentSlideIndex =
      this.currentSlideIndex > 0
        ? this.currentSlideIndex - 1
        : this.currentSlideIndex;
    return this.current();
  }
  nextSlide() {
    if (this.current().hasNextActionBlock()) {
      this.current().doAction();
    } else {
      this.current().hidePageBlocks();
      this.next().showPageBlocks();
    }
  }
  previousSlide() {
    this.current().hidePageBlocks();
    this.previous().showPageBlocks();
  }
}

const slideShow = new Slideshow();
export default slideShow;
