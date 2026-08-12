/*
  Warnings:

  - Added the required column `customerName` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Quote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerName" TEXT NOT NULL,
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
