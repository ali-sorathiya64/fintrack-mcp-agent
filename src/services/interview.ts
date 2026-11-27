import { eq } from "drizzle-orm";
import { db } from "../db/dbClient";
import { interviews } from "../db/schema"



export type Interview = typeof interviews.$inferInsert;


export const scheduleInterview = async(interview:Interview)=>
{

    const [newInterview] = await db.insert(interviews).values(interview)
    .returning();

    return newInterview;
}



export const getInterviewsForApplication = async (applicationId: string) => {
  return await db.query.interviews.findMany({
    where: eq(interviews.applicationId, applicationId),
    orderBy: (interviews, { asc }) => [asc(interviews.scheduledAt)],
  });
};


export const addInterviewFeedback = async(id:string, feedback:string)=>{
    const addFeedback = await db.update(interviews).set({feedback:feedback})
    .where(eq(interviews.id,id))
    .returning();

    if (!addFeedback){
        throw new Error("Feedback not found to update")
    }


    return addFeedback;

}