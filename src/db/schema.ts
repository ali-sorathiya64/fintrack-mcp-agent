import {pgTable, uuid, text, pgEnum, timestamp,numeric, date, unique, index,} from "drizzle-orm/pg-core";

export const TransactionType = pgEnum("transaction_type", [
  "expense",
  "income",
]);

export const ExpenseCategory = pgEnum("expense_category", [
  "food",
  "groceries",
  "transport",
  "fuel",
  "shopping",
  "entertainment",
  "bills",
  "health",
  "rent",
  "education",
  "other",
]);

export const IncomeSource = pgEnum("income_source", [
  "salary",
  "freelance",
  "investment",
  "gift",
  "other",
]);

export const transactions = pgTable(
  "transactions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    type: TransactionType("type").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    category: text("category").notNull(),
    note: text("note"),
    occurredAt: date("occurred_at").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("txn_occurred_at_idx").on(t.occurredAt),
    index("txn_category_idx").on(t.category),
    index("txn_type_idx").on(t.type),
  ]
);

export const budgets = pgTable(
  "budgets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    category: text("category").notNull(),
    monthlyLimit: numeric("monthly_limit", { precision: 12, scale: 2 })
      .notNull(),
    month: text("month").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    unique("budget_category_month_unique").on(t.category, t.month),
  ]
);