# Stripe launch setup

This MVP uses Stripe Checkout for a one-time $14.99 Travel Rights Report.

Environment variables in Vercel:
- `STRIPE_SECRET_KEY` = your Stripe secret key (server-side only)
- `STRIPE_TRAVEL_REPORT_PRICE_ID` = the Stripe Price ID for the Travel Rights Report
- `NEXT_PUBLIC_SITE_URL` = your production URL

The app creates Checkout Sessions server-side at `/api/create-checkout`. The browser never receives the Stripe secret key.

The current connected Stripe account has a TEST-mode product/price created for the MVP. Before taking real money, switch the deployment to your LIVE Stripe account credentials and create/use the corresponding LIVE Price ID.
