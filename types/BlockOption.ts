export type BlockStyle = "none" | "fade" | "slide" | "caption" | "hide"

export type BlockOption = {
  style: BlockStyle
  useAsSeparator: boolean
  isReadAloud: boolean
}

export type BlockOptions = {
  [key: string]: BlockOption
}

export const SlideBlockStyle = {
  None: {
    name: "none",
    styles: []
  },
  Fade: {
    name: "fade",
    styles: [
      { prop: "animationDuration", value: "1s" },
      { prop: "animationName", value: "fade-in" }
    ]
  },
  Slide: {
    name: "slide",
    styles: [
      [
        { prop: "animationDuration", value: "1s" },
        { prop: "animationName", value: "slide-in" }
      ]
    ]
  },
  Caption: {
    name: "caption",
    styles: [
      { prop: "bottom", value: "16px" },
      { prop: "position", value: "fixed" },
      { prop: "animationDuration", value: "1s" },
      { prop: "animationName", value: "fade-in" }
    ]
  },
  Hide: {
    name: "hide",
    styles: [[{ prop: "display", value: "none" }]]
  }
}

export type SlideBlockStyle =
  (typeof SlideBlockStyle)[keyof typeof SlideBlockStyle]
