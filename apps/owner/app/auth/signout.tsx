import { redirect } from 'react-router';
import { accessTokenCookie } from '~/auth.server';
import type { Route } from './+types/signout';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  return redirect(`/signin${url.search}`, {
    headers: {
      'Set-Cookie': await accessTokenCookie.serialize('', { maxAge: 0 }),
    },
  });
}
