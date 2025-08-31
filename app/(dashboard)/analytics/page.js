"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/lib/context/user-context"
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts"

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))']

export default function AnalyticsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { user } = useUser()
  const [dailyData, setDailyData] = useState(null)
  const [weeklyData, setWeeklyData] = useState(null)
  const [monthlyData, setMonthlyData] = useState(null)
  const [trendsData, setTrendsData] = useState([])
  const [loading, setLoading] = useState(true)

  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  useEffect(() => {
    if (!session?.user?.id) return

    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        const [dailyResponse, weeklyResponse, monthlyResponse] = await Promise.all([
          fetch(`/api/analytics?type=daily`),
          fetch(`/api/analytics?type=weekly`),
          fetch(`/api/analytics?type=monthly`),
        ])

        const [daily, weekly, monthly] = await Promise.all([
          dailyResponse.json(),
          weeklyResponse.json(),
          monthlyResponse.json(),
        ])

        setDailyData(daily)
        setWeeklyData(weekly)
        setMonthlyData(monthly)
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [session?.user?.id])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const dailyCategoryData = dailyData?.categoryBreakdown ? 
    Object.entries(dailyData.categoryBreakdown).map(([name, value]) => ({
      name,
      value: value
    })) : []

  const monthlyCategoryData = monthlyData?.categoryBreakdown ? 
    Object.entries(monthlyData.categoryBreakdown).map(([name, value]) => ({
      name,
      value: value
    })) : []

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      </div>
      
      <Tabs defaultValue="daily" className="space-y-4 mt-6">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ${dailyData?.totalIncome?.toFixed(2) || '0.00'}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  ${dailyData?.totalExpenses?.toFixed(2) || '0.00'}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${(dailyData?.netIncome || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${dailyData?.netIncome?.toFixed(2) || '0.00'}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dailyData?.transactionCount || 0}</div>
              </CardContent>
            </Card>
          </div>
          
          {dailyCategoryData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Today's Spending by Category</CardTitle>
                <CardDescription>
                  Distribution of today's expenses
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={dailyCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {dailyCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="weekly" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Weekly Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ${weeklyData?.totalIncome?.toFixed(2) || '0.00'}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Weekly Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  ${weeklyData?.totalExpenses?.toFixed(2) || '0.00'}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${(weeklyData?.netIncome || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${weeklyData?.netIncome?.toFixed(2) || '0.00'}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Weekly Income vs Expenses</CardTitle>
              <CardDescription>
                Day by day breakdown for the current week
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={weeklyData?.dailyData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="expense" fill="hsl(var(--chart-1))" name="Expenses" />
                  <Bar dataKey="income" fill="hsl(var(--chart-2))" name="Income" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Summary</CardTitle>
                <CardDescription>
                  Overview of this month's finances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Income:</span>
                    <span className="text-sm font-medium text-green-600">
                      ${monthlyData?.totalIncome?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Expenses:</span>
                    <span className="text-sm font-medium text-red-600">
                      ${monthlyData?.totalExpenses?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Net Income:</span>
                    <span className={`text-sm font-medium ${(monthlyData?.netIncome || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${monthlyData?.netIncome?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Transactions:</span>
                    <span className="text-sm font-medium">{monthlyData?.transactionCount || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {monthlyCategoryData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Spending by Category</CardTitle>
                  <CardDescription>
                    Distribution of this month's expenses
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={monthlyCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {monthlyCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
      </Tabs>
    </DashboardLayout>
  )
}