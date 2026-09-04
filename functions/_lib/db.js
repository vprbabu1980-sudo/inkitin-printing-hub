import { neon } from "@neondatabase/serverless";
export function db(env){if(!env.DATABASE_URL) throw new Error("DATABASE_URL is not configured"); return neon(env.DATABASE_URL);}
export function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json;charset=UTF-8","cache-control":"no-store"}});}
export function error(message,status=400){return json({error:message},status);}