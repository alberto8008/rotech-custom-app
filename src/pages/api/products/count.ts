// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient } from "graphql-request";
import { getProductsCountQuery } from "@/services/graphql/query";

type Data = {
  total_counts: number;
};

type ProductsCountQueryResponse = {
  productsCount: {
    count: number;
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
    const getProductsCountQueryResponse: ProductsCountQueryResponse =
      await RotechClient.request(getProductsCountQuery, {});
    return res.status(200).json({
      total_counts: getProductsCountQueryResponse?.productsCount?.count,
    });
  } catch (err) {
    console.error("Error fetching products count:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
