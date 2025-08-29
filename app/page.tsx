import Link from "next/link";
import { PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-gradient-to-b from-white via-slate-50 to-slate-100">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 md:px-6 flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <PiggyBank className="h-7 w-7 text-primary" />
            <span className="font-bold text-lg tracking-tight">FinanceFlow</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="relative w-full overflow-hidden py-20 md:py-32 lg:py-40">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-indigo-50 to-transparent" />
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col space-y-6 text-center lg:text-left">
              <h1 className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl leading-tight">
                Smart financial tracking for everyone
              </h1>
              <p className="mx-auto max-w-[600px] text-lg text-muted-foreground lg:mx-0">
                Take control of your finances with our powerful budget tracking app.
              </p>
              <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center lg:justify-start">
                <Link href="/register">
                  <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all">
                    Get Started
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full backdrop-blur-sm border-muted-foreground/30 hover:shadow-lg transition-all"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Card */}
            <div className="flex items-center justify-center">
              <div className="relative aspect-video w-full max-w-lg overflow-hidden rounded-2xl border bg-white/60 shadow-2xl backdrop-blur-md">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-primary/10 via-indigo-200/20 to-transparent">
                  <PiggyBank className="h-24 w-24 text-primary drop-shadow-md" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="w-full bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Features
              </h2>
              <p className="text-lg text-muted-foreground">
                Developed a finance application to track daily, weekly, and monthly income and expenses. Implemented features to add, remove & update transactions, with an interactive user dashboard.
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-2xl border bg-white/60 p-6 text-left shadow-lg backdrop-blur-sm transition hover:shadow-xl hover:-translate-y-1 hover:scale-105 duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary/20 to-indigo-200/40">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/70 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 md:px-6 flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © 2025 FinanceFlow. All rights reserved.
          </p>
          <nav className="flex gap-6">
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

// Feature icons
const features = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-primary"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    title: "Expense Tracking",
    description:
      "Track your daily expenses and categorize them for better financial management.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-primary"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Budget Planning",
    description:
      "Set budget goals for different categories and track your progress over time.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-primary"
      >
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
    title: "Analytics",
    description:
      "Visualize your spending patterns with interactive charts and graphs.",
  },
];
