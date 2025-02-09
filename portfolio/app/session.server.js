import { createCookieSessionStorage } from '@remix-run/node';

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    maxAge: 604_800,
    path: '/',
    sameSite: 'lax',
    secrets: ['dev-secret-key'],
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function getSession(request) {
  const cookie = request.headers.get('Cookie');
  return sessionStorage.getSession(cookie);
}