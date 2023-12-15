import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id: string | any = getRouterParam(event, "id");

  const user = await prisma.user.findUnique({
    where: {
      id: id as number,
    },
    include: {
      userProfile: {
        include: {
          likedSongs: {
            include: { Album: { include: { Artist: true } } },
          },
          likedPlaylist: true,
        },
      },
      playlist: true,
      followers: true,
      following: true,
    },
  });

  return user;
});
