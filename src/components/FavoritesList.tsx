import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { $favorites, getFavorites } from "@/stores/favorites";
import { useStore } from "@nanostores/react";
import { $isFavoritesFetched } from "@/stores/isDataFetched";

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
        <ul className="flex flex-wrap w-full h-[613px]">
            {
                filteredFavorites.length > 0 ? filteredFavorites?.map((post, index) => (
                    <li key={index} className="w-1/3 px-2">
                        <a href={`/shop/${post.slug}/`}>
                            <img className="w-full h-auto" draggable='false' height={613} width={613} src={post.data.image} alt="" 
                        />
                            <h4 className="flex content-center justify-center title p-4">       
                                {post.data.title}
                            </h4>
                        </a>
                    </li>
                )) : <p className="flex items-center justify-center text-6xl w-full h-full">No items</p>
            }
        </ul>
    )
}

export default PostList;