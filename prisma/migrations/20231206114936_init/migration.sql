-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "email" TEXT NOT NULL DEFAULT 'goldietiara.acc@gmail.com';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userProfileId" DROP DEFAULT;
