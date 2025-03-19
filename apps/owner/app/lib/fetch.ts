import { UNSAFE_ErrorResponseImpl } from "react-router";

export async function fetchRfps(status: string, token?: string) {
  const response = await fetch(new URL(`/api/v1/orderer/rfps?status=${status}`, process.env.BACKEND_API_URL), {
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

  const result: Rfp[] = await response.json();

  return result;
};
