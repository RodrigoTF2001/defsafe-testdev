/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Adoption" DROP CONSTRAINT "Adoption_catId_fkey";

-- DropTable
DROP TABLE "User";

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Cat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
