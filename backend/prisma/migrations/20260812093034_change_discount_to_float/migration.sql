/*
  Warnings:

  - You are about to alter the column `annualDiscout` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

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
    "annualDiscout" REAL NOT NULL DEFAULT 0,
    "notes" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Quote" ("annualDiscout", "coverType", "createdAt", "customerName", "extraCover", "hospitalCover", "id", "notes", "paymentFrequency", "updatedAt") SELECT "annualDiscout", "coverType", "createdAt", "customerName", "extraCover", "hospitalCover", "id", "notes", "paymentFrequency", "updatedAt" FROM "Quote";
DROP TABLE "Quote";
ALTER TABLE "new_Quote" RENAME TO "Quote";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
