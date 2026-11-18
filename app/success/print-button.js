'use client';

export default function PrintButton() {
  return <button className="btn secondary print-button" type="button" onClick={() => window.print()}>Save / print report</button>;
}
