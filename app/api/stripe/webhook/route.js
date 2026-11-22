import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

async function sendEmail(to, subject, html) {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL || !to) return;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL, to: [to], subject, html }),
  });
}

export async function POST(request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook is not configured.' }, { status: 503 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const signature = request.headers.get('stripe-signature');
  const payload = await request.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error('Stripe webhook signature error', error.message);
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      const session = event.data.object;
      const email = session.customer_details?.email || session.customer_email;
      const product = session.metadata?.product_code === 'priority_packet' ? 'Priority Assistance Packet' : 'Travel Rights Report';
      await sendEmail(email, `TravelRightsPro payment received — ${product}`, `<p>Thanks for your purchase from TravelRightsPro.</p><p>Your <strong>${product}</strong> is ready at <a href="${(process.env.CANONICAL_ORIGIN || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.www.travelrightspro.com').replace('www.www.', 'www.')}/success?session_id=${session.id}">your secure report page</a>.</p><p>This material is educational information, not legal advice or a guarantee of compensation.</p>`);
    }
    if (event.type === 'charge.refunded') {
      const charge = event.data.object;
      console.log('Refund recorded for charge', charge.id);
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook processing error', error);
    return NextResponse.json({ error: 'Webhook processing failed.' }, { status: 500 });
  }
}
