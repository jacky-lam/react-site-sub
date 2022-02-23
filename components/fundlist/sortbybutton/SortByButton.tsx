import React, { useState, ReactNode } from 'react';
import { css } from 'emotion';

import theme from 'common/theme';

import Clickable from 'components/clickable';
import MaterialIcon from 'components/icon/MaterialIcon';
import PopupModal, { closeModalButtonStyle } from 'components/popupmodal';

const sortWrapperStyle = css`
    background-color: transparent;
    cursor: pointer;
    color: ${theme.color.primaryActionText};

    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        padding: ${theme.spacing.sm}px;
    }
`;
const sortTextStyle = css`
    display: inline-block;
    vertical-align: middle;
    margin: 0 ${theme.spacing.xs}px;

    font-size: ${theme.font.smallTextSize}px;
    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        font-size: ${theme.font.normalTextSize}px;
    }
`;
const sortIconStyle = css`
    display: inline-block;
    vertical-align: bottom;

    font-size: ${theme.font.smallTextSize + 2}px;
    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        font-size: ${theme.font.normalTextSize + 2}px;
    }
`;

const popupWrapperStyle = css`
    width: 100%;
    height: 100%;
    background-color: ${theme.color.primaryPopupModalBackground};
    padding: ${theme.spacing.lg}px;
`;
const sortButtonStyle = css`
    display: block;
    color: ${theme.color.primaryActionText};
    font-size: ${theme.font.normalTextSize}px;
    padding: ${theme.spacing.sm}px;
    width: 100px;
    text-align: center;

    :not(:first-child) {
        border-top: 1px solid ${theme.color.primaryBorderColor};
    }
`;

const sortByTypeValues = [
    'FUND_PERCENTAGE',
    'COST',
    'RETURN',
    'ASSET',
] as const;
const sortByTypeLabel = ['Match', 'Performance', 'Cost', 'Net Asset'] as const;
type SortByType = typeof sortByTypeValues[number];

type SortByButtonProps = {
    sortBy: SortByType;
    setSortByFunc: (sortBy: SortByType) => void;
};
const SortByButton: React.FunctionComponent<SortByButtonProps> = ({
    sortBy,
    setSortByFunc,
}) => {
    console.log('Rendering SortByButton...');

    const [showPopupState, setShowPopupState] = useState(false);
    const openPoupState = () => {
        setShowPopupState(true);
    };
    const closePopupState = () => {
        setShowPopupState(false);
    };

    const onClickSetSortBy = (sortBy: SortByType) => {
        setSortByFunc(sortBy);
    };
    const buttons: ReactNode = sortByTypeValues.map((x, i) => {
        return (
            <Clickable
                key={x}
                clickableCode="SortByButton_set"
                analyticsMetadata={{
                    code: 'SortByButton_set',
                    sortBy: x,
                }}
                elementType="button"
                className={sortButtonStyle}
                onClick={() => {
                    onClickSetSortBy(x);
                    closePopupState();
                }}
            >
                {sortByTypeLabel[i]}
            </Clickable>
        );
    });
    const sortByLabel = sortByTypeLabel[sortByTypeValues.indexOf(sortBy)];
    return (
        <>
            <Clickable
                clickableCode="SortByButton_open"
                elementType="button"
                className={sortWrapperStyle}
                onClick={openPoupState}
            >
                <span className={sortTextStyle}>{sortByLabel}</span>
                <MaterialIcon className={sortIconStyle} iconType="filter_alt" />
            </Clickable>
            {showPopupState && (
                <PopupModal modalType="FULL">
                    <div className={popupWrapperStyle}>
                        <Clickable
                            clickableCode="SortByButton_close"
                            elementType="button"
                            className={closeModalButtonStyle}
                            onClick={closePopupState}
                        >
                            Close
                        </Clickable>
                        <div>{buttons}</div>
                    </div>
                </PopupModal>
            )}
        </>
    );
};

export default SortByButton;
