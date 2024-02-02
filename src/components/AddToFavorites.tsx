import React, { useEffect, useState } from "react";
import {Button} from "@/components/ui/button";
import { addCartItemOffline } from "@/stores/cart";

async function addToFavorites(id: {id: string}) {
    // addCartItemOffline({
    //     id: id
    // });
}

export default function AddToFavoritesButton({id}: {id: string}) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <Button className="bg-white text-black text-lg px-4 py-2 rounded-3xl mb-2 w-[250px] h-[50px]">
                <img className="mr-2" width="30" height="30" src="https://img.icons8.com/sf-ultralight/50/hearts.png" alt="hearts"/>
                Add to Favorites
            </Button>
        )
    }
    return <Button variant="outline" className="bg-white text-black text-lg px-4 py-2 rounded-3xl mb-2 w-[250px] h-[50px]" onClick={() => addToFavorites({id})}>
        <img className="mr-2" width="30" height="30" src="https://img.icons8.com/sf-ultralight/50/hearts.png" alt="hearts"/>
        Add to Favorites
        </Button>;
}


