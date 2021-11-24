import { AuthUser, LotteryType } from "src/types";
import { CreateLotteryInput } from "./dto/create-lottery.input";
import { UpdateLotteryInput } from "./dto/update-lottery.input";
import { LotteryResult } from "./entities/lottery-result.entity";
import { Lottery, LotteryConnection } from "./entities/lottery.entity";
import { OncomingLottery } from "./entities/oncoming-lottery.entity";
import { LotteriesService } from "./lotteries.service";
export declare class LotteriesResolver {
    private readonly lotteriesService;
    constructor(lotteriesService: LotteriesService);
    createLottery(createLotteryInput: CreateLotteryInput): Promise<Lottery>;
    findOncomingLotteries(): OncomingLottery[];
    findAllBySeller(user: AuthUser, date?: string, finished?: boolean, after?: string, first?: number): Promise<LotteryConnection>;
    findOne(id: string): Promise<Lottery>;
    findLastestResultByType(type: LotteryType): Promise<LotteryResult>;
    updateLottery(updateLotteryInput: UpdateLotteryInput): Promise<Lottery>;
    updateLotteryResult(id: string, result: string): Promise<Lottery>;
    removeLottery(id: string): Promise<Lottery>;
}
