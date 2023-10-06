// FIXME ENUMの二重定義
export type BlockStyle = "No Effect" | "Scroll Into View" | "Caption" | "Hide"

export type BlockOption = {
  style: BlockStyle
  useAsSeparator: boolean
  isReadAloud: boolean
}

export const SlideBlockStyle = {
  None: {
    name: "No Effect",
    styles: []
  },
  FadeIn: {
    name: "Fade In",
    styles: [{ prop: "animationName", value: "fadeIn" }]
  },
  FadeInDown: {
    name: "Fade In Down",
    styles: [{ prop: "animationName", value: "fadeInUp" }]
  },
  FadeInLeft: {
    name: "Fade In Left",
    styles: [{ prop: "animationName", value: "fadeInLeft" }]
  },
  FadeInRight: {
    name: "Fade In Right",
    styles: [{ prop: "animationName", value: "fadeInRight" }]
  },
  FadeInUp: {
    name: "Fade In Up",
    styles: [{ prop: "animationName", value: "fadeInUp" }]
  },
  ZoomIn: {
    name: "Zoom In",
    styles: [{ prop: "animationName", value: "zoomIn" }]
  },
  Bounce: {
    name: "Bounce",
    styles: [{ prop: "animationName", value: "bounce" }]
  },
  Flash: {
    name: "Flash",
    styles: [{ prop: "animationName", value: "flash" }]
  },
  Pulse: {
    name: "Pulse",
    styles: [{ prop: "animationName", value: "pulse" }]
  },
  Caption: {
    name: "Caption",
    styles: [
      { prop: "textAlign", value: "center" },
      { prop: "bottom", value: "16px" },
      { prop: "left", value: "50%" },
      { prop: "position", value: "fixed" },
      { prop: "transform", value: "translate(-50%, -50%)" },
      { prop: "zIndex", value: "100" },
      { prop: "backdropFilter", value: "blur(8px)" },
      { prop: "backgroundColor", value: "rgba(255,255,255,0.5)" },
      { prop: "animationDuration", value: "1s" },
      { prop: "animationName", value: "fadeIn" }
    ]
  },
  Scroll: {
    name: "Scroll Into View",
    styles: []
  },
  Hide: {
    name: "Hide",
    styles: [[{ prop: "display", value: "none" }]]
  }
}

export type SlideBlockStyle =
  (typeof SlideBlockStyle)[keyof typeof SlideBlockStyle]

export const getSlideStyles = (style: string) =>
  Object.values(SlideBlockStyle)
    .filter((it) => it.name === style)
    .flatMap((it) => it.styles)
