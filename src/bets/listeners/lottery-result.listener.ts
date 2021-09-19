import { Lottery } from ".prisma/client";
import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { BetsService } from "../bets.service";
import { getBetAward } from "../helpers/award.helper";

@Injectable()
export class LotteryResultListener {
  private readonly logger = new Logger(LotteryResultListener.name);

  constructor(private betsService: BetsService) {}

  @OnEvent("lottery.result.updated")
  async handleLotteryResultUpdated(payload: Lottery) {
    this.logger.debug({ lottery: payload });

    // get all lottery bets
    const bets = await this.betsService.findAllByLotteryId(payload.id);

    for (const bet of bets) {
      // calculate and update bet award
      const award = getBetAward({
        pick: bet.pick,
        result: payload.result,
        mode: payload.mode,
        target: bet.target,
        type: payload.type,
        upDown: bet.upDown,
      });

      await this.betsService.update(bet.id, { id: bet.id, award });
    }
  }
}
