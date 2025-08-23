'use client'

import { useState, useEffect } from 'react'
import { Transaction } from '@/lib/types'

export function useTransactions(userId: string | null) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchTransactions = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/transactions?userId=${userId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch transactions')
        }
        const data = await response.json()
        setTransactions(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [userId])

  const addTransaction = async (transactionData: any) => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...transactionData, userId }),
      })

      if (!response.ok) {
        throw new Error('Failed to create transaction')
      }

      const newTransaction = await response.json()
      setTransactions(prev => [newTransaction, ...prev])
      return newTransaction
    } catch (err) {
      throw err
    }
  }

  return {
    transactions,
    loading,
    error,
    addTransaction,
    refetch: () => {
      if (userId) {
        const fetchTransactions = async () => {
          try {
            const response = await fetch(`/api/transactions?userId=${userId}`)
            const data = await response.json()
            setTransactions(data)
          } catch (err) {
            console.error('Error refetching transactions:', err)
          }
        }
        fetchTransactions()
      }
    },
  }
}