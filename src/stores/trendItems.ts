import type { z } from "zod";
import { persistentAtom } from "@nanostores/persistent";
import { $isShopFetched } from "./isDataFetched";
import { shopResult } from "@/utils/schemas";
// Favorites store with persistent state (local storage) and initial value
export const $trendItems = persistentAtom<z.infer<typeof shopResult>>(
    "trendItems",
    null,
    {
      encode: JSON.stringify,
      decode: JSON.parse,
    }
);

export async function initItems() {
    const res = await fetch("/api/leaderboard", {
        method: "GET",
    });
    const data = await res.json();
    return data;
}

export async function getTrendItems() {
    const shop = await initItems();
    $trendItems.set(shop);
    $isShopFetched.set(true);
    return $trendItems.get();
}