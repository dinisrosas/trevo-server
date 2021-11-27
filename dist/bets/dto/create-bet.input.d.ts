import { CreateGameInput } from 'src/games/dto/create-game.input';
export declare class CreateBetInput {
    pick: string;
    target: number;
    updown?: boolean;
    ball?: number;
    game: CreateGameInput;
}
