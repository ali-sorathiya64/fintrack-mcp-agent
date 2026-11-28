import { applications } from "../db/schema";
import { db } from "../db/dbClient";
import { eq } from "drizzle-orm";


export type Application = typeof applications.$inferInsert;  

export type UpdateApplicationInput = Partial<{
  company: string;
  role: string;
  status: "applied" | "screening" | "interview" | "offer" | "rejected" | "withdrawn";
  salary: string;
  location: string;
  jobUrl: string;
  notes: string;
}>;


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


export const getAllApplications =async()=>{

    const application = await db.query.applications.findMany();
      

    return application;


}

export const getApplicationById  = async(id:string)=>{

    const application = await db.query.applications.findFirst({
        where: eq(applications.id,id)
    })

    if (!application){
        throw new Error("Application not found")
    }
    return application;

}



export const updateApplicationDetails = async (
  id: string,
  application: UpdateApplicationInput
) => {
  const [updated] = await db
    .update(applications)
    .set(application)
    .where(eq(applications.id, id))
    .returning();

  if (!updated) {
    throw new Error("Application not found");
  }

  return updated;
};

export const deleteApplication = async(id:string)=>{

    const [deleteApplication] = await db.delete(applications)
    .where(eq(applications.id,id))
    .returning();


    if (!deleteApplication){
        throw new Error("Application not found")
    }
    
    return deleteApplication;
}