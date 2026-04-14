'use client'

import { useActionState, useState } from 'react'
import { registerAction } from '../auth-actions'
import Link from 'next/link'
import { Users, Briefcase } from 'lucide-react'

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null)
  const [role, setRole] = useState<'labour' | 'employer'>('labour')

  const isEmployer = role === 'employer'
  const accentColor = isEmployer ? 'indigo' : 'emerald'
  const accentGlow = isEmployer ? 'shadow-indigo-500/20' : 'shadow-emerald-500/20'

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4 py-12 font-sans">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Dynamic Accent Bar */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isEmployer ? 'from-indigo-500 to-purple-500' : 'from-emerald-500 to-teal-400'}`}></div>
        
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight transition-all duration-300">
          {isEmployer ? 'Employer Registration' : 'Worker Registration'}
        </h1>
        <p className="text-zinc-400 mb-8 font-light transition-all duration-300">
          {isEmployer 
            ? 'Create a business account to post jobs and hire.' 
            : 'Join our workforce and find daily tasks nearby.'}
        </p>

        {/* Role Selector */}
        <div className="flex p-1.5 bg-zinc-950 border border-zinc-800/50 rounded-2xl mb-8 relative z-10">
          <button 
            type="button"
            onClick={() => setRole('labour')}
            className={`flex-1 flex items-center justify-center gap-2.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${!isEmployer ? 'bg-zinc-800 text-white shadow-xl translate-y-[-1px]' : 'text-zinc-500 hover:text-zinc-400'}`}
          >
            <Users className={`w-4 h-4 ${!isEmployer ? 'text-emerald-400' : ''}`} />
            Labour
          </button>
          <button 
            type="button"
            onClick={() => setRole('employer')}
            className={`flex-1 flex items-center justify-center gap-2.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${isEmployer ? 'bg-zinc-800 text-white shadow-xl translate-y-[-1px]' : 'text-zinc-500 hover:text-zinc-400'}`}
          >
            <Briefcase className={`w-4 h-4 ${isEmployer ? 'text-indigo-400' : ''}`} />
            Employer
          </button>
        </div>

        <form action={formAction} className="space-y-4">
          {/* Hidden Role Input */}
          <input type="hidden" name="role" value={role} />

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Full Name</label>
            <input 
              name="name" 
              type="text" 
              required
              className={`w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-${accentColor}-500/50 transition-all text-sm font-light`}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required
              className={`w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-${accentColor}-500/50 transition-all text-sm font-light`}
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Phone Number</label>
            <input 
              name="phone" 
              type="tel" 
              className={`w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-${accentColor}-500/50 transition-all text-sm font-light`}
              placeholder="+91 00000 00000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Password</label>
            <input 
              name="password" 
              type="password" 
              required
              className={`w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-${accentColor}-500/50 transition-all text-sm font-light`}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Confirm Password</label>
            <input 
              name="confirmPassword" 
              type="password" 
              required
              className={`w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-${accentColor}-500/50 transition-all text-sm font-light`}
              placeholder="••••••••"
            />
          </div>

          {state?.error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm mt-4">
              {state.error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isPending}
            className={`w-full py-4 bg-white text-zinc-950 rounded-xl font-bold hover:bg-zinc-100 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg ${accentGlow}`}
          >
            {isPending ? 'Processing...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-400">
          Already have an account?{' '}
          <Link href="/login" className={`text-${accentColor}-400 hover:text-${accentColor}-300 transition-colors font-medium`}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
