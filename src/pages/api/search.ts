// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient } from "graphql-request";
import { getProductsCountQuery } from "@/services/graphql/query";

const RotechClient = new GraphQLClient(process.env.GRAPHQL_ENDPOINT as string, {
  headers: {
    "X-Shopify-Access-Token": process.env.ACCESS_TOKEN as string,
    "Content-Type": "application/json",
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const getProductsCountQueryResponse: any = await RotechClient.request(
      getProductsCountQuery,
      {}
    );
    return res.status(200).send(`
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
                <ul class="predictive-search__product-list list--unstyled" role="list" data-type="products">
                    <li class="predictive-search__product-item line-item line-item--centered">
                        <a href="/products/liviliti-paptizer%E2%84%A2-uv-sanitizer-ozone-free-cpap-cleaner?_pos=1&_psq=sanitizer&_ss=e&_v=1.0" class="line-item__content-wrapper" data-instant>
                            <span class="line-item__image-wrapper">
                                <img class="line-item__image" alt="Paptizer with 30day trial logo" width="1000" height="1075" src="//cdn.shopify.com/s/files/1/0668/8781/1251/files/liviliti-paptizer-uv-sanitizer-ozone-mercury-free-cpap-cleaner-image-4-4469_210x.png?v=1718982707">
                            </span>
                            <div class="line-item__info">
                                <div class="product-item-meta">
                                    <span class="product-item-meta__title text--small">Liviliti Paptizer™ UV Sanitizer - Ozone Free CPAP Cleaner</span>
                                    <div class="product-item-meta__price-list-container text--small">
                                        <div class="price-list">
                                            <span class="price price--highlight">$259.99</span>
                                            <span class="price price--compare">$329.99</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <svg focusable="false" width="17" height="14" class="icon icon--nav-arrow-right  icon--direction-aware " viewBox="0 0 17 14">
                                <path d="M0 7h15M9 1l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none"></path>
                            </svg>
                        </a>
                    </li>
                    <li class="predictive-search__product-item line-item line-item--centered">
                        <a href="/products/nuwave-cpap-accessory-sanitizer-system-combo-unit?_pos=2&_psq=sanitizer&_ss=e&_v=1.0" class="line-item__content-wrapper" data-instant>
                            <span class="line-item__image-wrapper">
                                <img class="line-item__image" alt="Nuwave CPAP Accessory Sanitizer System Combo Unit - Front View" width="2000" height="1394" src="//cdn.shopify.com/s/files/1/0668/8781/1251/files/nuwave-combo-4411_210x.png?v=1718983037">
                            </span>
                            <div class="line-item__info">
                                <div class="product-item-meta">
                                    <span class="product-item-meta__title text--small"></span>
                                    <div class="product-item-meta__price-list-container text--small">
                                        <div class="price-list">
                                            <span class="price price--highlight">$219.00</span>
                                            <span class="price price--compare">$319.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <svg focusable="false" width="17" height="14" class="icon icon--nav-arrow-right  icon--direction-aware " viewBox="0 0 17 14">
                                <path d="M0 7h15M9 1l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none"></path>
                            </svg>
                        </a>
                    </li>
                    <li class="predictive-search__product-item line-item line-item--centered">
                        <a href="/products/nuwave-cpap-accessory-sanitizer-system-plus-unit?_pos=3&_psq=sanitizer&_ss=e&_v=1.0" class="line-item__content-wrapper" data-instant>
                            <span class="line-item__image-wrapper">
                                <img class="line-item__image" alt="Nuwave CPAP Accessory Sanitizer System Plus Unit - Front View" width="2000" height="1649" src="//cdn.shopify.com/s/files/1/0668/8781/1251/files/nuwave-plus-table-top-unit-4408_210x.png?v=1718983054">
                            </span>
                            <div class="line-item__info">
                                <div class="product-item-meta">
                                    <span class="product-item-meta__title text--small"></span>
                                    <div class="product-item-meta__price-list-container text--small">
                                        <div class="price-list">
                                            <span class="price price--highlight">$189.00</span>
                                            <span class="price price--compare">$289.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <svg focusable="false" width="17" height="14" class="icon icon--nav-arrow-right  icon--direction-aware " viewBox="0 0 17 14">
                                <path d="M0 7h15M9 1l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none"></path>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="predictive-search__results-categories-item" hidden id="predictive-search-queries">
                <ul class="predictive-search__product-list list--unstyled" role="list" data-type="queries">
                    <li class="predictive-search__linklist-item">
                        <a class="predictive-search__linklist-link" href="/search?q=nuwave+cpap+accessory+sanitizer+system&_pos=1&_psq=sanitizer&_ss=e&_v=1.0" data-instant>
                            <span>
                                <span>nuwave cpap accessory </span>
                                <mark>sanitizer</mark>
                                <span>system</span>
                            </span>
                            <svg focusable="false" width="17" height="14" class="icon icon--nav-arrow-right  icon--direction-aware " viewBox="0 0 17 14">
                                <path d="M0 7h15M9 1l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none"></path>
                            </svg>
                        </a>
                    </li>
                    <li class="predictive-search__linklist-item">
                        <a class="predictive-search__linklist-link" href="/search?q=sanitizer&_pos=2&_psq=sanitizer&_ss=e&_v=1.0" data-instant>
                            <span>
                                <mark>sanitizer</mark>
                            </span>
                            <svg focusable="false" width="17" height="14" class="icon icon--nav-arrow-right  icon--direction-aware " viewBox="0 0 17 14">
                                <path d="M0 7h15M9 1l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none"></path>
                            </svg>
                        </a>
                    </li>
                    <li class="predictive-search__linklist-item">
                        <a class="predictive-search__linklist-link" href="/search?q=accessory+sanitizer&_pos=3&_psq=sanitizer&_ss=e&_v=1.0" data-instant>
                            <span>
                                <span>accessory </span>
                                <mark>sanitizer</mark>
                            </span>
                            <svg focusable="false" width="17" height="14" class="icon icon--nav-arrow-right  icon--direction-aware " viewBox="0 0 17 14">
                                <path d="M0 7h15M9 1l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none"></path>
                            </svg>
                        </a>
                    </li>
                    <li class="predictive-search__linklist-item">
                        <a class="predictive-search__linklist-link" href="/search?q=elite+cpap+supplies+sanitizer+kit&_pos=4&_psq=sanitizer&_ss=e&_v=1.0" data-instant>
                            <span>
                                <span>elite cpap supplies </span>
                                <mark>sanitizer</mark>
                                <span>kit</span>
                            </span>
                            <svg focusable="false" width="17" height="14" class="icon icon--nav-arrow-right  icon--direction-aware " viewBox="0 0 17 14">
                                <path d="M0 7h15M9 1l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none"></path>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="predictive-search__results-categories-item" hidden id="predictive-search-pages">
                <ul class="predictive-search__product-list list--unstyled" role="list" data-type="pages">
                    <li class="predictive-search__linklist-item">
                        <a class="predictive-search__linklist-link" href="/pages/cpap-buying-guide?_pos=1&_psq=sanitizer&_ss=e&_v=1.0" data-instant>
                            CPAP Sanitizer Buying Guide
                            <svg focusable="false" width="17" height="14" class="icon icon--nav-arrow-right  icon--direction-aware " viewBox="0 0 17 14">
                                <path d="M0 7h15M9 1l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none"></path>
                            </svg>
                        </a>
                    </li>
                    <li class="predictive-search__linklist-item">
                        <a class="predictive-search__linklist-link" href="/pages/liviliti-paptizer-uvc-led-smart-cpap-sanitizer?_pos=2&_psq=sanitizer&_ss=e&_v=1.0" data-instant>
                            Liviliti Paptizer UVC LED Smart CPAP Sanitizer
                            <svg focusable="false" width="17" height="14" class="icon icon--nav-arrow-right  icon--direction-aware " viewBox="0 0 17 14">
                                <path d="M0 7h15M9 1l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none"></path>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="predictive-search__results-categories-item" hidden id="predictive-search-collections">
                <ul class="predictive-search__product-list list--unstyled" role="list" data-type="collections">
                    <li class="predictive-search__linklist-item">
                        <a class="predictive-search__linklist-link" href="/collections/cpap-cpap-cleaning?_pos=1&_psq=sanitizer&_ss=e&_v=1.0" data-instant>
                            CPAP Cleaning Wipes & Sanitizer
                            <svg focusable="false" width="17" height="14" class="icon icon--nav-arrow-right  icon--direction-aware " viewBox="0 0 17 14">
                                <path d="M0 7h15M9 1l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none"></path>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    `);
  } catch (err) {
    res.status(500);
  }
}
