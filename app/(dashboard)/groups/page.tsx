"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Plus, Receipt, Split, Users } from "lucide-react"

// Sample data for demonstration
const groups = [
  {
    id: '1',
    name: 'Roommates',
    description: 'Apartment expenses and utilities',
    members: 3,
    owedToYou: 120.50,
    youOwe: 0,
    lastActive: '2025-04-10',
    transactions: 15
  },
  {
    id: '2',
    name: 'Trip to Paris',
    description: 'Vacation expenses for our Europe trip',
    members: 4,
    owedToYou: 0,
    youOwe: 85.25,
    lastActive: '2025-04-05',
    transactions: 8
  },
  {
    id: '3',
    name: 'Team Lunch',
    description: 'Weekly team lunch expenses',
    members: 5,
    owedToYou: 24.50,
    youOwe: 0,
    lastActive: '2025-04-12',
    transactions: 4
  },
  {
    id: '4',
    name: 'Family Shared',
    description: 'Shared family expenses',
    members: 3,
    owedToYou: 0,
    youOwe: 50.00,
    lastActive: '2025-04-08',
    transactions: 12
  }
]

const memberInitials = ['JD', 'MS', 'AP', 'RK', 'BT']

export default function GroupsPage() {
  const [activeTab, setActiveTab] = useState('all')

  const filteredGroups = activeTab === 'all' 
    ? groups 
    : activeTab === 'owed' 
    ? groups.filter(group => group.owedToYou > 0) 
    : groups.filter(group => group.youOwe > 0)

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Groups</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Group
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4 mt-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Groups</TabsTrigger>
          <TabsTrigger value="owed">Owed to You</TabsTrigger>
          <TabsTrigger value="you-owe">You Owe</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
            <Card className="flex flex-col justify-center items-center border border-dashed h-64">
              <Button variant="outline" className="border-dashed">
                <Plus className="mr-2 h-4 w-4" />
                Create New Group
              </Button>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="owed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="you-owe" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

function GroupCard({ group }: { group: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{group.name}</CardTitle>
            <CardDescription>{group.description}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Settle Up</DropdownMenuItem>
              <DropdownMenuItem>Add Members</DropdownMenuItem>
              <DropdownMenuItem>Edit Group</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Leave Group</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{group.members} members</span>
          </div>
          
          <div className="flex gap-1 -space-x-2">
            {Array.from({ length: Math.min(group.members, 4) }).map((_, i) => (
              <Avatar key={i} className="border-2 border-background h-8 w-8">
                <AvatarFallback>{memberInitials[i]}</AvatarFallback>
              </Avatar>
            ))}
            {group.members > 4 && (
              <Avatar className="border-2 border-background h-8 w-8">
                <AvatarFallback>+{group.members - 4}</AvatarFallback>
              </Avatar>
            )}
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-sm font-medium">
                {group.owedToYou > 0 ? (
                  <span className="text-emerald-600 dark:text-emerald-400">You are owed ${group.owedToYou.toFixed(2)}</span>
                ) : group.youOwe > 0 ? (
                  <span className="text-red-600 dark:text-red-400">You owe ${group.youOwe.toFixed(2)}</span>
                ) : (
                  <span>All settled up</span>
                )}
              </p>
            </div>
            <Badge variant="outline" className="text-xs">
              <Receipt className="h-3 w-3 mr-1" />
              {group.transactions} transactions
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <Split className="h-4 w-4 mr-1" />
          Split Bill
        </Button>
        <Button size="sm">View Group</Button>
      </CardFooter>
    </Card>
  )
}