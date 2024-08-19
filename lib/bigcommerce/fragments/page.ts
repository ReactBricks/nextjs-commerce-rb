export const pageContentFragment = /* GraphQL */ `
  fragment pageContent on WebPage {
    __typename
    entityId
    isVisibleInNavigation
    name
    seo {
      metaKeywords
      metaDescription
      pageTitle
    }
  }
`;
