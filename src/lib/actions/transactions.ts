"use server";

import { db } from "@/lib/db";
import { transactions, wallets } from "@/lib/db/schema";
import { transactionSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { eq, sql } from "drizzle-orm";

export async function createTransaction(data: any) {
  const validated = transactionSchema.parse(data);

  await db.transaction(async (tx) => {
    // 1. Insert the transaction
    await tx.insert(transactions).values({
      walletId: validated.walletId,
      toWalletId: validated.toWalletId,
      categoryId: validated.categoryId,
      type: validated.type as any,
      amount: validated.amount,
      description: validated.description,
      date: validated.date,
    });

    // 2. Update wallet balances
    if (validated.type === "INCOME") {
      await tx.update(wallets)
        .set({ balance: sql`${wallets.balance} + ${validated.amount}` })
        .where(eq(wallets.id, validated.walletId));
    } else if (validated.type === "EXPENSE") {
      await tx.update(wallets)
        .set({ balance: sql`${wallets.balance} - ${validated.amount}` })
        .where(eq(wallets.id, validated.walletId));
    } else if (validated.type === "TRANSFER") {
      if (!validated.toWalletId) throw new Error("Destination wallet required for transfer");
      
      // Source wallet (decrease)
      await tx.update(wallets)
        .set({ balance: sql`${wallets.balance} - ${validated.amount}` })
        .where(eq(wallets.id, validated.walletId));
      
      // Destination wallet (increase)
      await tx.update(wallets)
        .set({ balance: sql`${wallets.balance} + ${validated.amount}` })
        .where(eq(wallets.id, validated.toWalletId));
    }
  });

  revalidatePath("/", "layout");
}

export async function getRecentTransactions(limit = 10) {
  return await db.query.transactions.findMany({
    with: {
      wallet: true,
      category: true,
    },
    orderBy: (transactions, { desc }) => [desc(transactions.date)],
    limit,
  });
}

export async function getTransactions() {
  return await db.query.transactions.findMany({
    with: {
      wallet: true,
      category: true,
    },
    orderBy: (transactions, { desc }) => [desc(transactions.date)],
  });
}

export async function deleteTransaction(id: string) {
  // We need to reverse the balance update before deleting
  const tx = await db.query.transactions.findFirst({
    where: (transactions, { eq }) => eq(transactions.id, id),
  });

  if (!tx) return;

  await db.transaction(async (dbTx) => {
    // Reverse logic
    if (tx.type === "INCOME") {
      await dbTx.update(wallets)
        .set({ balance: sql`${wallets.balance} - ${tx.amount}` })
        .where(eq(wallets.id, tx.walletId));
    } else if (tx.type === "EXPENSE") {
      await dbTx.update(wallets)
        .set({ balance: sql`${wallets.balance} + ${tx.amount}` })
        .where(eq(wallets.id, tx.walletId));
    } else if (tx.type === "TRANSFER" && tx.toWalletId) {
      await dbTx.update(wallets)
        .set({ balance: sql`${wallets.balance} + ${tx.amount}` })
        .where(eq(wallets.id, tx.walletId));
      await dbTx.update(wallets)
        .set({ balance: sql`${wallets.balance} - ${tx.amount}` })
        .where(eq(wallets.id, tx.toWalletId));
    }

    await dbTx.delete(transactions).where(eq(transactions.id, id));
  });

  revalidatePath("/", "layout");
}

export async function getTransactionSummary() {
  const result = await db.select({
    totalIncome: sql<number>`SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END)`,
    totalExpense: sql<number>`SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END)`,
  }).from(transactions);

  const summary = result[0] || { totalIncome: 0, totalExpense: 0 };
  
  return {
    totalIncome: Number(summary.totalIncome || 0),
    totalExpense: Number(summary.totalExpense || 0),
  };
}
