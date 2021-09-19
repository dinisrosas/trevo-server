"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBetAmount = void 0;
const ODDS = {
    DRAW: [35, 30],
    LOTTERY: [500, 40],
};
function getBetAmount({ mode, pick, target, upDown, }) {
    switch (mode) {
        case "DRAW":
            if (upDown) {
                return target / ODDS[mode][1];
            }
            else {
                return target / ODDS[mode][0];
            }
        case "LOTTERY":
            if (pick.length === 2) {
                return target / ODDS[mode][1];
            }
            else if (pick.length === 3) {
                return target / ODDS[mode][0];
            }
            throw new Error("Invalid bet pick");
        default:
            throw new Error("Invalid lottery mode");
    }
}
exports.getBetAmount = getBetAmount;
//# sourceMappingURL=amount.helper.js.map