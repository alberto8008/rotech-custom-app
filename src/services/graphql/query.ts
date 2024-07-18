import { gql } from "graphql-request";

export const getProductsCountQuery = gql`
  query {
    productsCount {
      count
    }
  }
`;

export const getProductsQuery = gql`
  query ($numProducts: Int!, $cursor: String) {
    products(first: $numProducts, after: $cursor) {
      nodes {
        id
        productTitle: metafield(namespace: "custom", key: "product_title") {
          value
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const getProductSearchQuery = gql`
  query ($numProducts: Int!, $cursor: String) {
    products(first: $numProducts, after: $cursor) {
      nodes {
        handle
        productTitle: metafield(namespace: "custom", key: "product_title") {
          value
        }
        featuredImage {
          altText
          width
          height
          url
        }
        priceRangeV2 {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          maxVariantCompareAtPrice {
            amount
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
