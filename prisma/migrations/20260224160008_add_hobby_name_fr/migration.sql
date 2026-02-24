/*
  Warnings:

  - Added the required column `nameFr` to the `Hobby` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hobby" ADD COLUMN     "nameFr" TEXT NOT NULL DEFAULT 'French Name';

-- Remove default after populating existing rows
ALTER TABLE "Hobby" ALTER COLUMN "nameFr" DROP DEFAULT;
