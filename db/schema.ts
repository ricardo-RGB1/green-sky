import { pgTable, text } from "drizzle-orm/pg-core"

// Table for storing account information
// Each account has an ID, name, and associated user ID
export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
})