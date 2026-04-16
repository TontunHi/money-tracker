"use server";

import { db } from "@/lib/db";
import { transactions, categories } from "@/lib/db/schema";
import { eq, sql, and, gte, desc } from "drizzle-orm";
import { startOfMonth, subDays, format } from "date-fns";

export async function getCategoryDistribution() {
  const data = await db
    .select({
      name: categories.name,
      value: sql<number>`SUM(ABS(amount))`,
      color: categories.color,
    })
    .from(transactions)
    .innerJoin(categories, eq(transactions.categoryId, categories.id))
    .where(and(
      eq(transactions.type, "EXPENSE"),
      gte(transactions.date, startOfMonth(new Date()))
    ))
    .groupBy(categories.name, categories.color);

  return data;
}

export async function getMonthlyTrendData() {
  const thirtyDaysAgo = subDays(new Date(), 30);
  
  const rawData = await db
    .select({
      date: sql<string>`DATE(date)`,
      income: sql<number>`SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END)`,
      expense: sql<number>`SUM(CASE WHEN type = 'EXPENSE' THEN ABS(amount) ELSE 0 END)`,
    })
    .from(transactions)
    .where(gte(transactions.date, thirtyDaysAgo))
    .groupBy(sql`DATE(date)`)
    .orderBy(sql`DATE(date)`);

  // Fill in missing dates to make a smooth chart
  const formattedData = rawData.map(d => ({
    date: format(new Date(d.date), "MMM dd"),
    income: Number(d.income),
    expense: Number(d.expense),
  }));

  return formattedData;
}

export async function getFinancialMetrics() {
  const currentMonth = startOfMonth(new Date());
  
  const result = await db
    .select({
      income: sql<number>`SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END)`,
      expense: sql<number>`SUM(CASE WHEN type = 'EXPENSE' THEN ABS(amount) ELSE 0 END)`,
    })
    .from(transactions)
    .where(gte(transactions.date, currentMonth));

  const totalIncome = Number(result[0]?.income || 0);
  const totalExpense = Number(result[0]?.expense || 0);
  const totalSaved = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? (totalSaved / totalIncome) * 100 : 0;

  return {
    totalIncome,
    totalExpense,
    totalSaved,
    savingsRate: Math.max(0, savingsRate), // Avoid negative savings rate for stats
    header: savingsRate > 20 ? "Doing Great!" : savingsRate > 0 ? "On Track" : "Try to Save More",
  };
}
