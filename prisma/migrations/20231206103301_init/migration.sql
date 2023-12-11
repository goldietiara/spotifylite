/*
  Warnings:

  - Changed the type of `userId` on the `userProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userProfileId" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "userProfile" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;
