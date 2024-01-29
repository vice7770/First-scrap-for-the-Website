import { useEffect, useState} from "react";

function gotoFavorite() {
    
}
 
const CartIcon = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <button className=" bg-white hover:bg-gray-300 rounded-full">
                <img width="40" height="40" src="https://img.icons8.com/sf-ultralight/50/hearts.png" alt="hearts"/>
            </button>
        )
    }

    return (
        <button className=" bg-white hover:bg-gray-300 rounded-full">
            <img width="40" height="40" src="https://img.icons8.com/sf-ultralight/50/hearts.png" alt="hearts"/>
        </button>
    )
}

export default CartIcon;