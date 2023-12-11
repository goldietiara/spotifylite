import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  await prisma.$transaction(async (tx) => {
    const artistResult = await tx.artist.create({
      data: {
        userId: body.userId as number,
        name: body.name,
        email: body.email,
        image: body.image,
        imageName: body.imageName,
        header: body.header,
        headerName: body.headerName,
      },
    });

    await tx.user.update({
      where: { id: body.userId },
      data: {
        artistId: artistResult.id,
        isArtist: true,
      },
    });
  });
});
