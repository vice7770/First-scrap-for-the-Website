import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { $shop, getShop } from "@/stores/shop";
import { $isShopFetched } from "@/stores/isDataFetched";
import { useStore } from "@nanostores/react";
function PostList() {
    const [isLoading, setIsLoading] = useState(true);
    const shop = useStore($shop);
    useEffect(() => {
        const isFetched = $isShopFetched.get();
        setIsLoading(false);
        if(!isFetched) {
            getShop()
            $isShopFetched.set(true);
        }
    }, []);

    if (isLoading) {
        return (
            <ul className="flex flex-wrap w-full h-full">
            {
                Array.from({ length: 9 }).map((_, index) => (
                    <li key={index} className="w-1/3 px-2">
                        <Skeleton className="w-[613px] h-[613px]"/>
                    </li>
                ))
            }
            </ul>
        )
    }
    return (
        <ul className="flex flex-wrap w-full h-full">
            {
                shop?.map((post) => (
                    <li className="w-1/3 px-2">
                        <a href={`/shop/${post?.id}/`}>
                            {/* <img className="w-full h-auto" height={613} width={613} src={post.data.image} alt="" /> */}
                            <h4 className="flex content-center justify-center title p-4">{post?.name}</h4>
                        </a>
                    </li>
                ))
            }
        </ul>
    )
}

export default PostList;