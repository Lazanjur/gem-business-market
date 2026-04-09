import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>IB Marketplace — European B2B Commerce</title>
        <meta name="description" content="KYB-verified B2B marketplace for 20 European markets" />
      </Head>
      <div className="min-h-screen bg-ib-dark text-white">
        <nav className="flex justify-between items-center px-12 py-5 border-b border-white/10">
          <div className="font-bold text-xl tracking-tight">IB Marketplace</div>
          <div className="flex gap-6 text-sm text-slate-300">
            <Link href="/marketplace" className="hover:text-white">Marketplace</Link>
            <Link href="/suppliers" className="hover:text-white">Suppliers</Link>
            <Link href="/tenders" className="hover:text-white">Tenders</Link>
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10">Sign In</Link>
            <Link href="/register" className="px-4 py-2 text-sm bg-ib-blue rounded-lg hover:bg-blue-700">Register Business</Link>
          </div>
        </nav>

        <section className="px-12 py-28 text-center max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest bg-ib-teal/20 text-ib-teal rounded-full mb-6">KYB-Verified Platform</div>
          <h1 className="text-6xl font-extrabold leading-tight mb-6">European B2B commerce,<br /><span className="text-ib-teal">built on trust.</span></h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Access 12,400+ verified suppliers across 20 European markets. Every business verified against national registries within 24 hours.</p>
          <div className="flex justify-center gap-4">
            <Link href="/register" className="px-8 py-4 bg-ib-blue rounded-xl font-bold text-lg hover:bg-blue-700">Register Your Business →</Link>
            <Link href="/marketplace" className="px-8 py-4 border border-white/20 rounded-xl font-bold text-lg hover:bg-white/10">Browse Marketplace</Link>
          </div>
        </section>

        <section className="px-12 py-16 border-t border-white/10">
          <div className="grid grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            {[['12,400+', 'Verified Suppliers'], ['20', 'EU + UK Countries'], ['240+', 'Categories'], ['€4.2B+', 'Tender Value']].map(([val, label]) => (
              <div key={label}><div className="text-4xl font-extrabold text-ib-teal">{val}</div><div className="text-slate-400 mt-1 text-sm">{label}</div></div>
            ))}
          </div>
        </section>

        <section className="px-12 py-20 border-t border-white/10">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Capabilities</h2>
          <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              ['KYB Verification', 'Every business verified against Companies House (UK) and Creditsafe (EU) within 24 hours.'],
              ['Geo-Proximity Search', 'Find verified suppliers within your delivery radius using PostGIS spatial queries.'],
              ['B2G Procurement', 'Public authorities can issue geo-fenced tenders visible only to eligible suppliers.'],
              ['Privacy Controls', 'Granular location visibility: hidden, city-level, or street-level per location.'],
              ['Dual Regime', 'Separate EU VAT (reverse charge) and UK VAT compliance engines built in.'],
              ['Encrypted B2B Chat', 'Real-time messaging between verified entities via WebSocket gateway.'],
            ].map(([title, desc]) => (
              <div key={title as string} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-ib-teal mb-2">{title}</h3>
                <p className="text-slate-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="px-12 py-8 border-t border-white/10 flex justify-between text-sm text-slate-500">
          <span>© 2024 IB Marketplace. B2B & B2G Only. EU GDPR Compliant.</span>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
