export const NotionBlock = {
  // -- Basic blocks --
  // Header notion-header-block
  HeaderBlock: { displayName: "Heading 1", className: "notion-header-block" },
  // Sub header notion-sub_header-block
  SubHeaderBlock: {
    displayName: "Heading 2",
    className: "notion-sub_header-block"
  },
  // Sub-sub header notion-sub_sub_header-block
  SubSubHeaderBlock: {
    displayName: "Heading 3",
    className: "notion-sub_sub_header-block"
  },
  // Text notion-text-block
  TextBlock: { displayName: "Text", className: "notion-text-block" },
  // To-do list notion-to_do-block
  TodoBlock: { displayName: "Todo", className: "notion-to_do-block" },
  // Table notion-table-block
  TableBlock: { displayName: "Table", className: "notion-table-block" },
  // Bulleted list notion-bulleted_list-block
  BulletedListBlock: {
    displayName: "Bulleted List",
    className: "notion-bulleted_list-block"
  },
  // Numbered list notion-numbered_list-block
  NumberedListBlock: {
    displayName: "Numbered List",
    className: "notion-numbered_list-block"
  },
  // Toggle list notion-toggle-block
  ToggleBlock: { displayName: "Toggle", className: "notion-toggle-block" },
  // Quote notion-quote-block
  QuoteBlock: { displayName: "Quote", className: "notion-quote-block" },
  DividerBlock: { displayName: "Divider", className: "notion-divider-block" },
  // Callout notion-callout-block
  CalloutBlock: { displayName: "Callout", className: "notion-callout-block" },
  // -- Media --
  // Image notion-image-block
  ImageBlock: { displayName: "Image", className: "notion-image-block" },
  // Web bookmark notion-bookmark-block
  BookmarkBlock: {
    displayName: "Bookmark",
    className: "notion-bookmark-block"
  },
  // Video notion-video-block
  VideoBlock: { displayName: "Video", className: "notion-video-block" },
  // Audio notion-audio-block
  AudioBlock: { displayName: "Audio", className: "notion-audio-block" },
  // Code notion-code-block
  CodeBlock: { displayName: "Code", className: "notion-code-block" },
  // File notion-file-block
  FileBlock: { displayName: "File", className: "notion-file-block" },
  // -- Database --
  // (Table|Board|Gallery|List|Timeline) view notion-collection_view-block
  CollectionViewBlock: {
    displayName: "Collection View",
    className: "notion-collection_view-block"
  },
  // -- Advanced blocks --
  // Table of contents notion-table-block
  // Block equation notion-equation-block
  EquationBlock: {
    displayName: "Equation",
    className: "notion-equation-block"
  },
  // Button notion-button-block
  ButtonBlock: { displayName: "Button", className: "notion-button-block" },
  // Breadcrumb notion-breadcrumb-block
  BreadcrumbInstance: {
    displayName: "Breadcrumb",
    className: "notion-breadcrumb-block"
  },
  // SyncBlock notion-transclusion_container-block
  SyncBlock: {
    displayName: "Sync (include inner blocks)",
    className: "notion-transclusion_container-block"
  },
  // Toggle heading 1 notion-header-block
  // Toggle heading 2 notion-sub_header-block
  // Toggle heading 3 notion-sub_sub_header-block
  // (2|3|4|5) columns notion-column_list-block
  ColumnBlock: {
    displayName: "Column (include inner blocks)",
    className: "notion-column-block"
  },
  ColumnListBlock: {
    displayName: "Column List (include inner blocks)",
    className: "notion-column_list-block"
  },
  // Code - Mermaid notion-code-block
  // Embeds notion-embed-block
  EmbedBlock: { displayName: "Embed", className: "notion-embed-block" }
} as const

export type NotionBlock = (typeof NotionBlock)[keyof typeof NotionBlock]
