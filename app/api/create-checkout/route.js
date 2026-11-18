import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_TRAVEL_REPORT_PRICE_ID) {
      return NextResponse.json({ error: 'Checkout is being configured. Please try again soon.' }, { status: 503 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const details = await request.json();
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://travelrightspro.com').replace(/\/$/, '');
    const email = String(details.email || '').trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (!details.issue) {
      return NextResponse.json({ error: 'Please choose what went wrong before continuing.' }, { status: 400 });
    }
    const metadata = {
      product_code: 'travel_rights_report',
      issue: details.issue || '',
      origin: details.origin || '',
      destination: details.destination || '',
      carrier: details.carrier || '',
      delay: details.delay || '',
    };

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: process.env.STRIPE_TRAVEL_REPORT_PRICE_ID, quantity: 1 }],
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/check?cancelled=1`,
      billing_address_collection: 'auto',
      customer_email: email,
      metadata,
      payment_intent_data: { metadata },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error', error);
    return NextResponse.json({ error: 'Unable to start checkout. Please try again.' }, { status: 500 });
  }
}
