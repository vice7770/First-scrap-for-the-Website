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
  const { sessionId, quantity } = await request.json();
  const { data, error } = await supabase
    .from('shopping_session')
    .upsert({ session_id: sessionId, quantity })
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
