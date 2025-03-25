import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/layout";
import { accessTokenCookie } from "~/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const accessToken = await accessTokenCookie.parse(cookieHeader);

  if (accessToken) {
    return redirect('/projects');
  }
}

export default function Layout() {
  return <Outlet />;
}