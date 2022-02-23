import type { Ticker } from 'common/model/Ticker';
import type TradeDirection from 'common/model/TradeDirection';

export const getBlankPortfolioBasket = (
    baseCurrencyCode: string,
): PortfolioBasket => {
    return {
        baseCurrencyCode: baseCurrencyCode,
        basketItems: [],
    };
};

type PortfolioBasket = {
    baseCurrencyCode: string;
    basketItems: Array<PortfolioBasketItem>;
};

type PortfolioBasketItem = {
    id?: number; // only set by backend. when created by frontend it will be undefined
    ticker: Ticker; // Fund
    direction: TradeDirection;
    unit: number;
    baseCurrencyCode: string;
    atPrice: number;
};

// used for writing back to API
export type RequestPortfolioBasketItem = {
    id?: number;
    tickerId: number; // FundId
    direction: TradeDirection;
    unit: number;
    baseCurrencyCode: string;
    atPrice: number;
};

export default PortfolioBasket;
export type { PortfolioBasketItem };
