import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Head><title>Contact — IB Marketplace</title></Head>
      <div className="min-h-screen bg-ib-dark text-white">
        <nav className="flex justify-between items-center px-12 py-5 border-b border-white/10">
          <Link href="/" className="font-bold text-xl tracking-tight">IB Marketplace</Link>
          <div className="flex gap-3">
            <Link href="/login" className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10">Sign In</Link>
            <Link href="/register" className="px-4 py-2 text-sm bg-ib-blue rounded-lg hover:bg-blue-700">Register Business</Link>
          </div>
        </nav>
        <div className="max-w-xl mx-auto px-12 py-16">
          <h1 className="text-4xl font-extrabold mb-2">Contact Us</h1>
          <p className="text-slate-400 mb-8">For business enquiries, KYB support, or data requests.</p>
          {submitted ? (
            <div className="bg-ib-teal/10 border border-ib-teal/30 rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold mb-2">Message Sent</h3>
              <p className="text-slate-400">We will respond to your enquiry within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input label="Company name" type="text" required placeholder="Acme Ltd" />
              <Input label="Business email" type="email" required placeholder="you@company.com" />
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Subject</label>
                <select required className="w-full h-10 bg-white/10 border border-white/20 rounded-md px-3 text-sm text-white">
                  <option value="" className="text-ib-dark">Select a topic...</option>
                  <option value="kyb" className="text-ib-dark">KYB Verification</option>
                  <option value="billing" className="text-ib-dark">Billing & Subscription</option>
                  <option value="data" className="text-ib-dark">Data & Privacy Request</option>
                  <option value="technical" className="text-ib-dark">Technical Support</option>
                  <option value="other" className="text-ib-dark">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                <textarea required rows={5} className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ib-teal" placeholder="Describe your enquiry..." />
              </div>
              <Button type="submit" className="w-full">Send Message →</Button>
            </form>
          )}
        </div>
        <footer className="px-12 py-8 border-t border-white/10 flex justify-between text-sm text-slate-500">
          <span>© 2024 IB Marketplace.</span>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
