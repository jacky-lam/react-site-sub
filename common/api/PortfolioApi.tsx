import { AxiosRequestConfig, AxiosResponse } from 'axios';

import request from 'common/request';
import { dateToString } from 'common/date/dateformatter';
import Portfolio from 'common/model/Portfolio';
import PortfolioBasket, {
    PortfolioBasketItem,
    RequestPortfolioBasketItem,
} from 'common/model/PortfolioBasket';
import PortfolioTrade, {
    PortfolioTradeStatus,
} from 'common/model/PortfolioTrade';

import BaseApi from './BaseApi';
import { BasicError } from './model/Error';

type TickerDataLevel = 'ID' | 'FINANCE' | 'DETAIL';

export type GetUserPortfolio = {
    portfolio: Portfolio;
};

export type GetTransactionHistory = {
    filters: {
        paginationOffset: number;
        paginationLimit: number;
        startDate: string; // yyyy-mm-dd
        endDate: string; // yyyy-mm-dd
        tickerIds: number[];
    };
    results: PortfolioTrade[];
    totalUnpaginatedResults: number;
};

/**
 * Portfolio API
 */
class PortfolioApi extends BaseApi {
    /**
     * Portfolio related methods
     */
    // Get user's portfolio
    getUserPortfolio = async (
        tickerDataLevel: TickerDataLevel,
    ): Promise<GetUserPortfolio | null> => {
        try {
            let config: AxiosRequestConfig = {};
            config.headers = this.getHeader();
            config.params = {
                tickerDataLevel: tickerDataLevel,
            };
            config.paramsSerializer = this.paramsSerializer;

            let response = await request.get(
                this.invesmentApi + '/portfolio/user-portfolio',
                config,
            );

            if (response.status != 200) {
                return null;
            } else {
                return response.data;
            }
        } catch (err) {
            this.info('Failed getUserPortfolio', err);
        }
        return null;
    };

    /**
     * Transaction related methods
     */
    getTransactionHistory = async (
        paginationOffset?: number,
        paginationLimit?: number,
        startDate?: string,
        endDate?: string,
        statuses?: PortfolioTradeStatus[],
        tickerIds?: number[],
    ): Promise<GetTransactionHistory | null> => {
        try {
            let params: any = {};
            if (paginationOffset) params.paginationOffset = paginationOffset;
            if (paginationLimit) params.paginationLimit = paginationLimit;
            if (startDate) params.startDate = startDate;
            if (endDate) params.endDate = endDate;
            if (statuses) params.statuses = statuses.toString();
            if (tickerIds) params.tickerIds = tickerIds.toString();

            let config: AxiosRequestConfig = {};
            config.headers = this.getHeader();
            config.params = params;
            config.paramsSerializer = this.paramsSerializer;

            let response = await request.get(
                this.invesmentApi + '/portfolio/transactionhistory',
                config,
            );

            if (response.status == 200) {
                return {
                    filters: response.data.filters,
                    results: response.data.results,
                    totalUnpaginatedResults:
                        response.data.totalUnpaginatedResults,
                };
            } else {
                this.info(
                    'Failed getTransactionHistory - statusCode:' +
                        response.status,
                );
            }
        } catch (err) {
            this.info('Failed getTransactionHistory', err);
        }
        return null;
    };

    /**
     * PortfolioBasket method
     */

    // Get user's portfolio
    getUserPortfolioBasket = async (
        tickerDataLevel: TickerDataLevel,
    ): Promise<{ response?: any; error?: BasicError }> => {
        try {
            let config: AxiosRequestConfig = {};
            config.headers = this.getHeader();
            config.params = {
                tickerDataLevel: tickerDataLevel,
            };
            config.paramsSerializer = this.paramsSerializer;

            let response = await request.get(
                this.invesmentApi + '/portfolio/user-portfoliobasket',
                config,
            );

            if (response.status != 200) {
                this.error(
                    `Failed getUserPortfolioBasket. Status code is not 200 (status: ${response.status}`,
                );
                return { error: { code: 'LOADBASKET_FAILED' } };
            } else {
                return { response: response.data };
            }
        } catch (err) {
            this.info('Failed getUserPortfolioBasket', err);
            return { error: { code: 'LOADBASKET_FAILED' } };
        }
    };

    // Place order for portfolio-basket
    orderPortfolioBasket = async (
        portfolioBasket: PortfolioBasket,
        onSuccessFunc: (response: AxiosResponse) => void,
        onFailFunc: (response: AxiosResponse) => void,
    ): Promise<AxiosResponse | null> => {
        // setup config
        const config: AxiosRequestConfig = {
            headers: this.getHeader(),
        };

        // setup data
        const baseCurrencyCode = portfolioBasket.baseCurrencyCode;
        const settlementDate = dateToString(new Date());
        const direction = 'BUY';
        const basketItems: RequestPortfolioBasketItem[] = portfolioBasket.basketItems.map(
            (item) => ({
                unit: item.unit,
                atPrice: item.atPrice,
                tickerId: item.ticker.tickerId,
                settlementDate: settlementDate,
                baseCurrencyCode: baseCurrencyCode,
                direction: direction,
            }),
        );

        // TODO: in future, i should just need to call this function (i dont need ot pass in basket-items individually; should be on BE already)
        try {
            let response = await request.post(
                this.invesmentApi + '/portfolio/orderportfoliobasket',
                {
                    portfolioBasket: {
                        basketItems: basketItems,
                    },
                },
                config,
            );
            if (response.status != 200) {
                onFailFunc(response);
            } else {
                onSuccessFunc(response);
            }
            return response;
        } catch (err) {
            this.info('Failed orderPortfolioBasket', err);
        }
        return null;
    };

    addPortfolioBasketItems = async (
        portfolioBasketItems: PortfolioBasketItem[],
    ): Promise<{ response?: AxiosResponse; error?: BasicError }> => {
        // setup config
        const config: AxiosRequestConfig = {
            headers: this.getHeader(),
        };

        const basketItems: RequestPortfolioBasketItem[] = portfolioBasketItems.map(
            (x) => {
                const { ticker, ...remaining } = x;
                return {
                    ...remaining,
                    tickerId: ticker.tickerId,
                    settlementDate: new Date(),
                };
            },
        );

        try {
            let response = await request.post(
                this.invesmentApi + '/portfolio/add-portfolio-basket-items',
                {
                    basketItems,
                },
                config,
            );
            return { response };
        } catch (err) {
            this.error('Failed addPortfolioBasketItems', err);
            return {
                error: {
                    code: 'ADDPORTFOLIOBASKETITEMS_FAILED',
                },
            };
        }
    };

    removePortfolioBasketItemByIds = async (
        portfolioBasketItemIds: number[],
    ): Promise<{ response?: AxiosResponse; error?: BasicError }> => {
        // setup config
        const config: AxiosRequestConfig = {
            headers: this.getHeader(),
        };

        try {
            let response = await request.post(
                this.invesmentApi + '/portfolio/remove-portfolio-basket-items',
                {
                    portfolioBasketItemIds,
                },
                config,
            );
            return { response };
        } catch (err) {
            this.error('Failed removePortfolioBasketItemByIds', err);
            return {
                error: {
                    code: 'REMOVEPORTFOLIOBASKETITEMS_FAILED',
                },
            };
        }
    };

    // TODO - remove items from portfolio - SELL transaction only
}

export default new PortfolioApi(); //singleton
