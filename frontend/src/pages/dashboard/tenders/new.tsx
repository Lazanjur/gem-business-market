import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

export default function CreateTender() {
  const { user } = useAuth();

  if (user?.entity_type !== 'public_authority') {
    return <div className="p-8 font-bold text-red-500">Access Denied. Public Authorities Only.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-xl font-bold">Issue Public Procurement Tender</h2>
      <div className="bg-white p-6 rounded-xl border border-slate-200 grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input label="Tender Title" />
          <Input label="Budget (EUR)" type="number" />
          <Input label="Deadline" type="datetime-local" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Geographic Eligibility Polygon</label>
          <div className="h-64 bg-slate-100 border border-slate-300 rounded flex items-center justify-center text-sm text-slate-500">
            Mapbox Draw Tool Integration
          </div>
        </div>
      </div>
      <Button variant="primary">Publish Tender</Button>
    </div>
  );
}
CreateTender.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;
