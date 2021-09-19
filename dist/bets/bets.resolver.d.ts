import { BetsService } from "./bets.service";
import { UpdateBetInput } from "./dto/update-bet.input";
export declare class BetsResolver {
    private readonly betsService;
    constructor(betsService: BetsService);
    findAll(): Promise<import(".prisma/client").Bet[]>;
    findOne(id: string): Promise<import(".prisma/client").Bet>;
    updateBet(updateBetInput: UpdateBetInput): Promise<import(".prisma/client").Bet>;
    removeBet(id: string): Promise<import(".prisma/client").Bet>;
}
