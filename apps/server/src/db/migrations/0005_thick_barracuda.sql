CREATE TABLE "integration" (
	"id" uuid PRIMARY KEY NOT NULL,
	"group" text NOT NULL,
	"provider" text NOT NULL,
	"connection_type" text NOT NULL,
	"encrypted_credentials" text,
	"is_connected" boolean DEFAULT false NOT NULL,
	"connected_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "integration_provider_unique" UNIQUE("provider")
);
