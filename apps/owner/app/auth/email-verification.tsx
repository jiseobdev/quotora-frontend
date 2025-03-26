import { replace, UNSAFE_ErrorResponseImpl } from "react-router";
import type { Route } from "./+types/email-verification";

export async function action({ params: { code } }: Route.ActionArgs) {
  const response = await fetch(new URL(`/api/v1/users/verify/${code}`, process.env.BACKEND_API_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new UNSAFE_ErrorResponseImpl(
      response.status,
      response.statusText,
      { request: { code }, response: await response.json() },
    );
  }

  return replace('/signin');
}