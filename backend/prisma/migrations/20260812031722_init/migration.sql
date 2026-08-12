-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "coverType" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "hospitalCoverHistory" TEXT NOT NULL,
    "hospitalCover" TEXT NOT NULL,
    "extraCover" TEXT NOT NULL,
    "paymentFrequency" TEXT NOT NULL,
    "annualDiscout" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
