import React, { useEffect, useState } from "react";
import {Button} from "@/components/ui/button";
import { addCartItemOffline } from "@/stores/cart";

async function addToCart({id, quantity, price, imageUrl, title}: {id: string, quantity: number, price: number, imageUrl: string, title: string}) {
    addCartItemOffline({
        id: id,
        price: price,
        quantity: quantity,
        imageUrl: imageUrl,
        title: title
    });
}

export default function AddToCartButton({id, quantity, price, imageUrl, title}: {id: string, quantity: number, price: number, imageUrl: string, title: string}) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <Button className="bg-blue-500 text-white text-lg px-4 py-2 rounded mb-2 w-[175px] h-[50px]">Add to cart</Button>
        )
    }
    return <Button className="bg-blue-500 text-white text-lg px-4 py-2 rounded mb-2 w-[175px] h-[50px]" onClick={() => addToCart({id, quantity, price, imageUrl, title})}>Add to cart</Button>;
}


