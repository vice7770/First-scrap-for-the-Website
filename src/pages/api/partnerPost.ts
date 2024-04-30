import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";



export const POST: APIRoute = async ({ request, redirect }) => {
  const body = await request.json();
  const fileName =  body.username + '.json';
  const fileContent = new Blob([JSON.stringify(body)], { type: 'application/json' });

  const { error } = await supabase
    .storage
    .from('Partners')
    .upload(fileName, fileContent, {
      cacheControl: '3600',
      upsert: true,
  });
  if (error) {
      console.error('Error uploading file:', error);
      // Handle error...
    }
  return redirect("/joinUs");
};