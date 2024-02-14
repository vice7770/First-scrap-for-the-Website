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
  const { sessionId, quantity } = await request.json();
  const { data, error } = await supabase
    .from('node_list')
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
