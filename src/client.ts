import {Client} from '@prefecthq/fastmcp-ts/client';


export const client = await Client.connect("http://127.0.0.1:3000/mcp");

export  const creatApplicationUsingMCP  = async ()=>{
    await client.callTool("create-application",{
     
    })

}