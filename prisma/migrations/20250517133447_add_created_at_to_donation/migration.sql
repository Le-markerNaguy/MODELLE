-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Donation" (
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
INSERT INTO "new_Donation" ("amount", "fullName", "id", "message", "moyenPaiement", "phone", "receiptNeeded", "ville") SELECT "amount", "fullName", "id", "message", "moyenPaiement", "phone", "receiptNeeded", "ville" FROM "Donation";
DROP TABLE "Donation";
ALTER TABLE "new_Donation" RENAME TO "Donation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
