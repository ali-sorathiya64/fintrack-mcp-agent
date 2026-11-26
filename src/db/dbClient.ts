import {config} from 'dotenv';
import { resolve } from 'node:path';
import {drizzle} from "drizzle-orm/postgres-js"
import postgres from 'postgres';
import * as schema from './schema'

config({path:resolve(process.cwd(),'.env')})
config({path:resolve(process.cwd(),'../env')})

const DATABASE_URL = process.env.DATABASE_URL;


if (!DATABASE_URL){
    throw new Error ("DATABASE_URL is not defined in .env")
}

const client = postgres(DATABASE_URL);

export const db  = drizzle(client,{schema})

export  {client,schema}