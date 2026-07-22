CREATE TABLE "integration_field_definition" (
	"id" uuid PRIMARY KEY NOT NULL,
	"provider" text NOT NULL,
	"key" text NOT NULL,
	"label" text NOT NULL,
	"placeholder" text,
	"description" text,
	"type" text DEFAULT 'text' NOT NULL,
	"is_secret" boolean DEFAULT false NOT NULL,
	"is_required" boolean DEFAULT true NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "integration_field_definition_provider_key_unique" UNIQUE("provider","key")
);
--> statement-breakpoint
ALTER TABLE "integration" ADD COLUMN "token_expires_at" timestamp;