/*
  Warnings:

  - You are about to drop the `Atronaut` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Atronaut";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Astronaut" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "superpower" TEXT NOT NULL
);
