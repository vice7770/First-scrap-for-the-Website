import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const GET: APIRoute = async () => {
  const { data : userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;
  const { data, error } = await supabase
    .from('shopping_session')
    .select('*')
    .eq('user_id', userId)
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

export const POST: APIRoute = async ({ request }) => {
  const { sessionId, quantity, totalAmount } = await request.json();
  // Check if a record with the same user_id and item_id already exists
  const { data, error } = await supabase
    .from('shopping_session')
    .select('*')
    .eq('session_id', sessionId)
    .eq('user_id', quantity)
  if (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 },
    );
  }

  if (data && data.length > 0) {
    const { data, error } = await supabase
    .from('shopping_session')
    .insert({ sub_total: totalAmount, quantity: quantity });
    return new Response(JSON.stringify(data));
  }
  //If no record exists, insert a new record
  const { data : userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;
  const { data : newSessionData, error: fetchError } = await supabase
    .from('shopping_session')
    .insert({ session_id: sessionId, user_id: userId, sub_total: totalAmount, total_quantity: quantity })
    .select('id');
  if (fetchError) {
    return new Response(
      JSON.stringify({
        error: fetchError.message,
      }),
      { status: 500 },
    );
  }

  return new Response(JSON.stringify(newSessionData));
};
