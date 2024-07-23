'use client'

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function LoginButton() {
  const session = useSession()
  const supabase = useSupabaseClient()

  async function handleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
      console.error('Error signing in:', error)
    }
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div>
      {session ? (
        <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Sign Out
        </button>
      ) : (
        <button onClick={handleSignIn} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign In with Google
        </button>
      )}
    </div>
  )
}