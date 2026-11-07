# Bhavani Prasad Kola — Portfolio

A React + Vite portfolio with an Express/Node.js contact API. The client is written in JavaScript/JSX (not Angular or TypeScript).

## Run locally

```bash
npm run install:all
Copy-Item server/.env.example server/.env
npm run dev
```

Open `http://localhost:5173`. The Vite development server proxies `/api/contact` to the Express API at port 5000.

## Production build

```bash
npm run build
npm run start
```

The client build is created in `client/dist`. Serve it from a static host such as Vercel or Netlify, and deploy `server/` as a Node service. Set `CLIENT_URL` on the API to the deployed client URL.

## Contact form configuration

Copy `server/.env.example` to `server/.env`, then supply your SMTP credentials and destination address. The endpoint validates its input before attempting delivery. Add `MONGODB_URI` only when you want submissions persisted in MongoDB.

## Public assets to check before deployment

- `client/public/resume.pdf` contains the supplied resume.
- Replace the CSS profile placeholder with a profile photograph if desired.
- Add verified project repository/demo URLs in `client/src/data/portfolio.js`; unknown links are deliberately `#`.
- Replace the canonical placeholder (`your-domain.example`) and add an Open Graph image once a domain is available.
- Confirm the patent publication/registration status and number before public release.
