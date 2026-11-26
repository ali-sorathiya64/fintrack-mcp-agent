CREATE TYPE "public"."expense_category" AS ENUM('food', 'groceries', 'transport', 'fuel', 'shopping', 'entertainment', 'bills', 'health', 'rent', 'education', 'other');--> statement-breakpoint
CREATE TYPE "public"."income_source" AS ENUM('salary', 'freelance', 'investment', 'gift', 'other');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('expense', 'income');--> statement-breakpoint
CREATE TABLE "budgets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category" text NOT NULL,
	"monthly_limit" numeric(12, 2) NOT NULL,
	"month" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "budget_category_month_unique" UNIQUE("category","month")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "transaction_type" NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"category" text NOT NULL,
	"note" text,
	"occurred_at" date NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "txn_occurred_at_idx" ON "transactions" USING btree ("occurred_at");--> statement-breakpoint
CREATE INDEX "txn_category_idx" ON "transactions" USING btree ("category");--> statement-breakpoint
CREATE INDEX "txn_type_idx" ON "transactions" USING btree ("type");