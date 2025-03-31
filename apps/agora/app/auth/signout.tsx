import { redirect } from 'react-router';
import { accessTokenCookie, getAccessToken } from '~/auth.server';
import type { Route } from './+types/signout';

const SCOPE_TO_SUBDOMAIN = {
  'BIDDER': process.env.BIDDER_URL ?? 'https://bidder.quotora.xyz',
  'ORDERER': process.env.OWNER_URL ?? 'https://owner.quotora.xyz',
};

function decodeJwtPayload(token: string): Record<string, unknown> {
  try {
    const payloadBase64 = token.split('.')[1];
    const payload = Buffer.from(payloadBase64, 'base64url').toString('utf-8');

    return JSON.parse(payload);
  } catch (error: unknown) {
    return {};
  }
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const token = await getAccessToken(request);

  if (token) {
    const payload = decodeJwtPayload(token) as { scope: 'BIDDER' | 'ORDERER' };
    const subdomain = SCOPE_TO_SUBDOMAIN[payload.scope];

    const oldSearchParams = new URLSearchParams(url.search);
    const oldRedirectTo = oldSearchParams.get('redirectTo');

    const redirectTo = oldRedirectTo ? `/agora${decodeURIComponent(oldRedirectTo)}` : '/agora';
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);

    return redirect(`https://${subdomain}.quotora.com/signin?${searchParams}`, {
      headers: {
        'Set-Cookie': await accessTokenCookie.serialize('', { maxAge: 0 }),
      },
    });
  }

  return redirect(`/signin${url.search}`, {
    headers: {
      'Set-Cookie': await accessTokenCookie.serialize('', { maxAge: 0 }),
    },
  });
}
