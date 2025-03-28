import { data } from "react-router";
import type { Route } from "./+types/current-user";
import { getAccessToken } from "~/auth.server";
import { fetchCurrentUser } from "~/lib/fetch";

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getAccessToken(request);
  const user = await fetchCurrentUser(token);

  return data({ user });
}
