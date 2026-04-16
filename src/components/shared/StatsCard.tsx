import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
  color?: 'primary' | 'emerald' | 'amber' | 'indigo' | 'rose';
  className?: string;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  color = 'primary',
  className
}: StatsCardProps) => {
  const colorVariants = {
    primary: 'from-blue-500/10 to-blue-500/5 text-blue-500 border-blue-500/20',
    emerald: 'from-emerald-500/10 to-emerald-500/5 text-emerald-500 border-emerald-500/20',
    amber: 'from-amber-500/10 to-amber-500/5 text-amber-500 border-amber-500/20',
    indigo: 'from-indigo-500/10 to-indigo-500/5 text-indigo-500 border-indigo-500/20',
    rose: 'from-rose-500/10 to-rose-500/5 text-rose-500 border-rose-500/20',
  };

  return (
    <div className={cn(
      "relative overflow-hidden group p-6 rounded-2xl border bg-zinc-900/40 backdrop-blur-md transition-all duration-300 hover:border-white/20",
      className
    )}>
      {/* Background Glow */}
      <div className={cn(
        "absolute -right-8 -top-8 w-32 h-32 opacity-10 blur-3xl rounded-full transition-opacity group-hover:opacity-20",
        color === 'primary' && 'bg-blue-500',
        color === 'emerald' && 'bg-emerald-500',
        color === 'amber' && 'bg-amber-500',
        color === 'indigo' && 'bg-indigo-500',
        color === 'rose' && 'bg-rose-500',
      )} />

      <div className="relative z-10 flex items-start justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2.5 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110",
              colorVariants[color]
            )}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-zinc-400">{title}</p>
          </div>
          
          <div>
            <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
            {description && (
              <p className="text-xs text-zinc-500 mt-1">{description}</p>
            )}
          </div>

          {trend && (
            <div className={cn(
              "flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full w-fit",
              trend.isUp ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"
            )}>
              {trend.isUp ? '↑' : '↓'} {trend.value}%
              <span className="text-zinc-500 font-normal ml-1">vs last month</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
