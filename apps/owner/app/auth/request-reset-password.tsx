import { data, UNSAFE_ErrorResponseImpl } from "react-router";
import type { Route } from "./+types/request-reset-password";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get('email');
  const body = { email };

  const response = await fetch(new URL('/api/v1/users/reset-password/request', process.env.BACKEND_API_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
