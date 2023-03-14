class Properties {
  constructor() {
    this.blockSelector = ".notion-page-content > .notion-selectable";
    this.pageTitleAndPropSelector =
      ".pseudoSelection:first-of-type + div > div > div";
    this.pageCoverSelector = ".pseudoSelection:first-of-type";
  }
}

const properties = new Properties();
export default properties;
