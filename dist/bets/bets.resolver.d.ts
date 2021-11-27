import { BetsService } from './bets.service';
import { UpdateBetInput } from './dto/update-bet.input';
import { Bet } from './entities/bet.entity';
export declare class BetsResolver {
    private readonly betsService;
    constructor(betsService: BetsService);
    findAll(): Promise<Bet[]>;
    findOne(id: string): Promise<Bet>;
    updateBet(input: UpdateBetInput): Promise<Bet>;
    deleteBet(id: string): Promise<Bet>;
}
