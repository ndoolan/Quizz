/*
  Warnings:

  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recording` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recording" DROP CONSTRAINT "Recording_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Recording" DROP CONSTRAINT "Recording_userId_fkey";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "Recording";
