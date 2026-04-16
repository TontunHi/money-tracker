import { pgTable, text, timestamp, decimal, pgEnum, uuid, unique } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const transactionTypeEnum = pgEnum("transaction_type", ["INCOME", "EXPENSE", "TRANSFER"]);
export const walletTypeEnum = pgEnum("wallet_type", ["CASH", "BANK", "SAVINGS", "CREDIT_CARD"]);

export const wallets = pgTable("wallets", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: walletTypeEnum("type").notNull().default("CASH"),
  balance: decimal("balance", { precision: 12, scale: 2 }).notNull().default("0"),
  color: text("color").notNull().default("#3b82f6"), // Default blue
  icon: text("icon").notNull().default("Wallet"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: transactionTypeEnum("type").notNull(), // Only INCOME or EXPENSE
  icon: text("icon").notNull().default("Tag"),
  color: text("color").notNull().default("#94a3b8"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
/*
}, (t) => ({
  unq: unique().on(t.name, t.type),
}));
*/

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  walletId: uuid("wallet_id").references(() => wallets.id, { onDelete: "cascade" }).notNull(),
  toWalletId: uuid("to_wallet_id").references(() => wallets.id, { onDelete: "cascade" }), // For Transfers
  categoryId: uuid("category_id").references(() => categories.id, { onDelete: "set null" }),
  type: transactionTypeEnum("type").notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  description: text("description"),
  date: timestamp("date").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().default("Guest User"),
  email: text("email"),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const walletRelations = relations(wallets, ({ many }) => ({
  transactions: many(transactions),
}));

export const categoryRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions),
}));

export const transactionRelations = relations(transactions, ({ one }) => ({
  wallet: one(wallets, {
    fields: [transactions.walletId],
    references: [wallets.id],
  }),
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));
