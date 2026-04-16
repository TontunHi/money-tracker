"use server";

import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { categorySchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function getCategories() {
  return await db.select().from(categories).orderBy(categories.name);
}

export async function createCategory(data: any) {
  const validated = categorySchema.parse(data);
  
  await db.insert(categories).values({
    name: validated.name,
    type: validated.type as any,
    icon: validated.icon,
    color: validated.color,
  });

  revalidatePath("/", "layout");
}

export async function deleteCategory(id: string) {
  await db.delete(categories).where(eq(categories.id, id));
  revalidatePath("/", "layout");
}

export async function seedDefaults() {
  const defaultCategories = [
    // Income
    { name: "Salary", type: "INCOME", icon: "Briefcase", color: "#10b981" },
    { name: "Freelance", type: "INCOME", icon: "Laptop", color: "#3b82f6" },
    { name: "Investments", type: "INCOME", icon: "TrendingUp", color: "#10b981" },
    { name: "Investment Gains", type: "INCOME", icon: "BarChart", color: "#34d399" },
    { name: "Gift", type: "INCOME", icon: "Gift", color: "#ec4899" },
    
    // Expense
    { name: "Food & Dining", type: "EXPENSE", icon: "Utensils", color: "#f59e0b" },
    { name: "Transport", type: "EXPENSE", icon: "Car", color: "#6366f1" },
    { name: "Investment", type: "EXPENSE", icon: "TrendingUp", color: "#10b981" },
    { name: "Gaming", type: "EXPENSE", icon: "Gamepad2", color: "#8b5cf6" },
    { name: "Rent", type: "EXPENSE", icon: "Home", color: "#ef4444" },
    { name: "Shopping", type: "EXPENSE", icon: "ShoppingBag", color: "#f43f5e" },
    { name: "Utilities", type: "EXPENSE", icon: "Lightbulb", color: "#fbbf24" },
    { name: "Entertainment", type: "EXPENSE", icon: "Film", color: "#d946ef" },
    { name: "Healthcare", type: "EXPENSE", icon: "HeartPulse", color: "#06b6d4" },
    { name: "Education", type: "EXPENSE", icon: "GraduationCap", color: "#4f46e5" },
    { name: "Travel", type: "EXPENSE", icon: "Plane", color: "#0ea5e9" },
    { name: "Subscriptions", type: "EXPENSE", icon: "CreditCard", color: "#64748b" },
  ];

  for (const cat of defaultCategories) {
    await db.insert(categories).values(cat as any).onConflictDoNothing();
  }

  revalidatePath("/", "layout");
}
