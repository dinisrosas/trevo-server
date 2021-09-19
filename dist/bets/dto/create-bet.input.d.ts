import { CreateLotteryInput } from "src/lotteries/dto/create-lottery.input";
export declare class CreateBetInput {
    pick: string;
    target: number;
    upDown?: boolean;
    lottery: CreateLotteryInput;
}
