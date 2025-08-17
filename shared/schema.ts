import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Helper regex for Indian phone numbers
const indianPhoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
// Helper regex for email (basic, will add disposable check below)
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
// List of common disposable/fake email domains (expand as needed)
const disposableDomains = [
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "yopmail.com",
  "fakeinbox.com",
  "trashmail.com",
  "sharklasers.com",
  "getnada.com",
  "dispostable.com",
  "maildrop.cc",
  "spamgourmet.com",
  "throwawaymail.com",
  "mailcatch.com",
  "moakt.com",
  "dropmail.me",
  "inboxkitten.com",
  "mohmal.com",
  "tmail.com",
  "tempinbox.com",
  "mytemp.email",
  "discard.email",
  "trashmail.de",
  "temp-mail.org",
  "emailondeck.com",
  "anonmails.de",
  "burnermail.io",
  "inboxalias.com"
];

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const quotes = pgTable("quotes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  service: text("service").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(1, "Name is required"),
  email: z.string()
    .min(1, "Email is required")
    .regex(emailRegex, "Invalid email address")
    .refine((val) => {
      const domain = val.split("@")[1]?.toLowerCase();
      if (!domain) return false;
      return !disposableDomains.some((d) => domain.endsWith(d));
    }, { message: "Please use a valid, non-disposable email address" }),
  message: z.string().min(1, "Message is required"),
  phone: z.string()
    .min(1, "Phone number is required")
    .regex(indianPhoneRegex, "Please enter a valid phone number"),
  service: z.string().min(1, "Service is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
