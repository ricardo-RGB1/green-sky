import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accounts";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// API Routes 
const routes = app 
  .route("/accounts", accounts);

export const GET = handle(app);
export const POST = handle(app);

// Export the type of the app
export type AppType = typeof routes; 