import { redirect } from "react-router";
import type { Route } from "./+types/redirect";

export async function loader({ params }: Route.LoaderArgs) {
  const path = params["*"];
  return redirect(`${process.env.AGORA_URL}/${path}`);
}
