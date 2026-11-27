

import { date, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";  




export const ApplicationStatus = pgEnum("application_status", [
  "applied",
  "screening",
  "interview",
  "offer",
  "rejected",
  "withdrawn",

])

export const applications = pgTable("applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  status: ApplicationStatus("status").notNull().default("applied"),
  appliedAt: date("applied_at").notNull().default(sql`CURRENT_DATE`),
  salary: text("salary"),
  location: text("location"),
  jobUrl: text("job_url"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
})

export const interviews = pgTable("interviews", {

  id: uuid("id").primaryKey().defaultRandom(),
  applicationId: uuid("application_id").notNull().references(() => applications.id, { onDelete: "cascade" }),
  round: text("round").notNull(),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
  feedback: text("feedback"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})