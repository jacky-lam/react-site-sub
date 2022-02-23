import React, { useContext, useState } from 'react';
import { css } from 'emotion';

import theme from 'common/theme';
import { PortfolioBasketContext } from 'common/context/PortfolioBasketContext';
import type { Ticker } from 'common/model/Ticker';
import { ReturnTypes, getTickerReturnValue } from 'common/model/Types';
import { sendAnalytics } from 'common/analytic';
import {
    roundDecimalPlace,
    formatShortNumber,
} from 'common/currency/currencyUtil';

import Heading from 'components/heading';
import PopupModal from 'components/popupmodal';
import { DataTypeCellLabel } from 'components/datatype/DataTypeCellLabel';
import FundCard from 'components/tickercard/FundCard';

const itemWrapperBaseStyle = css`
    border-top: 1px solid ${theme.color.secondaryBorderColor};

    -webkit-transition: background-color 0s linear;
    -ms-transition: background-color 0s linear;
    transition: background-color 0s linear;
`;
const itemWrapperActiveStyle = css`
    ${itemWrapperBaseStyle};
    background-color: ${theme.color.secondarySectionBackground};

    transition: background-color 0.2s linear;
`;
const itemWrapperInactiveStyle = css`
    ${itemWrapperBaseStyle};
`;

// Ticker section
const headingStyle = css`
    font-weight: bold;
    vertical-align: middle;
    color: ${theme.color.primaryActionText};
`;

const tickerInfoSectionStyle = css`
    margin-top: ${theme.spacing.xs}px;
`;

const relativeStockLabelStyle = css`
    display: inline-block;
    vertical-align: middle;
    color: ${theme.color.neutralText};

    font-size: ${theme.font.smallTextSize}px;
    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        font-size: ${theme.font.normalTextSize}px;
    }
`;

const stockLogoWrapperStyle = css`
    display: inline-block;
    vertical-align: middle;
    margin-left: ${theme.spacing.xs}px;

    width: 15px;
    height: 15px;
    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        width: 25px;
        height: 25px;
    }
`;

const stockLogoStyle = css`
    height: 100%;
    width: 100%;
`;

const renderNumberLabelValue: any = (value: any) => {
    if (value != undefined && value != null) {
        // try format
        const numValue = Number(value);
        if (!isNaN(numValue)) {
            if (Math.abs(numValue) >= 100)
                return roundDecimalPlace(numValue, 0);
            else if (Math.abs(numValue) >= 10)
                return roundDecimalPlace(numValue, 1);
            else return roundDecimalPlace(numValue, 2);
        } else {
            return value;
        }
    }
    return '-';
};

type FundListItemProps = {
    ticker: Ticker;
    displayReturnType: ReturnTypes;
    highlightTickerInBasket?: boolean;
    canAddToBasket?: boolean;
};

const FundListItem: React.FunctionComponent<FundListItemProps> = ({
    ticker,
    displayReturnType,
    highlightTickerInBasket = false,
    canAddToBasket = false,
}) => {
    console.log('Rendering FundListItem ...');

    const { portfolioBasket } = useContext(PortfolioBasketContext);

    const [openTickerPopupState, setOpenTickerPopupState] = useState(false);
    const closeTickerPopup = () => {
        setOpenTickerPopupState(false);
    };

    let isHighlighted: boolean =
        highlightTickerInBasket &&
        portfolioBasket.basketItems.some(
            (basketItem) => basketItem.ticker.tickerId == ticker.tickerId,
        );

    const onClickRow = () => {
        sendAnalytics({
            analytics: {
                code: 'FundListItem_click',
                tickerId: ticker.tickerId,
            },
        });
        setOpenTickerPopupState(true);
    };

    // return value to display
    let returnDisplayValue = getTickerReturnValue(ticker, displayReturnType);
    if (returnDisplayValue == null) {
        returnDisplayValue = '-';
    } else {
        returnDisplayValue = renderNumberLabelValue(returnDisplayValue) + '%';
    }

    // net asset to display
    const netAssetFormatted = formatShortNumber(
        ticker.tickerLatestTotalNetAsset,
        'SYMBOL',
    );
    const netAssetDisplayValue =
        ticker.tickerLatestTotalNetAsset != null
            ? netAssetFormatted.value + ' ' + netAssetFormatted.unitType
            : '-';

    // total relative stock
    const totalRelativeStockValue = Math.floor(Math.random() * 20) + 1;
    const topThreeRelativeStockImg = [
        'http://eodhistoricaldata.com/img/logos/US/aapl.png',
        'http://eodhistoricaldata.com/img/logos/US/aapl.png',
        'http://eodhistoricaldata.com/img/logos/US/aapl.png',
    ];
    return (
        <tr
            className={
                isHighlighted
                    ? itemWrapperActiveStyle
                    : itemWrapperInactiveStyle
            }
            onClick={onClickRow}
        >
            <td>
                {openTickerPopupState && (
                    <PopupModal
                        modalType="CENTER"
                        addOverlay={true}
                        onClickOutsideModal={closeTickerPopup}
                    >
                        <FundCard
                            ticker={ticker}
                            displayChart="Price"
                            canFavourite={canAddToBasket}
                        />
                    </PopupModal>
                )}
                <Heading className={headingStyle} fontStyle="title4">
                    {ticker.tickerName}
                </Heading>
                <div className={tickerInfoSectionStyle}>
                    <div className={relativeStockLabelStyle}>
                        Match: {totalRelativeStockValue}%
                    </div>
                    {topThreeRelativeStockImg.map((imgUrl, index) => {
                        return index > 0 &&
                            Math.floor(Math.random() * 2) + 1 > 1 ? (
                            ''
                        ) : (
                            <div
                                key={`${index}_${imgUrl}`}
                                className={stockLogoWrapperStyle}
                            >
                                <img className={stockLogoStyle} src={imgUrl} />
                            </div>
                        );
                    })}
                </div>
            </td>
            <td>
                <DataTypeCellLabel isHeader={false} dataType="net_asset">
                    {netAssetDisplayValue}
                </DataTypeCellLabel>
            </td>
            <td>
                <DataTypeCellLabel isHeader={false} dataType="cost">
                    {ticker.tickerLatestOngoingCharge != null
                        ? renderNumberLabelValue(
                              ticker.tickerLatestOngoingCharge * 100,
                          ) + '%'
                        : '-'}
                </DataTypeCellLabel>
            </td>
            <td>
                <DataTypeCellLabel isHeader={false} dataType="pnl">
                    {returnDisplayValue}
                </DataTypeCellLabel>
            </td>
        </tr>
    );
};

export default FundListItem;
