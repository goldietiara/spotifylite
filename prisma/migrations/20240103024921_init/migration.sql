/*
  Warnings:

  - You are about to drop the column `userProfileId` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `userProfileId` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `artistId` on the `userProfile` table. All the data in the column will be lost.
  - You are about to drop the `_PlaylistToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_userProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_userProfileId_fkey";

-- DropForeignKey
ALTER TABLE "_PlaylistToUser" DROP CONSTRAINT "_PlaylistToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlaylistToUser" DROP CONSTRAINT "_PlaylistToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "userProfile" DROP CONSTRAINT "userProfile_artistId_fkey";

-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "userProfileId";

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "userProfileId";

-- AlterTable
ALTER TABLE "userProfile" DROP COLUMN "artistId";

-- DropTable
DROP TABLE "_PlaylistToUser";

-- CreateTable
CREATE TABLE "_PlaylistTouserProfile" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SongTouserProfile" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AlbumTouserProfile" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlaylistTouserProfile_AB_unique" ON "_PlaylistTouserProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaylistTouserProfile_B_index" ON "_PlaylistTouserProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SongTouserProfile_AB_unique" ON "_SongTouserProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_SongTouserProfile_B_index" ON "_SongTouserProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumTouserProfile_AB_unique" ON "_AlbumTouserProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumTouserProfile_B_index" ON "_AlbumTouserProfile"("B");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistTouserProfile" ADD CONSTRAINT "_PlaylistTouserProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistTouserProfile" ADD CONSTRAINT "_PlaylistTouserProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "userProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SongTouserProfile" ADD CONSTRAINT "_SongTouserProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SongTouserProfile" ADD CONSTRAINT "_SongTouserProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "userProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumTouserProfile" ADD CONSTRAINT "_AlbumTouserProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumTouserProfile" ADD CONSTRAINT "_AlbumTouserProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "userProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
