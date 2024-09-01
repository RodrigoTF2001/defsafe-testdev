/*
  Warnings:

  - You are about to drop the column `agreeToTerms` on the `Adoption` table. All the data in the column will be lost.
  - Added the required column `isAgree` to the `Adoption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Adoption" DROP COLUMN "agreeToTerms",
ADD COLUMN     "isAgree" BOOLEAN NOT NULL;
