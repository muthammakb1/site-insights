/**
 * Thin backend proxy for Adobe Analytics Reporting API 2.0.
 *
 * TODO: Deploy this as a serverless function (Vercel/Netlify/AWS Lambda) or a
 * Node/Express server. It must NOT be bundled into the React app.
 *
 * Required env vars (set in .env — copy from .env.example):
 *   ADOBE_CLIENT_ID, ADOBE_CLIENT_SECRET, ADOBE_ORG_ID,
 *   ADOBE_IMS_ORG_ID, ADOBE_GLOBAL_COMPANY_ID, ADOBE_REPORT_SUITE_ID
 *
 * The proxy:
 *   1. Exchanges OAuth credentials for a bearer token via Adobe IMS.
 *   2. Caches the token until it expires (minus a 60 s buffer).
 *   3. Forwards POST /api/adobe/reports → Adobe Reporting API 2.0.
 */

const express  = require('express');
const axios    = require('axios');
const cors     = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());

// ─── Token cache ──────────────────────────────────────────────────────────────

let _cachedToken   = null;
let _tokenExpiresAt = 0;

async function getAccessToken() {
  if (_cachedToken && Date.now() < _tokenExpiresAt) return _cachedToken;

  // TODO: Switch to OAuth Server-to-Server (no JWT) as JWT credentials are
  // deprecated by Adobe after May 2025. Use the credential type shown in the
  // Adobe Developer Console under "OAuth Server-to-Server".
  const res = await axios.post(
    `https://ims-na1.adobelogin.com/ims/token/v3`,
    new URLSearchParams({
      grant_type:    'client_credentials',
      client_id:     process.env.ADOBE_CLIENT_ID,
      client_secret: process.env.ADOBE_CLIENT_SECRET,
      scope:         'openid,AdobeID,read_organizations,additional_info.projectedProductContext',
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  _cachedToken    = res.data.access_token;
  // Subtract 60 s buffer so we refresh before Adobe rejects it.
  _tokenExpiresAt = Date.now() + (res.data.expires_in - 60) * 1000;
  return _cachedToken;
}

// ─── Report proxy ─────────────────────────────────────────────────────────────

app.post('/api/adobe/reports', async (req, res) => {
  try {
    const token = await getAccessToken();

    const adobeRes = await axios.post(
      `https://analytics.adobe.io/api/${process.env.ADOBE_GLOBAL_COMPANY_ID}/reports`,
      req.body,
      {
        headers: {
          Authorization:       `Bearer ${token}`,
          'x-api-key':         process.env.ADOBE_CLIENT_ID,
          'x-proxy-global-company-id': process.env.ADOBE_GLOBAL_COMPANY_ID,
          'Content-Type':      'application/json',
        },
      }
    );

    res.json(adobeRes.data);
  } catch (err) {
    const status  = err.response?.status ?? 500;
    const message = err.response?.data?.message ?? err.message;
    console.error('[proxy] Adobe API error:', status, message);
    res.status(status).json({ error: message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Proxy listening on http://localhost:${PORT}`));
