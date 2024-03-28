import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const GET: APIRoute = async ({ request }) => {
  const { data: leaderboardData, error: leaderboardError } = await supabase
    .from('leaderboard')
    .select('item_id')
    .order('item_visits', { ascending: false }) // Order by 'id' in descending order
    .limit(5); 
  if (leaderboardError) {
    return new Response(
      JSON.stringify({
        error: leaderboardError.message,
      }),
      { status: 500 },
    );
  }

  const { data, error } = await supabase
    .from('shop')
    .select('*')
    .in('id', leaderboardData.map((entry) => entry.item_id));
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