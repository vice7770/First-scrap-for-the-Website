import type { z } from "zod";
import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import type { favoritesResult } from "@/utils/schemas";
  
// Favorites store with persistent state (local storage) and initial value
export const $favorites = persistentAtom<z.infer<typeof favoritesResult>>(
    "favorites",
    null,
    {
      encode: JSON.stringify,
      decode: JSON.parse,
    }
);

export async function initFavorites() {
    const res = await fetch("/api/favorites", {
        method: "GET",
    });
    const data = await res.json();
    return data;
}

export async function getFavorites() {
    const favorites = $favorites.get();
    if (!favorites) {
        const favorites = await initFavorites();
        const favoriteIds = favorites.map(favorite => favorite.item_id);
        $favorites.set(favoriteIds);
    }
    return $favorites.get();
}

export async function setFavorites(id: number) {
    const currentFavorites = $favorites.get() || [];
    if (currentFavorites.includes(id)) {
        $favorites.set(currentFavorites.filter((currentFavoritesId: number) => currentFavoritesId !== id));
        return;
    }
    $favorites.set([...currentFavorites, id]);  
}