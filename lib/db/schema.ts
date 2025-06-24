import { pgTable, text, uuid, integer, boolean, timestamp} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const files = pgTable('files', {
    id: uuid().notNull().primaryKey().unique().defaultRandom(),
    name: text('name').notNull().unique(),
    path: text('path').notNull(),// document/project
    size: integer('size').notNull(),
    type: text('type').notNull(),

    isTrash: boolean('is_trash').notNull().default(false),
    fileUrl: text('file_url').notNull(),
    thumbnailUrl: text('thumbnail_url'),

    userId: text('user_id').notNull().unique(),
    parent: uuid('parent_id'),

    isFolder: boolean('is_folder').default(false).notNull(),
    isStared: boolean('is_starred').default(false).notNull(),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export const fileRelations = relations(files, ({ one, many }) => ({
    parent: one(files, {fields:[files.parent], references: [files.id]}),
    children: many(files),
}))

export const File = typeof files.$inferSelect;
export const NewFile = typeof files.$inferInsert;
