/**
 * Netlify Function proxy for Adobe Analytics Reporting API 2.0.
 *
 * Holds the Adobe OAuth Server-to-Server credentials and does the IMS token
 * exchange server-side, so no secret ever reaches the browser. Forwards
 * POST /.netlify/functions/reports to Adobe's Reporting API 2.0.
 *
 * Required env vars (set in Netlify site settings, or in a local .env for
 * `netlify dev` / `netlify functions:serve` — see .env.example):
 *   ADOBE_CLIENT_ID, ADOBE_CLIENT_SECRET, ADOBE_GLOBAL_COMPANY_ID
 */

const ALLOWED_ORIGINS = new Set([
  'https://muthammakb1.github.io',
  'http://localhost:3001',
]);

// Persists across warm invocations of the same function instance; Adobe
// tokens last ~24 min so this avoids a token fetch on every report request.
let cachedToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  if (cachedToken && Date.now() < tokenExpiresAt) return cachedToken;

  const res = await fetch('https://ims-na1.adobelogin.com/ims/token/v3', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.ADOBE_CLIENT_ID,
      client_secret: process.env.ADOBE_CLIENT_SECRET,
      scope: 'openid,AdobeID,additional_info.projectedProductContext',
    }),
  });

  if (!res.ok) {
    throw new Error(`Adobe IMS token request failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken;
}

function corsHeaders(origin) {
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
  if (ALLOWED_ORIGINS.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}

exports.handler = async (event) => {
  const origin = event.headers.origin || event.headers.Origin || '';
  const cors = corsHeaders(origin);

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 404, headers: cors, body: 'Not found' };
  }

  try {
    const token = await getAccessToken();

    const adobeRes = await fetch(
      `https://analytics.adobe.io/api/${process.env.ADOBE_GLOBAL_COMPANY_ID}/reports`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'x-api-key': process.env.ADOBE_CLIENT_ID,
          'x-proxy-global-company-id': process.env.ADOBE_GLOBAL_COMPANY_ID,
          'Content-Type': 'application/json',
        },
        body: event.body,
      }
    );

    const data = await adobeRes.text();
    return {
      statusCode: adobeRes.status,
      headers: { 'Content-Type': 'application/json', ...cors },
      body: data,
    };
  } catch (err) {
    console.error('[reports function] Adobe API error:', err.message);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...cors },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
