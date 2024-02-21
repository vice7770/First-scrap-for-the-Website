import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const GET: APIRoute = async ({ url }) => {
  const sessionId = await url.searchParams.get('sessionId');
  const intSessionId = parseInt(sessionId || '');
  const { data, error } = await supabase
    .from('node_list')
    .select('*')
    .eq('session_id', sessionId);
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
  const { sessionId, quantity, itemId, totalAmount } = await request.json();
  const { data : userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;
  //If record hasm session_id and user_id, update the quantity and total
  const { data, error } = await supabase
    .from('node_list')
    .select('*')
    .eq('session_id', sessionId)
    .eq('user_id', userId);
  if (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 },
    );
  }
  console.log('Data', data);
  if (data && data.length > 0) {
    const { data: updateData, error } = await supabase
    .from('node_list')
    .update({ itemId: itemId , quantity: quantity, total_amount: totalAmount })
    .eq('session_id', sessionId)
    .eq('user_id', userId);

    if (error) {
      return new Response(
        JSON.stringify({
          error: error.message,
        }),
        { status: 500 },
      );
    }

    return new Response(JSON.stringify(updateData));
  }
  else {
    console.log('Inserting new node list', sessionId, userId, itemId, quantity, totalAmount);
    const { data: insertData, error } = await supabase
    .from('node_list')
    .insert({ session_id: sessionId, user_id: userId, item_id: itemId, quantity: quantity, total_amount: totalAmount });

    if (error) {
      return new Response(
        JSON.stringify({
          error: error.message,
        }),
        { status: 500 },
      );
    }

    return new Response(JSON.stringify(insertData));
  }

};
