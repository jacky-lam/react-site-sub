import type { Ticker } from 'common/model/Ticker';

export const getBlankPortfolio = (portfolioType: PortfolioType): Portfolio => {
    return {
        id: 0,
        type: portfolioType,
        name: '',
        baseCurrencyCode: 'USD',
        bookHoldings: [],
    };
};

type PortfolioType = 'PORTFOLIO' | 'BASKET' | 'WATCHLIST';

type Portfolio = {
    id: number;
    type: PortfolioType;
    name: string;
    baseCurrencyCode: string;
    bookHoldings: Array<PortfolioBookHolding>;
};

type PortfolioBookHolding = {
    ticker: Ticker; // Fund
    portfolioBaseCurrencyCode: string;
    totalUnit: number;
    avgPricePerUnit: number;
    totalBookValue: number;
    latestSettlementDate: string; // yyyy-mm-dd
};

export default Portfolio;
export type { PortfolioBookHolding };
