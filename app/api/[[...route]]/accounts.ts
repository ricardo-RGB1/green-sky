import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

// .get() applies middleware only to this specific route,
// while .use() would apply it globally to all routes.
// Since we only have one route that needs auth, .get() with middleware
// is more precise than using .use() globally

// Get all accounts for authenticated user
const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    // Select accounts from the database
    const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts)
      .where(eq(accounts.userId, auth.userId)); // Filter accounts by user ID
    return c.json({ data });
  })
  .post( // Create a new account
    "/",
    clerkMiddleware(),
    zValidator("json", insertAccountSchema.pick({ name: true })),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401); // Return 401 Unauthorized if user is not authenticated
      }
      // Insert a new account into the database and return the created account
      const [data] = await db.insert(accounts).values({
        id: createId(),
        userId: auth.userId,
        ...values, // Spread the values from the request body
        }).returning();

      return c.json({ data });
    }
  );
  
export default app;
