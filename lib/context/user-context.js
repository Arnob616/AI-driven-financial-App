"use client"

import { createContext, useContext } from "react"
import { useSession } from "next-auth/react"

const UserContext = createContext(undefined)

export function UserProvider({ children }) {
  const { data: session, status } = useSession()
  
  const user = session?.user ? {
    id: session.user.id,
    name: session.user.name || '',
    email: session.user.email || '',
    image: session.user.image || undefined
  } : null
  
  const isLoading = status === "loading"

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}