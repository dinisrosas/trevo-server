// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum UserRole {
  SELLER
  ADMIN
}

enum LotteryType {
  EM
  TL
  M1
  LC
  LP
  JE
}

model User {
  id       Int    @id @default(autoincrement())
  name     String
  username String @unique
  password String

  betbooks Betbook[]

  role UserRole @default(SELLER)

  created_at DateTime @default(now())
  updated_at DateTime @default(now())

  @@map("users")
}

model Betbook {
  id     Int    @id @default(autoincrement())
  bettor String

  seller    User @relation(fields: [seller_id], references: [id])
  seller_id Int

  bets Bet[]

  created_at DateTime @default(now())
  updated_at DateTime @default(now())

  @@map("betbooks")
}

model Bet {
  id Int @id @default(autoincrement())

  target Float
  pick   String
  amount Float
  award  Float?

  up_down Boolean?

  betbook    Betbook @relation(fields: [betbook_id], references: [id])
  betbook_id Int

  lottery    Lottery @relation(fields: [lottery_id], references: [id])
  lottery_id Int

  created_at DateTime @default(now())
  updated_at DateTime @default(now())

  @@map("bets")
}

model Lottery {
  id Int @id @default(autoincrement())

  name   String
  type   LotteryType
  result String?

  date     DateTime
  iso_date String

  bets Bet[]

  created_at DateTime @default(now())
  updated_at DateTime @default(now())

  @@unique([type, iso_date], name: "lottery_identifier")
  @@map("lotteries")
}
