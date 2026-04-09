import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export default function LocationsManagement() {
  const { user } = useAuth();
  const [locations, setLocations] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLocations = async () => {
    if (!user) return;
    try {
      const res = await api.get(`/entities/${user.id}/locations`);
      setLocations(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchLocations(); }, [user]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Locations & Privacy</h2>
        <Button onClick={() => setIsModalOpen(true)}>Add Warehouse</Button>
      </div>
      <div className="grid gap-4">
        {locations.map(loc => (
          <div key={loc.id} className="bg-white border border-slate-200 p-5 rounded-xl flex justify-between">
            <div>
              <h4 className="font-bold">{loc.label || loc.city} <Badge variant={loc.address_verified ? 'green' : 'amber'}>{loc.address_verified ? 'Verified' : 'Pending'}</Badge></h4>
              <p className="text-sm text-slate-500 mt-1">{loc.address_line1}, {loc.country_code}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Visibility</p>
              <Badge variant="blue">{loc.visibility}</Badge>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Location">
        <form onSubmit={async (e) => { e.preventDefault(); setIsModalOpen(false); }} className="space-y-4 mt-4">
          <Input label="Street Address" required />
          <Input label="City" required />
          <Input label="Country Code" maxLength={2} required />
          <div>
            <label className="block text-sm font-semibold mb-1">Privacy Visibility</label>
            <select className="w-full h-10 border rounded-md px-3 text-sm">
              <option value="hidden">Hidden</option><option value="city">City Level</option><option value="street_level">Street Level</option>
            </select>
          </div>
          <Button type="submit" className="w-full">Save Location</Button>
        </form>
      </Modal>
    </div>
  );
}
LocationsManagement.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;
