'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

export function useTransactions(userId) {
  const { data: session } = useSession()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const addTransaction = async (transactionData) => {
    try {
      if (!session?.user?.id) {
        throw new Error('User not authenticated')
      }

      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...transactionData, userId: session.user.id }),
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

  const updateTransaction = async (id, transactionData) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      })

      if (!response.ok) {
        throw new Error('Failed to update transaction')
      }

      const updatedTransaction = await response.json()
      setTransactions(prev => 
        prev.map(t => t.id === id ? updatedTransaction : t)
      )
      return updatedTransaction
    } catch (err) {
      throw err
    }
  }

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete transaction')
      }

      setTransactions(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      throw err
    }
  }

  return {
    transactions,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
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