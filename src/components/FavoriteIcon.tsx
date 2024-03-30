import { useEffect, useState} from "react";
import { useStore } from "@nanostores/react";

import { $isFavoritesFetched } from "@/stores/isDataFetched";
import { cleanFavorites, getFavorites } from "@/stores/favorites";

const FavoriteComponent = ({email, favoritesUrl} : {email:string, favoritesUrl:string}) => {
    return (
        <a href={email ? "/favorites" : favoritesUrl}>
            <button className=" bg-white hover:bg-gray-300 rounded-full">
                <img width="40" height="40" src="https://img.icons8.com/sf-ultralight/50/hearts.png" alt="hearts"/>
            </button>
        </a>
    )
}
 
const FavoriteIcon = ({email, favoritesUrl} : {email : string, favoritesUrl : string}) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const isFetched = $isFavoritesFetched.get();
        if(!email){
            cleanFavorites();
            return;
        }
        if(!isFetched && email) {
            getFavorites()
            $isFavoritesFetched.set(true);
        }
    }, []);
    return (
        <FavoriteComponent email={email} favoritesUrl={favoritesUrl}/>
    )
}

export default FavoriteIcon;