-- AlterTable
ALTER TABLE "SiteInfo" ADD COLUMN     "helpInfoFr" TEXT NOT NULL DEFAULT 'Je peux vous aider avec le développement full stack, DevOps, et l''infrastructure cloud moderne.',
ADD COLUMN     "homeDescriptionFr" TEXT NOT NULL DEFAULT 'Création d''applications évolutives avec des technologies de pointe.',
ADD COLUMN     "homeStackFr" TEXT NOT NULL DEFAULT 'Next.js • Kubernetes • Infrastructure Cloud Moderne',
ADD COLUMN     "homeTitleFr" TEXT NOT NULL DEFAULT 'Développeur Full Stack & DevOps';
