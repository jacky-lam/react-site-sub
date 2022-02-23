import { Ticker } from 'common/model/Ticker';
import TradeDirection from 'common/model/TradeDirection';

type PortfolioTradeStatus = 'COMPLETE' | 'PENDING' | 'CANCELLED'; // more to be added

type PortfolioTrade = {
    id: number;
    ticker: Ticker;
    direction: TradeDirection;
    unit: number;
    baseCurrencyCode: string;
    baseCurrencyAtPrice: number;
    portfolioBaseCurrencyCode: string;
    portfolioBaseCurrencyAtPrice: number;
    baseToPortfolioBaseFxRate: number;
    settlementDate: string; // YYYY-MM-DD
    status: PortfolioTradeStatus;
};

export default PortfolioTrade;
export type { PortfolioTradeStatus };
