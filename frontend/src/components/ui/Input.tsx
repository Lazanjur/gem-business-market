import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; error?: string; helperText?: string; icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, helperText, icon, id, ...props }, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="w-full relative">
      {label && <label htmlFor={inputId} className="block text-sm font-semibold text-ib-dark mb-1.5">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
        <input id={inputId} ref={ref} className={cn('flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm text-ib-dark placeholder:text-slate-400 focus:outline-none focus:ring-1', icon && 'pl-10', error ? 'border-ib-red focus:border-ib-red focus:ring-ib-red' : 'border-ib-border focus:border-ib-blue focus:ring-ib-blue', className)} {...props} />
      </div>
      {error && <p className="mt-1.5 text-xs text-ib-red">{error}</p>}
      {helperText && !error && <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
});
Input.displayName = 'Input';
