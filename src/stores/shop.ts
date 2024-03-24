import type { z } from "zod";
import { persistentAtom } from "@nanostores/persistent";
import type { shopResult } from "@/utils/schemas";
import { $isShopFetched } from "./isDataFetched";
// Favorites store with persistent state (local storage) and initial value
export const $shop = persistentAtom<z.infer<typeof shopResult>>(
    "shop",
    null,
    {
      encode: JSON.stringify,
      decode: JSON.parse,
    }
);

export async function initShop() {
    const res = await fetch("/api/shop", {
        method: "GET",
    });
    const data = await res.json();
    return data;
}

export async function getShop() {
    const shop = $shop.get();
    if (!shop) {
        const shop = await initShop();
        $shop.set(shop);
        $isShopFetched.set(true);
    }
    return $shop.get();
}