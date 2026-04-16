import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral' | 'indigo' | 'outline';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

const Badge = ({
  children,
  variant = 'neutral',
  size = 'sm',
  className,
  icon
}: BadgeProps) => {
  const variants = {
    primary: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    neutral: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    outline: 'bg-transparent border-zinc-700 text-zinc-400'
  };

  const sizes = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm'
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 font-bold uppercase tracking-wider border rounded-full",
      variants[variant],
      sizes[size],
      className
    )}>
      {icon && <span className="w-3 h-3 flex items-center justify-center">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
