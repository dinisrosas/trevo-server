import { EventEmitter2 } from "eventemitter2";
import { PrismaService } from "src/prisma/prisma.service";
import { LotteryType } from "src/types";
import { CreateLotteryInput } from "./dto/create-lottery.input";
import { UpdateLotteryInput } from "./dto/update-lottery.input";
import { Lottery, LotteryConnection } from "./entities/lottery.entity";
import { OncomingLottery } from "./entities/oncoming-lottery.entity";
export declare class LotteriesService {
    private prisma;
    private eventEmitter;
    constructor(prisma: PrismaService, eventEmitter: EventEmitter2);
    create(createLotteryInput: CreateLotteryInput): Promise<Lottery>;
    findOrCreate(createLotteryInput: CreateLotteryInput): Promise<Lottery>;
    findAll(): Promise<Lottery[]>;
    findOneById(id: string): Promise<Lottery>;
    findAllBySeller(sellerId: string, date?: string, finished?: boolean, after?: string, first?: number): Promise<LotteryConnection>;
    findOneByTypeIsoDate(type: LotteryType, isoDate: string): Promise<Lottery>;
    findOncoming(): OncomingLottery[];
    findRecentActiveLotteries(): Promise<Lottery[]>;
    update(id: string, updateLotteryInput: UpdateLotteryInput): Promise<Lottery>;
    updateResult(id: string, result: string): Promise<Lottery>;
    remove(id: string): Promise<Lottery>;
}
