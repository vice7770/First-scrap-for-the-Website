import { defineMiddleware } from "astro:middleware";
import { supabase, supabaseSSR } from "../lib/supabase";
import micromatch from "micromatch";
import type { Session, User } from "@supabase/supabase-js";
import type { AstroCookies } from "astro";

const protectedRoutes = ["/profile(|/)", "/billing(|/)"];
const redirectRoutes = ["/signin(|/)"];

type data = {
  user: User | null;
  session: Session | null;
}

function cleanCookies(cookies : AstroCookies) {
  // const cookies = document.cookie.split(";");
  // for (let i = 0; i < cookies.length; i++) {
  //   const cookie = cookies[i];
  //   const eqPos = cookie.indexOf("=");
  //   const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  //   document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  // }
  cookies.delete("sb-access-token", {
    path: "/",
  });
  cookies.delete("sb-refresh-token", {
    path: "/",
  });
}

export const onRequest = defineMiddleware(
  async ({ locals, url, cookies, redirect }, next) => {
    const accessToken = cookies.get("sb-access-token");
    const refreshToken = cookies.get("sb-refresh-token");
    const { data, error } = await supabase.auth.getSession();
    // // if (data && data.session?.user.id !== undefined ) {
    //   locals.user = data.session?.user.id;
    // }
    if (!accessToken || !refreshToken) {
      cleanCookies(cookies);
      // cleanStores($cart);
      // $cart.set(null);
      if (micromatch.isMatch(url.pathname, protectedRoutes)) {
        return redirect("/signin");
      }
    }
    //this supabase validation makes code to slow on every page load 
    //this need to be better managed
    else if(accessToken && refreshToken) {
      if(data === undefined) {
        const { data, error } = await supabase.auth.setSession({
          refresh_token: refreshToken.value,
          access_token: accessToken.value,
        });
      if (error) {
        cleanCookies(cookies);
        return redirect("/signin");
      }
      // supabaseSSR(cookies).auth.setSession({
      //   refresh_token: refreshToken.value,
      //   access_token: accessToken.value,
      // });
      cookies.set("sb-access-token", data?.session?.access_token!, {
        sameSite: "strict",
        path: "/",
        secure: true,
      });
      cookies.set("sb-refresh-token", data?.session?.refresh_token!, {
        sameSite: "strict",
        path: "/",
        secure: true,
      });
    }
    
    //   if (error) {
    //     cleanCookies(cookies);
    //     // cleanStores($cart);
    //     return redirect("/signin");
    //   }

    //   // locals.user.email = data?.user?.email || "";
    //   // console.log("user email", data?.user?.email, locals);
    
    // }
    // locals.user = {
    //   email: accessToken.,
    };
    return next();
  },
);