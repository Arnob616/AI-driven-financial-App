"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { User } from "@/lib/types"

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  updateProfile: (data: Partial<User>) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data })
      // Here you would also make an API call to update the user in the database
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, updateProfile }}>
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