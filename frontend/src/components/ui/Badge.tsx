import React from 'react';
import { cn } from '@/lib/utils';

export function Badge({ variant = 'slate', className, children, ...props }: any) {
  const variants = {
    blue: 'bg-ib-blue-l text-ib-blue border-ib-blue-m', teal: 'bg-ib-teal-l text-ib-teal border-ib-teal',
    amber: 'bg-ib-amber-l text-ib-amber border-ib-amber', green: 'bg-ib-green-l text-ib-green border-ib-green',
    red: 'bg-ib-red-l text-ib-red border-ib-red', slate: 'bg-slate-100 text-slate-700 border-slate-300',
  };
  return <span className={cn('inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border', variants[variant as keyof typeof variants], className)} {...props}>{children}</span>;
}
