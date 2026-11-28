import { FastMCP } from "@prefecthq/fastmcp-ts/server";
import { z } from "zod";
import { createApplication, deleteApplication, getAllApplications, getApplicationById, updateApplicationDetails } from "./services/applications";

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


mcpServer.run().catch(console.error);