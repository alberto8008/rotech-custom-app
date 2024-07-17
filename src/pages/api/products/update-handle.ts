// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient } from "graphql-request";
import {
  getProductsCountQuery,
  getProductsQuery,
} from "@/services/graphql/query";
import { updateProductMutation } from "@/services/graphql/mutation";

type Data = {
  renamed_counts: number;
};

const RotechClient = new GraphQLClient(process.env.GRAPHQL_ENDPOINT as string, {
  headers: {
    "X-Shopify-Access-Token": process.env.ACCESS_TOKEN as string,
    "Content-Type": "application/json",
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let products: any = [],
      productsQueryPageResponse: any,
      cursor = null,
      changedCounts = 0;

    while (true) {
      productsQueryPageResponse = await RotechClient.request(getProductsQuery, {
        numProducts: 250,
        cursor: cursor,
      });
      productsQueryPageResponse.products.nodes.forEach((product: any) => {
        if (product.productTitle)
          products.push({ id: product.id, newTitle: product.productTitle });
      });
      if (productsQueryPageResponse.products.pageInfo.hasNextPage)
        cursor = productsQueryPageResponse.products.pageInfo.endCursor;
      else break;
    }

    await Promise.all(
      products.map(async (product: any) => {
        try {
          await RotechClient.request(updateProductMutation, {
            input: {
              id: product.id,
              handle: product.newTitle.value,
            },
          });
          changedCounts++;
          return true;
        } catch (error) {
          console.error(error);
        }
      })
    );

    return res.status(200).json({
      renamed_counts: changedCounts,
    });
  } catch (err) {
    res.status(500);
  }
}
