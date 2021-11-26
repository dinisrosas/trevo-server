import { Game } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { BetsService } from "../bets.service";
import { getBetAward } from "../helpers/award.helper";

@Injectable()
export class GameResultListener {
  // private readonly logger = new Logger(GameResultListener.name);

  constructor(private betsService: BetsService) {}

  @OnEvent("game.result.updated")
  async handleGameResultUpdated(payload: Game): Promise<void> {
    // get all game bets
    const bets = await this.betsService.findAllByGameId(payload.id);

    for (const bet of bets) {
      const award = getBetAward({
        pick: bet.pick,
        result: payload.result,
        mode: payload.mode,
        target: bet.target,
        type: payload.type,
        ball: bet.ball,
        amount: bet.amount,
        updown: bet.updown,
      });

      await this.betsService.update(bet.id, { id: bet.id, award });
    }
  }
}
