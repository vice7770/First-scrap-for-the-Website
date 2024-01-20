import React, { useState, useEffect } from "react";
import { cart } from "@/stores/cart";
import { useStore } from "@nanostores/react";
import RemoveFromCartButton from "@/components/RemoveFromCartButton";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const SkeletonComponent = () => {
    return (
        <div className="flex mb-4 h-[191px]">
            <div className="mr-6">
                <Skeleton className="w-[191px] h-[191px]"/>
            </div>
            <div className="flex w-full">
                <div className=" w-3/4">
                    <Skeleton className="w-36 h-6 mb-4"/>
                    <Skeleton className="w-24 h-4 mb-4"/>
                    <Skeleton className="w-24 h-4 mb-4"/>
                </div>
                <div className="w-1/4 ">
                    <Skeleton className="w-24 h-6 mb-7"/>
                </div>
            </div>
        </div>
    )
}

export default function SelectedProducts() {
    const [isLoading, setIsLoading] = useState(true);
    const $cart = useStore(cart);
    const selectedProducts = $cart ? $cart.lines.nodes : [];

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            Array.from({ length: 5 }).map((_, index) => (
                <SkeletonComponent key={index} />
            ))
        )
    }

    return (
        selectedProducts.map(product => (
            <div className="flex mb-4">
                <div className="mr-6">
                    <img src={product.imageUrl} draggable="false" width="236" height="236"  alt="ProductImage" />
                </div>
                <div className="flex w-full">
                    <div className="w-3/4">
                        <h3 className="text-xl">{product.title}</h3>
                        {product && <p>Color: Green</p>}
                        <p>Quantity: {product.quantity}</p>
                    </div>
                    <div className="w-1/4">
                        <p>${parseInt(product.cost.subtotalAmount.amount)}</p>
                        {/* <button className="bg-red-500 text-white px-2 py-1 rounded">Remove</button> */}
                        <RemoveFromCartButton id={product.id}/>
                    </div>
                </div>
            </div>
        ))
    );
}
