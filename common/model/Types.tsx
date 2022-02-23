import { Ticker } from 'common/model/Ticker';

export type ReturnTypes = '1Y' | '3Y' | '5Y' | '10Y';

export const getTickerReturnValue = (
    ticker: Ticker,
    displayState: ReturnTypes,
): any | null => {
    let returnVaue = null;
    if (ticker.latestTrailingReturns) {
        switch (displayState) {
            case '1Y':
                returnVaue =
                    ticker.latestTrailingReturns['latest_trailing_returns_y1'];
                break;
            case '3Y':
                returnVaue =
                    ticker.latestTrailingReturns['latest_trailing_returns_y3'];
                break;
            case '5Y':
                returnVaue =
                    ticker.latestTrailingReturns['latest_trailing_returns_y5'];
                break;
            case '10Y':
                returnVaue =
                    ticker.latestTrailingReturns['latest_trailing_returns_y10'];
                break;
        }
    }
    return returnVaue;
};
