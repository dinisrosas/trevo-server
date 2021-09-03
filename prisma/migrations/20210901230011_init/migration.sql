-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SELLER', 'ADMIN');

-- CreateEnum
CREATE TYPE "LotteryType" AS ENUM ('EM', 'TL', 'M1', 'LC', 'LP', 'JE');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT E'SELLER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "betbooks" (
    "id" SERIAL NOT NULL,
    "bettor" TEXT NOT NULL,
    "seller_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bets" (
    "id" SERIAL NOT NULL,
    "target" DOUBLE PRECISION NOT NULL,
    "pick" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "award" DOUBLE PRECISION,
    "up_down" BOOLEAN,
    "betbook_id" INTEGER NOT NULL,
    "lottery_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lotteries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "LotteryType" NOT NULL,
    "result" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "iso_date" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.username_unique" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "lottery_identifier" ON "lotteries"("type", "iso_date");

-- AddForeignKey
ALTER TABLE "betbooks" ADD FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bets" ADD FOREIGN KEY ("betbook_id") REFERENCES "betbooks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bets" ADD FOREIGN KEY ("lottery_id") REFERENCES "lotteries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
