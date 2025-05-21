-- CreateTable
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "moyenPaiement" TEXT NOT NULL,
    "message" TEXT,
    "receiptNeeded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
