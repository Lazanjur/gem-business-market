import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Tenders() {
  return (
    <>
      <Head><title>Public Tenders — IB Marketplace</title></Head>
      <div className="min-h-screen bg-ib-dark text-white">
        <nav className="flex justify-between items-center px-12 py-5 border-b border-white/10">
          <Link href="/" className="font-bold text-xl tracking-tight">IB Marketplace</Link>
          <div className="flex gap-6 text-sm text-slate-300">
            <Link href="/marketplace" className="hover:text-white">Marketplace</Link>
            <Link href="/suppliers" className="hover:text-white">Suppliers</Link>
            <Link href="/tenders" className="text-white font-semibold">Tenders</Link>
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10">Sign In</Link>
            <Link href="/register" className="px-4 py-2 text-sm bg-ib-blue rounded-lg hover:bg-blue-700">Register Business</Link>
          </div>
        </nav>

        <section className="px-12 py-16 text-center max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest bg-ib-teal/20 text-ib-teal rounded-full mb-4">B2G Procurement</div>
          <h1 className="text-5xl font-extrabold mb-4">Public Procurement<br /><span className="text-ib-teal">Tenders — €4.2B+</span></h1>
          <p className="text-slate-400 text-lg mb-8">Geo-fenced public authority tenders visible only to eligible, KYB-verified suppliers in the procurement zone.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/register"><Button>Register to Bid on Tenders →</Button></Link>
            <Link href="/login"><Button variant="ghost">Sign In</Button></Link>
          </div>
        </section>

        <section className="px-12 pb-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              ['Geo-Fenced Visibility', 'Tenders are only visible to verified suppliers within the defined procurement radius.'],
              ['Public Authority Verified', 'All contracting authorities are KYB-verified against national government registries.'],
              ['EU & UK Compliant', 'Full compliance with EU Public Procurement Directive and UK Procurement Act 2023.'],
            ].map(([title, desc]) => (
              <div key={title as string} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-ib-teal mb-2">{title}</h3>
                <p className="text-slate-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Access Live Tenders</h3>
            <p className="text-slate-400 mb-6">Register your business to view and bid on public procurement tenders in your region.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/register"><Button>Register Your Business →</Button></Link>
              <Link href="/login"><Button variant="secondary">Sign In</Button></Link>
            </div>
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
