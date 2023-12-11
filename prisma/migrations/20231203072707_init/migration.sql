/*
  Warnings:

  - Added the required column `imageName` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageName` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageName` to the `Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "imageName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "imageName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "imageName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imageName" TEXT NOT NULL DEFAULT 'name';
