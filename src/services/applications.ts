import { applications } from "../db/schema";
import { db } from "../db/dbClient";
import { eq } from "drizzle-orm";


export type Application = typeof applications.$inferInsert;  


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

export const updateApplicationDetails =async(id:string,application:Partial<Pick<Application,"company" | 
    "role" | "status" |"jobUrl" | "location" |"notes" | "salary">>
) =>{

    const [updateApplication] = await db.update(applications).set(application)
    .where(eq(applications.id,id))
    .returning();

    if (!updateApplication){
        throw new Error("Application not found")
    }
    

    return updateApplication;

}

export const deleteApplication = async(id:string)=>{

    const [deleteApplication] = await db.delete(applications)
    .where(eq(applications.id,id))
    .returning();


    if (!deleteApplication){
        throw new Error("Application not found")
    }
    
    return deleteApplication;
}