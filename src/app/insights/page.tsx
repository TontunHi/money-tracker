import { getCategoryDistribution, getMonthlyTrendData, getFinancialMetrics } from "@/lib/actions/insights";
import { SpendingPieChart } from "@/components/insights/SpendingPieChart";
import { IncomeExpenseTrend } from "@/components/insights/IncomeExpenseTrend";
import { HealthMetrics } from "@/components/insights/HealthMetrics";
import { Sparkles } from "lucide-react";

export default async function InsightsPage() {
  const [categoryData, trendData, metrics] = await Promise.all([
    getCategoryDistribution(),
    getMonthlyTrendData(),
    getFinancialMetrics(),
  ]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
            <Sparkles size={24} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Financial Insights</h2>
        </div>
        <p className="text-muted-foreground">Detailed analytics of your spending habits and financial trends.</p>
      </div>

      {/* Metric Cards */}
      <HealthMetrics metrics={metrics} />

      <div className="grid gap-8 md:grid-cols-2">
        {/* Pie Chart Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold px-1">Spending Composition</h3>
          <SpendingPieChart data={categoryData} />
        </div>

        {/* Trend Chart Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold px-1">Cash Flow Trend</h3>
          <IncomeExpenseTrend data={trendData} />
        </div>
      </div>

      {/* AI Advice Placeholder (Future) */}
      <div className="glass rounded-[2rem] p-8 border-dashed border-2 border-primary/20 bg-primary/5 flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-4 rounded-full bg-primary/10">
          <Sparkles className="w-8 h-8 text-primary shadow-sm" />
        </div>
        <div>
          <h4 className="font-bold text-lg">Smart Financial Advice</h4>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
            Based on your data, you're currently saving {metrics.savingsRate.toFixed(1)}% of your income. 
            Increasing this to 20% could accelerate your long-term goals.
          </p>
        </div>
      </div>
    </div>
  );
}
