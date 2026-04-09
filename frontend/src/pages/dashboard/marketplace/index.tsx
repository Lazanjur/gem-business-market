import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

export default function DashboardMarketplace() {
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
    <div className="h-full flex flex-col max-w-6xl mx-auto">
      <form
        onSubmit={(e) => { e.preventDefault(); executeSearch(); }}
        className="bg-white p-4 rounded-xl border border-slate-200 mb-6 flex gap-4"
      >
        <Input
          placeholder="Search verified products..."
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
        <Button type="submit" isLoading={isLoading}>Search Proximity</Button>
      </form>

      <div className="flex-1 flex gap-6">
        <div className="w-1/2 overflow-y-auto flex flex-col gap-4">
          {results.length === 0 && !isLoading && (
            <div className="bg-white border border-slate-200 p-6 rounded-xl text-center text-slate-400">
              No listings found. Try a different search or radius.
            </div>
          )}
          {results.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 p-4 rounded-xl">
              <h4 className="font-bold text-ib-blue text-lg">{item.title}</h4>
              <p className="text-slate-500 text-sm mt-1 mb-2">{item.description}</p>
              <div className="flex justify-between items-center mt-2">
                <Badge variant="slate">{item.currency} {item.price}</Badge>
                {item.distance_km !== undefined && <Badge variant="teal">{item.distance_km} km away</Badge>}
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2 bg-slate-200 rounded-xl flex items-center justify-center border border-slate-300">
          <span className="text-slate-500 font-bold">Mapbox Instance Mounted Here</span>
        </div>
      </div>
    </div>
  );
}

DashboardMarketplace.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;
