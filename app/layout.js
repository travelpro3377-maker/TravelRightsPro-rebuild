import './globals.css';

export const metadata = {
  title: 'TravelRightsPro | Know what to do when travel goes wrong',
  description: 'Practical travel-rights education, trip checks, and evidence checklists for disrupted travelers.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://travelrightspro.com'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'TravelRightsPro | Know what to do when travel goes wrong',
    description: 'Organize your travel disruption facts, evidence, and next steps.',
    url: 'https://travelrightspro.com',
    siteName: 'TravelRightsPro',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="nav">
          <a className="logo" href="/">TravelRights<span>Pro</span><small>.com</small></a>
          <nav><a href="/rights">Travel rights</a><a href="/check">Free trip check</a><a href="/deals">Plan smarter</a></nav>
          <a className="nav-cta" href="/check">Check my trip <span>→</span></a>
        </header>
        {children}
        <footer><div><a className="logo footer-logo" href="/">TravelRights<span>Pro</span></a><p>Know your rights. Travel smarter.</p></div><div className="footerlinks"><a href="/rights">Travel rights</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/disclosure">Disclosure</a></div><div className="small footer-note">Information is educational and not legal advice. Rules vary by trip.</div></footer>
        {process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL && process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ? <script defer src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL} data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID} /> : null}
      </body>
    </html>
  );
}
