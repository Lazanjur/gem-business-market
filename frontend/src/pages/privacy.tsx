import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Privacy() {
  return (
    <>
      <Head><title>Privacy Policy — IB Marketplace</title></Head>
      <div className="min-h-screen bg-ib-dark text-white">
        <nav className="flex justify-between items-center px-12 py-5 border-b border-white/10">
          <Link href="/" className="font-bold text-xl tracking-tight">IB Marketplace</Link>
        </nav>
        <div className="max-w-3xl mx-auto px-12 py-16">
          <h1 className="text-4xl font-extrabold mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
            <p>IB Marketplace is committed to protecting the privacy of all registered business entities. This policy explains how we collect, use, and protect your data in accordance with EU GDPR and UK GDPR.</p>
            <h2 className="text-xl font-bold text-white">1. Data We Collect</h2>
            <p>We collect company registration data, contact details, transaction records, and location data (subject to your privacy settings) for the purpose of operating the marketplace.</p>
            <h2 className="text-xl font-bold text-white">2. Legal Basis</h2>
            <p>Data is processed on the basis of contractual necessity (to provide the service), legal obligation (KYB/AML compliance), and legitimate interest (fraud prevention).</p>
            <h2 className="text-xl font-bold text-white">3. Location Data</h2>
            <p>Location visibility is controlled by you. You may set each business location to hidden, city-level, or street-level visibility. Location data is used only for geo-proximity search and geo-fenced tender matching.</p>
            <h2 className="text-xl font-bold text-white">4. Data Retention</h2>
            <p>Business registration data is retained for 7 years for legal compliance. You may request deletion of non-mandatory data at any time.</p>
            <h2 className="text-xl font-bold text-white">5. Your Rights</h2>
            <p>You have the right to access, rectify, erase, and port your data. To exercise these rights, contact us at <Link href="/contact" className="text-ib-teal underline">our contact page</Link>.</p>
          </div>
        </div>
        <footer className="px-12 py-8 border-t border-white/10 flex justify-between text-sm text-slate-500">
          <span>© 2024 IB Marketplace.</span>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
