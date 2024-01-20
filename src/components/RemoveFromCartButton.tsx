import React from "react";
import {Button} from "@/components/ui/button";
import { removeCartItemsOffline } from "@/stores/cart";

async function removeFromCart({id}: {id: string}) {
    removeCartItemsOffline(id);
}

export default function RemoveFromCartButton({id}: {id: string}) {
    return <Button className="bg-red-500 text-white text-lg px-4 py-2 rounded mb-2 w-[175px] h-[50px]" onClick={() => removeFromCart({id})}>Remove from cart</Button>;
}


