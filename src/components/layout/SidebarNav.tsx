"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Receipt, Wallet, Settings, Tag, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Receipt, label: "Transactions", href: "/transactions" },
  { icon: Wallet, label: "Wallets", href: "/wallets" },
  { icon: Tag, label: "Categories", href: "/categories" },
  { icon: Sparkles, label: "Insights", href: "/insights" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1">
      {sidebarItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200",
            pathname === item.href
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          )}
        >
          <item.icon size={18} />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
