import { PrismaService } from "src/prisma/prisma.service";
import { CreateLotteryInput } from "./dto/create-lottery.input";
import { UpdateLotteryInput } from "./dto/update-lottery.input";
export declare class LotteriesService {
    private prisma;
    private readonly lotteries;
    constructor(prisma: PrismaService);
    create(createLotteryInput: CreateLotteryInput): import(".prisma/client").Prisma.Prisma__LotteryClient<import(".prisma/client").Lottery>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Lottery[]>;
    findOne(id: number): string;
    update(id: number, updateLotteryInput: UpdateLotteryInput): string;
    remove(id: number): string;
}
