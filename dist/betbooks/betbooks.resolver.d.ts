import { AuthUser } from "src/types";
import { BetbooksService } from "./betbooks.service";
import { CreateBetbookInput } from "./dto/create-betbook.input";
import { QueryBetbooksInput } from "./dto/query-betbook.input";
import { UpdateBetbookInput } from "./dto/update-betbook.input";
import { Betbook } from "./entities/betbook.entity";
export declare class BetbooksResolver {
    private readonly betbooksService;
    constructor(betbooksService: BetbooksService);
    createBetbook(user: AuthUser, createBetbookInput: CreateBetbookInput): Promise<Betbook>;
    findAll(user: AuthUser, query?: QueryBetbooksInput): Promise<Betbook[]>;
    findOne(id: string): Promise<Betbook>;
    updateBetbook(updateBetbookInput: UpdateBetbookInput): Promise<Betbook>;
    deleteBetbook(id: string): Promise<Betbook>;
}
