// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import {sqliteTable,text,integer,uniqueIndex} from 'drizzle-orm/sqlite-core';
export const rooms=sqliteTable('rooms',{id:text('id').primaryKey(),data:text('data').notNull(),version:integer('version').notNull().default(1),published:integer('published').notNull().default(0),updated:text('updated').notNull(),deleted:integer('deleted').notNull().default(0)});
export const grants=sqliteTable('grants',{hash:text('hash').primaryKey(),room:text('room').notNull(),role:text('role').notNull(),member:text('member'),created:text('created').notNull()});
export const evidence=sqliteTable('evidence',{id:text('id').primaryKey(),room:text('room').notNull(),owner:text('owner').notNull(),name:text('name').notNull(),mime:text('mime').notNull(),fingerprint:text('fingerprint').notNull(),note:text('note').notNull().default(''),payer:text('payer'),status:text('status').notNull().default('pending'),created:text('created').notNull()},table=>[uniqueIndex('evidence_room_fingerprint').on(table.room,table.fingerprint)]);
