import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

function PostList({posts}: {posts: any}) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <ul className="flex flex-wrap w-full h-full">
            {
                posts?.map((post: any, index: React.Key | null | undefined) => (
                    <li key={index} className="w-1/3 px-2">
                        <a href={`/shop/${post.slug}/`}>
                            <Skeleton className="w-[613px] h-[613px]"/>
                            <h4 className="flex content-center justify-center title p-4">{post.data.title}</h4>
                        </a>
                    </li>
                ))
            }
            </ul>
        )
    }
    return (
        <ul className="flex flex-wrap w-full h-full">
            {
                posts?.map((post) => (
                    <li className="w-1/3 px-2">
                        <a href={`/shop/${post.slug}/`}>
                            <img className="w-full h-auto" height={613} width={613} src={post.data.image} alt="" />
                            <h4 className="flex content-center justify-center title p-4">{post.data.title}</h4>
                        </a>
                    </li>
                ))
            }
        </ul>
    )
}

export default PostList;