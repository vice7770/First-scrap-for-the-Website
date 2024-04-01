import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const GET: APIRoute = async ({ locals }) => {
  // const { data: userData } = await supabase.auth.getUser();
  const userId = locals.user;
  if (!userId) {
    console.log(userId)
    return new Response(
      JSON.stringify({
        error: "User not authenticated",
      }),
      { status: 401 },
    );
  }
  console.log(userId)
  const { data: favoritesData, error: favoritesError } = await supabase
    .from('favorites')
    .select('item_id')
    .eq('user_id', userId);

  if (favoritesError || !Array.isArray(favoritesData)) {
    return new Response(
      JSON.stringify({
        error: favoritesError?.message || "Invalid data",
      }),
      { status: 500 },
    );
  }
  console.log(favoritesData)
  const arrayOfIds = favoritesData.map((item: any) => item.item_id);
  const { data, error } = await supabase
    .from('shop')
    .select('*')
    .in('id', arrayOfIds);

  if (error || !Array.isArray(data)) {
    return new Response(
      JSON.stringify({
        error: error?.message || "Invalid data",
      }),
      { status: 500 },
    );
  }
  

  return new Response(JSON.stringify(data));
}