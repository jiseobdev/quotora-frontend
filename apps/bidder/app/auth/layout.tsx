import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/layout";
import { getAccessToken } from "~/auth.server";
import { fetchCurrentUser } from "~/lib/fetch";

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getAccessToken(request);
  const user = await fetchCurrentUser(token);

  if (token && user) {
    return redirect('/projects');
  }
}

export default function Layout() {
  return <Outlet />;
}