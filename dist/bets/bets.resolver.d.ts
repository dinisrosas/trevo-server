import { BetsService } from "./bets.service";
import { UpdateBetInput } from "./dto/update-bet.input";
import { Bet } from "./entities/bet.entity";
export declare class BetsResolver {
    private readonly betsService;
    constructor(betsService: BetsService);
    findAll(): Promise<Bet[]>;
    findOne(id: string): Promise<Bet>;
    updateBet(updateBetInput: UpdateBetInput): Promise<Bet>;
    removeBet(id: string): Promise<Bet>;
}
