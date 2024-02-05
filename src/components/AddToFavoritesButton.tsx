import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { $favorites, setFavorites } from "@/stores/favorites";
import { useStore } from "@nanostores/react";

async function addToFavorites(id: number) {
  const res = await fetch("/api/favorites", {
    method: "POST",
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

export default function AddToFavoritesButton({ id }: { id: number }) {
  const [isLoading, setIsLoading] = useState(true);
  const favorites = useStore($favorites);
  useEffect(() => {
    setIsLoading(false);
  }, []);

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
        favorites?.includes(id) ? removeFromFavorites(id) : addToFavorites(id);
      }}
    >
      {
      <img
        className="mr-2"
        width="30"
        height="30"
        src={ favorites?.includes(id) ? "https://img.icons8.com/ios-filled/50/like--v1.png" : "https://img.icons8.com/sf-ultralight/50/hearts.png" }
        alt="hearts"
      />}
      Add to Favorites
    </Button>
  );
}
