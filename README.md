# TravelRightsPro.com

TravelRightsPro is a conversion-focused travel-rights education and trip-planning site. It is designed to turn high-intent travel disruption questions into three revenue paths: a one-time educational report, an email audience, and transparent travel affiliate recommendations.

## What is included

- A public homepage with a clear free-trip-check call to action.
- A responsive `/check` flow that collects trip context and starts Stripe Checkout for the $14.99 Travel Rights Report.
- A rights guide covering delays, cancellations, denied boarding, and baggage problems without promising compensation.
- A `/deals` planning page for insurance, flexible bookings, and trip extras.
- Privacy, terms, and affiliate disclosure pages.
- `robots.txt` and `sitemap.xml` routes for organic search.
- Mobile-responsive styling and metadata for a polished launch surface.

## Local development

```bash
npm install
npm run dev
```

The production build can be validated with `npm run build`.

## Go-live configuration

Add these Vercel environment variables before advertising the paid report:

- `STRIPE_SECRET_KEY` — use a **LIVE** Stripe secret key.
- `STRIPE_TRAVEL_REPORT_PRICE_ID` — the corresponding **LIVE** Price ID for the $14.99 report.
- `NEXT_PUBLIC_SITE_URL` — `https://travelrightspro.com`.

The checkout route fails closed with a clear 503 response when live Stripe settings are absent. Do not collect real payments until the live Price ID and refund/support process are tested end to end.

## Monetization expansion

Replace the placeholder links on `/deals` with approved affiliate URLs for travel insurance, flexible hotels, activities, airport transfers, or other relevant products. Keep the disclosure visible near commercial recommendations and in the footer. Add an email provider behind the newsletter form before using it as a lead-generation channel; the current form provides the front-end conversion experience but does not persist addresses.

## Compliance note

Travel rights vary by itinerary, jurisdiction, carrier, ticket, and circumstances. This site provides general educational information and organization tools, not legal advice, and never guarantees compensation or reimbursement. Review all provider terms and official guidance before publishing specific claims.
