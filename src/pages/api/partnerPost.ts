import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";
import { type ProfileFormValues } from "../../components/PartnerForm"
import { red } from "@cloudinary/url-gen/actions/adjust";


//Store file in Supabase Storage by email

// export const POST: APIRoute = async ({ request, redirect }) => {
//   const body = await request.json();
//   const fileName =  body.email + '.json';
//   const fileContent = new Blob([JSON.stringify(body)], { type: 'application/json' });

//   const { error } = await supabase
//     .storage
//     .from('Partners')
//     .upload(fileName, fileContent, {
//       cacheControl: '3600',
//       upsert: true,
//   });
//   if (error) {
//       console.error('Error uploading file:', error);
//       // Handle error...
//     }
//   return redirect("/joinUs");
// };

export const POST: APIRoute = async ({ request, redirect }) => {
  const { bio, email, username, urls} = await request.json() as ProfileFormValues;
  const urlList = urls?.map((url) => url.value);

  const { error } = await supabase
  .from('partners')
  .upsert({ user_name:username, email: email, bio: bio, url_list: urlList }, {onConflict: 'email'})
  if (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 },
    );
  }
  const { data: postSubscriberData, error: postSubscriberError} = await supabase
    .from('subscribers')
    .select('email')
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
