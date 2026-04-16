import { Wallet, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarNav } from "./SidebarNav";
import { getWallets } from "@/lib/actions/wallets";
import { getCategories } from "@/lib/actions/categories";
import { getProfile } from "@/lib/actions/profile";
import { AddTransactionDialog } from "@/components/transactions/AddTransactionDialog";
import { ProfileSidebar } from "./ProfileSidebar";
import Link from "next/link";

export async function Shell({ children }: { children: React.ReactNode }) {
  const wallets = await getWallets();
  const categories = await getCategories();
  const profile = await getProfile();

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 glass border-r p-6">
        <div className="flex items-center gap-3 mb-8 px-2 border-b border-transparent">
          <div className="relative w-9 h-9 overflow-hidden rounded-xl shadow-lg shadow-primary/20 ring-1 ring-white/20">
            <img 
              src="/logo.png" 
              alt="MoneyTracker Logo" 
              className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-500"
            />
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            MoneyTracker
          </h1>
        </div>

        <div className="mb-6">
          <Link href="/settings">
            <ProfileSidebar profile={profile} />
          </Link>
        </div>

        <SidebarNav />

        <div className="mt-auto">
          <AddTransactionDialog 
            wallets={wallets} 
            categories={categories}
            trigger={
              <Button className="w-full gap-2 rounded-xl" size="lg">
                <PlusCircle size={18} />
                Quick Add
              </Button>
            }
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Mobile Nav Header */}
        <div className="md:hidden flex items-center justify-between p-4 glass border-b sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <Link href="/settings" className="mr-2">
              <ProfileSidebar profile={profile} compact />
            </Link>
            <div className="relative w-8 h-8 overflow-hidden rounded-lg shadow-md border border-white/10">
              <img src="/logo.png" alt="Logo" className="object-cover w-full h-full" />
            </div>
            <span className="font-bold">MoneyTracker</span>
          </div>
          <AddTransactionDialog 
            wallets={wallets} 
            categories={categories}
            trigger={
              <Button variant="ghost" size="icon" className="rounded-full">
                <PlusCircle size={24} />
              </Button>
            }
          />
        </div>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
