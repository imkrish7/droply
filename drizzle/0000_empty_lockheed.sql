CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"path" text NOT NULL,
	"size" integer NOT NULL,
	"type" text NOT NULL,
	"is_trash" boolean DEFAULT false NOT NULL,
	"file_url" text NOT NULL,
	"thumbnail_url" text,
	"user_id" text NOT NULL,
	"parent_id" uuid,
	"is_folder" boolean DEFAULT false NOT NULL,
	"is_starred" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "files_id_unique" UNIQUE("id"),
	CONSTRAINT "files_name_unique" UNIQUE("name"),
	CONSTRAINT "files_user_id_unique" UNIQUE("user_id")
);
