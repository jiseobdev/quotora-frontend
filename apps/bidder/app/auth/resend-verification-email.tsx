import { data, UNSAFE_ErrorResponseImpl } from "react-router";
import type { Route } from "./+types/resend-verification-email";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const token = formData.get('token');

  const response = await fetch(new URL('/api/v1/users/resend-verification-email', process.env.BACKEND_API_URL), {
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
        null,
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
