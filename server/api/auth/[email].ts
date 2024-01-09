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
          _count: { select: { likedSongs: true } },
          likedSongs: {
            include: { Album: { include: { Artist: true } } },
          },
          likedPlaylist: true,
          likedAlbum: true,
        },
      },
      playlist: { orderBy: { id: "desc" } },
      followers: { orderBy: { id: "desc" } },
      following: { orderBy: { id: "desc" } },
    },
  });

  return user;
});
