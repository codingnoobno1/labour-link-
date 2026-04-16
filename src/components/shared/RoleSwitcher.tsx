'use client';

import React from 'react';
import { User, Shield, ArrowLeftRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter, usePathname } from 'next/navigation';

interface RoleSwitcherProps {
  currentRole: 'labour' | 'employer';
  className?: string;
}

const RoleSwitcher = ({ currentRole, className }: RoleSwitcherProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = () => {
    if (currentRole === 'labour') {
      router.push('/employer/dashboard');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className={cn("flex items-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl w-fit", className)}>
      <button 
        onClick={() => currentRole !== 'labour' && handleSwitch()}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
          currentRole === 'labour' 
            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
            : "text-zinc-500 hover:text-zinc-300"
        )}
      >
        <User className="w-4 h-4" />
        WORKER
      </button>
      
      <div className="text-zinc-800">
        <ArrowLeftRight className="w-4 h-4" />
      </div>

      <button 
        onClick={() => currentRole !== 'employer' && handleSwitch()}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
          currentRole === 'employer' 
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
            : "text-zinc-500 hover:text-zinc-300"
        )}
      >
        <Shield className="w-4 h-4" />
        EMPLOYER
      </button>
    </div>
  );
};

export default RoleSwitcher;
