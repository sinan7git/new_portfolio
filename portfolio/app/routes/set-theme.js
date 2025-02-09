import { json, createCookieSessionStorage } from '@remix-run/node';

// Create session storage with a default secret for development
const sessionStorage = createCookieSessionStorage({
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

export async function action({ request }) {
  const formData = await request.formData();
  const theme = formData.get('theme');

  const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  session.set('theme', theme);

  return json(
    { success: true },
    {
      headers: {
        'Set-Cookie': await sessionStorage.commitSession(session),
      },
    }
  );
}