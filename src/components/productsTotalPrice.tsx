import React, { useState, useEffect } from "react";
import { cart } from "@/stores/cart";
import { useStore } from "@nanostores/react";
import { Skeleton } from "@/components/ui/skeleton";


export default function ProductsTotalPrice() {
    const [isLoading, setIsLoading] = useState(true);
    const $cart = useStore(cart);
    const totalAmount = $cart ? $cart.cost.subtotalAmount.amount : 0;
    const shippingHandling = 10;

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <>
                <div className="flex ">
                    <p className="mr-2">Subtotal: $</p>
                    <Skeleton className="mt-1 w-24 h-6" />
                </div>
                <div className="flex">
                    <p className="mr-2">Estimated Shipping & Handling: $</p>
                    <Skeleton className="mt-1 w-24 h-6" />
                </div>
                <div className="flex">
                    <p className="mr-2">Total: $</p>
                    <Skeleton className="mt-1 w-24 h-6" />
                </div>
            </>
        )
    }
    return(
        <>
            <p>Subtotal: ${totalAmount}</p>
            <p>Estimated Shipping & Handling: ${shippingHandling}</p>
            <p>Total: ${ totalAmount ?? 0  + shippingHandling}</p>
        </>
    )
}
