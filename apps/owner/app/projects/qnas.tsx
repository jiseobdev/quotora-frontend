import { getAccessToken } from "~/auth.server";
import type { Route } from "./+types/qnas";
import { data } from "react-router";
import { fetchQnas } from "~/lib/fetch";

export async function loader({ request, params: { id } }: Route.LoaderArgs) {
  const token = await getAccessToken(request);

  const qnas = await fetchQnas(id, token);

  return data({ qnas });
}

export async function action({ request, params: { id } }: Route.ActionArgs) {

}
