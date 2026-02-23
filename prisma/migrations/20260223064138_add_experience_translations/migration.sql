/*
  Warnings:

  - You are about to drop the column `company` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Experience` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "company",
DROP COLUMN "description",
DROP COLUMN "position";

-- CreateTable
CREATE TABLE "ExperienceTranslation" (
    "id" TEXT NOT NULL,
    "experienceId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ExperienceTranslation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExperienceTranslation" ADD CONSTRAINT "ExperienceTranslation_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;
