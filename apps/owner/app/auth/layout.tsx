import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/layout";
import { accessTokenCookie } from "~/auth.server";
import { fetchCurrentUser } from "~/lib/fetch";

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const accessToken = await accessTokenCookie.parse(cookieHeader);

  const user = await fetchCurrentUser();

  if (accessToken && user) {
    return redirect('/projects');
  }
}

export default function Layout() {
  return <Outlet />;
}