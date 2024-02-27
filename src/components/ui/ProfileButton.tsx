import { useState, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { $userSession } from "@/stores/user";
import { useStore } from "@nanostores/react";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { cleanStores } from "nanostores";

interface ProfileButtonProps {
  email: string;
  accessToken: any | undefined
}

interface TokenExtended extends JwtPayload {
  session_id: string;
  email: string;
}

const ProfileButton = (props : ProfileButtonProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { email, accessToken } = props;
  const user = useStore($userSession);

  // const decodedToken : TokenExtended = jwtDecode(accessToken.value as string);

  useEffect(() => {
    setIsLoading(false);
    // console.log("user", user, email);
    // if(decodedToken && user?.session_id !== decodedToken.session_id){
    //   $userSession.set( 
    //     {
    //       session_id: decodedToken.session_id || "",
    //       email: decodedToken.email || "",
    //       iat: decodedToken.iat || 0,
    //       exp: decodedToken.exp || 0,
    //     }
    //   );
    // }
  }, []);

  if (isLoading) {
      return (
        <img width="40" height="40" src="https://img.icons8.com/parakeet-line/96/test-account.png" alt="test-account"/>
      )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage className="bg-white hover:bg-gray-300 rounded-full" src="https://img.icons8.com/parakeet-line/96/test-account.png" />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem>{email || ""}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Subscription</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <form action="/api/auth/signout">
            <button type="submit">Sign out</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;