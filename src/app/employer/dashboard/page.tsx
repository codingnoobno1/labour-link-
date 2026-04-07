'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Briefcase, 
  Users, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle,
  MoreVertical,
  Bell,
  UserCircle,
  Loader2,
  X
} from 'lucide-react';

interface Work {
  id: string;
  title: string;
  company: string;
  location: string;
  pay: string;
  duration: string;
  tags: string[];
  created_at: string;
}

interface UserProfile {
  name: string;
  email: string;
  avatar_url?: string;
}

export default function EmployerDashboard() {
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    pay: '',
    duration: '',
    tags: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, worksRes] = await Promise.all([
          fetch('/api/employer/auth/me'),
          fetch('/api/employer/work')
        ]);

        const userData = await userRes.json();
        const worksData = await worksRes.json();

        if (userData.user) setUser(userData.user);
        if (worksData.works) setWorks(worksData.works);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPosting(true);
    try {
      const response = await fetch('/api/employer/work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== '')
        }),
      });

      if (response.ok) {
        const { work } = await response.json();
        setWorks([work, ...works]);
        setShowPostModal(false);
        setFormData({ title: '', company: '', location: '', pay: '', duration: '', tags: '' });
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to post job');
      }
    } catch (error) {
      console.error('Error posting job:', error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // 1. Upload to Cloudinary
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) throw new Error('Upload failed');
      const { url } = await uploadRes.json();

      // 2. Update Supabase Profile
      const updateRes = await fetch('/api/employer/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar_url: url }),
      });

      if (updateRes.ok) {
        setUser(prev => prev ? { ...prev, avatar_url: url } : null);
        alert('Profile picture updated!');
      }
    } catch (error) {
      console.error('Avatar upload error:', error);
      alert('Failed to update profile picture.');
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-sans tracking-tight text-white">LabourLink <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded ml-1">Employer</span></span>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-zinc-400 hover:text-white transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border border-zinc-900"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-white">{user?.name || 'Employer'}</p>
                  <p className="text-xs text-zinc-500">Hiring Manager</p>
                </div>
                <div className="relative group">
                  <label className="cursor-pointer">
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      disabled={isUploading}
                    />
                    {user?.avatar_url ? (
                      <img 
                        src={user.avatar_url} 
                        alt="Profile" 
                        className={`w-9 h-9 rounded-full object-cover border-2 border-zinc-800 group-hover:border-indigo-500 transition-all ${isUploading ? 'opacity-50' : ''}`}
                      />
                    ) : (
                      <UserCircle className={`w-9 h-9 text-zinc-400 group-hover:text-white transition-colors ${isUploading ? 'animate-pulse text-indigo-500' : ''}`} />
                    )}
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome & Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Company Dashboard</h1>
            <p className="text-zinc-400">Manage your job openings and connect with skilled workers.</p>
          </div>
          <button 
            onClick={() => setShowPostModal(true)}
            className="px-6 py-2.5 bg-white text-zinc-950 rounded-xl font-semibold hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-xl shadow-white/5 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Post New Job
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-zinc-500 text-sm">Active Postings</p>
                <p className="text-2xl font-bold text-white">{works.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-zinc-500 text-sm">Total Applicants</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-zinc-500 text-sm">Job Type Distribution</p>
                <p className="text-2xl font-bold text-white">Shift Work</p>
              </div>
            </div>
          </div>
        </div>

        {/* Postings Table */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Your Job Postings</h2>
            <div className="flex gap-2">
              <button className="text-sm text-zinc-400 hover:text-white px-3 py-1">All Status</button>
              <button className="text-sm text-zinc-500 hover:text-white px-3 py-1">Active Only</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-zinc-950/50 text-zinc-500 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Job Title</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Pay/Day</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4">Applicants</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {works.length > 0 ? works.map(job => (
                  <tr key={job.id} className="hover:bg-zinc-800/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-medium group-hover:text-indigo-400 transition-colors">{job.title}</p>
                        <p className="text-xs text-zinc-500 mt-1">Posted on {new Date(job.created_at).toLocaleDateString()}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{job.location}</td>
                    <td className="px-6 py-4 text-sm font-medium text-emerald-400">{job.pay}</td>
                    <td className="px-6 py-4 text-sm">{job.duration}</td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-7 h-7 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center">
                            <UserCircle className="w-4 h-4 text-zinc-500" />
                          </div>
                        ))}
                        <div className="w-7 h-7 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400">
                          +0
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle className="w-3 h-3" />
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-zinc-500">
                      <div className="flex flex-col items-center gap-2">
                        <Briefcase className="w-12 h-12 text-zinc-800 mb-2" />
                        <p>No job postings found.</p>
                        <button 
                          onClick={() => setShowPostModal(true)}
                          className="text-indigo-400 hover:text-indigo-300 font-medium"
                        >
                          Post your first job now
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" onClick={() => setShowPostModal(false)}></div>
          <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Post New Job</h2>
              <button 
                onClick={() => setShowPostModal(false)}
                className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handlePostJob} className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Job Title</label>
                  <input 
                    required
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g. Warehouse Loader"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Location</label>
                    <input 
                      required
                      type="text" 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="e.g. Brooklyn, NY"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Pay/Rate</label>
                    <input 
                      required
                      type="text" 
                      value={formData.pay}
                      onChange={(e) => setFormData({...formData, pay: e.target.value})}
                      placeholder="e.g. $45/Day"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Duration</label>
                    <input 
                      required
                      type="text" 
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="e.g. 5 Hours"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Company Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="e.g. Acme Corp"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Tags (comma separated)</label>
                  <input 
                    type="text" 
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="e.g. Heavy Lifting, Night Shift"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="flex-1 py-3 bg-zinc-800 text-white rounded-xl font-semibold hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isPosting}
                  className="flex-1 py-3 bg-white text-zinc-950 rounded-xl font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                >
                  {isPosting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
