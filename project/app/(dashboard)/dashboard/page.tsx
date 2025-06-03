"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

// Sample data for demonstration
const transactionData = [
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
  { name: 'Others', value: 100 },
]

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))']

const recentTransactions = [
  {
    id: '1',
    name: 'Grocery Shopping',
    amount: -85.32,
    date: '2025-04-10',
    category: 'Food'
  },
  {
    id: '2',
    name: 'Salary',
    amount: 2400,
    date: '2025-04-01',
    category: 'Income'
  },
  {
    id: '3',
    name: 'Netflix Subscription',
    amount: -15.99,
    date: '2025-04-05',
    category: 'Entertainment'
  },
  {
    id: '4',
    name: 'Uber Ride',
    amount: -24.50,
    date: '2025-04-08',
    category: 'Transport'
  },
  {
    id: '5',
    name: 'Freelance Payment',
    amount: 350,
    date: '2025-04-07',
    category: 'Income'
  }
]

export default function DashboardPage() {
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
                <div className="text-2xl font-bold">$4,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
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
                <div className="text-2xl font-bold">$2,750.00</div>
                <p className="text-xs text-muted-foreground">
                  +2.5% from last month
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
                <div className="text-2xl font-bold">$1,234.56</div>
                <p className="text-xs text-muted-foreground">
                  -4.5% from last month
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
                <div className="text-2xl font-bold">32.9%</div>
                <p className="text-xs text-muted-foreground">
                  +8.2% from last month
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
                  <BarChart data={transactionData}>
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
                  {recentTransactions.map((transaction) => (
                    <div className="flex items-center\" key={transaction.id}>
                      <div className={`rounded-full p-2 ${transaction.amount > 0 ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' : 'bg-red-500/20 text-red-700 dark:text-red-400'}`}>
                        {transaction.amount > 0 ? (
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
                          {transaction.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.category} • {transaction.date}
                        </p>
                      </div>
                      <div className={`ml-auto font-medium ${transaction.amount > 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
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
                      Your food expenses have increased by 15% compared to last month. 
                      Consider setting a budget for dining out to better manage this category.
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="text-sm font-medium">Saving Opportunity</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Based on your income pattern, you could increase your monthly savings 
                      by $200 by reducing entertainment expenses.
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="text-sm font-medium">Upcoming Bills</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You have 3 subscription renewals coming up this month totaling $45.97. 
                      Review them to ensure you're still using these services.
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