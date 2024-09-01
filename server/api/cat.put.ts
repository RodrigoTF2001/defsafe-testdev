import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const catId = body.id;
    
    const { name, description, imageUrl } = body;

    try {
      const updatedCat = await prisma.cat.update({
        where: { id: catId },
        data: {
            name,
            description,
            imageUrl,
          },
      });
  
      return { success: true, cat: updatedCat };
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: `Erro ao criar o gato`,
      });
    }
  });
  