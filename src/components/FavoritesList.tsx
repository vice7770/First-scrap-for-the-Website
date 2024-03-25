import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { $favorites, getFavorites } from "@/stores/favorites";
import { useStore } from "@nanostores/react";
import { $isFavoritesFetched } from "@/stores/isDataFetched";
import type { shopResult } from "@/utils/schemas";
import type { z } from "zod";

import { cld } from "@/consts";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { auto } from "@cloudinary/url-gen/qualifiers/format";


type ShopData = z.infer<typeof shopResult>;

function FavoritesList({favorites}: {favorites: ShopData}) {
    const urlImages = favorites?.map((favorite) => {
        const image = cld.image(favorite.public_id).delivery(quality('auto:eco')).delivery(format(auto()));
        image.resize(scale().width(650).height(650).aspectRatio("1.0"));
        return image.toURL();
    });
    return(
        <ul className="flex flex-wrap w-full h-full">
            {favorites?.map((favorite, index) => (
                <li key={index} className="w-1/3 px-2">
                    <a href={`/shop/${favorite.id}/`}>
                        <img className="w-full h-auto" draggable='false' height={613} width={613} src={urlImages[index]} alt="" 
                    />
                    <h4 className="flex content-center justify-center title p-4">       
                        {favorite.name}
                    </h4>
                </a>
            </li>
            ))}
        </ul>
    )
}

function PostList({favorites}: {favorites: ShopData}) {
    // const [isLoading, setIsLoading] = useState(true);
    const favoriteIds = useStore($favorites);
    const isFavoritesFetched = useStore($isFavoritesFetched);
    useEffect(() => {
        if(!isFavoritesFetched){
            getFavorites();
            $isFavoritesFetched.set(true);
        }
        // setIsLoading(false);
    }, []);
    return (
        favoriteIds && favoriteIds.length > 0 ? <FavoritesList favorites={favorites} /> : <p className="flex items-center justify-center text-6xl w-full min-h-96">No items</p>
    )
}

export default PostList;