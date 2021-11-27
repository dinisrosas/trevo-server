import { BetsService } from 'src/bets/bets.service';
import { GamesService } from 'src/games/games.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBetbookInput } from './dto/create-betbook.input';
import { FindAllArgs } from './dto/generics.args';
import { UpdateBetbookInput } from './dto/update-betbook.input';
import { Betbook, BetbookConnection } from './entities/betbook.entity';
export declare class BetbooksService {
    private prisma;
    private betsService;
    private gamesService;
    constructor(prisma: PrismaService, betsService: BetsService, gamesService: GamesService);
    create(createBetbookInput: CreateBetbookInput & {
        sellerId: string;
    }): Promise<Betbook>;
    findAllBySeller(sellerId: string, args: FindAllArgs): Promise<BetbookConnection>;
    findOne(id: string): Promise<Betbook>;
    update(id: string, updateBetbookInput: UpdateBetbookInput): Promise<Betbook>;
    delete(id: string): Promise<Betbook>;
}
