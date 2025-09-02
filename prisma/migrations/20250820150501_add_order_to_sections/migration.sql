/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `websiteSection` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."websiteSection" ADD COLUMN     "order" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "websiteSection_order_key" ON "public"."websiteSection"("order");
