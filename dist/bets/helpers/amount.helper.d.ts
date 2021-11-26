import { GameMode } from ".prisma/client";
declare type CalculateBetAmount = {
    mode: GameMode;
    pick: string;
    target: number;
    updown?: boolean;
};
export declare function getBetAmount({ mode, pick, target, updown, }: CalculateBetAmount): number;
export {};
