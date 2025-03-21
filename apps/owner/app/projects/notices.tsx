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
    throw new UNSAFE_ErrorResponseImpl(
      response.status,
      response.statusText,
      null,
    );
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
    throw new UNSAFE_ErrorResponseImpl(
      response.status,
      response.statusText,
      null,
    );
  }

  return data({ success: true });
}
