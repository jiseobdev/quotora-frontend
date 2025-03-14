import { createCookie } from 'react-router';
import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';

export const authenticator = new Authenticator<string>();

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email');
    const password = form.get('password');

    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    return data.access_token as string;
  }),
);

export const accessTokenCookie = createCookie('access_token', {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
  maxAge: 60 * 60,
});
