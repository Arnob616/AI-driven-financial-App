import { prisma } from '@/lib/db'

export async function getTransactions(userId) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: {
        category: true,
      },
      orderBy: { date: 'desc' },
    })

    return transactions.map(transaction => ({
      id: transaction.id,
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date,
      type: transaction.type,
      categoryId: transaction.categoryId,
      userId: transaction.userId,
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

export async function createTransaction(data) {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        ...data,
        date: data.date || new Date(),
      },
      include: {
        category: true,
      },
    })

    return transaction
  } catch (error) {
    console.error('Error creating transaction:', error)
    throw error
  }
}

export async function updateTransaction(id, data) {
  try {
    const transaction = await prisma.transaction.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    })

    return transaction
  } catch (error) {
    console.error('Error updating transaction:', error)
    throw error
  }
}

export async function deleteTransaction(id) {
  try {
    await prisma.transaction.delete({
      where: { id },
    })
  } catch (error) {
    console.error('Error deleting transaction:', error)
    throw error
  }
}

export async function getTransactionsByDateRange(userId, startDate, endDate) {
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
      },
      orderBy: { date: 'desc' },
    })
  } catch (error) {
    console.error('Error fetching transactions by date range:', error)
    return []
  }
}