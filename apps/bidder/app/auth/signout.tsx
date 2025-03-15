import { redirect } from 'react-router';
import { accessTokenCookie } from '~/auth.server';

export async function loader() {
  return redirect('/signin', {
    headers: {
      'Set-Cookie': await accessTokenCookie.serialize('', { maxAge: 0 }),
    },
  });
}
