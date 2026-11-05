# The Divers Resource

The website for thediversresource.com. Right now it's a one-page "launching 2027"
site that collects interest from dive shops and divers. The full site (Trip Finder,
diver accounts, The Safety Stop) gets built on top of this over 2027.

Built with [Next.js](https://nextjs.org) (the website framework), [Tailwind](https://tailwindcss.com)
(styling) and [Supabase](https://supabase.com) (the database where sign-ups are saved).

## Where sign-ups go

Two tables in Supabase:

- `shop_leads`: business name, contact name, email, phone, region, notes, source.
- `diver_signups`: email and source.

`source` is `website` unless the page was opened with `?src=something`, for example
`thediversresource.com/?src=dema` on a booth QR code, so you can tell where people came from.

Open Supabase, then **Table Editor**, to read them. You can export either table to CSV from there.

## Running it on your own computer (optional)

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Without Supabase keys, sign-ups are printed in the
terminal instead of saved. To save them for real, copy `.env.example` to `.env.local`
and fill in the values.

## Setting up the database (once)

1. In Supabase, open **SQL Editor**.
2. Paste the contents of `supabase/migrations/20261105000000_interest_signups.sql` and click **Run**.

## Deploying

The site is hosted on Vercel. In the Vercel project, under **Settings, Environment Variables**,
add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` and `NEXT_PUBLIC_SITE_URL` (see `.env.example`).
Every change merged into `main` then goes live automatically.

If the keys are missing on the live site, the forms show "Sign-ups aren't switched on yet"
instead of silently losing people's details.
