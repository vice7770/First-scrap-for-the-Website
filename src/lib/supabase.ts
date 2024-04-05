import { createClient } from "@supabase/supabase-js";
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import type { AstroCookies } from "astro";


export const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY,
  {
    auth: {
      flowType: "pkce",
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: true,
    },
  },
);

export const supabaseSSR = (cookies: CookieOptions ) => {
  return createServerClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_ANON_KEY,
    {
      cookies: {
        get(key) {
          return cookies.get(key)?.value
        },
        set(key, value, options) {
          cookies.set(key, value, options)
        },
        remove(key, options) {
          cookies.delete(key, options)
        },
      },
    }
  )
}