import { getAccessToken } from "~/auth.server";
import type { Route } from "./+types/qnas";
import { data, UNSAFE_ErrorResponseImpl } from "react-router";
import { fetchQnas } from "~/lib/fetch";

export async function loader({ request, params: { id, proposalId } }: Route.LoaderArgs) {
  const token = await getAccessToken(request);

  const qnas = await fetchQnas(proposalId, token);

  return data({ qnas });
}

export async function action({ request, params: { id, proposalId } }: Route.ActionArgs) {
  const token = await getAccessToken(request);

  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries());

  const response = await fetch(new URL(`/api/v1/orderer/rfps/${id}/proposals/${proposalId}/qnas`, process.env.BACKEND_API_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      throw new UNSAFE_ErrorResponseImpl(
        response.status,
        response.statusText,
        { request: body, response: await response.text() },
      );
    } else {
      throw new Error(
        [response.status, response.statusText, await response.text()].filter(Boolean).join(' '),
        { cause: response }
      );
    }
  }

  return data({ success: true, proposalId });
}
