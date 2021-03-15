
DROP TRIGGER IF EXISTS "set_public_users_updated_at" ON "public"."users";
ALTER TABLE "public"."users" DROP COLUMN "updated_at";

ALTER TABLE "public"."users" DROP COLUMN "created_at";

alter table "public"."responses" drop constraint "responses_user_id_fkey";

DROP TABLE "public"."responses";

DROP TABLE "public"."users";
