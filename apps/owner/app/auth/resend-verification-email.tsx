import { data, UNSAFE_ErrorResponseImpl } from "react-router";
import type { Route } from "./+types/resend-verification-email";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const companyEmail = formData.get('companyEmail');
  const body = { companyEmail };

  const response = await fetch(new URL('/api/v1/users/resend-verification-email', process.env.BACKEND_API_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new UNSAFE_ErrorResponseImpl(
      response.status,
      response.statusText,
      { request: body, response: await response.text() },
    );
  }

  return data({ success: true });
}
