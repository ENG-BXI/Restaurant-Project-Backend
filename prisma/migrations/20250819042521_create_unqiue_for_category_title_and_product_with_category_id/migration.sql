/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,categoryId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "public"."Category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Product_title_categoryId_key" ON "public"."Product"("title", "categoryId");
