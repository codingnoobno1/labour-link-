'use client';

import React from 'react';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar, 
  ChevronRight, 
  Star,
  Zap,
  Tag
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Badge from '../shared/Badge';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  pay: string;
  duration: string;
  type: 'shift' | 'fulltime';
  status: 'open' | 'closed' | 'urgent';
  tags: string[];
  created_at: string;
  hasApplied?: boolean;
  onApply?: (id: string) => void;
  className?: string;
}

const JobCard = ({
  id,
  title,
  company,
  location,
  pay,
  duration,
  type,
  status,
  tags,
  created_at,
  hasApplied,
  onApply,
  className
}: JobCardProps) => {
  return (
    <div className={cn(
      "group relative bg-zinc-900/40 border transition-all duration-300 rounded-2xl p-6 hover:bg-zinc-900/60 overflow-hidden",
      status === 'urgent' ? "border-rose-500/30 hover:border-rose-500/50" : "border-zinc-800 hover:border-emerald-500/30",
      className
    )}>
      {/* Decorative Gradient Background */}
      <div className={cn(
        "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 opacity-10 transition-opacity group-hover:opacity-20",
        status === 'urgent' ? "bg-rose-500" : "bg-emerald-500"
      )}></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4 flex-1">
          {/* Header Data */}
          <div className="flex items-start justify-between md:justify-start gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors tracking-tight">{title}</h3>
                {status === 'urgent' && (
                  <Badge variant="error" size="xs" icon={<Zap className="w-2 h-2" />}>Urgent</Badge>
                )}
              </div>
              <p className="text-zinc-400 font-medium text-sm flex items-center gap-1.5">
                {company} 
                <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                <span className="text-zinc-500 font-normal">Posted {new Date(created_at).toLocaleDateString()}</span>
              </p>
            </div>
          </div>

          {/* Details Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-zinc-800/50 pt-4">
            <div className="flex items-center gap-2 text-zinc-400">
              <div className="w-8 h-8 rounded-lg bg-zinc-800/50 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="text-xs font-medium">{location}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <div className="w-8 h-8 rounded-lg bg-zinc-800/50 flex items-center justify-center">
                <Clock className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="text-xs font-medium">{duration}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-sm font-black tracking-tight">{pay}</span>
            </div>
          </div>

          {/* Skills / Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            <div className="flex items-center gap-1.5 bg-zinc-800/50 px-2 py-1 rounded-md">
              <Tag className="w-3 h-3 text-zinc-500" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{type === 'shift' ? 'Shift Work' : 'Full Time'}</span>
            </div>
            {tags.map((tag) => (
              <Badge key={tag} variant="neutral" size="xs">{tag}</Badge>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            disabled={hasApplied}
            onClick={() => onApply?.(id)}
            className={cn(
              "px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-xl active:scale-95 flex items-center gap-2",
              hasApplied 
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700" 
                : "bg-white text-zinc-950 hover:bg-zinc-200 shadow-white/5"
            )}
          >
            {hasApplied ? <CheckCircle className="w-4 h-4" /> : null}
            {hasApplied ? 'Applied' : 'Apply Now'}
            {!hasApplied && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

// Sub-component for icons used above (CheckCircle)
const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default JobCard;
