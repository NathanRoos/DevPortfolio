-- CreateTable
CREATE TABLE "SiteInfo" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "contactEmail" TEXT NOT NULL,
    "helpInfo" TEXT NOT NULL,
    "directEmail" TEXT NOT NULL,

    CONSTRAINT "SiteInfo_pkey" PRIMARY KEY ("id")
);
