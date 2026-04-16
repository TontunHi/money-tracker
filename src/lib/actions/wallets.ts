"use server";

import { db } from "@/lib/db";
import { wallets } from "@/lib/db/schema";
import { walletSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function createWallet(data: any) {
  const validated = walletSchema.parse(data);
  
  await db.insert(wallets).values({
    name: validated.name,
    type: validated.type as any,
    balance: validated.balance,
    color: validated.color,
    icon: validated.icon,
  });

  revalidatePath("/", "layout");
}

export async function updateWallet(id: string, data: any) {
  const validated = walletSchema.parse(data);
  
  await db.update(wallets)
    .set({
      name: validated.name,
      type: validated.type as any,
      balance: validated.balance,
      color: validated.color,
      icon: validated.icon,
    })
    .where(eq(wallets.id, id));

  revalidatePath("/", "layout");
}

export async function deleteWallet(id: string) {
  await db.delete(wallets).where(eq(wallets.id, id));
  revalidatePath("/", "layout");
}

export async function getWallets() {
  return await db.select().from(wallets).orderBy(wallets.name);
}
