import { z } from "zod";

export const walletTypeSchema = z.enum(["CASH", "BANK", "SAVINGS", "CREDIT_CARD"]);
export const transactionTypeSchema = z.enum(["INCOME", "EXPENSE", "TRANSFER"]);

export const walletSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  type: walletTypeSchema,
  balance: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid balance format"),
  color: z.string().regex(/^#[0-9a-f]{6}$/i, "Invalid color format"),
  icon: z.string().min(1, "Icon is required"),
});

export const transactionSchema = z.object({
  walletId: z.string().uuid("Please select a wallet"),
  toWalletId: z.string().uuid("Please select a destination wallet").optional().or(z.literal("")).transform(v => v === "" ? undefined : v),
  categoryId: z.string().uuid("Please select a category").optional().or(z.literal("")).transform(v => v === "" ? undefined : v),
  type: transactionTypeSchema,
  amount: z.string().min(1, "Amount is required").regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
  description: z.string().max(200).optional(),
  date: z.date(),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  type: z.enum(["INCOME", "EXPENSE"]),
  icon: z.string().min(1, "Icon is required"),
  color: z.string().regex(/^#[0-9a-f]{6}$/i, "Invalid color format"),
});
