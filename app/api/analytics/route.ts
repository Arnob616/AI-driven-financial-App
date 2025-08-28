import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { getDailyAnalytics, getWeeklyAnalytics, getMonthlyAnalytics, getMonthlyTrends } from '@/lib/api/analytics'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = session.user.id
    const type = searchParams.get('type') || 'monthly'
    const date = searchParams.get('date')

    const targetDate = date ? new Date(date) : new Date()

    let data
    switch (type) {
      case 'daily':
        data = await getDailyAnalytics(userId, targetDate)
        break
      case 'weekly':
        data = await getWeeklyAnalytics(userId, targetDate)
        break
      case 'trends':
        data = await getMonthlyTrends(userId, 6)
        break
      case 'monthly':
      default:
        data = await getMonthlyAnalytics(userId, targetDate)
        break
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}