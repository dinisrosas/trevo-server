/*
  Warnings:

  - Added the required column `mode` to the `lotteries` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LotteryMode" AS ENUM ('DRAW', 'LOTTERY');

-- AlterTable
ALTER TABLE "lotteries" ADD COLUMN     "mode" "LotteryMode" NOT NULL;
