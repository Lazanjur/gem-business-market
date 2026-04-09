import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

const CATEGORIES = [
  'Manufacturing', 'Construction', 'Logistics & Transport', 'IT & Technology',
  'Professional Services', 'Healthcare & Pharma', 'Food & Agriculture', 'Energy',
  'Financial Services', 'Retail & Distribution', 'Engineering', 'Legal Services',
];

const COUNTRIES = [
  'All Countries', 'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus',
  'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany',
  'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg',
  'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia',
  'Slovenia', 'Spain', 'Sweden', 'United Kingdom',
];

export default function Suppliers() {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('All Countries');
  const [category, setCategory] = useState('');

  return (
    <>
      <Head><title>Verified Suppliers — IB Marketplace</title></Head>
      <div className="min-h-screen bg-ib-dark text-white">
        {/* Nav */}
        <nav className="flex justify-between items-center px-12 py-5 border-b border-white/10">
          <Link href="/" className="font-bold text-xl tracking-tight">IB Marketplace</Link>
          <div className="flex gap-6 text-sm text-slate-300">
            <Link href="/marketplace" className="hover:text-white">Marketplace</Link>
            <Link href="/suppliers" className="text-white font-semibold">Suppliers</Link>
            <Link href="/tenders" className="hover:text-white">Tenders</Link>
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10">Sign In</Link>
            <Link href="/register" className="px-4 py-2 text-sm bg-ib-blue rounded-lg hover:bg-blue-700">Register Business</Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="px-12 py-16 text-center max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest bg-ib-teal/20 text-ib-teal rounded-full mb-4">KYB-Verified Network</div>
          <h1 className="text-5xl font-extrabold mb-4">12,400+ Verified<br /><span className="text-ib-teal">European Suppliers</span></h1>
          <p className="text-slate-400 text-lg mb-8">Every supplier verified against national company registries. B2B & B2G only. EU GDPR compliant.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/register"><Button>Register to Access Full Network →</Button></Link>
            <Link href="/login"><Button variant="ghost">Sign In</Button></Link>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="px-12 pb-12 max-w-6xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 flex gap-4 flex-wrap">
            <Input
              placeholder="Search suppliers by name or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] bg-white/10 border-white/20 text-white placeholder:text-slate-400"
            />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="h-10 bg-white/10 border border-white/20 rounded-md px-3 text-sm text-white"
            >
              {COUNTRIES.map((c) => <option key={c} value={c} className="text-ib-dark">{c}</option>)}
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-10 bg-white/10 border border-white/20 rounded-md px-3 text-sm text-white"
            >
              <option value="" className="text-ib-dark">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c} className="text-ib-dark">{c}</option>)}
            </select>
            <Button>Search</Button>
          </div>

          {/* Categories grid */}
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {CATEGORIES.map((cat) => (
              <div key={cat} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 cursor-pointer transition">
                <h3 className="font-semibold text-white mb-1">{cat}</h3>
                <p className="text-slate-400 text-xs">KYB-verified suppliers</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-ib-teal/10 border border-ib-teal/30 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Access the Full Supplier Directory</h3>
            <p className="text-slate-400 mb-6">Register your business to view verified supplier profiles, contact details, and post RFQs.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/register"><Button>Register Your Business →</Button></Link>
              <Link href="/login"><Button variant="secondary">Sign In</Button></Link>
            </div>
          </div>
        </section>

        {/* Footer */}
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
