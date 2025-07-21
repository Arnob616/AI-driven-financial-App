"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/lib/context/user-context"
import { useTransactions } from "@/lib/hooks/useTransactions"
import { useAccounts } from "@/lib/hooks/useAccounts"
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { ArrowUpRight, Plus, Wallet } from "lucide-react"
import { format } from "date-fns"

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))']

export default function DashboardPage() {
  const { user, isLoading: userLoading } = useUser()
  const { transactions, loading: transactionsLoading } = useTransactions(user?.id || null)
  const { accounts, totalBalance, loading: accountsLoading } = useAccounts(user?.id || null)
  const [analytics, setAnalytics] = useState<any>(null)
  const [weeklyData, setWeeklyData] = useState<any[]>([])

  useEffect(() => {
    if (!user?.id) return

    const fetchAnalytics = async () => {
      try {
        const [monthlyResponse, weeklyResponse] = await Promise.all([
          fetch(`/api/analytics?userId=${user.id}&type=monthly`),
          fetch(`/api/analytics?userId=${user.id}&type=weekly`)
        ])

        const monthlyData = await monthlyResponse.json()
        const weeklyData = await weeklyResponse.json()

        setAnalytics(monthlyData)
        setWeeklyData(weeklyData)
      } catch (error) {
        console.error('Error fetching analytics:', error)
      }
    }

    fetchAnalytics()
  }, [user?.id])

  if (userLoading || transactionsLoading || accountsLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const recentTransactions = transactions.slice(0, 5)
  const monthlyIncome = analytics?.totalIncome || 0
  const monthlyExpenses = analytics?.totalExpenses || 0
  const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome * 100) : 0

  const categoryData = analytics?.categoryBreakdown ? 
    Object.entries(analytics.categoryBreakdown).map(([name, value]) => ({
      name,
      value: value as number
    })) : []

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Account
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4 mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Balance
                </CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalBalance.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  Across {accounts.length} account{accounts.length !== 1 ? 's' : ''}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Income
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${monthlyIncome.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Expense</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${monthlyExpenses.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Savings Rate
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{savingsRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  Of monthly income
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>
                  Your financial activity for the past week
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="expense" fill="hsl(var(--chart-1))" />
                    <Bar dataKey="income" fill="hsl(var(--chart-2))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>
                  Your expense distribution this month
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                {categoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                    No expense data available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Your latest financial activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {recentTransactions.length > 0 ? recentTransactions.map((transaction) => (
                    <div className="flex items-center\" key={transaction.id}>
                      <div className={`rounded-full p-2 ${transaction.type === 'INCOME' ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' : 'bg-red-500/20 text-red-700 dark:text-red-400'}`}>
                        {transaction.type === 'INCOME' ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4"
                          >
                            <path d="M18 15l-6-6l-6 6" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.category?.name || 'Other'} • {format(new Date(transaction.date), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <div className={`ml-auto font-medium ${transaction.type === 'INCOME' ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                        {transaction.type === 'INCOME' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  )) : (
                    <div className="flex items-center justify-center h-32 text-muted-foreground">
                      No recent transactions
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Monthly AI Insight</CardTitle>
                <CardDescription>
                  Personalized financial recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="text-sm font-medium">Spending Trends</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {monthlyExpenses > 0 
                        ? `You've spent $${monthlyExpenses.toFixed(2)} this month across ${Object.keys(analytics?.categoryBreakdown || {}).length} categories.`
                        : "Start tracking your expenses to get personalized insights about your spending patterns."
                      }
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="text-sm font-medium">Saving Opportunity</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {savingsRate > 0 
                        ? `Great job! You're saving ${savingsRate.toFixed(1)}% of your income this month.`
                        : "Consider setting up automatic transfers to build your savings habit."
                      }
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="text-sm font-medium">Account Summary</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You have {accounts.length} account{accounts.length !== 1 ? 's' : ''} with a total balance of ${totalBalance.toFixed(2)}.
                      {accounts.length === 0 && " Add your first account to start tracking your finances."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>
                Detailed analysis of your financial data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-96 items-center justify-center">
                <p className="text-muted-foreground">Detailed analytics will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>
                Generate and download reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-96 items-center justify-center">
                <p className="text-muted-foreground">Report generation options will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}