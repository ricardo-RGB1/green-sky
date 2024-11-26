import { pgTable, text } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

// Table for storing account information
// Each account has an ID, name, and associated user ID
export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
}) 


// This schema is used to validate the data before inserting it into the database
export const insertAccountSchema = createInsertSchema(accounts); 
