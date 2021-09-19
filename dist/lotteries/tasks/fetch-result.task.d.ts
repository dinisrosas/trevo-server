import { LotteriesService } from "../lotteries.service";
export declare class FetchLotteryResultTask {
    private lotteriesService;
    constructor(lotteriesService: LotteriesService);
    fetchAndUpdateLotteryResult(): Promise<void>;
}
