import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {

    const body = await readBody(event);
    const { fullName,email, description, phone,isAgree,catId} = body; 
   
    const newAdopt = await prisma.adoption.create({
      data: {
        fullName: fullName,
        description: description,
        phone: phone,
        email: email,
        isAgree: isAgree,
        catId: catId, // Certifique-se de passar o ID do gato aqui
      },
    });

    return newAdopt;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      message: `Erro ao criar o gato`,
    });
  } finally {
    await prisma.$disconnect();
  }
});
