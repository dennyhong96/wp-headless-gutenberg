import { gql } from "graphql-request";

const MENU_FRAGMENT = gql`
  fragment MenuFragment on MenuItem {
    id
    label
    url
    path
  }
`;

export default MENU_FRAGMENT;
