export const NotionBlock = {
  HeaderBlock: { className: "header", displayName: "H1" },
  SubHeaderBlock: { className: "sub_header", displayName: "H2" },
  SubSubHeaderBlock: { className: "sub_sub_header", displayName: "H3" },
  DividerBlock: { className: "divider", displayName: "Divider" },
  TextBlock: { className: "text", displayName: "Text" },
  SyncBlock: { className: "transclusion_container", displayName: "Sync" }
} as const

export type NotionBlock = (typeof NotionBlock)[keyof typeof NotionBlock]
