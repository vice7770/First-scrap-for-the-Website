import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

// export async function addFavorite(id: number) {
//     const { data, error } = await supabase
//         .from('favorites')
//         .insert({ user_id: userId, item_id: id });
    
//     if (error) {
//         console.error('Error adding favorite: ', error);
//         return null;
//     }
    
//     return data;
// }

export const GET: APIRoute = async ({url}) => {
  // const { data : userData } = await supabase.auth.getUser();
  // const userId = userData?.user?.id;
  const userId = await url.searchParams.get('userId');
  const { data, error } = await supabase
    .from('favorites')
    .select('item_id')
    .eq('user_id', userId);

  if (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 },
    );
  }

  return new Response(JSON.stringify(data));
}

export const POST: APIRoute = async ({ request }) => {
  const { id } = await request.json();
  const { data : userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  // Check if a record with the same user_id and item_id already exists
  const { data: existingFavorite, error: fetchError } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('item_id', id);

  if (fetchError) {
    return new Response(
      JSON.stringify({
        error: fetchError.message,
      }),
      { status: 500 },
    );
  }

  // If a record already exists, return an error
  if (existingFavorite && existingFavorite.length > 0) {
    return new Response(
      JSON.stringify({
        error: 'This item is already a favorite',
      }),
      { status: 400 },
    );
  }

  // If no record exists, insert a new one
  const { data, error } = await supabase
    .from('favorites')
    .insert({ user_id: userId, item_id: id });

  if (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 },
    );
  }

  return new Response(JSON.stringify(data));
};

export const DELETE: APIRoute = async ({ request }) => {
  const { id } = await request.json();
  const { data : userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  const { data, error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('item_id', id);

  if (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 },
    );
  }

  return new Response(JSON.stringify(data));
}




