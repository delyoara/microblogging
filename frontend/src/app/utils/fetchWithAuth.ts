// Sert à encapsuler une logique technique liée à fetch() + JWT
import { getAccessToken, setAccessToken } from "@/context/AuthContext";

// Fonction utilitaire intégrée ou créer un fichier séparé
const buildHeaders = (
  rawHeaders: HeadersInit,
  authHeaders: HeadersInit
): Record<string, string> => {
  const normalize = (input: HeadersInit): Record<string, string> => {
    if (input instanceof Headers) {
      const result: Record<string, string> = {};
      input.forEach((value, key) => {
        result[key] = value;
      });
      return result;
    } else if (Array.isArray(input)) {
      return Object.fromEntries(input);
    } else {
      return input;
    }
  };

  return {
    ...normalize(rawHeaders),
    ...normalize(authHeaders),
    'Content-Type': 'application/json',
  };
};

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getAccessToken();
  const authHeaders: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

  const rawHeaders: HeadersInit =
    options.headers && !(options.headers instanceof Headers)
      ? options.headers
      : {};

  const headers = buildHeaders(rawHeaders, authHeaders);

  let res = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  // 🔄 Si token expiré, tentative de refresh
  if (res.status === 401 || res.status === 403) {
    const refreshRes = await fetch('http://localhost:3001/api/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      setAccessToken(data.accessToken);

      const retryHeaders = buildHeaders(rawHeaders, {
        Authorization: `Bearer ${data.accessToken}`,
      });

      res = await fetch(url, {
        ...options,
        headers: retryHeaders,
        credentials: 'include',
      });
    }
  }

  return res;
}
