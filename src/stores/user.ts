import type { z } from "zod";
import { persistentAtom, } from "@nanostores/persistent";
import { userSession } from "@/utils/schemas";
import { onMount } from "nanostores";
import Cookies from "js-cookie";
import { jwtDecode, type JwtPayload } from "jwt-decode";

export interface TokenExtended extends JwtPayload {
  session_id: string;
  email: string;
}

export type UserSession = z.infer<typeof userSession>;

const noUser = {
  session_id: "",
  email: "",
  iat: 0,
  exp: 0,
} as UserSession;

export const $userSession = persistentAtom<z.infer<typeof userSession>>(
    "userSession",
    null,
    {
      encode: JSON.stringify,
      decode: JSON.parse,
    }
);

onMount($userSession, () => {
  const accessToken = Cookies.get("sb-access-token");
  if(accessToken){
    const decodedToken : TokenExtended = jwtDecode(accessToken as string);
    console.log("OnMount", Cookies.get("sb-access-token"));
    $userSession.set( 
      {
        session_id: decodedToken.session_id || "",
        email: decodedToken.email || "",
        iat: decodedToken.iat || 0,
        exp: decodedToken.exp || 0,
      }
    );
  }
  else {
    //clean all stores
    $userSession.set(null);
  }
});