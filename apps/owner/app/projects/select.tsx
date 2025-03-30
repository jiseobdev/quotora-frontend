import { data, UNSAFE_ErrorResponseImpl } from "react-router";
import type { Route } from "./+types/select";
import { getAccessToken } from "~/auth.server";

export async function action({ request, params: { id, proposalId } }: Route.ActionArgs) {
  const token = await getAccessToken(request);

  const response = await fetch(new URL(`/api/v1/orderer/rfps/${id}/proposals/${proposalId}/select`, process.env.BACKEND_API_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      throw new UNSAFE_ErrorResponseImpl(
        response.status,
        response.statusText,
        { request: { id, proposalId }, response: await response.text() },
      );
    } else {
      throw new Error(
        [response.status, response.statusText, await response.text()].filter(Boolean).join(' '),
        { cause: response }
      );
    }
  }

  return data({ success: true });
}
