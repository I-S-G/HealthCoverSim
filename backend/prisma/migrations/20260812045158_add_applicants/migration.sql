/*
  Warnings:

  - You are about to drop the column `age` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `hospitalCoverHistory` on the `Quote` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Applicant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quoteId" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "hospitalCoverHistory" TEXT NOT NULL,
    CONSTRAINT "Applicant_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Quote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "coverType" TEXT NOT NULL,
    "hospitalCover" TEXT NOT NULL,
    "extraCover" TEXT NOT NULL,
    "paymentFrequency" TEXT NOT NULL,
    "annualDiscout" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Quote" ("annualDiscout", "coverType", "createdAt", "extraCover", "hospitalCover", "id", "notes", "paymentFrequency", "updatedAt") SELECT "annualDiscout", "coverType", "createdAt", "extraCover", "hospitalCover", "id", "notes", "paymentFrequency", "updatedAt" FROM "Quote";
DROP TABLE "Quote";
ALTER TABLE "new_Quote" RENAME TO "Quote";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
