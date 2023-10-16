-- AlterTable
ALTER TABLE "Meditation" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "totalMeditations" SET DEFAULT 0;
