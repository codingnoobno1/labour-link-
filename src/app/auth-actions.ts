'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'

export async function loginAction(prevState: any, formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Please enter both email and password.' }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Get user profile to check role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single()

  const role = profile?.role || 'labour'
  const redirectPath = role === 'employer' ? '/employer/dashboard' : '/dashboard'

  revalidatePath(redirectPath, 'layout')
  redirect(redirectPath)
}

export async function registerAction(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const data = Object.fromEntries(formData.entries())
  const email = data.email as string
  const password = data.password as string
  const confirmPassword = data.confirmPassword as string
  const name = data.name as string
  const phone = data.phone as string
  const role = (data.role as string) || 'labour' // Default to labour

  if (!email || !password || !name) {
    return { error: 'Please fill in required fields.' }
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
        role,
      }
    }
  })

  if (error) {
    return { error: error.message }
  }

  const loginRedirect = '/login'
  
  revalidatePath('/', 'layout')
  redirect(`${loginRedirect}?message=Registration successful. Please log in.`)
}
