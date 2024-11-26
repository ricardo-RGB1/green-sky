import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accounts";


export const runtime = "edge";

const app = new Hono().basePath("/api");



// API Routes; routes is the app with the routes attached to it 
const routes = app 
  .route("/accounts", accounts); 

export const GET = handle(app); // GET requests are handled by the app
export const POST = handle(app); // POST requests are handled by the app

// Export the type of the app
export type AppType = typeof routes; 