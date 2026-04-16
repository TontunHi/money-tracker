"use server";

import { db } from "@/lib/db";
import { transactions, wallets, categories } from "@/lib/db/schema";
import { seedDefaults } from "./categories";
import { revalidatePath } from "next/cache";

export async function resetSystemData() {
  await db.transaction(async (tx) => {
    // Delete in order to avoid foreign key violations
    await tx.delete(transactions);
    await tx.delete(wallets);
    await tx.delete(categories);
  });

  // Re-seed default categories
  await seedDefaults();

  revalidatePath("/", "layout");
}
