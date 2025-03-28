import { data } from "react-router";
import { getAccessToken } from "~/auth.server";
import { fetchColleagues } from "~/lib/fetch";
import type { Route } from "./+types/colleagues";

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getAccessToken(request);
  const colleagues = await fetchColleagues(token);

  return data({ colleagues });
}
