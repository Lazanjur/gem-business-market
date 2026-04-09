import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import api from '@/lib/api';

export default function Marketplace() {
  const [query, setQuery] = useState('');
  const [radiusKm, setRadiusKm] = useState(250);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const executeSearch = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/marketplace/search/listings', {
        params: { q: query, lat: 50.1109, lng: 8.6821, radius_km: radiusKm, limit: 20 },
      });
      setResults(res.data.data || []);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [query, radiusKm]);

  useEffect(() => { executeSearch(); }, [executeSearch]);

  return (
    <>
      <Head><title>Marketplace — IB Marketplace</title></Head>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-ib-dark text-white px-8 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">IB Marketplace</Link>
          <nav className="flex gap-6 text-sm text-slate-300">
            <Link href="/marketplace" className="text-white font-semibold">Marketplace</Link>
            <Link href="/login" className="hover:text-white">Sign in</Link>
            <Link href="/register" className="bg-ib-gold text-ib-dark font-semibold px-4 py-1.5 rounded-md hover:bg-yellow-400">Register</Link>
          </nav>
        </header>

        <div className="max-w-6xl mx-auto px-8 py-10">
          <h1 className="text-3xl font-extrabold text-ib-dark mb-2">Verified Supplier Marketplace</h1>
          <p className="text-slate-500 mb-8">Search 12,400+ KYB-verified suppliers across 20 European markets.</p>

          {/* Search bar */}
          <form
            onSubmit={(e) => { e.preventDefault(); executeSearch(); }}
            className="bg-white p-4 rounded-xl border border-slate-200 mb-8 flex gap-4"
          >
            <Input
              placeholder="Search verified products or suppliers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <select
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="h-10 border border-slate-200 rounded-md px-3 text-sm"
            >
              <option value={50}>50 km</option>
              <option value={250}>250 km</option>
              <option value={1000}>1000 km</option>
            </select>
            <Button type="submit" isLoading={isLoading}>Search</Button>
          </form>

          {/* Results */}
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200 p-5 rounded-xl">
                  <h4 className="font-bold text-ib-blue text-lg mb-1">{item.title}</h4>
                  <p className="text-slate-500 text-sm mb-3">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="slate">{item.currency} {item.price}</Badge>
                    {item.distance_km !== undefined && (
                      <Badge variant="teal">{item.distance_km} km away</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
              <p className="text-slate-400 text-lg mb-4">
                {isLoading ? 'Searching...' : 'No listings found. Try a different search or radius.'}
              </p>
              <p className="text-slate-400 text-sm mb-6">
                Sign in or register to access the full supplier network and post RFQs.
              </p>
              <div className="flex gap-3 justify-center">
                <Link href="/login">
                  <Button variant="secondary">Sign in</Button>
                </Link>
                <Link href="/register">
                  <Button>Register your business</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
