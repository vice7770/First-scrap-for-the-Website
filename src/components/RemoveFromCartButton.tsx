import React from "react";
import {Button} from "@/components/ui/button";
import { $cart, removeCartItemsOffline } from "@/stores/cart";
import type { ShoppingSession } from "@/utils/types/cart";

async function removeFromCart({id}: {id: string}) {
    removeCartItemsOffline(id);
    const localCart = $cart.get();
    try {
        const resShoppingSession = await fetch("/api/shoppingSession", {
            method: "POST",
            body: JSON.stringify({ sessionId: localCart?.id, quantity: localCart?.totalQuantity, totalAmount: localCart?.cost.subtotalAmount.amount }),
        });

        if (!resShoppingSession.ok) {
            throw new Error("error at shopping session fetch");
        }

        const shoppingSession : ShoppingSession[] = await resShoppingSession.json();
        const resNodeList = await fetch("/api/nodeList", {
            method: "DELETE",
            body: JSON.stringify({ sessionId: shoppingSession[0].id, itemId: id}),
        });

        if (!resNodeList.ok) {
            throw new Error("error at node list fetch");
        }

    } catch (error) {
        console.error(error);

        // If the API call fails, revert the UI back to its previous state
        // removeCartItemOffline(item.id)
    }
}

export default function RemoveFromCartButton({id}: {id: string}) {
    return <Button className="bg-red-500 text-white text-lg px-4 py-2 rounded mb-2 w-[175px] h-[50px]" onClick={() => removeFromCart({id})}>Remove from cart</Button>;
}


