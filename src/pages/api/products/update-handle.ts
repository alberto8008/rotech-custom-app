// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient } from "graphql-request";
import { getProductsQuery } from "@/services/graphql/query";
import { updateProductMutation } from "@/services/graphql/mutation";

type Data = {
  renamed_counts: number;
};

type Product = {
  id: string;
  productTitle: {
    value: string;
  };
};

type GetProductsQueryResponse = {
  products: {
    nodes: Product[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
};

const RotechClient = new GraphQLClient(process.env.GRAPHQL_ENDPOINT as string, {
  headers: {
    "X-Shopify-Access-Token": process.env.ACCESS_TOKEN as string,
    "Content-Type": "application/json",
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  try {
    let products: { id: string; newTitle: { value: string } }[] = [];
    let cursor: string | null = null;
    let changedCounts = 0;

    while (true) {
      const productsQueryPageResponse: GetProductsQueryResponse =
        await RotechClient.request(getProductsQuery, {
          numProducts: 250,
          cursor: cursor,
        });

      productsQueryPageResponse.products.nodes.forEach((product) => {
        if (product.productTitle) {
          products.push({ id: product.id, newTitle: product.productTitle });
        }
      });

      if (productsQueryPageResponse.products.pageInfo.hasNextPage) {
        cursor = productsQueryPageResponse.products.pageInfo.endCursor;
      } else {
        break;
      }
    }

    await Promise.all(
      products.map(async (product) => {
        try {
          await RotechClient.request(updateProductMutation, {
            input: {
              id: product.id,
              handle: product.newTitle.value,
            },
          });
          changedCounts++;
        } catch (error) {
          console.error(`Error updating product with ID ${product.id}:`, error);
        }
      })
    );

    return res.status(200).json({ renamed_counts: changedCounts });
  } catch (err) {
    console.error("Error processing request:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
