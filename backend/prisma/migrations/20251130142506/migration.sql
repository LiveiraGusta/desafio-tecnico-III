/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsibleDoctor` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "responsibleDoctor" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";
