import { getWallets } from "@/lib/actions/wallets";
import { getRecentTransactions, getTransactionSummary } from "@/lib/actions/transactions";
import { getCategories, seedDefaults } from "@/lib/actions/categories";
import { getProfile } from "@/lib/actions/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, ArrowRightLeft, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AddTransactionDialog } from "@/components/transactions/AddTransactionDialog";

export default async function DashboardPage() {
  const [wallets, recentTransactions, summary, categoriesResult, profile] = await Promise.all([
    getWallets(),
    getRecentTransactions(10),
    getTransactionSummary(),
    getCategories(),
    getProfile()
  ]);

  let categories = categoriesResult;
  if (categories.length === 0) {
    await seedDefaults();
    categories = await getCategories();
  }

  const totalBalance = wallets.reduce((acc, wallet) => acc + Number(wallet.balance), 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, {profile.name}! Here's your financial overview.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl glass border-none shadow-sm hover:shadow-md transition-all" asChild>
            <Link href="/insights">
              <Sparkles className="mr-2 h-4 w-4 text-amber-500" />
              Insights
            </Link>
          </Button>
          <AddTransactionDialog wallets={wallets} categories={categories} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card group hover:scale-[1.02] transition-transform duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Wallet className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              across {wallets.length} active wallets
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card group hover:scale-[1.02] transition-transform duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <TrendingUp className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-500 tracking-tight">+${(Number(summary.totalIncome) || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground mt-1">
              This month's earnings
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card group hover:scale-[1.02] transition-transform duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
              <TrendingDown className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-rose-500 tracking-tight concert">-${(Number(summary.totalExpense) || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground mt-1">
              This month's spending
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-7">
        {/* Wallets Section */}
        <div className="md:col-span-4 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">My Wallets</h3>
            <Button variant="ghost" size="sm" className="rounded-xl hover:bg-secondary" asChild>
              <Link href="/wallets">Manage Wallets</Link>
            </Button>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2">
            {wallets.map((wallet) => (
              <Card key={wallet.id} className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-none glass-card">
                <div 
                  className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40" 
                  style={{ backgroundColor: wallet.color }}
                />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="p-2.5 rounded-xl bg-background/50 backdrop-blur-md shadow-sm">
                      <Wallet size={18} style={{ color: wallet.color }} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-background/60 shadow-sm border border-white/10">
                      {wallet.type.replace('_', ' ')}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-sm text-muted-foreground font-medium mb-1">{wallet.name}</div>
                  <div className="text-2xl font-bold tracking-tight">${Number(wallet.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                </CardContent>
                <div className="h-1.5 w-full bg-secondary/30 absolute bottom-0">
                  <div 
                    className="h-full transition-all duration-1000" 
                    style={{ backgroundColor: wallet.color, width: '100%' }}
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* Placeholder for Chart */}
          <div className="h-[350px] glass rounded-[2rem] p-8 flex flex-col items-center justify-center border-dashed border-2 border-muted-foreground/20 group hover:border-primary/50 transition-colors">
            <div className="p-4 rounded-full bg-primary/5 mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-8 h-8 text-primary/40" />
            </div>
            <p className="font-semibold text-muted-foreground">Cash Flow Visualizer</p>
            <p className="text-xs text-muted-foreground/60 max-w-[200px] text-center mt-2">Charts will appear once you have more transaction data.</p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="md:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Recent Activity</h3>
            <Button variant="ghost" size="sm" className="rounded-xl hover:bg-secondary" asChild>
              <Link href="/transactions">History</Link>
            </Button>
          </div>

          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <div className="py-20 text-center glass rounded-[2rem] border-dashed border-2 border-muted-foreground/20">
                <p className="text-muted-foreground">No recent transactions.</p>
                <p className="text-xs text-muted-foreground/60">Time to record your first entry!</p>
              </div>
            ) : (
              recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 glass rounded-2xl hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300 group cursor-default">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-xl transition-transform group-hover:scale-110",
                      tx.type === "INCOME" ? "bg-emerald-500/10 text-emerald-500" : 
                      tx.type === "EXPENSE" ? "bg-rose-500/10 text-rose-500" : 
                      "bg-blue-500/10 text-blue-500"
                    )}>
                      {tx.type === "INCOME" ? <ArrowDownLeft size={20} /> :
                       tx.type === "EXPENSE" ? <ArrowUpRight size={20} /> :
                       <ArrowRightLeft size={20} />}
                    </div>
                    <div>
                      <div className="font-semibold text-sm line-clamp-1">{tx.description || tx.category?.name || "Transaction"}</div>
                      <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-2">
                        <span>{tx.wallet?.name}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                        <span>{new Date(tx.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className={cn(
                    "font-bold text-sm tabular-nums",
                    tx.type === "INCOME" ? "text-emerald-500" : 
                    tx.type === "EXPENSE" ? "text-rose-500" : 
                    "text-foreground"
                  )}>
                    {tx.type === "INCOME" ? "+" : tx.type === "EXPENSE" ? "-" : ""}${Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>
              ))
            )}
            
            {recentTransactions.length > 0 && (
              <Button variant="outline" className="w-full rounded-2xl glass border-none py-6 text-muted-foreground hover:text-foreground transition-colors" asChild>
                <Link href="/transactions">View Complete History</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
