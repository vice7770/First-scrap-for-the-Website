import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const { data: postSubscriberData, error: postSubscriberError} = await supabase
    .from('subscribers')
    .select('email')
    .eq('email', email)
  if (postSubscriberError) {
    return new Response(
      JSON.stringify({
        error: postSubscriberError.message,
      }),
      { status: 500 },
    );
  }
  if (postSubscriberData && postSubscriberData.length === 0) {
    const { error: newSubscriberError } = await supabase
      .from('subscribers')
      .insert({ email: email })
    if (newSubscriberError) {
      return new Response(
        JSON.stringify({
          error: newSubscriberError.message,
        }),
        { status: 500 },
      );
    }
  }

  return redirect("/joinUsRedirect");
};