import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Recebe os dados do corpo da requisição
    const body = await readBody(event);
    const { name, description, imageUrl } = body; 
   
    // Cria o novo gato no banco de dados usando Prisma
    const newCat = await prisma.cat.create({
      data: {
        name,
        description,
        imageUrl 
      },
    });

    return newCat;
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
