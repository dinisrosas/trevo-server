import { getBetAward } from "./award.helper";

describe("getBetAward", () => {
  it("expect LC pick 762 2nd prize award with target 750 to be 125", () => {
    const amount = getBetAward({
      amount: 1.5,
      mode: "LOTTERY",
      result: "52246;43762;51887",
      type: "LC",
      pick: "762",
      target: 750,
    });

    expect(amount).toBe(125);
  });
});
