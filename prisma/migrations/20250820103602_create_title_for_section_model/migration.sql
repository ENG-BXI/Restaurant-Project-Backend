/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `websiteSection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `websiteSection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."websiteSection" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "websiteSection_title_key" ON "public"."websiteSection"("title");
