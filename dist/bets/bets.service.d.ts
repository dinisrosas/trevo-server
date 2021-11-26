import { Bet } from "@prisma/client";
import { GamesService } from "src/games/games.service";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBetInput } from "./dto/create-bet.input";
import { UpdateBetInput } from "./dto/update-bet.input";
export declare class BetsService {
    private prisma;
    private gamesService;
    constructor(prisma: PrismaService, gamesService: GamesService);
    create(data: Omit<CreateBetInput, "game"> & {
        gameId: string;
        betbookId: string;
    }): Promise<Bet>;
    findAll(): Promise<Bet[]>;
    findAllByGameId(gameId: string): Promise<Bet[]>;
    findAllByBetbookId(betbookId: string): Promise<Bet[]>;
    getBetbookTotalAmount(betbookId: string): Promise<number>;
    findOne(id: string): Promise<Bet>;
    update(id: string, data: UpdateBetInput): Promise<Bet>;
    delete(id: string): Promise<Bet>;
}
