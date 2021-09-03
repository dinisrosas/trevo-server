import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class LotteryTasksSerivce {
  private readonly logger = new Logger(LotteryTasksSerivce.name);

  // @Cron("20 * * * * *")
  // handleCron() {
  //   this.logger.debug("Called when the second is 45");
  // }
}
