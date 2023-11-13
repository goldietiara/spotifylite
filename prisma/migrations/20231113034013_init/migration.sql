/*
  Warnings:

  - You are about to drop the column `userLikedPlaylistId` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the `UserLikedPlaylist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_userLikedPlaylistId_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_userId_fkey";

-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "userLikedPlaylistId",
ADD COLUMN     "userProfileId" INTEGER;

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "userId",
ADD COLUMN     "userProfileId" INTEGER;

-- DropTable
DROP TABLE "UserLikedPlaylist";

-- CreateTable
CREATE TABLE "userProfile" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "userProfile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "userProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "userProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
