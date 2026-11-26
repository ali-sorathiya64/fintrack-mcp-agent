import { defineConfig } from "drizzle-kit";

import {config} from 'dotenv'
import { resolve } from "node:path";


config({path:resolve(process.cwd(),'.env')})


const url = process.env.DATABASE_URL;

if (!url){
    throw new Error("DATABASE_URL is not defined")
}


export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out:"./drizzle",
  dbCredentials:{url}
});
