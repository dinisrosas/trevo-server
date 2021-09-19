import { BetsService } from "src/bets/bets.service";
import { LotteriesService } from "src/lotteries/lotteries.service";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBetbookInput } from "./dto/create-betbook.input";
import { UpdateBetbookInput } from "./dto/update-betbook.input";
import { Betbook } from "./entities/betbook.entity";
export declare class BetbooksService {
    private prisma;
    private betsService;
    private lotteriesService;
    constructor(prisma: PrismaService, betsService: BetsService, lotteriesService: LotteriesService);
    create(createBetbookInput: CreateBetbookInput & {
        sellerId: string;
    }): Promise<Betbook>;
    findAllBySeller(sellerId: string): Promise<Betbook[]>;
    findOne(id: string): Promise<Betbook>;
    update(id: string, updateBetbookInput: UpdateBetbookInput): Promise<Betbook>;
    remove(id: string): Promise<Betbook>;
}
