/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface ImportMetaEnv {
    readonly SUPABASE_URL: string
    readonly SUPABASE_ANON_KEY: string
    readonly CLOUDINARY_CLOUD_NAME: string
    readonly CLOUDINARY_API_KEY: string
    readonly CLOUDINARY_API_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace App {
  interface Locals {
    user: {
        email: string
    }
  }
}