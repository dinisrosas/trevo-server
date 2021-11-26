import { Module } from "@nestjs/common";
import { GamesService } from "./games.service";
import { GamesResolver } from "./games.resolver";
import { PrismaService } from "src/prisma/prisma.service";
import { FetchGameResultTask } from "./tasks/fetch-result.task";

@Module({
  providers: [
    GamesResolver,
    GamesService,
    PrismaService,
    FetchGameResultTask,
  ],
  exports: [GamesService],
})
export class GamesModule {}
