/*
  Warnings:

  - A unique constraint covering the columns `[artistId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "artistId" INTEGER,
ADD COLUMN     "isArtist" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "User_artistId_key" ON "User"("artistId");
