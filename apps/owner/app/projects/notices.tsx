import { data, UNSAFE_ErrorResponseImpl } from "react-router";
import { getAccessToken } from "~/auth.server";
import type { Route } from "./+types/notices";

async function fetchReviews(id: string, token?: string) {
  const response = await fetch(new URL(`/api/v1/orderer/rfps/${id}/notices`, process.env.BACKEND_API_URL), {
    method: 'GET',
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
        null,
      );
    } else {
      throw new Error(
        [response.status, response.statusText, await response.text()].filter(Boolean).join(' '),
        { cause: response }
      );
    }
  }

  const result: Notice[] = await response.json();

  return result;
}

export async function loader({ request, params: { id } }: Route.LoaderArgs) {
  const token = await getAccessToken(request);

  const reviews = await fetchReviews(id, token);

  return data({ reviews });
}

export async function action({ request, params: { id } }: Route.ActionArgs) {
  const token = await getAccessToken(request);

  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries());

  const response = await fetch(new URL(`/api/v1/orderer/rfps/${id}/notices`, process.env.BACKEND_API_URL), {
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

  return data({ success: true });
}
