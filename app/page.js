const guideCards = [
  { icon: '01', title: 'Find the rule that fits your trip', text: 'Start with the route, carrier, disruption, and what you paid. The right rule depends on the details.' },
  { icon: '02', title: 'Build your evidence file', text: 'Get a practical checklist for boarding passes, receipts, notices, screenshots, and booking records.' },
  { icon: '03', title: 'Choose your next move', text: 'Know whether to request a refund, ask the airline, file a complaint, or protect your next trip.' },
];

export default function Home() {
  return (
    <main>
      <section className="hero hero-home">
        <div className="hero-inner split-hero">
          <div>
            <div className="eyebrow">Travel disruption, decoded</div>
            <h1>Stop guessing what your airline owes you.</h1>
            <p className="hero-lede">TravelRightsPro turns confusing delays, cancellations, denied boarding, baggage problems, and refund questions into a clear action plan.</p>
            <div className="buttons">
              <a className="btn" href="/check">Check my trip <span>→</span></a>
              <a className="btn secondary" href="#how-it-works">See how it works</a>
            </div>
            <div className="proof-row"><span>✓ Built for real-world trip details</span><span>✓ Educational, not legal advice</span></div>
          </div>
          <div className="hero-panel">
            <div className="panel-top"><span className="status-dot"></span> Your trip snapshot</div>
            <div className="trip-line"><span>Flight disrupted?</span><b>Start here</b></div>
            <div className="trip-line"><span>Route</span><b>Origin → Destination</b></div>
            <div className="trip-line"><span>Problem</span><b>Delay / cancellation</b></div>
            <div className="score-box"><small>YOUR NEXT BEST STEP</small><strong>Get a personalized checklist</strong><span>Free to start · takes about 2 minutes</span></div>
            <a className="panel-cta" href="/check">Run the free check →</a>
          </div>
        </div>
      </section>

      <section className="ticker"><div className="ticker-inner"><span>FLIGHT DELAYS</span><i>•</i><span>CANCELLATIONS</span><i>•</i><span>BAGGAGE</span><i>•</i><span>REFUNDS</span><i>•</i><span>TRAVEL INSURANCE</span></div></section>

      <section className="wrap intro-grid" id="how-it-works">
        <div><div className="eyebrow blue">A calmer way to deal with disruption</div><h2 className="section-title">Your trip is unique. Your next step should be too.</h2></div>
        <div><p className="muted large">Generic internet advice can miss the detail that changes everything: where your flight departed, which carrier operated it, how long the delay lasted, and what the airline actually told you.</p><p className="muted large">We help you organize those facts before you spend hours chasing an answer.</p></div>
      </section>

      <section className="wrap cards-section">
        <div className="grid">{guideCards.map((card) => <article className="card guide-card" key={card.icon}><div className="number">{card.icon}</div><h3>{card.title}</h3><p className="muted">{card.text}</p><a className="text-link" href="/rights">Explore the guide <span>↗</span></a></article>)}</div>
      </section>

      <section className="wrap offer-section">
        <div className="offer-card">
          <div className="offer-copy"><div className="eyebrow blue">For travelers who want clarity now</div><h2>Get your Travel Rights Report</h2><p>Share the basics of your trip and receive a structured, educational report covering the rules worth checking, documents to gather, questions to ask, and practical next steps.</p><div className="offer-points"><span>✓ Trip-specific issue summary</span><span>✓ Evidence checklist</span><span>✓ Escalation path</span></div></div>
          <div className="offer-price"><small>ONE-TIME PURCHASE</small><strong>$19</strong><span>No subscription. No claim percentage.</span><a className="btn" href="/check">Build my report →</a></div>
        </div>
      </section>

      <section className="wrap newsletter-section">
        <div className="newsletter"><div><div className="eyebrow blue">The smarter traveler briefing</div><h2>Useful rights tips. Better trip planning.</h2><p className="muted">The email list is launching soon. Contact us if you want to hear when it opens.</p></div><a className="btn" href="mailto:support@travelrightspro.com?subject=TravelRightsPro%20briefing">Join the briefing →</a></div>
      </section>

      <section className="wrap trust-section"><div className="trust-copy"><div className="eyebrow blue">Important to know</div><h2>Helpful information, without overpromising.</h2><p className="muted">Travel rights vary by itinerary, jurisdiction, carrier, ticket, and circumstances. TravelRightsPro provides educational information and organization tools—not legal advice, and never a guarantee of compensation.</p></div><div className="trust-links"><a href="/rights"><span>→</span> Read the rights guide</a><a href="/disclosure"><span>→</span> See our disclosures</a><a href="/terms"><span>→</span> Review terms of use</a></div></section>
    </main>
  );
}
