/*
  Warnings:

  - Added the required column `totalAmount` to the `betbooks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "betbooks" ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL;
