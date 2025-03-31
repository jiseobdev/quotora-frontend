import { UNSAFE_ErrorResponseImpl } from "react-router";
import { getAccessToken } from "~/auth.server";
import { Category } from "~/discussions/constants";

async function fetchText(input: string, init?: RequestInit): Promise<string> {
  const response = await fetch(new URL(input, process.env.BACKEND_API_URL), init);

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      throw new UNSAFE_ErrorResponseImpl(
        response.status,
        response.statusText,
        { request: { input, init }, response: { ...response, body: await response.text() } },
      );
    } else {
      throw new Error(
        [response.status, response.statusText, await response.text()].filter(Boolean).join(' '),
        { cause: response }
      );
    }
  }

  return await response.text();
}

async function fetchData<T>(input: string, init?: RequestInit): Promise<T> {
  const result = await fetchText(input, init);
  return JSON.parse(result) as T;
}

export async function fetchDiscussions(request: Request, options?: { category?: string; orderBy?: string; search?: string }) {
  const token = await getAccessToken(request);

  const category = options?.category ?? Category.ALL;

  if (category === Category.ALL) {
    const results = await Promise.all(
      Object.values(Category).filter((category) => category !== Category.ALL).map(async (category) => {
        const searchParams = new URLSearchParams();
        searchParams.set('category', category);
        if (options?.orderBy) searchParams.set('orderBy', options.orderBy);
        if (options?.search) searchParams.set('search', options.search);

        return fetchData<Discussion[]>(`/api/v1/agora/discussions?${searchParams.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
      })
    );

    const result = results.flat().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return result;
  } else {
    const searchParams = new URLSearchParams();
    if (category) searchParams.set('category', category);
    if (options?.orderBy) searchParams.set('orderBy', options.orderBy);
    if (options?.search) searchParams.set('search', options.search);

    const result = await fetchData<Discussion[]>(`/api/v1/agora/discussions?${searchParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    return result;
  }
}

export async function fetchDiscussion(request: Request, id: string) {
  const token = await getAccessToken(request);

  const result = await fetchData<Discussion>(`/api/v1/agora/discussions/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  return result;
}

export async function fetchDiscussionComments(request: Request, id: string) {
  const token = await getAccessToken(request);

  const result = await fetchData<Comment[]>(`/api/v1/agora/discussions/${id}/answers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  return result;
}

export async function patchDiscussionViewContent(request: Request, id: string) {
  const token = await getAccessToken(request);

  try {
    await fetchText(`/api/v1/agora/discussions/${id}/view-count`, {
      method: 'PATCH',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
  } catch (error: unknown) {
    return false;
  }

  return true;
}

export async function postDiscussionComment(request: Request, id: string, body: { content: string; isAnonymous: boolean; parentId?: number }) {
  const token = await getAccessToken(request);

  await fetchText(`/api/v1/agora/discussions/${id}/answers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  });
}
