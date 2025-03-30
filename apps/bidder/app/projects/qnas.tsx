import { data, UNSAFE_ErrorResponseImpl } from "react-router";
import { getAccessToken } from "~/auth.server";
import type { Route } from "./+types/qnas";

export async function action({ request, params: { id } }: Route.ActionArgs) {
  const token = await getAccessToken(request);

  const formData = await request.formData();
  const rfpId = formData.get('rfpId');
  const questionId = formData.get('questionId');
  const content = formData.get('content');
  const body = { content, ...(questionId && { questionId }) };

  const response = await fetch(new URL(`/api/v1/orderer/rfps/${rfpId}/proposals/${id}/qnas`, process.env.BACKEND_API_URL), {
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

  return data({ success: true })
}

export async function clientAction({ request, serverAction }: Route.ClientActionArgs) {
  const formData = await request.clone().formData();
  const body = Object.fromEntries(formData.entries());

  if (!body.content) {
    return data({ success: false, errors: { content: '내용을 입력해주세요.' } });
  }

  return serverAction();
}
