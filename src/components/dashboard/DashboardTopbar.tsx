'use client';

import React from 'react';
import { 
  Search, 
  Bell, 
  UserCircle, 
  Settings, 
  HelpCircle,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Badge from '../shared/Badge';

interface DashboardTopbarProps {
  user: {
    name: string;
    avatar_url?: string;
    role: 'labour' | 'employer';
  };
}

const DashboardTopbar = ({ user }: DashboardTopbarProps) => {
  return (
    <header className="h-16 sticky top-0 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 z-30 px-6">
      <div className="h-full flex items-center justify-between gap-8">
        
        {/* Left Side: Mobile Menu & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button className="p-2 text-zinc-400 hover:text-white lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder={user.role === 'employer' ? "Search for workers, jobs..." : "Find local work nearby..."}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Support / Help */}
          <button className="p-2 text-zinc-400 hover:text-white transition-colors hidden md:block">
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <div className="relative group">
            <button className="p-2 text-zinc-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-zinc-950 animate-pulse"></span>
            </button>
            
            {/* Notification Dropdown Stub */}
            <div className="absolute top-full right-0 mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all p-4 z-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white text-sm">Notifications</h3>
                <Badge variant="primary" size="xs">2 New</Badge>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
                  <p className="text-xs text-white font-medium">New Job Invitation</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Hotel Hyatt Brooklyn has invited you...</p>
                </div>
              </div>
              <button className="w-full mt-4 text-[10px] uppercase font-bold text-zinc-500 hover:text-white transition-colors">
                View All Notifications
              </button>
            </div>
          </div>

          <div className="h-4 w-[1px] bg-zinc-800 mx-2 hidden sm:block"></div>

          {/* User Profile */}
          <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-zinc-900 transition-all group">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white leading-none capitalize">{user.name}</p>
              <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-widest">{user.role}</p>
            </div>
            <div className="relative">
              {user.avatar_url ? (
                <img 
                  src={user.avatar_url} 
                  alt="User" 
                  className={cn(
                    "w-9 h-9 rounded-full object-cover border-2 transition-colors",
                    user.role === 'labour' ? "border-emerald-500/20 group-hover:border-emerald-500" : "border-indigo-500/20 group-hover:border-indigo-500"
                  )}
                />
              ) : (
                <UserCircle className={cn(
                  "w-9 h-9 transition-colors",
                  user.role === 'labour' ? "text-emerald-500/50 group-hover:text-emerald-500" : "text-indigo-500/50 group-hover:text-indigo-500"
                )} />
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardTopbar;
