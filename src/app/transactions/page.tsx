import { getTransactions } from "@/lib/actions/transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight, ArrowRightLeft, Search, Filter, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteTransaction } from "@/lib/actions/transactions";

export default async function TransactionsPage() {
  const transactions = await getTransactions();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
          <p className="text-muted-foreground">Manage and review all your financial activities.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search transactions..." className="pl-9 rounded-xl glass border-none h-10" />
          </div>
          <Button variant="outline" className="rounded-xl glass border-none gap-2">
            <Filter size={18} />
            Filter
          </Button>
        </div>
      </div>

      <Card className="border-none glass-card overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 dark:bg-black/5">
                  <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Type</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Wallet</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Date</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Amount</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        tx.type === "INCOME" ? "bg-emerald-500/10 text-emerald-500" : 
                        tx.type === "EXPENSE" ? "bg-rose-500/10 text-rose-500" : 
                        "bg-blue-500/10 text-blue-500"
                      )}>
                        {tx.type === "INCOME" ? <ArrowDownLeft size={20} /> :
                         tx.type === "EXPENSE" ? <ArrowUpRight size={20} /> :
                         <ArrowRightLeft size={20} />}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-sm">{tx.description || "No description"}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-secondary/50 text-[10px] font-bold uppercase tracking-wider">
                        {tx.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">{tx.wallet?.name}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</div>
                    </td>
                    <td className={cn(
                      "p-4 text-right font-bold tabular-nums",
                      tx.type === "INCOME" ? "text-emerald-500" : 
                      tx.type === "EXPENSE" ? "text-rose-500" : 
                      "text-foreground"
                    )}>
                      {tx.type === "INCOME" ? "+" : tx.type === "EXPENSE" ? "-" : ""}${Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4 text-right">
                      {/* Using a form for delete to keep it simple in Server Component history page, or just hide for now until Client logic is added */}
                      <form action={async () => {
                        "use server";
                        await deleteTransaction(tx.id);
                      }}>
                        <Button variant="ghost" size="icon-sm" className="rounded-lg text-muted-foreground hover:text-rose-500 transition-colors">
                          <Trash2 size={16} />
                        </Button>
                      </form>
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-20 text-center text-muted-foreground">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
