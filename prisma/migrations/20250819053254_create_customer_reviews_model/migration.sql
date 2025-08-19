-- CreateTable
CREATE TABLE "public"."customerReview" (
    "id" TEXT NOT NULL,
    "numberOfStart" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,

    CONSTRAINT "customerReview_pkey" PRIMARY KEY ("id")
);
