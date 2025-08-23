import { NextRequest, NextResponse } from 'next/server'
import { getAccounts, createAccount } from '@/lib/api/accounts'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const accounts = await getAccounts(userId)
    return NextResponse.json(accounts)
  } catch (error) {
    console.error('Error in GET /api/accounts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, balance, userId } = body

    if (!name || balance === undefined || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const account = await createAccount({
      name,
      balance: parseFloat(balance),
      userId,
    })

    return NextResponse.json(account, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/accounts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}