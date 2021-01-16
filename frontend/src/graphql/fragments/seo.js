import { gql } from "graphql-request";

const SEO_FRAGMENT = gql`
  fragment seo on PostTypeSEO {
    breadcrumbs {
      text
      url
    }
    title
    metaDesc
    metaRobotsNoindex
    metaRobotsNofollow
    opengraphAuthor
    opengraphDescription
    opengraphTitle
    schemaDetails
    opengraphImage {
      sourceUrl
    }
    opengraphSiteName
    opengraphModifiedTime
    opengraphPublishedTime
    twitterTitle
    twitterDescription
    twitterImage {
      sourceUrl
    }
  }
`;

export default SEO_FRAGMENT;
