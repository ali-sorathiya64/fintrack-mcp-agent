CREATE TYPE "public"."application_status" AS ENUM('applied', 'screening', 'interview', 'offer', 'rejected', 'withdrawn');--> statement-breakpoint
CREATE TABLE "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company" text NOT NULL,
	"role" text NOT NULL,
	"status" "application_status" DEFAULT 'applied' NOT NULL,
	"applied_at" date NOT NULL,
	"salary" text,
	"location" text,
	"job_url" text,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_id" uuid NOT NULL,
	"round" text NOT NULL,
	"scheduled_at" timestamp with time zone,
	"feedback" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE cascade ON UPDATE no action;