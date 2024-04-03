import { atom } from "nanostores";
import type { ShopData } from "@/utils/schemas";

export const $favoritesFromShop = atom<ShopData>(null);

export async function setFavoritesFromShop(items: ShopData) {
    $favoritesFromShop.set(items);
}