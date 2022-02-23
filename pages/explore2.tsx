import React from 'react';
import { NextPage, NextPageContext } from 'next';

import { pageAuthentication } from 'common/auth/authenticationUtils';
import SearchApi from 'common/api/SearchApi';
import { Stock } from 'common/model/Ticker';
import PortfolioApi from 'common/api/PortfolioApi';
import Portfolio, { getBlankPortfolio } from 'common/model/Portfolio';
import { PortfolioBasketContextProvider } from 'common/context/PortfolioBasketContext';
import PortfolioBasket, {
    getBlankPortfolioBasket,
} from 'common/model/PortfolioBasket';

import ExplorePage, {
    ExplorePageProps,
} from 'components/pageviews/explorepage2';

const getSelectedStocks = async (
    tickerIds: number[],
): Promise<Stock[] | null> => {
    const response = await SearchApi.getStockByIds({ tickerIds });
    if (response) {
        return response.stocks;
    }
    return null;
};

type ExplorePageServerProps = {
    pageProps: ExplorePageProps;
    portfolioBasket: PortfolioBasket;
};

const ExplorePageServer: NextPage<ExplorePageServerProps> = ({
    pageProps,
    portfolioBasket,
}) => {
    return (
        <PortfolioBasketContextProvider defaultValue={portfolioBasket}>
            <ExplorePage {...pageProps} />
        </PortfolioBasketContextProvider>
    );
};

ExplorePageServer.getInitialProps = async (ctx: NextPageContext) => {
    console.log('Running ExplorePageServer.getInitialProps...');

    pageAuthentication(ctx);

    // get user portfolio
    let currentPortfolio: Portfolio = getBlankPortfolio('PORTFOLIO');
    const response = await PortfolioApi.getUserPortfolio('DETAIL');
    if (response != null) currentPortfolio = response.portfolio;

    // setup basket - selected funds (TODO: should load what was last selected from DB)
    let initialPortfolioBasket: PortfolioBasket = getBlankPortfolioBasket(
        currentPortfolio.baseCurrencyCode,
    );
    const portfolioBasketResponse = await PortfolioApi.getUserPortfolioBasket(
        'DETAIL',
    );
    if (
        portfolioBasketResponse.response &&
        portfolioBasketResponse.response.portfolioBasket
    ) {
        initialPortfolioBasket =
            portfolioBasketResponse.response.portfolioBasket;
    } else if (portfolioBasketResponse.error) {
        console.log(
            'Failed to load portfolio-basket from server-side:',
            portfolioBasketResponse.error,
        );
    }

    // selected stocks - should load from DB
    let selectedStocks: Stock[] = [];
    if (ctx.query?.stocks) {
        const selectedTickerIds: string[] =
            ctx.query?.stocks instanceof Array
                ? ctx.query?.stocks
                : [ctx.query?.stocks];

        if (selectedTickerIds.length > 0) {
            const stocks = await getSelectedStocks(
                selectedTickerIds.map((x) => Number(x)),
            );
            selectedStocks = stocks ?? selectedStocks;
        }
    }

    return {
        pageProps: {
            filterSelectedStocks: selectedStocks,
        },
        portfolioBasket: initialPortfolioBasket,
    };
};

export default ExplorePageServer;
