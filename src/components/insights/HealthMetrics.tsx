import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthMetricsProps {
  metrics: {
    totalIncome: number;
    totalExpense: number;
    totalSaved: number;
    savingsRate: number;
    header: string;
  };
}

export function HealthMetrics({ metrics }: HealthMetricsProps) {
  const cards = [
    {
      title: "Monthly Savings",
      value: `$${metrics.totalSaved.toLocaleString()}`,
      description: "Total net for this month",
      icon: Wallet,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Savings Rate",
      value: `${metrics.savingsRate.toFixed(1)}%`,
      description: "Percentage of income saved",
      icon: TrendingUp,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Financial Health",
      value: metrics.header,
      description: "Based on savings habits",
      icon: HeartPulse,
      color: metrics.savingsRate > 0 ? "text-blue-500" : "text-rose-500",
      bgColor: metrics.savingsRate > 0 ? "bg-blue-500/10" : "bg-rose-500/10",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card, i) => (
        <Card key={i} className="border-none glass-card group hover:scale-[1.02] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2.5 rounded-xl", card.bgColor, card.color)}>
                <card.icon size={20} />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{card.title}</p>
              <div className="text-2xl font-bold tracking-tight">{card.value}</div>
              <p className="text-[10px] text-muted-foreground font-medium">{card.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
