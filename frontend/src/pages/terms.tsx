import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Terms() {
  return (
    <>
      <Head><title>Terms of Use — IB Marketplace</title></Head>
      <div className="min-h-screen bg-ib-dark text-white">
        <nav className="flex justify-between items-center px-12 py-5 border-b border-white/10">
          <Link href="/" className="font-bold text-xl tracking-tight">IB Marketplace</Link>
        </nav>
        <div className="max-w-3xl mx-auto px-12 py-16">
          <h1 className="text-4xl font-extrabold mb-8">Terms of Use</h1>
          <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
            <p>IB Marketplace is a B2B and B2G trading platform restricted to verified business entities. By registering, you confirm that you represent a legitimate legal entity and agree to these terms.</p>
            <h2 className="text-xl font-bold text-white">1. Eligibility</h2>
            <p>Access is restricted to KYB-verified businesses registered in EU or UK jurisdictions. Individual consumers may not register.</p>
            <h2 className="text-xl font-bold text-white">2. KYB Verification</h2>
            <p>All entities are verified against national company registries (Companies House, Creditsafe EU) within 24 hours of registration. Unverified accounts have limited access.</p>
            <h2 className="text-xl font-bold text-white">3. Prohibited Use</h2>
            <p>Users may not misrepresent their business identity, post fraudulent listings, or use the platform for consumer transactions.</p>
            <h2 className="text-xl font-bold text-white">4. Data & Privacy</h2>
            <p>All data is processed in accordance with EU GDPR and UK GDPR. See our <Link href="/privacy" className="text-ib-teal underline">Privacy Policy</Link> for details.</p>
            <h2 className="text-xl font-bold text-white">5. Governing Law</h2>
            <p>These terms are governed by the laws of England and Wales for UK entities, and the laws of the applicable EU member state for EU entities.</p>
          </div>
        </div>
        <footer className="px-12 py-8 border-t border-white/10 flex justify-between text-sm text-slate-500">
          <span>© 2024 IB Marketplace.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
