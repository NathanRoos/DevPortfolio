-- DropForeignKey
ALTER TABLE "ProjectTranslation" DROP CONSTRAINT "ProjectTranslation_projectId_fkey";

-- AddForeignKey
ALTER TABLE "ProjectTranslation" ADD CONSTRAINT "ProjectTranslation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
