'use client'

import { useActionState } from 'react'
import { registerAction } from '../auth-actions'
import Link from 'next/link'

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4 py-12">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-400"></div>
        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-zinc-400 mb-8">Join us today to get started.</p>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Full Name</label>
            <input 
              name="name" 
              type="text" 
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm font-light"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm font-light"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Phone Number</label>
            <input 
              name="phone" 
              type="tel" 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm font-light"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Password</label>
            <input 
              name="password" 
              type="password" 
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm font-light"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Confirm Password</label>
            <input 
              name="confirmPassword" 
              type="password" 
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm font-light"
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
            className="w-full py-3.5 bg-white text-zinc-950 rounded-lg font-semibold hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isPending ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-400">
          Already have an account?{' '}
          <Link href="/login" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
