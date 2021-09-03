import { LotteriesService } from "./lotteries.service";
import { CreateLotteryInput } from "./dto/create-lottery.input";
import { UpdateLotteryInput } from "./dto/update-lottery.input";
export declare class LotteriesResolver {
    private readonly lotteriesService;
    constructor(lotteriesService: LotteriesService);
    createLottery(createLotteryInput: CreateLotteryInput): import(".prisma/client").Prisma.Prisma__LotteryClient<import(".prisma/client").Lottery>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Lottery[]>;
    findOne(id: number): string;
    updateLottery(updateLotteryInput: UpdateLotteryInput): string;
    removeLottery(id: number): string;
}
