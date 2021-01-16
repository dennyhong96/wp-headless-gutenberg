import { gql } from "graphql-request";

import MENU_FRAGMENT from "../fragments/menu";

export const HeaderFooter = `headerMenu: menuItems(where: { location: HCMS_MENU_HEADER, parentId: "0" }) {
  edges {
    node {
      ...MenuFragment
      childItems {
        edges {
          node {
            id
            label
            url
            path
          }
        }
      }
    }
  }
}

footerMenu: menuItems(where: { location: HCMS_MENU_FOOTER, parentId: "0" }) {
  edges {
    node {
      ...MenuFragment
    }
  }
}

header: getHeader {
  favicon
  siteLogoUrl
  siteTagLine
  siteTitle
}

footer: getFooter {
  copyrightText
  socialLinks {
    iconName
    iconUrl
  }
}`;

export const LAYOUT = gql`
  query Layout {
    ${HeaderFooter}
  }
  ${MENU_FRAGMENT}
`;
