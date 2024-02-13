import React, { useEffect, useState } from "react";
import {Button} from "@/components/ui/button";
import { addCartItemOffline } from "@/stores/cart";

async function addToCart({id, quantity, price, imageUrl, name}: {id: string, quantity: number, price: number, imageUrl: string, name: string}) {
    addCartItemOffline({
        id: id,
        price: price,
        quantity: quantity,
        imageUrl: imageUrl,
        name: name
    });
}

export default function AddToCartButton({id, quantity, price, imageUrl, name}: {id: string, quantity: number, price: number, imageUrl: string, name: string}) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <Button className="bg-blue-500 text-white text-lg px-4 py-2 rounded-3xl mb-2 w-[250px] h-[50px]">Add to cart</Button>
        )
    }
    return <Button className="bg-blue-500 text-white text-lg px-4 py-2 rounded-3xl mb-2 w-[250px] h-[50px]" onClick={() => addToCart({id, quantity, price, imageUrl, name})}>Add to cart</Button>;
}


