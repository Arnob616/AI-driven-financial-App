import { prisma } from '@/lib/db'
import { Transaction, TransactionType } from '@/lib/types'

export async function getTransactions(userId: string): Promise<Transaction[]> {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: {
        category: true,
        account: true,
      },
      orderBy: { date: 'desc' },
    })

    return transactions.map(transaction => ({
      id: transaction.id,
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date,
      type: transaction.type as TransactionType,
      categoryId: transaction.categoryId,
      userId: transaction.userId,
      accountId: transaction.accountId,
      category: transaction.category ? {
        id: transaction.category.id,
        name: transaction.category.name,
        icon: transaction.category.icon,
        color: transaction.category.color,
        userId: transaction.category.userId,
      } : undefined,
    }))
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return []
  }
}

export async function createTransaction(data: {
  amount: number
  description: string
  type: TransactionType
  categoryId: string
  accountId: string
  userId: string
  date?: Date
}) {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        ...data,
        date: data.date || new Date(),
      },
      include: {
        category: true,
        account: true,
      },
    })

    // Update account balance
    const balanceChange = data.type === 'INCOME' ? data.amount : -data.amount
    await prisma.account.update({
      where: { id: data.accountId },
      data: {
        balance: {
          increment: balanceChange,
        },
      },
    })

    return transaction
  } catch (error) {
    console.error('Error creating transaction:', error)
    throw error
  }
}

export async function getTransactionsByDateRange(
  userId: string,
  startDate: Date,
  endDate: Date
) {
  try {
    return await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        category: true,
        account: true,
      },
      orderBy: { date: 'desc' },
    })
  } catch (error) {
    console.error('Error fetching transactions by date range:', error)
    return []
  }
}