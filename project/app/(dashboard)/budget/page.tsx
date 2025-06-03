"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Target } from "lucide-react"

// Sample data for demonstration
const budgets = [
  {
    id: '1',
    category: 'Food',
    allocated: 500,
    spent: 350,
    remaining: 150,
    color: 'bg-chart-1'
  },
  {
    id: '2',
    category: 'Transport',
    allocated: 200,
    spent: 175,
    remaining: 25,
    color: 'bg-chart-2'
  },
  {
    id: '3',
    category: 'Entertainment',
    allocated: 300,
    spent: 420,
    remaining: -120,
    color: 'bg-chart-3'
  },
  {
    id: '4',
    category: 'Shopping',
    allocated: 400,
    spent: 210,
    remaining: 190,
    color: 'bg-chart-4'
  },
  {
    id: '5',
    category: 'Utilities',
    allocated: 250,
    spent: 220,
    remaining: 30,
    color: 'bg-chart-5'
  }
]

const savingGoals = [
  {
    id: '1',
    name: 'Vacation Fund',
    target: 5000,
    current: 3200,
    deadline: '2025-12-31',
    color: 'bg-chart-1'
  },
  {
    id: '2',
    name: 'New Laptop',
    target: 1500,
    current: 800,
    deadline: '2025-08-15',
    color: 'bg-chart-2'
  },
  {
    id: '3',
    name: 'Emergency Fund',
    target: 10000,
    current: 7500,
    deadline: '2026-06-30',
    color: 'bg-chart-3'
  }
]

export default function BudgetPage() {
  const [activeTab, setActiveTab] = useState('monthly')
  
  const totalAllocated = budgets.reduce((sum, budget) => sum + budget.allocated, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
  const totalRemaining = totalAllocated - totalSpent
  const overallProgress = (totalSpent / totalAllocated) * 100

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Budget</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Budget
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="monthly" className="space-y-4 mt-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="monthly">Monthly Budget</TabsTrigger>
          <TabsTrigger value="goals">Saving Goals</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Budget
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalAllocated.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  For current month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Spent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  ${totalRemaining.toFixed(2)} remaining
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overallProgress.toFixed(0)}%</div>
                <Progress value={overallProgress} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {overallProgress > 100 
                    ? 'Over budget!' 
                    : overallProgress > 90 
                    ? 'Almost at limit' 
                    : 'On track'}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Category Budgets</CardTitle>
              <CardDescription>
                Track your spending against budgeted amounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {budgets.map((budget) => (
                  <div key={budget.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`h-4 w-4 rounded-full ${budget.color} mr-2`}></div>
                        <span className="font-medium">{budget.category}</span>
                      </div>
                      <div className="text-sm">
                        ${budget.spent.toFixed(2)} / ${budget.allocated.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={(budget.spent / budget.allocated) * 100}
                        className="h-2"
                      />
                      <div className="min-w-[4rem] text-sm text-right">
                        {budget.remaining >= 0 ? (
                          <span className="text-emerald-600 dark:text-emerald-400">
                            ${budget.remaining.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-red-600 dark:text-red-400">
                            -${Math.abs(budget.remaining).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    {budget.remaining < 0 && (
                      <Badge variant="destructive" className="text-xs">
                        Over budget
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Category Budget
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="goals" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {savingGoals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>{goal.name}</CardTitle>
                  </div>
                  <CardDescription>
                    Target date: {new Date(goal.deadline).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>${goal.current.toFixed(2)} saved</span>
                        <span className="font-medium">${goal.target.toFixed(2)}</span>
                      </div>
                      <Progress 
                        value={(goal.current / goal.target) * 100} 
                        className="h-2" 
                      />
                    </div>
                    <div className="bg-muted rounded-md p-3">
                      <div className="text-sm font-medium">
                        ${(goal.target - goal.current).toFixed(2)} more to go
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {Math.round((goal.current / goal.target) * 100)}% of goal reached
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">Add Funds</Button>
                  <Button size="sm">Edit Goal</Button>
                </CardFooter>
              </Card>
            ))}
            <Card className="flex flex-col justify-center items-center border border-dashed h-64">
              <Button variant="outline" className="border-dashed">
                <Plus className="mr-2 h-4 w-4" />
                Create New Goal
              </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}