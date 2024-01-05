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
          },
          likedPlaylist: true,
        },
      },
      playlist: { orderBy: { id: "desc" } },
      followers: true,
      following: true,
    },
  });

  return user;
});
