import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const GET: APIRoute = async ({ locals, cookies, url }) => {
  const test = await url.searchParams.get('userId');
  // const { data: userData } = await supabaseSSR(cookies).auth.getSession();
  const userId = test;;
  // const userId = locals.user;
  // if (!userId) {
  //   console.log(userId)
  //   return new Response(
  //     JSON.stringify({
  //       error: "User not authenticated",
  //       data: null,
  //     }),
  //     { status: 401 },
  //   );
  // }
  const { data: favoritesData, error: favoritesError } = await supabase
    .from('favorites')
    .select('item_id')
    .eq('user_id', userId);

  if (favoritesError || !Array.isArray(favoritesData)) {
    return new Response(
      JSON.stringify({
        error: favoritesError?.message || "Invalid data",
        data: null,
      }),
      { status: 500 },
    );
  }
  const arrayOfIds = favoritesData.map((item: any) => item.item_id);
  const { data, error } = await supabase
    .from('shop')
    .select('*')
    .in('id', arrayOfIds);

  if (error || !Array.isArray(data)) {
    return new Response(
      JSON.stringify({
        error: error?.message || "Invalid data",
        data: null,
      }),
      { status: 500 },
    );
  }
  

  return new Response(JSON.stringify({data, error: null}));
}