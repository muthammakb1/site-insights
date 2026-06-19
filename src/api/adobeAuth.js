/**
 * Authentication helper for the backend proxy.
 *
 * The proxy at REACT_APP_API_BASE_URL handles OAuth Server-to-Server token
 * exchange with Adobe IMS. The React app never sees the client secret — it only
 * receives short-lived bearer tokens from the proxy.
 *
 * If your proxy attaches auth automatically (e.g. via a session cookie or its
 * own Authorization header), you don't need this file at all. Use it if you
 * need to forward a token stored client-side (e.g. after a user-login flow).
 */

/** Returns Authorization header value, or empty string when not authenticated. */
export function getAuthHeader() {
  const token = sessionStorage.getItem('adobe_access_token');
  return token ? `Bearer ${token}` : '';
}

/** Called by the proxy redirect after token exchange. */
export function storeToken(token) {
  sessionStorage.setItem('adobe_access_token', token);
}

export function clearToken() {
  sessionStorage.removeItem('adobe_access_token');
}
