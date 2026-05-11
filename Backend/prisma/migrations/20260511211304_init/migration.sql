/*
  Warnings:

  - You are about to drop the column `rolId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rol` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'TECNICO', 'OPERARIO', 'SUPERVISOR');

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_rolId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "rolId",
ADD COLUMN     "rol" "Role" NOT NULL;

-- DropTable
DROP TABLE "roles";
