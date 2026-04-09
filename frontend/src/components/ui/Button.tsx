import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'teal' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
  const variants = {
    primary: 'bg-ib-blue text-white hover:bg-blue-700',
    secondary: 'bg-white text-ib-dark border border-ib-border hover:bg-slate-50',
    teal: 'bg-ib-teal text-white hover:bg-teal-700',
    danger: 'bg-ib-red text-white hover:bg-red-700',
    ghost: 'bg-transparent text-ib-slate hover:bg-slate-100 text-ib-dark',
  };
  const sizes = { sm: 'h-8 px-3 text-xs', md: 'h-10 px-4 text-sm', lg: 'h-12 px-6 text-base' };

  return (
    <button ref={ref} disabled={disabled || isLoading} className={cn('inline-flex items-center justify-center rounded-md font-semibold transition disabled:opacity-50', variants[variant], sizes[size], className)} {...props}>
      {isLoading ? <span className="mr-2 animate-pulse">...</span> : null} {children}
    </button>
  );
});
Button.displayName = 'Button';
