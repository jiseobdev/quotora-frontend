import { UNSAFE_ErrorResponseImpl } from "react-router";
import { getAccessToken } from "~/auth.server";
import { Category } from "~/discussions/constants";

async function fetchData<T>(input: string, init?: RequestInit): Promise<T> {
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

  return (await response.json()) as T;
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