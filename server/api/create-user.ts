import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = await prisma.$transaction(async (tx) => {
    const userResult = await tx.user.create({
      data: {
        name: body.name,
        email: body.email,
        dateOfBirth: body.dateOfBirth,
        image: body.image,
        imageName: body.imageName,
        location: body.location,
        onBoarding: false,
      },
    });

    await tx.userProfile.create({
      data: {
        User: { connect: { id: userResult.id } },
      },
    });
  });
  return result;
});
