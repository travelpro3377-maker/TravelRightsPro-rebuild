import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function origin() {
  return (process.env.CANONICAL_ORIGIN || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.travelrightspro.com').replace(/\/$/, '');
}

function priceFor(plan) {
  if (plan === 'priority') return process.env.STRIPE_PRIORITY_PRICE_ID || process.env.STRIPE_PRIORITY_PRICE;
  return process.env.STRIPE_TRAVEL_REPORT_PRICE_ID || process.env.STRIPE_PRICE_ID || process.env.STRIPE_REPORT_PRICE_ID;
}

export async function POST(request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Checkout is temporarily unavailable while payment settings are configured.' }, { status: 503 });
  }
  try {
    const body = await request.json();
    const plan = body.plan === 'priority' ? 'priority' : 'report';
    const price = priceFor(plan);
    const email = String(body.email || '').trim();
    if (!price) return NextResponse.json({ error: 'This offer is temporarily unavailable. Please try again shortly.' }, { status: 503 });
    if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    if (!body.issue) return NextResponse.json({ error: 'Please choose what went wrong before continuing.' }, { status: 400 });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const metadata = {
      product_code: plan === 'priority' ? 'priority_packet' : 'travel_rights_report',
      issue: String(body.issue || '').slice(0, 500),
      origin: String(body.origin || '').slice(0, 200),
      destination: String(body.destination || '').slice(0, 200),
      carrier: String(body.carrier || '').slice(0, 200),
      delay: String(body.delay || '').slice(0, 200),
    };
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price, quantity: 1 }],
      customer_email: email,
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
      success_url: `${origin()}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin()}/check?cancelled=1`,
      metadata,
      payment_intent_data: { metadata },
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error', error);
    return NextResponse.json({ error: 'Unable to open secure checkout. Please try again.' }, { status: 500 });
  }
}
