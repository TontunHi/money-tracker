import { getWallets } from "@/lib/actions/wallets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet as WalletIcon, PiggyBank, Landmark, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddWalletDialog } from "@/components/wallets/AddWalletDialog";
import { DeleteWalletButton } from "@/components/wallets/DeleteWalletButton";

export default async function WalletsPage() {
  const wallets = await getWallets();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Wallets</h2>
          <p className="text-muted-foreground">Manage your balances across different accounts and cash.</p>
        </div>
        <AddWalletDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {wallets.map((wallet) => (
          <Card key={wallet.id} className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-none glass-card">
            <div 
              className="absolute top-0 right-0 w-40 h-40 -mr-12 -mt-12 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40" 
              style={{ backgroundColor: wallet.color }}
            />
            <CardHeader className="pb-2 relative z-10">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-2xl bg-background/50 backdrop-blur-md shadow-sm">
                  {wallet.type === "BANK" ? <Landmark size={20} style={{ color: wallet.color }} /> :
                   wallet.type === "SAVINGS" ? <PiggyBank size={20} style={{ color: wallet.color }} /> :
                   wallet.type === "CREDIT_CARD" ? <CreditCard size={20} style={{ color: wallet.color }} /> :
                   <WalletIcon size={20} style={{ color: wallet.color }} />}
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-background/60 shadow-sm border border-white/10">
                    {wallet.type.replace('_', ' ')}
                  </span>
                  <DeleteWalletButton walletId={wallet.id} walletName={wallet.name} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 relative z-10">
              <div className="text-base font-semibold mb-1">{wallet.name}</div>
              <div className="text-3xl font-bold tracking-tight">${Number(wallet.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
              
              <div className="mt-8 flex items-center justify-between">
                <div className="p-1 px-3 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                  Active
                </div>
                <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                  ID: {wallet.id.substring(0, 8)}...
                </div>
              </div>
            </CardContent>
            <div className="h-2 w-full bg-secondary/30 absolute bottom-0">
              <div 
                className="h-full transition-all duration-1000" 
                style={{ backgroundColor: wallet.color, width: '100%' }}
              />
            </div>
          </Card>
        ))}

        {wallets.length === 0 && (
          <div className="col-span-full py-40 text-center glass rounded-[2.5rem] border-dashed border-2 border-muted-foreground/20">
            <p className="text-xl font-medium text-muted-foreground">No wallets found.</p>
            <p className="text-sm text-muted-foreground/60 mt-2 text-balance max-w-xs mx-auto">Create your first wallet to start tracking your financial journey!</p>
          </div>
        )}
      </div>
    </div>
  );
}
