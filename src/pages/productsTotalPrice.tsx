import React, { useState, useEffect } from "react";
import { cart } from "@/stores/cart";
import { useStore } from "@nanostores/react";


export default function ProductsTotalPrice() {
    const $cart = useStore(cart);
    const totalAmount = $cart ? $cart.cost.subtotalAmount.amount : 0;
    const shippingHandling = 10;
    return(
        <>
            <p>Subtotal: ${totalAmount}</p>
            <p>Estimated Shipping & Handling: ${shippingHandling}</p>
            <p>Total: ${ totalAmount ?? 0  + shippingHandling}</p>
        </>
    )
}
