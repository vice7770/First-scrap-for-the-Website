import type { z } from "zod";
import { persistentAtom } from "@nanostores/persistent";
import type { favoritesResult, pendingFavoriteResult } from "@/utils/schemas";
// Favorites store with persistent state (local storage) and initial value
export const $favorites = persistentAtom<z.infer<typeof favoritesResult>>(
    "favorites",
    null,
    {
      encode: JSON.stringify,
      decode: JSON.parse,
    }
);

export const $pendingFavorite = persistentAtom<z.infer<typeof pendingFavoriteResult>>(
    "pendingFavorites",
    null,
    {
      encode: JSON.stringify,
      decode: JSON.parse,
    }
);

export async function initFavorites() {
    // const userId = "96716ef6-712f-4fc2-9de2-60db414fcc81";
    const res = await fetch(`/api/favorites`, {
        method: "GET",
    });
    const data = await res.json();
    return data;
}

export async function getFavorites() {
    const favorites = await initFavorites();
    const favoriteIds = favorites.map(favorite => favorite.item_id);
    $favorites.set(favoriteIds);
    return $favorites.get();
}

export async function setFavorites(id: number) {
    const currentFavorites = new Set($favorites.get() || []);
    if (currentFavorites.has(id)) {
      currentFavorites.delete(id);
    } else {
      currentFavorites.add(id);
    }
  
    $favorites.set(Array.from(currentFavorites));
}

export async function cleanFavorites() {
    $favorites.set(null);
}

export async function addPendingFavorite(id: number) {
    $pendingFavorite.set(id);
}

export async function cleanPendingFavorite() {
    $pendingFavorite.set(null);
}
