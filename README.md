# Adobe Analytics Dashboard

A production-grade React dashboard for Adobe Analytics Reporting API 2.0.  
Runs fully on mock data out of the box — no live credentials required.

---

## Quick start

```bash
npm install
npm run dev        # starts Webpack dev server on http://localhost:3000
npm run build      # production bundle → dist/
npm run lint       # ESLint
```

---

## Folder structure

```
src/
├── api/                   RTK Query base API + per-feature endpoint files
├── app/                   Redux store + root reducer
├── components/            Design-system primitives (Button, Card, …)
├── features/
│   ├── dateRange/         Global date range slice + picker UI
│   ├── trafficOverview/   Traffic widget (template for new widgets)
│   ├── conversionFunnel/
│   └── audienceBreakdown/
├── hooks/                 useDateRange, useDebouncedValue, useAbortableEffect
├── layout/                DashboardLayout, Sidebar, Header
├── styles/                Sass design system (tokens → base → components)
└── utils/                 formatters, adobeQueryBuilder, constants
proxy/
└── server.js              Node/Express backend proxy stub (holds Adobe secrets)
```

---

## How to add a new widget

1. **Create the endpoint** — add a new file under `src/api/endpoints/` and call `baseApi.injectEndpoints(...)`. Export an `inject*` factory function (see `trafficEndpoints.js`).

2. **Wire it into the API** — import and compose the factory in `src/api/adobeAnalyticsApi.js`.

3. **Add it to rootReducer** (no change needed — all endpoints share the same `adobeAnalyticsApi` reducer).

4. **Create the feature folder** — `src/features/myWidget/MyWidget.jsx` + `myWidget.scss`.

5. **Use the RTK Query hook** with `queryArgs` from `useDateRange()`:
   ```jsx
   const { queryArgs } = useDateRange();
   const { data, isLoading, isError } = useGetMyWidgetQuery(queryArgs);
   ```
   Changing the global date range automatically re-fetches — no manual `refetch()` calls.

6. **Wrap in ErrorBoundary** in `App.jsx`:
   ```jsx
   <ErrorBoundary fallbackMessage="My widget failed.">
     <MyWidget />
   </ErrorBoundary>
   ```

---

## Plugging in real Adobe Analytics credentials

### 1. Deploy the proxy

`proxy/server.js` is a thin Express app that handles OAuth token exchange and forwards API calls. Copy it to a serverless function or a Node server — it must **never** be bundled into the React app.

```bash
cd proxy
npm install express axios cors dotenv
# copy .env.example → .env and fill in your credentials
node server.js
```

### 2. Populate `.env`

```
ADOBE_CLIENT_ID=your_client_id
ADOBE_CLIENT_SECRET=your_client_secret
ADOBE_ORG_ID=your_org_id@AdobeOrg
ADOBE_IMS_ORG_ID=your_ims_org_id
ADOBE_GLOBAL_COMPANY_ID=your_global_company_id
ADOBE_REPORT_SUITE_ID=your_rsid
```

### 3. Point the React app at your proxy

```
REACT_APP_API_BASE_URL=https://your-proxy.example.com
```

### 4. How credentials are obtained

In the [Adobe Developer Console](https://developer.adobe.com/console/):
1. Create a project → Add API → Adobe Analytics.
2. Choose **OAuth Server-to-Server** credential type.
3. Note `Client ID`, `Client Secret`, `Organization ID`, and `Global Company ID` (from Analytics Admin → Company Settings).

---

## State & data flow

```
User changes date range
  → dateRangeSlice updates
  → useDebouncedValue waits 400 ms
  → useDateRange returns new queryArgs
  → RTK Query detects changed args
  → Only affected queries re-fetch (cache tag invalidation)
  → Each widget shows its own loading/error state independently
```

---

## Design system

All tokens live in `src/styles/abstracts/_variables.scss` and are also emitted as CSS custom properties on `:root`, so Recharts and JS code can read them via `getComputedStyle` or `var(--color-primary)`.  
Components use BEM class naming with no global utility classes.

---

## Tech choices

| Concern | Choice | Why |
|---|---|---|
| State | Redux Toolkit | Predictable; DevTools; ecosystem |
| API / caching | RTK Query | Built-in dedup, cache tags, arg-keyed re-fetch |
| Date maths | dayjs | 2 KB, immutable, covers all needed ops |
| Charts | Recharts | Tree-shakeable, composable, React-native |
| CSS | Sass + BEM | Zero runtime, full control, no framework lock-in |
| Bundler | Webpack 5 | Module federation ready, fine-grained code splitting |
