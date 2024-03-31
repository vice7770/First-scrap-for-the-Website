import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const GET: APIRoute = async ({ locals }) => {
  // const { data: userData } = await supabase.auth.getUser();
  // const userId = userData?.user?.id;
  if (!locals.user) {
    return new Response(
      JSON.stringify({
        error: "User not authenticated",
      }),
      { status: 401 },
    );
  }

  const { data: favoritesData, error: favoritesError } = await supabase
    .from('favorites')
    .select('item_id')
    .eq('user_id', locals.user);

  if (favoritesError || !Array.isArray(favoritesData)) {
    return new Response(
      JSON.stringify({
        error: favoritesError?.message || "Invalid data",
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
      }),
      { status: 500 },
    );
  }

  return new Response(JSON.stringify(data));
}