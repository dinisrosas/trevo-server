import { Injectable, NotAcceptableException } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { getLatestLotteryResult } from "../helpers/result.helper";
import { LotteriesService } from "../lotteries.service";

@Injectable()
export class FetchLotteryResultTask {
  constructor(private lotteriesService: LotteriesService) {}

  @Cron("0 22 * * 1-3,5,6")
  @Cron("30 14 * * 4")
  async fetchAndUpdateLotteryResult(): Promise<void> {
    // get today's lotteries
    const activeLotteries =
      await this.lotteriesService.findRecentActiveLotteries();

    for (const lottery of activeLotteries) {
      const { result, isoDate } = await getLatestLotteryResult(lottery.type);

      // result date validation !!
      if (lottery.isoDate !== isoDate) {
        throw new NotAcceptableException(
          "The date of the lottery and the date of the result fetched do not match"
        );
      }

      await this.lotteriesService.updateResult(lottery.id, result);
    }
  }
}
