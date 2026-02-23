/*
  Warnings:

  - You are about to drop the column `degree` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `institution` on the `Education` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Education" DROP COLUMN "degree",
DROP COLUMN "description",
DROP COLUMN "institution";

-- CreateTable
CREATE TABLE "EducationTranslation" (
    "id" TEXT NOT NULL,
    "educationId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "EducationTranslation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EducationTranslation" ADD CONSTRAINT "EducationTranslation_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES "Education"("id") ON DELETE CASCADE ON UPDATE CASCADE;
