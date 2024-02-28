import { useEffect, useState } from "react";
import {Button} from "@/components/ui/button";
import { addCartItemOffline, postCartItemToServer } from "@/stores/cart";
import { useDebouncedCallback } from 'use-debounce';

// async function addToCart(item: {id: string, quantity: number, price: number, imageUrl: string, name: string}) {
//     addCartItemOffline(item);
//     postCartItemToServer(item);
// }

export default function AddToCartButton({id, quantity, price, imageUrl, name, isAuth}: {id: string, quantity: number, price: number, imageUrl: string, name: string, isAuth: boolean}) {
    const [isLoading, setIsLoading] = useState(true);
    const item = {id, quantity, price, imageUrl, name};
    const debouncedPostCartItemToServer = useDebouncedCallback((value) => postCartItemToServer(value), 800);
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
                addCartItemOffline(item);
                debouncedPostCartItemToServer(item);
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