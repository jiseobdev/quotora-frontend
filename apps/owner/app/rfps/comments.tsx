import { data, UNSAFE_ErrorResponseImpl, useLoaderData } from "react-router";
import type { Route } from "./+types/comments";
import { getAccessToken } from "~/auth.server";
import { fetchComments } from "~/lib/fetch";

export async function loader({ request, params: { id } }: Route.LoaderArgs) {
  const token = await getAccessToken(request);

  const comments = await fetchComments(id, token);

  return data({
    comments,
  });
}

export async function action({ request, params: { id } }: Route.ActionArgs) {
  const token = await getAccessToken(request);

  const formData = await request.formData();
  const commentId = formData.get('id');

  if (request.method === 'DELETE') {
    const response = await fetch(new URL(`/api/v1/orderer/rfps/${id}/comments/${commentId}`, process.env.BACKEND_API_URL), {
      method: 'DELETE',
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
}
