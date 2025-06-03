import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CreditCard, 
  DollarSign, 
  LineChart, 
  Plus, 
  Wallet
} from "lucide-react"

// Sample data for demonstration
const accounts = [
  {
    id: '1',
    name: 'Main Account',
    balance: 4231.89,
    type: 'Checking',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    name: 'Savings Account',
    balance: 12450.00,
    type: 'Savings',
    color: 'bg-green-500'
  },
  {
    id: '3',
    name: 'Emergency Fund',
    balance: 5000.00,
    type: 'Savings',
    color: 'bg-amber-500'
  },
  {
    id: '4',
    name: 'Credit Card',
    balance: -1234.56,
    type: 'Credit',
    color: 'bg-red-500'
  }
]

export default function AccountsPage() {
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Accounts</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Account
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4 mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  Across all accounts
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Net Worth
                </CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(totalBalance + 15000).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  Including assets & investments
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Debt
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,234.56</div>
                <p className="text-xs text-muted-foreground">
                  Credit cards & loans
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Budget Status
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">65%</div>
                <Progress value={65} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Of monthly budget used
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {accounts.map((account) => (
              <Card key={account.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className={`h-6 w-6 rounded-full ${account.color} mr-2`}></div>
                    <div>
                      <CardTitle>{account.name}</CardTitle>
                      <CardDescription>{account.type}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${account.balance < 0 ? 'text-red-600 dark:text-red-400' : ''}`}>
                    ${account.balance.toFixed(2)}
                  </div>
                  <div className="mt-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Recent activity</span>
                      <span className="font-medium">5 transactions</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-muted-foreground">Last update</span>
                      <span className="font-medium">Today, 10:30 AM</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Transfer</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="cards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Credit & Debit Cards</CardTitle>
              <CardDescription>
                Manage your physical and virtual cards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex flex-col h-44 justify-between">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="text-sm opacity-85">BudgetTracker</p>
                          <p className="text-xs opacity-75">Virtual Card</p>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-85"
                        >
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <line x1="2" x2="22" y1="10" y2="10" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xl tracking-widest">•••• •••• •••• 4242</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs opacity-75">Card Holder</p>
                          <p className="text-sm">J. Doe</p>
                        </div>
                        <div>
                          <p className="text-xs opacity-75">Expires</p>
                          <p className="text-sm">12/28</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex flex-col justify-center items-center border border-dashed rounded-lg h-44 p-6">
                  <Button variant="outline" className="border-dashed">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Card
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-40 items-center justify-center">
                <p className="text-muted-foreground">Account settings will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}