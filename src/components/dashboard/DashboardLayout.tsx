'use client';

import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardTopbar from './DashboardTopbar';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: {
    name: string;
    avatar_url?: string;
    role: 'labour' | 'employer';
  };
  className?: string;
}

const DashboardLayout = ({ children, user, className }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-300">
      {/* Permanent Sidebar (Hidden on mobile) */}
      <DashboardSidebar role={user.role} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen max-w-full overflow-hidden">
        {/* Topbar sticky header */}
        <DashboardTopbar user={user} />

        {/* Page Content Scrollable Area */}
        <main className={cn(
          "flex-1 overflow-y-auto p-4 md:p-8 lg:p-10",
          className
        )}>
          <div className="max-w-7xl mx-auto space-y-10">
            {children}
          </div>
          
          {/* Footer Spacer */}
          <div className="h-20" />
        </main>
      </div>

      {/* Mobile Navigation Drawer Overlay (Optional later) */}
    </div>
  );
};

export default DashboardLayout;
