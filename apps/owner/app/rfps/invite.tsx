import { getAccessToken } from "~/auth.server";
import type { Route } from "./+types/invite";
import { data, UNSAFE_ErrorResponseImpl } from "react-router";

export async function action({ request, params: { id } }: Route.ActionArgs) {
  const token = await getAccessToken(request);

  const formData = await request.formData();
  const emails = formData.getAll('emails');
  const permission = formData.get('permission');

  const body = { emails, permission };

  const response = await fetch(new URL(`/api/v1/orderer/rfps/${id}/colleagues/invite`, process.env.BACKEND_API_URL), {
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
        { request: body, response: await response.json() },
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
