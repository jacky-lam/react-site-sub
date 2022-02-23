import React, { useEffect, useState } from 'react';
import { css } from 'emotion';

import theme from 'common/theme';
import { Stock, Ticker } from 'common/model/Ticker';
import SearchApi from 'common/api/SearchApi';

import PageLayout from 'components/pageviews/pagelayout';
import Clickable from 'components/clickable';
import FundList from 'components/fundlist';

import ExplorePageHeader from './ExplorePageHeader';
import ExplorePageNextButton from './ExplorePageNextButton';

const pageStyle = css`
    width: 100%;
    max-width: ${theme.pagelayout.maxPageWidth}px;
    margin: 0 auto;
    text-align: center;
`;

const noResultsStyle = css`
    padding: ${theme.spacing.md}px 0;
`;

const showMoreButtonStyle = css`
    margin: ${theme.spacing.sm}px 0;
    font-size: ${theme.font.normalTextSize}px;
    padding: ${theme.spacing.xs}px ${theme.spacing.md}px;
    border: 1px solid ${theme.color.secondaryBorderColor};
    border-radius: ${theme.font.normalTextSize}px;
    color: ${theme.color.primaryActionText};
    background-color: #ffffff;

    :active {
        background-color: ${theme.color.primaryActionActiveButtonBackground};
        color: ${theme.color.primaryActionButtonText};
    }
`;

const getTicker = async (): Promise<Ticker[] | null> => {
    const searchResultData = await SearchApi.getTickers(
        0,
        20,
        undefined,
        undefined,
        ['north_america'],
        ['technology'],
    );
    return searchResultData != null ? searchResultData.results : null;
};

export type ExplorePageProps = { filterSelectedStocks: Stock[] };
const ExplorePage: React.FunctionComponent<ExplorePageProps> = ({
    filterSelectedStocks,
}) => {
    console.log('Rendering ExplorePage...');

    // stocks selected for fund search
    const [selectedStockActiveState, setSelectedStockActiveState] = useState<
        Array<{ active: Boolean; stock: Stock }>
    >(filterSelectedStocks.map((s) => ({ active: true, stock: s })));

    const toggleSelectedStock = (stock: Stock) => {
        const newState = selectedStockActiveState.map((x) => ({
            ...x,
            active: x.stock.tickerId === stock.tickerId ? !x.active : x.active,
        }));
        setSelectedStockActiveState(newState);
    };

    // Fund data
    const [tickerState, setTickerState] = useState<{
        tickers: Ticker[];
        isLoading: boolean;
        isError: boolean;
    }>({ tickers: [], isLoading: true, isError: false });

    // search fund
    useEffect(() => {
        console.log('ExplorePage.useEffect...');

        // set loading state
        let currentEffectStillActive = true;
        setTickerState({
            tickers: tickerState.tickers,
            isLoading: true,
            isError: false,
        });

        async function getData() {
            const tickerData = await getTicker();
            if (tickerData == null) {
                setTickerState({
                    tickers: [],
                    isLoading: false,
                    isError: true,
                });
            } else {
                // owner of useEffect has not been dismounted yet
                if (currentEffectStillActive) {
                    setTickerState({
                        tickers: tickerData,
                        isLoading: false,
                        isError: false,
                    });
                }
            }
        }

        getData(); // trigger

        return () => {
            // if component is being re-rendered/removed (because user changed pages): don't bother setting state
            currentEffectStillActive = false;
        };
    }, [selectedStockActiveState]); //only run this if selectedStockActiveState changed

    const onClickShowMore = () => {
        // do something
    };

    return (
        <PageLayout
            pageTitle="Explore"
            showHeader={true}
            headerChildren={
                <ExplorePageHeader
                    selectedStocks={selectedStockActiveState}
                    toggleSelectedStock={toggleSelectedStock}
                />
            }
        >
            <div className={pageStyle}>
                {tickerState.isLoading && <div>Loading, please wait...</div>}
                {tickerState.isError && <div>Failed to load data</div>}
                {!tickerState.isLoading && !tickerState.isError && (
                    <>
                        {tickerState.tickers.length > 0 ? (
                            <FundList
                                tickers={tickerState.tickers}
                                highlightTickerInBasket={true}
                                canAddToBasket={true}
                            />
                        ) : (
                            <div className={noResultsStyle}>
                                Sorry there was no funds found for the stocks
                                you picked
                            </div>
                        )}
                        <Clickable
                            clickableCode="explore-page_searchresult_showmore"
                            elementType="button"
                            className={showMoreButtonStyle}
                            onClick={onClickShowMore}
                        >
                            Auto show more
                        </Clickable>
                        <ExplorePageNextButton />
                    </>
                )}
            </div>
        </PageLayout>
    );
};

export default ExplorePage;
