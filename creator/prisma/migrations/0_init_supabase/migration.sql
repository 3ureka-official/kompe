-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."brands" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL DEFAULT '''''::text',
    "description" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL DEFAULT '''''::text',
    "email" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "website" TEXT,
    "tiktok_username" TEXT,
    "instagram_url" TEXT,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contests" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "brand_id" UUID NOT NULL,
    "title" VARCHAR,
    "category" VARCHAR,
    "thumbnail_url" TEXT,
    "application_start_date" DATE NOT NULL,
    "application_end_date" DATE NOT NULL,
    "contest_start_date" DATE NOT NULL,
    "contest_end_date" DATE NOT NULL,
    "description" TEXT,
    "requirements" TEXT,
    "prize_pool" BIGINT,
    "prize_distribution" INTEGER[],
    "videos" BIGINT NOT NULL DEFAULT 0,
    "views" BIGINT NOT NULL DEFAULT 0,
    "likes" BIGINT NOT NULL DEFAULT 0,
    "comments" BIGINT NOT NULL DEFAULT 0,
    "shares" BIGINT NOT NULL DEFAULT 0,
    "is_draft" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contests_assets" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "brand_id" UUID NOT NULL,
    "contest_id" UUID NOT NULL,
    "file_url" TEXT,
    "url" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contest_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contests_inspirations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "brand_id" UUID NOT NULL,
    "contest_id" UUID NOT NULL,
    "url" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contest_inspirations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "profile_image" TEXT,
    "brand_id" UUID,
    "id" UUID NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."contests" ADD CONSTRAINT "contests_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."contests_assets" ADD CONSTRAINT "contest_assets_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contests_assets" ADD CONSTRAINT "contest_assets_contest_id_fkey" FOREIGN KEY ("contest_id") REFERENCES "public"."contests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contests_inspirations" ADD CONSTRAINT "contest_inspirations_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contests_inspirations" ADD CONSTRAINT "contest_inspirations_contest_id_fkey" FOREIGN KEY ("contest_id") REFERENCES "public"."contests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

