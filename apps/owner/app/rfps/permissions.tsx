import { data, UNSAFE_ErrorResponseImpl } from "react-router";
import { getAccessToken } from "~/auth.server";
import type { Route } from "./+types/permissions";
import { fetchPermissions } from "~/lib/fetch";

export async function loader({ request, params: { id } }: Route.LoaderArgs) {
  const token = await getAccessToken(request);
  const permissions = await fetchPermissions(id, token);

  return data({ permissions });
}

export async function action({ request, params: { id } }: Route.ActionArgs) {
  const token = await getAccessToken(request);

  const formData = await request.formData();
  const accountId = parseInt(formData.get('accountId')?.toString() ?? '', 10) || undefined;
  const permission = formData.get('permission')?.toString();

  if (request.method === 'PUT') {
    return updatePermission(id, { accountId, permission }, token);
  } else if (request.method === 'DELETE') {

    return deletePermission(id, { accountId }, token);
  }

  return data({ success: true });
}

async function updatePermission(id: string, body: { accountId?: number; permission?: string }, token?: string) {
  if (!body.accountId || !body.permission) {
    throw new UNSAFE_ErrorResponseImpl(400, 'Bad Request', { request: { accountId: body.accountId, permission: body.permission } });
  }

  const response = await fetch(new URL(`/api/v1/orderer/rfps/${id}/colleagues/permissions`, process.env.BACKEND_API_URL), {
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

async function deletePermission(id: string, body: { accountId?: number }, token?: string) {
  if (!body.accountId) {
    throw new UNSAFE_ErrorResponseImpl(400, 'Bad Request', { request: { accountId: body.accountId } });
  }

  const response = await fetch(new URL(`/api/v1/orderer/rfps/${id}/colleagues`, process.env.BACKEND_API_URL), {
    method: 'DELETE',
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