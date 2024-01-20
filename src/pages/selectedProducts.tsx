import React, { useState, useEffect } from "react";
import { cart } from "@/stores/cart";
import { useStore } from "@nanostores/react";
import RemoveFromCartButton from "@/components/RemoveFromCartButton";


export default function SelectedProducts() {
    const $cart = useStore(cart);
    const selectedProducts = $cart ? $cart.lines.nodes : [];
    return (
        selectedProducts.map(product => (
            <div className="flex mb-4">
                <div className="mr-6">
                    <img src={product.imageUrl} draggable="false" width="236" height="236"  alt="ProductImage" />
                </div>
                <div className="flex w-full">
                    <div className=" w-3/4">
                        <h3 className="text-xl">{product.title}</h3>
                        {product && <p>Color: Green</p>}
                        <p>Quantity: {product.quantity}</p>
                    </div>
                    <div className="w-1/4 ">
                        <p>${parseInt(product.cost.subtotalAmount.amount)}</p>
                        {/* <button className="bg-red-500 text-white px-2 py-1 rounded">Remove</button> */}
                        <RemoveFromCartButton id={product.id}/>
                    </div>
                </div>
            </div>
        ))
    );
}
