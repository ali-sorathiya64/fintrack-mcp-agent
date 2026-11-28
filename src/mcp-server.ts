import { FastMCP } from "@prefecthq/fastmcp-ts/server";
import { z } from "zod";
import { createApplication, deleteApplication, getAllApplications, getApplicationById, updateApplicationDetails } from "./services/applications";
import { addInterviewFeedback, getInterviewsForApplication, scheduleInterview } from "./services/interview";

const mcpServer = new FastMCP({ name: "job-portal", version: "1.0.0" });


//createApplication tool
mcpServer.tool(
  {
    name: "create-application",
    description: "Create a new application for job stuff",

    input: z.object({
      company: z.string().describe("The company name of the application"),
      role: z.string().describe("The role to apply"),
      status: z.enum(["applied", "screening", "interview", "offer", "rejected", "withdrawn"]).optional().describe("The status of application"),
      salary: z.string().optional().describe("the salary of the application"),
      location: z.string().optional().describe("The company location"),
      jobUrl: z.string().optional().describe("The joburl of the application"),
      notes: z.string().optional().describe("The important notes about the application")
    }),
  },
  async ({ company, role, status, salary, location, jobUrl, notes }) => {
    const newApplication = await createApplication({ 
      company, role, status, salary, location, jobUrl,notes 
    });
    return {
      message: "Application created successfully",
      application: newApplication
    };
  }
);


// getApplications tool
  mcpServer.tool(
    {
  name:"get-applications",
  description:"Get all the related applications",
},async()=>{
    const applications = await getAllApplications();

    return{
        message:"Fetched all applications",
        applications
    }
}
)

//getApplicationById tool
mcpServer.tool(
    {
      name:"get-application",
      description:"Get application based on id",
      input:z.object({
      id:z.string().describe("The id parmater for fetch Application based on id")
      }),
     
    },

    async ({id})=>{
        const applications = await getApplicationById(id);
        return{
            message:"Application Fetched",
            applications
        }
    }
    
)
//updateApplication Tool

mcpServer.tool(
  {
    name: "update-application",
    description: "Update application details",
    input: z.object({
      id: z.string().describe("Application ID"),
      company: z.string().optional().describe("Company name"),
      role: z.string().optional().describe("Role"),
      status: z.enum(["applied", "screening", "interview", "offer", "rejected", "withdrawn"]).optional().describe("Status"),
      salary: z.string().optional().describe("Salary"),
      location: z.string().optional().describe("Location"),
      jobUrl: z.string().optional().describe("Job URL"),
      notes: z.string().optional().describe("Notes"),
    }),
  },
  async ({ id, company, role, status, salary, location, jobUrl, notes }) => {
    const application = await updateApplicationDetails(id, { company, role, status, salary, location, jobUrl, notes });
    return { message: "Application updated successfully", application };
  }
);


// delete-application tool
mcpServer.tool({
    name:"delete-application",
    description:"Delete applications",
    input: z.object({
    id: z.string().describe("Application ID")
    })

},async({id})=>{
    const application = await deleteApplication(id);

    return {
        message:"Application deleted successfully",
        application
    }
}

)

//  schedule-interview 
mcpServer.tool(
  {
    name: "schedule-interview",
    description: "Schedule a new interview round for an application",
    input: z.object({
      applicationId: z.string().describe("The ID of the application"),
      round: z.string().describe("Interview round (e.g., DSA, System Design, HR)"),
      scheduledAt: z.string().optional().describe("Date and time of interview (ISO format)"),
      feedback: z.string().optional().describe("Any initial feedback"),
    }),
  },
  async ({ applicationId, round, scheduledAt, feedback }) => {
    const interview = await scheduleInterview({
      applicationId,
      round,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
      feedback,
    });
    return {
      message: "Interview scheduled successfully",
      interview,
    };
  }
);



//  get-interviews
mcpServer.tool(
  {
    name: "get-interviews",
    description: "Get all interviews scheduled for a specific application",
    input: z.object({
      applicationId: z.string().describe("The ID of the application"),
    }),
  },
  async ({ applicationId }) => {
    const interviews = await getInterviewsForApplication(applicationId);
    return {
      message: "Interviews fetched successfully",
      interviews,
    };
  }
);

// add-interview-feedback
mcpServer.tool(
  {
    name: "add-interview-feedback",
    description: "Add or update feedback for a specific interview",
    input: z.object({
      id: z.string().describe("The ID of the interview"),
      feedback: z.string().describe("The feedback text"),
    }),
  },
  async ({ id, feedback }) => {
    const interview = await addInterviewFeedback(id, feedback);
    return {
      message: "Feedback added successfully",
      interview,
    };
  }
);


mcpServer.run().catch(console.error);