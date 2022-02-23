import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { css } from 'emotion';

import theme from 'common/theme';
import { PortfolioBasketContext } from 'common/context/PortfolioBasketContext';

import Clickable from 'components/clickable';
import MaterialIcon from 'components/icon/MaterialIcon';

const wrapperStyle = css`
    position: fixed;
    bottom: 60px;
    left: 50%;
`;

const searchActionButtonStyle = css`
    padding: ${theme.spacing.sm}px ${theme.spacing.sm}px ${theme.spacing.sm}px
        ${theme.spacing.md}px;
    margin-left: -50%;

    background-color: #ffffff;
    color: ${theme.color.primaryActionButtonBackground};
    border: 1px solid ${theme.color.primaryActionButtonBackground};
    border-radius: ${theme.font.largeTextSize + 12}px;

    font-size: ${theme.font.largeTextSize}px;
    line-height: ${theme.font.largeTextSize + 12}px;
    box-shadow: 0 6px 3px 2px ${theme.color.popupShadow};
`;

const iconStyle = css`
    vertical-align: middle;
    font-size: ${theme.font.largeTextSize + 12}px;
    color: ${theme.color.primaryActionButtonBackground};
`;

const subTitleStyle = css`
    display: inline-block;
    vertical-align: top;
    padding-left: ${theme.spacing.xs}px;
    font-size: ${theme.font.normalTextSize}px;
`;

type ExplorePageNextButtonProps = {};
const ExplorePageNextButton: React.FunctionComponent<ExplorePageNextButtonProps> = ({}) => {
    console.log('Rendering ExplorePageNextButton...');

    const { portfolioBasket } = useContext(PortfolioBasketContext);
    const nextRouter = useRouter();

    const onClickSearchActionButton = () => {
        nextRouter.push({
            pathname: '/deck',
        });
    };

    if (portfolioBasket.basketItems.length > 0)
        return (
            <div className={wrapperStyle}>
                <Clickable
                    clickableCode="SearchActionButton_clicked"
                    elementType="button"
                    className={searchActionButtonStyle}
                    onClick={onClickSearchActionButton}
                >
                    <>
                        Next
                        <div className={subTitleStyle}>
                            ({portfolioBasket.basketItems.length})
                        </div>
                        <MaterialIcon
                            iconType="arrow_forward_ios"
                            className={iconStyle}
                        />
                    </>
                </Clickable>
            </div>
        );
    else return null;
};

export default ExplorePageNextButton;
