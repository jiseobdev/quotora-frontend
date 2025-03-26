import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/layout";
import { getAccessToken } from "~/auth.server";
import { fetchCurrentUser } from "~/lib/fetch";

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const token = await getAccessToken(request);
    const user = await fetchCurrentUser(token);

    if (token && user) {
      return redirect('/projects');
    }
  } catch (error: unknown) { }
}

export default function Layout() {
  return <Outlet />;
}