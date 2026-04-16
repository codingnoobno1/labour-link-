'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Briefcase, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  UserCircle,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import RoleSwitcher from '../shared/RoleSwitcher';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

interface DashboardSidebarProps {
  role: 'labour' | 'employer';
}

const DashboardSidebar = ({ role }: DashboardSidebarProps) => {
  const pathname = usePathname();

  const labourItems: SidebarItem[] = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { title: 'Work Feed', href: '/dashboard/work', icon: Briefcase },
    { title: 'My Applications', href: '/dashboard/applications', icon: ShieldCheck },
    { title: 'Events', href: '/dashboard/events', icon: Calendar },
    { title: 'Profile', href: '/dashboard/profile', icon: UserCircle },
  ];

  const employerItems: SidebarItem[] = [
    { title: 'Company Overview', href: '/employer/dashboard', icon: Building2 },
    { title: 'Job Postings', href: '/employer/dashboard/jobs', icon: Briefcase },
    { title: 'Applicants', href: '/employer/dashboard/applicants', icon: Users },
    { title: 'Top Workers', href: '/employer/dashboard/workers', icon: ShieldCheck },
    { title: 'Analytics', href: '/employer/dashboard/analytics', icon: BarChart3 },
    { title: 'Settings', href: '/employer/dashboard/settings', icon: Settings },
  ];

  const items = role === 'labour' ? labourItems : employerItems;

  return (
    <aside className="w-64 h-screen sticky top-0 bg-zinc-950 border-r border-zinc-800 flex flex-col z-40 hidden lg:flex">
      {/* Sidebar Header */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center shadow-lg",
            role === 'labour' 
              ? "bg-gradient-to-br from-emerald-500 to-teal-400 shadow-emerald-500/20" 
              : "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/20"
          )}>
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">LabourLink</span>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-4 mb-2">Main Menu</p>
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200",
                  isActive 
                    ? (role === 'labour' ? "bg-emerald-500/10 text-emerald-400" : "bg-indigo-500/10 text-indigo-400")
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? (role === 'labour' ? "text-emerald-400" : "text-indigo-400") : "text-zinc-500 group-hover:text-zinc-300"
                  )} />
                  <span className="text-sm font-medium">{item.title}</span>
                </div>
                {isActive && (
                  <div className={cn(
                    "w-1 h-5 rounded-full",
                    role === 'labour' ? "bg-emerald-400" : "bg-indigo-400"
                  )} />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Role Switcher in Sidebar */}
      <div className="mt-auto p-4 border-t border-zinc-800/50">
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2 mb-4">Switch View</p>
        <RoleSwitcher currentRole={role} className="w-full" />
      </div>

      {/* Logout / User Info */}
      <div className="p-4 border-t border-zinc-900">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-zinc-500 hover:text-rose-400 hover:bg-rose-500/5 transition-all group">
          <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
