import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const fileName =  email + '.json';
    const fileContent = new Blob([JSON.stringify(body)], { type: 'application/json' });

    console.log("body", body);

    const { error } = await supabase
        .storage
        .from('Subscribers')
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