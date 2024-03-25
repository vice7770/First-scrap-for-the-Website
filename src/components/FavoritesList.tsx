import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { $favorites, getFavorites } from "@/stores/favorites";
import { useStore } from "@nanostores/react";
import { $isFavoritesFetched } from "@/stores/isDataFetched";

function FavoritesList({favorites}: {favorites: any}) {
    return(
        <ul className="flex flex-wrap w-full h-full">
            {favorites?.map((post, index) => (
                <li key={index} className="w-1/3 px-2">
                    <a href={`/shop/${post.slug}/`}>
                        <img className="w-full h-auto" draggable='false' height={613} width={613} src={post.data.image} alt="" 
                    />
                    <h4 className="flex content-center justify-center title p-4">       
                        {post.data.title}
                    </h4>
                </a>
            </li>
            ))}
        </ul>
    )
}

function PostList({favorites}: {favorites: any}) {
    // const [isLoading, setIsLoading] = useState(true);
    const favoriteIds = useStore($favorites);
    const isFavoritesFetched = useStore($isFavoritesFetched);
    const filteredFavorites = favorites.filter((post: any) => favoriteIds?.includes(post.data.id));
    useEffect(() => {
        if(!isFavoritesFetched){
            getFavorites();
            $isFavoritesFetched.set(true);
        }
        // setIsLoading(false);
    }, []);
    return (
        filteredFavorites.length > 0 ? <FavoritesList favorites={filteredFavorites} /> : <p className="flex items-center justify-center text-6xl w-full min-h-96">No items</p>
    )
}

export default PostList;