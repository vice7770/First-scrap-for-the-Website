import React from "react";
import {Button} from "@/components/ui/button";
import { addCartItemOffline } from "@/stores/cart";

async function addToCart({id, quantity, price}: {id: string, quantity: number, price: number}) {
    console.log("Adding to cart...");
    addCartItemOffline({
        id: id,
        price: price,
        quantity: quantity,
    });
}

export default function AddToCartButton({id, quantity, price}: {id: string, quantity: number, price: number}) {
    return <Button className="bg-blue-500 text-white text-lg px-4 py-2 rounded mb-2 w-[175px] h-[50px]" onClick={() => addToCart({id, quantity, price})}>Add to cart</Button>;
}


