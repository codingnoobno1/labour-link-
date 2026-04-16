'use client';

import React from 'react';
import { 
  Star, 
  MapPin, 
  CheckCircle, 
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Badge from '../shared/Badge';

interface WorkerCardProps {
  id: string;
  name: string;
  avatar_url?: string;
  skills: string[];
  rating: number;
  location: string;
  is_verified: boolean;
  total_jobs: number;
  className?: string;
  onViewProfile?: (id: string) => void;
}

const WorkerCard = ({
  id,
  name,
  avatar_url,
  skills,
  rating,
  location,
  is_verified,
  total_jobs,
  className,
  onViewProfile
}: WorkerCardProps) => {
  return (
    <div className={cn(
      "group relative bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:border-indigo-500/30 hover:bg-zinc-900/60 overflow-hidden",
      className
    )}>
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors"></div>

      <div className="relative z-10 space-y-5">
        {/* Header: Avatar, Name & Verification */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              {avatar_url ? (
                <img 
                  src={avatar_url} 
                  alt={name} 
                  className="w-14 h-14 rounded-2xl object-cover border border-zinc-800 group-hover:border-indigo-500/50 transition-colors shadow-lg"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center border border-zinc-700">
                  <span className="text-xl font-bold text-zinc-500">{name[0]}</span>
                </div>
              )}
              {is_verified && (
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-lg border border-indigo-100">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 fill-indigo-100" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors leading-tight">{name}</h3>
              <div className="flex items-center gap-1.5 mt-1 text-zinc-500">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">{location}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-4 h-4 fill-amber-500" />
              <span className="text-sm font-bold text-zinc-200">{rating > 0 ? rating.toFixed(1) : '--'}</span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-0.5 uppercase tracking-tighter font-bold">Rating</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 py-3 border-y border-zinc-800/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-zinc-800/50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase leading-none mb-0.5">Verified</p>
              <p className="text-xs font-bold text-zinc-300">{is_verified ? 'Yes' : 'No'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-zinc-800/50 rounded-lg flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase leading-none mb-0.5">Jobs Worked</p>
              <p className="text-xs font-bold text-zinc-300">{total_jobs}</p>
            </div>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="neutral" size="xs">{skill}</Badge>
          ))}
          {skills.length > 3 && (
            <Badge variant="outline" size="xs">+{skills.length - 3}</Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button 
            onClick={() => onViewProfile?.(id)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-zinc-800 text-zinc-300 rounded-xl text-xs font-bold hover:bg-zinc-700 transition-all border border-zinc-700/50"
          >
            Profile
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20">
            Invite to Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;
