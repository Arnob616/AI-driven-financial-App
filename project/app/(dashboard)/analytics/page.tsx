"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

// Sample data for demonstration
const monthlyData = [
  { name: 'Jan', expense: 1200, income: 2400 },
  { name: 'Feb', expense: 1300, income: 2500 },
  { name: 'Mar', expense: 1400, income: 2300 },
  { name: 'Apr', expense: 1100, income: 2400 },
  { name: 'May', expense: 1500, income: 2600 },
  { name: 'Jun', expense: 1200, income: 2550 },
]

const weeklyData = [
  { name: 'Mon', expense: 120, income: 240 },
  { name: 'Tue', expense: 300, income: 139 },
  { name: 'Wed', expense: 200, income: 980 },
  { name: 'Thu', expense: 278, income: 390 },
  { name: 'Fri', expense: 189, income: 480 },
  { name: 'Sat', expense: 239, income: 380 },
  { name: 'Sun', expense: 349, income: 430 },
]

const categoryData = [
  { name: 'Food', value: 400 },
  { name: 'Transport', value: 300 },
  { name: 'Entertainment', value: 300 },
  { name: 'Shopping', value: 200 },
  { name: 'Utilities', value: 150 },
  { name: 'Others', value: 100 },
]

const savingsData = [
  { name: 'Jan', amount: 400 },
  { name: 'Feb', amount: 600 },
  { name: 'Mar', amount: 550 },
  { name: 'Apr', amount: 700 },
  { name: 'May', amount: 900 },
  { name: 'Jun', amount: 750 },
]

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))', 'hsl(var(--chart-1))']

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      </div>
      
      <Tabs defaultValue="monthly" className="space-y-4 mt-6">
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="daily">Daily</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>
                  Monthly comparison for the past 6 months
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={monthlyData}>
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
            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>
                  Distribution of expenses by category
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
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
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Trend</CardTitle>
                <CardDescription>
                  Income, expenses, and savings over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="income" 
                      stackId="1" 
                      stroke="hsl(var(--chart-2))" 
                      fill="hsl(var(--chart-2)/0.2)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="expense" 
                      stackId="2" 
                      stroke="hsl(var(--chart-1))" 
                      fill="hsl(var(--chart-1)/0.2)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Savings Growth</CardTitle>
                <CardDescription>
                  Monthly savings amounts
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={savingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="hsl(var(--chart-3))" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Monthly Insights</CardTitle>
                <CardDescription>
                  AI-powered analysis of your finances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="text-sm font-medium">Spending Patterns</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Your spending in the Food category has increased by 15% compared to last month. 
                      This is above your 6-month average.
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="text-sm font-medium">Savings Potential</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Based on your income and spending patterns, you could increase your 
                      monthly savings by 20% by reducing discretionary spending.
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="text-sm font-medium">Recommendation</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Consider setting up automatic transfers to your savings account at the beginning 
                      of each month to reach your savings goals faster.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="weekly" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Income vs Expenses</CardTitle>
                <CardDescription>
                  Day by day breakdown for the current week
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
            <Card>
              <CardHeader>
                <CardTitle>Weekly Insights</CardTitle>
                <CardDescription>
                  Analysis of your weekly spending
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="text-sm font-medium">Weekly Summary</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You've spent $1,675 this week, which is 12% higher than your weekly average.
                      Wednesday had your highest spending day at $200.
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="text-sm font-medium">Budget Status</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You're on track with your weekly budget in most categories, 
                      but Entertainment spending is 30% above your allocated budget.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Spending</CardTitle>
              <CardDescription>
                Today's financial activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-96 items-center justify-center">
                <p className="text-muted-foreground">Daily analytics will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}