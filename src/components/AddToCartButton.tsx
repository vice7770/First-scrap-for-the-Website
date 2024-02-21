import React, { useEffect, useState } from "react";
import {Button} from "@/components/ui/button";
import { $cart, addCartItemOffline, addSubtotalAmount, addTotalQuantity, getExistingQuantity, updateNodes, findNode } from "@/stores/cart";
import type { Node, NodeList, ShoppingSession } from "@/utils/types/cart";

async function addToCart(item: {id: string, quantity: number, price: number, imageUrl: string, name: string}) {
    addCartItemOffline(item);
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
        const node : Node = findNode(localCart?.lines.nodes, item.id);
        const resNodeList = await fetch("/api/nodeList", {
            method: "POST",
            body: JSON.stringify({ sessionId: shoppingSession[0].id, quantity: node.quantity, totalAmount: node.cost.subtotalAmount.amount ,itemId: item.id}),
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

export default function AddToCartButton({id, quantity, price, imageUrl, name, isAuth}: {id: string, quantity: number, price: number, imageUrl: string, name: string, isAuth: boolean}) {
    const [isLoading, setIsLoading] = useState(true);
    const item = {id, quantity, price, imageUrl, name};
    useEffect(() => {
        setIsLoading(false);
        // if(!isAuth){
        //     // cleanCart();
        // }
        // else {
        //     getFavorites();
        // }
    }, []);

    if (isLoading) {
        return (
            <Button className="bg-blue-500 text-white text-lg px-4 py-2 rounded-3xl mb-2 w-[250px] h-[50px]">Add to cart</Button>
        )
    }
    return (
      <Button
        className="mb-2 h-[50px] w-[250px] rounded-3xl bg-blue-500 px-4 py-2 text-lg text-white"
        onClick={() => {
            if (isAuth) {
                addToCart(item);
            }
            else {
                addCartItemOffline(item);
            }

        }}
      >
        Add to cart
      </Button>
    );
}