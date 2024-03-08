import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { $favorites, $pendingFavorite, addPendingFavorite, cleanFavorites, cleanPendingFavorite, getFavorites, setFavorites } from "@/stores/favorites";
import { useStore } from "@nanostores/react";
import { $isFavoritesFetched } from "@/stores/isDataFetched";

function goToSignIn(id: number) {
  addPendingFavorite(id);
  const url = new URL('/signin', window.location.origin);
  const params = new URLSearchParams({
    redirectUrl: window.location.pathname,
  });
  url.search = params.toString();
  window.location.href = url.toString();
}

async function addToFavorites(id: number) {
  setFavorites(id);
  try {
    const res = await fetch("/api/favorites", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error);

    // If the API call fails, revert the UI back to its previous state
    setFavorites(id);
  }
}

async function removeFromFavorites(id: number) {
  const res = await fetch("/api/favorites", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  if (res.ok) {
    setFavorites(id);
  }
}

export default function AddToFavoritesButton({ id, isAuth }: { id: number, isAuth: boolean }) {
  const [isLoading, setIsLoading] = useState(true);
  const favorites = useStore($favorites);
  const pendingFavorite = useStore($pendingFavorite);
  const isFavoritesFetched = useStore($isFavoritesFetched);
  useEffect(() => {
    setIsLoading(false);
    if(!isAuth){
      cleanFavorites();
      return;
    }
    if(!isFavoritesFetched){
      getFavorites();
      $isFavoritesFetched.set(true);
    }
  }, []);

  useEffect(() => {
    if(!pendingFavorite || !favorites) return;
    const contains = favorites?.includes(pendingFavorite);
    if (!contains) {
      setFavorites(pendingFavorite as number);
    }
    cleanPendingFavorite();
  }, [favorites]);

  const handleAddToFavorites = async (id: number) => {
    try {
      await addToFavorites(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromFavorites = async (id: number) => {
    try {
      await removeFromFavorites(id);
    } catch (error) {
      console.error(error);
    }
  };


  if (isLoading) {
    return (
      <Button className="mb-2 h-[50px] w-[250px] rounded-3xl bg-white px-4 py-2 text-lg text-black">
        <img
          className="mr-2"
          width="30"
          height="30"
          src="https://img.icons8.com/sf-ultralight/50/hearts.png"
          alt="hearts"
        />
        Add to Favorites
      </Button>
    );
  }
  return (
    <Button
      variant="outline"
      className="mb-2 h-[50px] w-[250px] rounded-3xl bg-white px-4 py-2 text-lg text-black"
      onClick={() => {
        if (isAuth) {
          if (favorites?.includes(id)) {
            handleRemoveFromFavorites(id);
          } else {
            handleAddToFavorites(id);
          }
        } else {
          goToSignIn(id);
        }
      ;
      }}
    >
      {
        <img
          className="mr-2"
          width="30"
          height="30"
          src={ favorites?.includes(id) ? "https://img.icons8.com/ios-filled/50/like--v1.png" : "https://img.icons8.com/sf-ultralight/50/hearts.png" }
          alt="hearts"
        />
      }
      Add to Favorites
    </Button>
  );
}
