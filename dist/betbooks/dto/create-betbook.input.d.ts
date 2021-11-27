import { CreateBetInput } from 'src/bets/dto/create-bet.input';
export declare class CreateBetbookInput {
    bettor: string;
    fixed: boolean;
    bets: CreateBetInput[];
}
