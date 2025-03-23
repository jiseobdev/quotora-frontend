import { data, UNSAFE_ErrorResponseImpl } from "react-router";
import type { Route } from "./+types/finalize";
import { getAccessToken } from "~/auth.server";

export async function action({ request, params: { id } }: Route.ActionArgs) {
  const token = await getAccessToken(request);

  const response = await fetch(new URL(`/api/v1/orderer/rfps/${id}/finalize`, process.env.BACKEND_API_URL), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new UNSAFE_ErrorResponseImpl(
      response.status,
      response.statusText,
      null,
    );
  }

  return data({ success: true });
}
