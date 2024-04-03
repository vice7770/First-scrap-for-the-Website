import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import type { Provider } from "@supabase/supabase-js";
import { SITE_URL } from "@/consts";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const provider = formData.get("provider")?.toString();

  const url = new URL(request.url);
  const redirectUrl = url.searchParams.get("redirectUrl");

  const validProviders = ["github", "google", "gitlab"];
  if (provider && !validProviders.includes(provider)) {
    return new Response("Invalid provider", { status: 400 });
  }
  if (provider) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: {
        redirectTo: SITE_URL + "/api/auth/callback"
      },
    });

    if (error) {
      return new Response(error.message, { status: 500 });
    }

    return redirect(data.url);
  }

  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  const { access_token, refresh_token } = data.session;
  cookies.set("sb-access-token", access_token, {
    sameSite: "strict",
    path: "/",
    secure: true,
  });
  cookies.set("sb-refresh-token", refresh_token, {
    sameSite: "strict",
    path: "/",
    secure: true,
  });

  // const { error: errorSetsession } = await supabase.auth.setSession({
  //   refresh_token: refresh_token,
  //   access_token: access_token,
  // });

  // if (errorSetsession) {
  //   return redirect("/signin");
  // }

  return redirect(redirectUrl || "/");
};