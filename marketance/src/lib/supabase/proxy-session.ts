import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseEnv } from "./env";

/** Pages qui exigent une connexion. */
const PROTECTED_PREFIXES = ["/compte"];

/**
 * Rafraîchit la session à chaque requête et redirige vers /connexion si une page protégée
 * est demandée sans être connecté. La vérification finale reste faite par chaque page
 * (et par la RLS en base) : le proxy n'est qu'une première barrière.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const { url, key } = supabaseEnv();
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) response.cookies.set(name, value, options);
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const isProtected = PROTECTED_PREFIXES.some((p) => request.nextUrl.pathname.startsWith(p));
  if (!data?.claims && isProtected) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/connexion";
    redirectUrl.search = "";
    redirectUrl.searchParams.set("suite", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
  return response;
}
