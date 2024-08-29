export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2)
    return decodeURIComponent(parts.pop()?.split(';').shift()!) || null;

  return null;
}

export function getCookieFromContext(name: string, cookie: string): string | null {
  const value = `; ${cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2)
    return decodeURIComponent(parts.pop()?.split(';').shift()!) || null;

  return null;
}