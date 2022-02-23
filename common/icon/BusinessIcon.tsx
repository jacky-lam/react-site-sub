import theme from 'common/theme';
import type { PortfolioTradeStatus } from 'common/model/PortfolioTrade';

/**
 *
 * Convert all business values to something related to something visually meaningful for react component to render
 *
 */

// returns name of image
export const getHistoricTransactionStatusIcon = (
    value: PortfolioTradeStatus,
): string => {
    switch (value) {
        case 'COMPLETE': {
            return 'check';
        }
        case 'PENDING': {
            return 'warning';
        }
    }
    return '';
};

export const getHistoricTransactionStatusIconColor = (
    value: PortfolioTradeStatus,
): string => {
    switch (value) {
        case 'COMPLETE': {
            return theme.color.chartGreen;
        }
        case 'PENDING': {
            return theme.color.chartOrange;
        }
    }
    return '';
};
