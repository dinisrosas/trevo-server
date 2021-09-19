/*
  Warnings:

  - The primary key for the `betbooks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `bets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `lotteries` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "betbooks" DROP CONSTRAINT "betbooks_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "bets" DROP CONSTRAINT "bets_betbook_id_fkey";

-- DropForeignKey
ALTER TABLE "bets" DROP CONSTRAINT "bets_lottery_id_fkey";

-- AlterTable
ALTER TABLE "betbooks" DROP CONSTRAINT "betbooks_pkey",
ADD COLUMN     "sid" SERIAL NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "seller_id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "betbooks_id_seq";

-- AlterTable
ALTER TABLE "bets" DROP CONSTRAINT "bets_pkey",
ADD COLUMN     "sid" SERIAL NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "betbook_id" SET DATA TYPE TEXT,
ALTER COLUMN "lottery_id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "bets_id_seq";

-- AlterTable
ALTER TABLE "lotteries" DROP CONSTRAINT "lotteries_pkey",
ADD COLUMN     "sid" SERIAL NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "lotteries_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ADD COLUMN     "sid" SERIAL NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AddForeignKey
ALTER TABLE "betbooks" ADD FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bets" ADD FOREIGN KEY ("betbook_id") REFERENCES "betbooks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bets" ADD FOREIGN KEY ("lottery_id") REFERENCES "lotteries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
