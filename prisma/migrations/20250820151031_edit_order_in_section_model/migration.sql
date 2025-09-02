-- AlterTable
ALTER TABLE "public"."websiteSection" ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "websiteSection_order_seq";
