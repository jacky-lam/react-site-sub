import React from 'react';
import { useRouter } from 'next/router';
import { css } from 'emotion';

import theme from 'common/theme';
import { Stock } from 'common/model/Ticker';

import Clickable from 'components/clickable';
import HeaderNavButton from 'components/header/HeaderNavButton';

const headerWrapperStyle = css`
    padding: 0 ${theme.spacing.xs}px;
    height: 100%;
    width: 100%;
    position: relative;
`;

const selectedStockWrapperStyle = css`
    float: right;
    padding-top: 7px;
    padding-right: ${theme.spacing.xs}px;
`;

const selectedStockLabelStyle = css`
    font-size: ${theme.font.smallTextSize}px;
    display: inline-block;
    vertical-align: middle;
`;

const numIconVisible = 5.5;
const selectedStockContainerStyle = css`
    vertical-align: middle;
    display: inline-block;
    max-width: 185px; /* 5.5 logos */
    overflow-x: auto;
    white-space: nowrap;

    /* hide scrollbar */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
        display: none;
    }
`;
const selectedStockContainerOverflowStyle = css`
    ${selectedStockContainerStyle};
    border-right: 2px solid ${theme.color.primaryBorderColor};
`;

const stockIconWrapperStyle = css`
    display: inline-block;
    width: 25px;
    height: 25px;
    border: 2px solid ${theme.color.secondaryActionText};
    border-radius: 100px;
    margin-left: ${theme.spacing.sm}px;
    overflow: hidden;
`;
const stockIconWrapperInactiveStyle = css`
    ${stockIconWrapperStyle};
    filter: grayscale(1);
`;

const logoStyle = css`
    max-height: 100%;
    max-width: 100%;
`;

type ExplorePageHeaderProps = {
    selectedStocks: { active: Boolean; stock: Stock }[];
    toggleSelectedStock: (stock: Stock) => void;
};
const ExplorePageHeader: React.FunctionComponent<ExplorePageHeaderProps> = ({
    selectedStocks,
    toggleSelectedStock,
}) => {
    console.log('Rendering ExplorePageHeader...');

    const nextRouter = useRouter();
    const onClickBack = () => {
        nextRouter.push({
            pathname: '/search-stock',
            query: nextRouter.query,
        });
    };

    const showContainerLine = selectedStocks.length * 3 > numIconVisible;
    return (
        <div className={headerWrapperStyle}>
            <HeaderNavButton
                isLeftButton={true}
                label="Back"
                labelPosition="TOP"
                prefixClickableCode="explore_overviewstep_back"
                iconType="arrow_back_ios"
                onClickFunc={onClickBack}
            />
            <div className={selectedStockWrapperStyle}>
                {selectedStocks.length > 0 ? (
                    <div className={selectedStockLabelStyle}>Selected:</div>
                ) : (
                    ''
                )}
                <div
                    className={
                        showContainerLine
                            ? selectedStockContainerOverflowStyle
                            : selectedStockContainerStyle
                    }
                >
                    {selectedStocks.map((item, i) => (
                        <Clickable
                            key={`${item.stock.tickerId}_${item.active}`}
                            clickableCode="explorepageheader_selectedstock_click"
                            analyticsMetadata={{
                                code: 'explorepageheader_selectedstock_click',
                                tickerId: item.stock.tickerId,
                            }}
                            elementType="button"
                            className={
                                item.active
                                    ? stockIconWrapperStyle
                                    : stockIconWrapperInactiveStyle
                            }
                            onClick={() => {
                                toggleSelectedStock(item.stock);
                            }}
                        >
                            <img
                                className={logoStyle}
                                src={
                                    i == 1
                                        ? 'https://i.pinimg.com/originals/30/99/af/3099aff4115ee20f43e3cdad04f59c48.png'
                                        : i == 2
                                        ? 'https://www.logocentral.info/wp-content/uploads/2020/04/Tesla-Logo-640X590.jpg'
                                        : 'http://eodhistoricaldata.com/img/logos/US/aapl.png'
                                }
                            />
                        </Clickable>
                    ))}
                    {selectedStocks.map((item, i) => (
                        <Clickable
                            key={`${item.stock.tickerId}_${item.active}2`}
                            clickableCode="explorepageheader_selectedstock_click"
                            analyticsMetadata={{
                                code: 'explorepageheader_selectedstock_click',
                                tickerId: item.stock.tickerId,
                            }}
                            elementType="button"
                            className={
                                item.active
                                    ? stockIconWrapperStyle
                                    : stockIconWrapperInactiveStyle
                            }
                            onClick={() => {
                                toggleSelectedStock(item.stock);
                            }}
                        >
                            <img
                                className={logoStyle}
                                src={
                                    i == 1
                                        ? 'https://i.pinimg.com/originals/30/99/af/3099aff4115ee20f43e3cdad04f59c48.png'
                                        : i == 2
                                        ? 'https://www.logocentral.info/wp-content/uploads/2020/04/Tesla-Logo-640X590.jpg'
                                        : 'http://eodhistoricaldata.com/img/logos/US/aapl.png'
                                }
                            />
                        </Clickable>
                    ))}
                    {selectedStocks.map((item, i) => (
                        <Clickable
                            key={`${item.stock.tickerId}_${item.active}3`}
                            clickableCode="explorepageheader_selectedstock_click"
                            analyticsMetadata={{
                                code: 'explorepageheader_selectedstock_click',
                                tickerId: item.stock.tickerId,
                            }}
                            elementType="button"
                            className={
                                item.active
                                    ? stockIconWrapperStyle
                                    : stockIconWrapperInactiveStyle
                            }
                            onClick={() => {
                                toggleSelectedStock(item.stock);
                            }}
                        >
                            <img
                                className={logoStyle}
                                src={
                                    i == 1
                                        ? 'https://i.pinimg.com/originals/30/99/af/3099aff4115ee20f43e3cdad04f59c48.png'
                                        : i == 2
                                        ? 'https://www.logocentral.info/wp-content/uploads/2020/04/Tesla-Logo-640X590.jpg'
                                        : 'http://eodhistoricaldata.com/img/logos/US/aapl.png'
                                }
                            />
                        </Clickable>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExplorePageHeader;
