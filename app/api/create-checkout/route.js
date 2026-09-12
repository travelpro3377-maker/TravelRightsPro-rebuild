import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_TRAVEL_REPORT_PRICE_ID) {
      return NextResponse.json({ error: 'Checkout is being configured. Please try again soon.' }, { status: 503 });
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const details = await request.json();
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: process.env.STRIPE_TRAVEL_REPORT_PRICE_ID, quantity: 1 }],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/check?cancelled=1`,
      billing_address_collection: 'auto',
      customer_email: details.email || undefined,
      metadata: { issue: details.issue || '', origin: details.origin || '', destination: details.destination || '', carrier: details.carrier || '', delay: details.delay || '' },
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error', error);
    return NextResponse.json({ error: 'Unable to start checkout. Please try again.' }, { status: 500 });
  }
}
