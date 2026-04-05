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

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function registerAction(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const data = Object.fromEntries(formData.entries())
  const email = data.email as string
  const password = data.password as string
  const confirmPassword = data.confirmPassword as string
  const name = data.name as string
  const phone = data.phone as string

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
      }
    }
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/login?message=Registration successful. Please log in.')
}
