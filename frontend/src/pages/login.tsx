import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setIsLoading(true);
    try { await login(email, password); } catch (err: any) { setError(err.message); } finally { setIsLoading(false); }
  };

  return (
    <>
      <Head><title>Sign In — IB Marketplace</title></Head>
      <div className="min-h-screen flex">
        <div className="hidden lg:flex w-1/2 bg-ib-dark flex-col justify-between p-12">
          <div className="font-bold text-white text-xl">IB Marketplace</div>
          <div>
            <h2 className="text-4xl font-extrabold text-white mb-4">Access your<br />verified network.</h2>
            <p className="text-slate-400">B2B & B2G commerce across 20 European markets.</p>
          </div>
          <p className="text-slate-500 text-xs">KYB VERIFIED · B2B & B2G ONLY · EU GDPR COMPLIANT</p>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-extrabold text-ib-dark mb-2">Sign in</h1>
            <p className="text-slate-500 mb-8">Access your business account</p>
            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input label="Business email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
              <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
              <Button type="submit" className="w-full" isLoading={isLoading}>Sign in →</Button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-500">No account? <Link href="/register" className="text-ib-blue font-semibold">Register your business</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}
