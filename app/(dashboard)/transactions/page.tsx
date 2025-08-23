"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { 
  ChevronDown, 
  Download, 
  Filter,
  Plus, 
  Search
} from "lucide-react"
import { format } from "date-fns"
import { TransactionType } from "@/lib/types"

// Sample data for demonstration
const transactions = [
  {
    id: '1',
    description: 'Grocery Shopping',
    amount: -85.32,
    date: new Date('2025-04-10'),
    category: 'Food',
    account: 'Main Account',
    type: 'EXPENSE' as TransactionType
  },
  {
    id: '2',
    description: 'Salary',
    amount: 2400,
    date: new Date('2025-04-01'),
    category: 'Income',
    account: 'Main Account',
    type: 'INCOME' as TransactionType
  },
  {
    id: '3',
    description: 'Netflix Subscription',
    amount: -15.99,
    date: new Date('2025-04-05'),
    category: 'Entertainment',
    account: 'Credit Card',
    type: 'EXPENSE' as TransactionType
  },
  {
    id: '4',
    description: 'Uber Ride',
    amount: -24.50,
    date: new Date('2025-04-08'),
    category: 'Transport',
    account: 'Credit Card',
    type: 'EXPENSE' as TransactionType
  },
  {
    id: '5',
    description: 'Freelance Payment',
    amount: 350,
    date: new Date('2025-04-07'),
    category: 'Income',
    account: 'Savings Account',
    type: 'INCOME' as TransactionType
  },
  {
    id: '6',
    description: 'Restaurant Dinner',
    amount: -68.50,
    date: new Date('2025-04-06'),
    category: 'Food',
    account: 'Credit Card',
    type: 'EXPENSE' as TransactionType
  },
  {
    id: '7',
    description: 'Mobile Phone Bill',
    amount: -45.00,
    date: new Date('2025-04-03'),
    category: 'Utilities',
    account: 'Main Account',
    type: 'EXPENSE' as TransactionType
  },
  {
    id: '8',
    description: 'Amazon Purchase',
    amount: -129.99,
    date: new Date('2025-04-09'),
    category: 'Shopping',
    account: 'Credit Card',
    type: 'EXPENSE' as TransactionType
  },
  {
    id: '9',
    description: 'Interest',
    amount: 12.84,
    date: new Date('2025-04-30'),
    category: 'Income',
    account: 'Savings Account',
    type: 'INCOME' as TransactionType
  },
  {
    id: '10',
    description: 'Gym Membership',
    amount: -50.00,
    date: new Date('2025-04-02'),
    category: 'Health',
    account: 'Main Account',
    type: 'EXPENSE' as TransactionType
  }
]

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  const filteredTransactions = transactions.filter(transaction => 
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
    transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.account.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Transaction
          </Button>
        </div>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transaction History</CardTitle>
            <div className="flex space-x-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All Transactions</DropdownMenuItem>
                  <DropdownMenuItem>Income Only</DropdownMenuItem>
                  <DropdownMenuItem>Expenses Only</DropdownMenuItem>
                  <DropdownMenuItem>This Month</DropdownMenuItem>
                  <DropdownMenuItem>Last Month</DropdownMenuItem>
                  <DropdownMenuItem>Custom Range...</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          <CardDescription>
            View, filter, and manage all your transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Account</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{format(transaction.date, 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{transaction.account}</TableCell>
                  <TableCell className={`text-right ${
                    transaction.type === 'INCOME' 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.type === 'INCOME' ? '+' : ''}
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}