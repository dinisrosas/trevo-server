import { Lottery } from ".prisma/client";
import { BetsService } from "../bets.service";
export declare class LotteryResultListener {
    private betsService;
    private readonly logger;
    constructor(betsService: BetsService);
    handleLotteryResultUpdated(payload: Lottery): Promise<void>;
}
