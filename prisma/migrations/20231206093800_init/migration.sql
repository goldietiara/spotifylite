/*
  Warnings:

  - You are about to drop the column `name` on the `Artist` table. All the data in the column will be lost.
  - Changed the type of `userId` on the `Artist` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Playlist` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `artistId` on the `Song` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "name",
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "artistId",
ADD COLUMN     "artistId" INTEGER NOT NULL;
