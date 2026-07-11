CREATE TABLE "locales" (
	"code" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_content_block_translations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_block_id" uuid NOT NULL,
	"locale" text NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	CONSTRAINT "product_content_block_translations_content_block_id_locale_unique" UNIQUE("content_block_id","locale")
);
--> statement-breakpoint
CREATE TABLE "product_translations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"locale" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "product_translations_product_id_locale_unique" UNIQUE("product_id","locale"),
	CONSTRAINT "product_translations_slug_locale_unique" UNIQUE("slug","locale")
);
--> statement-breakpoint
CREATE TABLE "product_variant_option_translations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"variant_option_id" uuid NOT NULL,
	"locale" text NOT NULL,
	"label" text NOT NULL,
	CONSTRAINT "product_variant_option_translations_variant_option_id_locale_unique" UNIQUE("variant_option_id","locale")
);
--> statement-breakpoint
ALTER TABLE "product_content_block_translations" ADD CONSTRAINT "product_content_block_translations_content_block_id_product_content_blocks_id_fk" FOREIGN KEY ("content_block_id") REFERENCES "public"."product_content_blocks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_content_block_translations" ADD CONSTRAINT "product_content_block_translations_locale_locales_code_fk" FOREIGN KEY ("locale") REFERENCES "public"."locales"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_translations" ADD CONSTRAINT "product_translations_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_translations" ADD CONSTRAINT "product_translations_locale_locales_code_fk" FOREIGN KEY ("locale") REFERENCES "public"."locales"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variant_option_translations" ADD CONSTRAINT "product_variant_option_translations_variant_option_id_product_variant_options_id_fk" FOREIGN KEY ("variant_option_id") REFERENCES "public"."product_variant_options"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variant_option_translations" ADD CONSTRAINT "product_variant_option_translations_locale_locales_code_fk" FOREIGN KEY ("locale") REFERENCES "public"."locales"("code") ON DELETE no action ON UPDATE no action;