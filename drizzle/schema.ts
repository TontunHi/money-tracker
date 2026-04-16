import { pgTable, uuid, numeric, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const categoryType = pgEnum("category_type", ['income', 'expense'])
export const frequency = pgEnum("frequency", ['monthly', 'yearly'])


export const recurringRules = pgTable("recurring_rules", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	walletId: uuid("wallet_id").notNull(),
	categoryId: uuid("category_id").notNull(),
	amount: numeric({ precision: 10, scale:  2 }).notNull(),
	frequency: frequency().notNull(),
	nextDueDate: timestamp("next_due_date", { mode: 'string' }).notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});
