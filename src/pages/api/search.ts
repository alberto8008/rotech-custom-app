// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient } from "graphql-request";
import {
  getProductSearchQuery,
  getProductsCountQuery,
} from "@/services/graphql/query";

const RotechClient = new GraphQLClient(process.env.GRAPHQL_ENDPOINT as string, {
  headers: {
    "X-Shopify-Access-Token": process.env.ACCESS_TOKEN as string,
    "Content-Type": "application/json",
  },
});

type ProductType = {
  handle: String;
  title: String;
  image: {
    alt: String;
    width: Number;
    height: Number;
    url: String;
  };
  price: Number;
  comparePrice: Number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const searchTerm: string = req.query.searchTerm as string;
    let products: any = [],
      productsQueryPageResponse: any,
      cursor = null;

    while (true) {
      productsQueryPageResponse = await RotechClient.request(
        getProductSearchQuery,
        {
          numProducts: 250,
          cursor: cursor,
        }
      );
      productsQueryPageResponse.products.nodes.forEach((product: any) => {
        if (
          product.productTitle &&
          product.productTitle?.value
            .toLowerCase()
            .indexOf(searchTerm.toLowerCase()) > -1
        )
          products.push({
            handle: product.handle,
            title: product.productTitle.value,
            image: {
              alt: product.featuredImage?.altText,
              width: product.featuredImage?.width,
              height: product.featuredImage?.height,
              url: product.featuredImage?.url,
            },
            price: product.priceRangeV2?.maxVariantPrice.amount,
            comparePrice:
              product.compareAtPriceRange?.maxVariantCompareAtPrice.amount,
          });
      });

      if (productsQueryPageResponse.products.pageInfo.hasNextPage)
        cursor = productsQueryPageResponse.products.pageInfo.endCursor;
      else break;
    }

    let response = `
    <div id="shopify-section-predictive-search" class="shopify-section shopify-section--predictive-search">
        <tabs-nav class="tabs-nav tabs-nav--edge2edge tabs-nav--narrow tabs-nav--no-border">
            <scrollable-content class="tabs-nav__scroller hide-scrollbar">
                <div class="tabs-nav__scroller-inner">
                    <div class="tabs-nav__item-list">
                        <button type="button" class="tabs-nav__item heading heading--small" aria-expanded="true" aria-controls="predictive-search-products">Products</button>
                        <button type="button" class="tabs-nav__item heading heading--small" aria-expanded="false" aria-controls="predictive-search-queries">Suggestions</button>
                        <button type="button" class="tabs-nav__item heading heading--small" aria-expanded="false" aria-controls="predictive-search-pages">Pages</button>
                        <button type="button" class="tabs-nav__item heading heading--small" aria-expanded="false" aria-controls="predictive-search-collections">Collections</button>
                    </div>
                </div>
            </scrollable-content>
        </tabs-nav>
        <div class="predictive-search__results-categories">
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
                        product.image.width
                          ? `width="${product.image.width}"`
                          : ""
                      } ${
                        product.image.height
                          ? `height="${product.image.height}"`
                          : ""
                      } src="${product.image.url}">
                </span>
                `
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
                                  product.price
                                    ? `
                                <span class="price price--highlight">$${product.price}</span>
                                `
                                    : ""
                                }
                                ${
                                  product.comparePrice
                                    ? `
                                  <span class="price price--compare">$${product.comparePrice}</span>
                                  `
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
        </li>
        `;
    });

    response += `
        </ul>
    </div>
    `;

    return res.status(200).send(response);
  } catch (err) {
    res.status(500);
  }
}
