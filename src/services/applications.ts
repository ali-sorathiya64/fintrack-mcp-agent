import { applications } from "../db/schema";
import { db } from "../db/dbClient";


export type Application = typeof applications.$inferInsert;   // ← auto type

export const createApplication = async (application: Application) => {
  const [newApplication] = await db
    .insert(applications)
    .values({
      ...application,
      status: application.status ?? "applied",
      appliedAt: application.appliedAt ?? new Date().toISOString().slice(0, 10),
    })
    .returning();

  return newApplication;
};


