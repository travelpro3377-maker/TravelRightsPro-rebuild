import Stripe from 'stripe';
import PrintButton from './print-button';

export const dynamic = 'force-dynamic';

function clean(value) {
  return value && String(value).trim() ? String(value).trim() : 'Not provided';
}

export default async function SuccessPage({ searchParams }) {
  const params = await searchParams;
  const sessionId = params?.session_id;
  let session = null;
  let error = '';

  if (!sessionId) {
    error = 'This report link is missing its payment reference.';
  } else if (!process.env.STRIPE_SECRET_KEY) {
    error = 'The report service is still being configured. Please contact support.';
  } else {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status !== 'paid') {
        session = null;
        error = 'This payment is not marked as paid yet. Please refresh in a few minutes.';
      }
    } catch (err) {
      console.error('Report retrieval error', err);
      error = 'We could not verify this report link. Please contact support with your Stripe receipt.';
    }
  }

  if (error) {
    return <main className="wrap"><div className="success-card"><div className="eyebrow blue">Report access</div><h1 className="page-title">We need to verify your purchase.</h1><p className="muted large">{error}</p><p className="muted">If you were charged, keep your Stripe receipt and contact support so we can restore access.</p></div></main>;
  }

  const details = session.metadata || {};
  const reportRows = [
    ['What went wrong', clean(details.issue)],
    ['Departure', clean(details.origin)],
    ['Arrival', clean(details.destination)],
    ['Carrier', clean(details.carrier)],
    ['Delay length', clean(details.delay)],
  ];

  return <main className="wrap report-page">
    <div className="success-card report-card">
      <div className="report-actions"><div className="eyebrow blue">Paid report · {session.id.slice(-8)}</div><PrintButton /></div>
      <h1 className="page-title">Your Travel Rights Report</h1>
      <p className="muted large">This report organizes the facts you provided, the rules worth checking, and the evidence that can strengthen your next step.</p>
      <div className="notice"><b>Educational guide:</b> This is practical information, not legal advice, and it does not guarantee compensation.</div>
      <section className="report-section"><h2>Your trip details</h2><div className="report-grid">{reportRows.map(([label, value]) => <div className="report-row" key={label}><span className="small muted">{label}</span><strong>{value}</strong></div>)}</div></section>
      <section className="report-section"><h2>What to check next</h2><ol className="report-list"><li>Collect your booking confirmation, boarding passes, delay or cancellation notices, and receipts.</li><li>Ask the carrier for the official disruption reason and keep the response in writing.</li><li>Check the rules for the route, carrier, departure country, and type of disruption. Different regimes can apply.</li><li>Request the remedy you are seeking clearly, with dates, amounts, and supporting documents.</li></ol></section>
      <section className="report-section"><h2>Evidence checklist</h2><div className="checklist"><span>□ Booking confirmation</span><span>□ Boarding pass</span><span>□ Carrier messages</span><span>□ Receipts</span><span>□ Timeline of events</span><span>□ Written request and response</span></div></section>
      <p className="small muted report-footer">Payment verified through Stripe. Save or print this page for your records.</p>
    </div>
  </main>;
}
