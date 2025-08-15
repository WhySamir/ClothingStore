-- AlterTable
ALTER TABLE "public"."Review" ADD COLUMN     "images" TEXT[],
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "videos" TEXT;
