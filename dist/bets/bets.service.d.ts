import { Bet } from "@prisma/client";
import { LotteriesService } from "src/lotteries/lotteries.service";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBetInput } from "./dto/create-bet.input";
import { UpdateBetInput } from "./dto/update-bet.input";
export declare class BetsService {
    private prisma;
    private lotteriesService;
    constructor(prisma: PrismaService, lotteriesService: LotteriesService);
    create(createBetInput: Omit<CreateBetInput, "lottery"> & {
        lotteryId: string;
        betbookId: string;
    }): Promise<Bet>;
    findAll(): Promise<Bet[]>;
    findAllByLotteryId(lotteryId: string): Promise<Bet[]>;
    findAllByBetbookId(betbookId: string): Promise<Bet[]>;
    getBetbookTotalAmount(betbookId: string): Promise<number>;
    findOne(id: string): Promise<Bet>;
    update(id: string, updateBetInput: UpdateBetInput): Promise<Bet>;
    remove(id: string): Promise<Bet>;
}
