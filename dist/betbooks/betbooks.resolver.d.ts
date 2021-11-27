import { AuthUser } from 'src/types';
import { BetbooksService } from './betbooks.service';
import { CreateBetbookInput } from './dto/create-betbook.input';
import { FindAllArgs } from './dto/generics.args';
import { UpdateBetbookInput } from './dto/update-betbook.input';
import { Betbook, BetbookConnection } from './entities/betbook.entity';
export declare class BetbooksResolver {
    private readonly betbooksService;
    constructor(betbooksService: BetbooksService);
    createBetbook(user: AuthUser, input: CreateBetbookInput): Promise<Betbook>;
    findAll(user: AuthUser, args: FindAllArgs): Promise<BetbookConnection>;
    findOne(id: string): Promise<Betbook>;
    updateBetbook(input: UpdateBetbookInput): Promise<Betbook>;
    deleteBetbook(id: string): Promise<Betbook>;
}
