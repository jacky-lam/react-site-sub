import React, { useState } from 'react';
import { css } from 'emotion';

import theme from 'common/theme';
import { Ticker } from 'common/model/Ticker';
import { ReturnTypes } from 'common/model/Types';

import ReturnPopupButton from 'components/datatype/ReturnPopupButton';
import {
    squareWidth,
    squareWidthM,
    DataTypeCellLabel,
} from 'components/datatype/DataTypeCellLabel';

import FundListItem from './FundListItem';
import SortByButton from './sortbybutton';

const searchResultContainerStyle = css`
    text-align: left;

    margin: ${theme.spacing.sm}px;
    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        margin: ${theme.spacing.lg}px;
    }
`;

// Table css
const searchResultTableStyle = css`
    border-collapse: collapse;
    border: 0;
    width: 100%;
    table-layout: fixed;

    th,
    td {
        margin: 0px;
        font-size: ${theme.font.normalTextSize}px;
        font-weight: normal;
    }
    th {
        padding: 0 0 ${theme.spacing.xs}px ${theme.spacing.xs}px;
        @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
            padding: 0 0 ${theme.spacing.sm}px ${theme.spacing.sm}px;
        }
        :first-child {
            padding: 0 0 ${theme.spacing.xs}px 0;
            @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
                padding: 0 0 ${theme.spacing.sm}px 0;
            }
        }
    }
    td {
        padding: ${theme.spacing.xs}px 0 ${theme.spacing.xs}px
            ${theme.spacing.xs}px;
        @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
            padding: ${theme.spacing.sm}px 0 ${theme.spacing.sm}px
                ${theme.spacing.sm}px;
        }
        :first-child {
            padding: ${theme.spacing.xs}px 0 ${theme.spacing.xs}px 0;
            @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
                padding: ${theme.spacing.sm}px 0;
            }
        }
    }
`;

const tickerColumnStyle = css`
    text-align: left;
`;
const squareColumnStyle = css`
    width: ${squareWidthM + theme.spacing.xs}px;
    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        width: ${squareWidth + theme.spacing.sm}px;
    }
`;

// toggle
const toggleSwitchWrapperStyle = css`
    text-align: left;
`;

// sort
const sortLabelStyle = css`
    display: inline-block;
    vertical-align: text-bottom;

    font-size: ${theme.font.smallTextSize}px;
    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        font-size: ${theme.font.normalTextSize}px;
    }
`;

type SortByType = 'FUND_PERCENTAGE' | 'COST' | 'RETURN' | 'ASSET';

type StateType = {
    sortBy: SortByType;
    displayReturnType: ReturnTypes;
};

type FundListProps = {
    tickers: Ticker[];
    highlightTickerInBasket?: boolean;
    canAddToBasket?: boolean;
};
const FundList: React.FunctionComponent<FundListProps> = ({
    tickers,
    highlightTickerInBasket,
    canAddToBasket,
}) => {
    console.log('Rendering FundList...');

    const [state, setState] = useState<StateType>({
        sortBy: 'FUND_PERCENTAGE',
        displayReturnType: '1Y' as ReturnTypes,
    });

    const setReturnTypeFunc = (value: ReturnTypes) => {
        setState({
            ...state,
            displayReturnType: value,
        });
    };

    const setSortBy = (sortBy: SortByType) => {
        setState({ ...state, sortBy });
    };

    // TODO - sort tickers

    return (
        <div className={searchResultContainerStyle}>
            <table className={searchResultTableStyle}>
                <thead>
                    <tr>
                        <th className={tickerColumnStyle}>
                            <div className={toggleSwitchWrapperStyle}>
                                <span className={sortLabelStyle}>Sort By:</span>
                                <SortByButton
                                    sortBy={state.sortBy}
                                    setSortByFunc={setSortBy}
                                />
                            </div>
                        </th>
                        <th className={squareColumnStyle}>
                            <DataTypeCellLabel
                                isHeader={true}
                                dataType="net_asset"
                                flexWidth={true}
                            >
                                Net Asset
                            </DataTypeCellLabel>
                        </th>
                        <th className={squareColumnStyle}>
                            <DataTypeCellLabel
                                isHeader={true}
                                dataType="cost"
                                flexWidth={true}
                            >
                                Cost
                            </DataTypeCellLabel>
                        </th>
                        <th className={squareColumnStyle}>
                            <ReturnPopupButton
                                clickableCodePrefix={'explore_searchresult'}
                                returnType={state.displayReturnType}
                                setReturnTypeFunc={setReturnTypeFunc}
                                displayButtonPosition="LEFT"
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tickers.map((searchResultTicker) => (
                        <FundListItem
                            key={searchResultTicker.tickerId}
                            ticker={searchResultTicker}
                            displayReturnType={state.displayReturnType}
                            highlightTickerInBasket={highlightTickerInBasket}
                            canAddToBasket={canAddToBasket}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FundList;
