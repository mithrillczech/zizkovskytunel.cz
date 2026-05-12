/**
 * Supabase client stubs.
 *
 * Phase 1 (current): these are not called — all content comes from i18n JSON.
 * Phase 2: uncomment and use these clients when Supabase CMS is integrated.
 *
 * Server client is used in Server Components and API routes.
 * Browser client is used in Client Components.
 */

// import { createBrowserClient } from "@supabase/ssr";
// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Placeholder — prevents import errors before env vars are configured
export const supabaseConfig = {
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY,
  isConfigured: Boolean(SUPABASE_URL && SUPABASE_ANON_KEY),
};

/*
 * --- Future browser client (Client Components) ---
 *
 * export function createSupabaseBrowserClient() {
 *   return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
 * }
 *
 * --- Future server client (Server Components / Route Handlers) ---
 *
 * export async function createSupabaseServerClient() {
 *   const cookieStore = await cookies();
 *   return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
 *     cookies: {
 *       getAll() { return cookieStore.getAll(); },
 *       setAll(cookiesToSet) {
 *         cookiesToSet.forEach(({ name, value, options }) =>
 *           cookieStore.set(name, value, options)
 *         );
 *       },
 *     },
 *   });
 * }
 */
