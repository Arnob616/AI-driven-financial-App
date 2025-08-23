'use client'

import { useState, useEffect } from 'react'
import { Account } from '@/lib/types'

export function useAccounts(userId: string | null) {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchAccounts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/accounts?userId=${userId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch accounts')
        }
        const data = await response.json()
        setAccounts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchAccounts()
  }, [userId])

  const addAccount = async (accountData: any) => {
    try {
      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...accountData, userId }),
      })

      if (!response.ok) {
        throw new Error('Failed to create account')
      }

      const newAccount = await response.json()
      setAccounts(prev => [...prev, newAccount])
      return newAccount
    } catch (err) {
      throw err
    }
  }

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

  return {
    accounts,
    loading,
    error,
    totalBalance,
    addAccount,
    refetch: () => {
      if (userId) {
        const fetchAccounts = async () => {
          try {
            const response = await fetch(`/api/accounts?userId=${userId}`)
            const data = await response.json()
            setAccounts(data)
          } catch (err) {
            console.error('Error refetching accounts:', err)
          }
        }
        fetchAccounts()
      }
    },
  }
}