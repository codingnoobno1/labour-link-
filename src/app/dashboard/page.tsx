import React from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle, 
  Star, 
  Bell, 
  Search, 
  Filter, 
  ChevronRight, 
  UserCircle 
} from 'lucide-react';

const WORK_FEED = [
  {
    id: 1,
    title: 'Construction Site Worker',
    company: 'BuildRight Corp',
    location: 'Downtown Metro',
    pay: '$25/hr',
    duration: '2 weeks',
    tags: ['Heavy Lifting', 'Safety Gear Required'],
    postedAt: '2 hours ago',
  },
  {
    id: 2,
    title: 'Warehouse Loader',
    company: 'Logistics Pro',
    location: 'Westside Industrial Park',
    pay: '$20/hr',
    duration: 'On-going',
    tags: ['Night Shift', 'Forklift optional'],
    postedAt: '5 hours ago',
  },
  {
    id: 3,
    title: 'Plumber Assistant',
    company: 'QuickFix Plumbing',
    location: 'North Suburbs',
    pay: '$22/hr',
    duration: '3 days',
    tags: ['Apprentice', 'Tools Provided'],
    postedAt: '1 day ago',
  }
];

const PREVIOUS_WORK = [
  {
    id: 101,
    title: 'Electrician Helper',
    company: 'Volt Services',
    date: 'March 15, 2026',
    rating: 5,
    status: 'Completed',
  },
  {
    id: 102,
    title: 'Site Cleanup Crew',
    company: 'BuildRight Corp',
    date: 'February 28, 2026',
    rating: 4.5,
    status: 'Completed',
  }
];

const EVENTS = [
  {
    id: 201,
    title: 'OSHA Safety Certification',
    date: 'April 10, 2026 ',
    time: '09:00 AM',
    location: 'Online',
    type: 'Training',
  },
  {
    id: 202,
    title: 'Heavy Machinery Workshop',
    date: 'April 18, 2026',
    time: '14:00 PM',
    location: 'City Convention Center',
    type: 'Workshop',
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-sans tracking-tight text-white">LabourLink</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-zinc-400 hover:text-white transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border border-zinc-900"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-zinc-800 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs text-zinc-500">Available for Work</p>
                </div>
                <UserCircle className="w-8 h-8 text-zinc-400" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, John!</h1>
          <p className="text-zinc-400">Here's what's happening in your network today.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Work Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-400" />
                Work Feed
              </h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 transition-colors">
                  <Filter className="w-4 h-4" /> Filter
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {WORK_FEED.map(job => (
                <div key={job.id} className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl hover:border-emerald-500/30 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">{job.title}</h3>
                      <p className="text-zinc-400 text-sm mt-1">{job.company}</p>
                    </div>
                    <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium border border-emerald-500/20">
                      {job.pay}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-zinc-400 mb-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {job.duration}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                    <span className="text-xs text-zinc-500">{job.postedAt}</span>
                    <button className="px-4 py-2 bg-white text-zinc-950 font-medium text-sm rounded-lg hover:bg-zinc-200 transition-colors">
                      Quick Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full py-3 border border-zinc-800 rounded-xl text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors">
              Load More Opportunities
            </button>
          </div>

          {/* Right Column: Previous Work & Events */}
          <div className="space-y-8">
            
            {/* My Previous Work */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-5">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                Previous Work
              </h2>
              <div className="space-y-4">
                {PREVIOUS_WORK.map(work => (
                  <div key={work.id} className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                    <h3 className="font-medium text-zinc-200">{work.title}</h3>
                    <p className="text-xs text-zinc-500 mt-1">{work.company} • {work.date}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 text-emerald-400">
                        <Star className="w-4 h-4 fill-emerald-400" />
                        <span className="text-sm font-medium">{work.rating}</span>
                      </div>
                      <span className="text-xs font-medium text-zinc-400 bg-zinc-800 px-2 py-1 rounded">
                        {work.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 flex items-center justify-center gap-1 text-sm text-emerald-400 hover:text-emerald-300 transition-colors py-2">
                View History <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Events for Labour */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
              <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-5">
                <Calendar className="w-5 h-5 text-emerald-400" />
                Upcoming Events
              </h2>
              <div className="space-y-4 relative z-10">
                {EVENTS.map(event => (
                  <div key={event.id} className="flex gap-4 group">
                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-lg shrink-0 group-hover:border-emerald-500/30 transition-colors">
                      <span className="text-xs text-zinc-500 font-medium">{event.date.split(' ')[0]}</span>
                      <span className="text-sm font-bold text-white">{event.date.split(' ')[1]}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-zinc-200 group-hover:text-emerald-400 transition-colors leading-tight">{event.title}</h3>
                      <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {event.time}
                      </p>
                      <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-wider text-emerald-500/80 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-5 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors">
                Explore All Events
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
