import { CreateLotteryInput } from "src/lotteries/dto/create-lottery.input";
export declare class CreateBetInput {
    pick: string;
    target: number;
    updown?: boolean;
    ball?: number;
    lottery: CreateLotteryInput;
}
