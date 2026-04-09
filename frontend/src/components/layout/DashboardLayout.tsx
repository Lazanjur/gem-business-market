import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Marketplace Search', href: '/dashboard/search' },
    { name: 'My Locations', href: '/dashboard/locations' },
    { name: 'Broadcast RFQ', href: '/dashboard/rfq/new' },
    { name: 'Issue Tender (B2G)', href: '/dashboard/tenders/new' },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="w-64 bg-ib-dark flex flex-col text-white">
        <div className="h-16 flex items-center px-6 font-bold text-lg border-b border-white/10">IB Marketplace</div>
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <Link key={item.name} href={item.href} className={`block px-6 py-3 text-sm ${router.pathname.startsWith(item.href) ? 'bg-ib-blue text-white' : 'text-slate-300 hover:bg-white/5'}`}>
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 text-sm">
          <div className="font-bold truncate">{user?.company_name || 'Loading...'}</div>
          <div className="text-ib-teal text-xs uppercase">{user?.verification_tier}</div>
          <button onClick={logout} className="mt-2 text-slate-400 hover:text-white text-xs">Sign Out</button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h1 className="font-bold text-ib-dark capitalize">{router.pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}</h1>
          <span className="px-3 py-1 bg-ib-blue-l text-ib-blue text-xs font-bold rounded-full uppercase">Regime: {user?.regulatory_regime}</span>
        </header>
        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  );
}
