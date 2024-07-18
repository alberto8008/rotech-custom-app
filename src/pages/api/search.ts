// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient } from "graphql-request";
import { getProductSearchQuery } from "@/services/graphql/query";

const RotechClient = new GraphQLClient(process.env.GRAPHQL_ENDPOINT as string, {
  headers: {
    "X-Shopify-Access-Token": process.env.ACCESS_TOKEN as string,
    "Content-Type": "application/json",
  },
});

type ProductType = {
  handle: string;
  title: string;
  image: {
    alt: string;
    width: number;
    height: number;
    url: string;
  };
  price: number;
  comparePrice: number;
};

type GetProductsQueryResponse = {
  products: {
    nodes: Array<{
      handle: string;
      productTitle: {
        value: string;
      };
      featuredImage: {
        altText: string;
        width: number;
        height: number;
        url: string;
      };
      priceRangeV2: {
        maxVariantPrice: {
          amount: number;
        };
      };
      compareAtPriceRange: {
        maxVariantCompareAtPrice: {
          amount: number;
        };
      };
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const searchTerm: string = req.query.searchTerm as string;
    let products: ProductType[] = [];
    let cursor: string | null = null;

    while (true) {
      const productsQueryPageResponse: GetProductsQueryResponse =
        await RotechClient.request(getProductSearchQuery, {
          numProducts: 250,
          cursor: cursor,
        });

      productsQueryPageResponse.products.nodes.forEach((product) => {
        if (
          product.productTitle?.value
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ) {
          products.push({
            handle: product.handle,
            title: product.productTitle.value,
            image: {
              alt: product.featuredImage?.altText || "",
              width: product.featuredImage?.width || 0,
              height: product.featuredImage?.height || 0,
              url: product.featuredImage?.url || "",
            },
            price: product.priceRangeV2?.maxVariantPrice.amount || 0,
            comparePrice:
              product.compareAtPriceRange?.maxVariantCompareAtPrice.amount || 0,
          });
        }
      });

      if (productsQueryPageResponse.products.pageInfo.hasNextPage) {
        cursor = productsQueryPageResponse.products.pageInfo.endCursor;
      } else {
        break;
      }
    }

    let response = `
      <div class="predictive-search__results-categories-item" id="predictive-search-products">
          <input type="hidden" form="predictive-search-form" name="type" value="product">
          <ul class="predictive-search__product-list list--unstyled" role="list" data-type="products">`;

    products.forEach((product: ProductType) => {
      response += `
        <li class="predictive-search__product-item line-item line-item--centered">
            <a href="/products/${
              product.handle
            }" class="line-item__content-wrapper" data-instant>
                ${
                  product.image.url
                    ? `
                <span class="line-item__image-wrapper">
                    <img class="line-item__image" ${
                      product.image.alt ? `alt="${product.image.alt}"` : ""
                    } ${
                        !!product.image.width
                          ? `width="${product.image.width}"`
                          : ""
                      } ${
                        !!product.image.height
                          ? `height="${product.image.height}"`
                          : ""
                      } src="${product.image.url}">
                </span>`
                    : ""
                }
                <div class="line-item__info">
                    <div class="product-item-meta">
                        <span class="product-item-meta__title text--small">${
                          product.title
                        }</span>
                        <div class="product-item-meta__price-list-container text--small">
                            <div class="price-list">
                                ${
                                  !!product.price
                                    ? `<span class="price price--highlight">$${product.price}</span>`
                                    : ""
                                }
                                ${
                                  !!product.comparePrice
                                    ? `<span class="price price--compare">$${product.comparePrice}</span>`
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <svg focusable="false" width="17" height="14" class="icon icon--nav-arrow-right  icon--direction-aware " viewBox="0 0 17 14">
                    <path d="M0 7h15M9 1l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none"></path>
                </svg>
            </a>
        </li>`;
    });

    response += `
        </ul>
    </div>
    `;

    return res.status(200).send(response);
  } catch (err) {
    console.error("Error processing request:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
