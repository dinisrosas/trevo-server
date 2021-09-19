import { AuthUser, LotteryType } from "src/types";
import { CreateLotteryInput } from "./dto/create-lottery.input";
import { UpdateLotteryInput } from "./dto/update-lottery.input";
import { LotteryResult } from "./entities/lottery-result.entity";
import { Lottery } from "./entities/lottery.entity";
import { OncomingLottery } from "./entities/oncoming-lottery.entity";
import { LotteriesService } from "./lotteries.service";
export declare class LotteriesResolver {
    private readonly lotteriesService;
    constructor(lotteriesService: LotteriesService);
    createLottery(createLotteryInput: CreateLotteryInput): Promise<Lottery>;
    findAll(): Promise<Lottery[]>;
    findOncomingLotteries(): OncomingLottery[];
    findFinished(user: AuthUser): Promise<Lottery[]>;
    findOneByTypeIsoDate(type: LotteryType, isoDate: string): Promise<Lottery>;
    findLastestResultByType(type: LotteryType): Promise<LotteryResult>;
    updateLottery(updateLotteryInput: UpdateLotteryInput): Promise<Lottery>;
    removeLottery(id: string): Promise<Lottery>;
}
