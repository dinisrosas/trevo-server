import { GameMode, GameType } from ".prisma/client";
export declare type GetBetAward = {
    type: GameType;
    mode: GameMode;
    target: number;
    pick: string;
    ball?: number;
    updown?: boolean;
    result: string;
    amount: number;
};
export declare type GetDrawAward = Omit<GetBetAward, "type" | "mode" | "amount">;
export declare type GetGameAward = Omit<GetBetAward, "ball" | "updown" | "mode">;
export declare type GetDrawnTickets = Pick<GetBetAward, "type" | "result">;
export declare function getBetAward(params: GetBetAward): number;
