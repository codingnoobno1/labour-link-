'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { BarChart3, TrendingUp, ChevronDown } from 'lucide-react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  data: { label: string; value: number }[];
  maxValue?: number;
  height?: number;
  color?: 'primary' | 'emerald' | 'amber' | 'indigo';
  className?: string;
}

const ChartCard = ({
  title,
  subtitle,
  data,
  maxValue,
  height = 200,
  color = 'primary',
  className
}: ChartCardProps) => {
  const effectiveMax = maxValue || Math.max(...data.map(d => d.value), 1);
  
  const colorVariants = {
    primary: 'bg-blue-500 shadow-blue-500/20',
    emerald: 'bg-emerald-500 shadow-emerald-500/20',
    amber: 'bg-amber-500 shadow-amber-500/20',
    indigo: 'bg-indigo-500 shadow-indigo-500/20',
  };

  return (
    <div className={cn(
      "bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:border-white/10 overflow-hidden group",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-[10px] font-bold text-zinc-400 hover:text-white transition-all uppercase tracking-wider">
            Last 7 Days <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div 
        className="flex items-end justify-between gap-2 lg:gap-4 px-2"
        style={{ height: `${height}px` }}
      >
        {data.map((item, idx) => {
          const percentage = (item.value / effectiveMax) * 100;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-3 group/bar">
              <div className="relative w-full flex flex-col items-center justify-end h-full">
                {/* Value Tooltip on Hover */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-zinc-950 px-2 py-0.5 rounded text-[10px] font-bold opacity-0 group-hover/bar:opacity-100 transition-all pointer-events-none transform -translate-y-1 group-hover/bar:translate-y-0 shadow-xl">
                  {item.value}
                </div>
                
                {/* The Bar */}
                <div 
                  className={cn(
                    "w-full max-w-[40px] rounded-t-lg transition-all duration-700 relative shadow-lg",
                    colorVariants[color]
                  )}
                  style={{ height: `${percentage}%` }}
                >
                  {/* Gloss Effect */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 rounded-t-lg" />
                </div>
              </div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter group-hover/bar:text-zinc-300 transition-colors">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer / Stats */}
      <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-400">
          <TrendingUp className="w-4 h-4" />
          <span className="text-xs font-bold">+12.5% from last week</span>
        </div>
        <BarChart3 className="w-4 h-4 text-zinc-700" />
      </div>
    </div>
  );
};

export default ChartCard;
