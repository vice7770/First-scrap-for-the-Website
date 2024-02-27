import { z } from "zod";

export const MoneyV2Result = z.object({
    amount: z.string(),
    currencyCode: z.string(),
});

export const CartItemResult = z.object({
    id: z.string(),
    cost: z.object({
    //   amountPerQuantity: MoneyV2Result,
      subtotalAmount: MoneyV2Result,
    //   totalAmount: MoneyV2Result,
    }),
    quantity: z.number().positive().int(),
    imageUrl: z.string(),
    title: z.string(),
  });

export const CartResult = z
  .object({
    id: z.string(),
    cost: z.object({
      subtotalAmount: MoneyV2Result,
    }),
    checkoutUrl: z.string(),
    totalQuantity: z.number().int().nullable(),
    lines: z.object({
      nodes: z.array(CartItemResult),
    }),
    isServer: z.boolean(),
})
.nullable();

export const favoritesResult = z.array(z.number()).nullable();
export const pendingFavoriteResult = z.number().nullable();

export const userSession = z.object({
  session_id: z.string(),
  email: z.string().email(),
  iat: z.number(),
  exp: z.number(),
}).nullable();
