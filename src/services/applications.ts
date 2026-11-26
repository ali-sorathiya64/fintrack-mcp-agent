import { applications } from "../db/schema";
import {db} from '../db/dbClient'





export type Application ={

company:string;
role:string;
status:typeof applications.$inferSelect['status'];
appliedAt: string; 
salary?: string;
location?:string;
jobUrl?:string;
notes?:string;
}


export const createApplication =async(application:Application)=>{

const newApplication = await db.insert(applications).values({...application,
  status:application.status ?? 'applied',
  appliedAt:application.appliedAt ?? new Date().toISOString().slice(0,10)
})
.returning();

return newApplication;

}