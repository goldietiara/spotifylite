import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const email = getRouterParam(event, "email");

  const user = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
    include: {
      userProfile: {
        include: {
          likedSongs: {
            include: { Album: { include: { Artist: true } } },
            take: 10,
            skip: 0,
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
