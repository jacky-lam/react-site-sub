import Portfolio, { PortfolioBookHolding } from 'common/model/Portfolio';
import PortfolioBasket, {
    PortfolioBasketItem,
} from 'common/model/PortfolioBasket';
import {
    roundDecimalPlace,
    currencyCodeToSymbol,
} from 'common/currency/currencyUtil';

/**
 * Wrapper for each individual item in the portfolio/basket
 * - It holds the allocation percentage
 */
export type PortfolioAllocationItem = {
    item: PortfolioBookHolding;
    itemValue: number; // unit * ticker latest price
    allocationPercentageOfTotalValue: number; // itemValue / totalValue
    allocationPercentageOfRelativeTotalValue: number; // itemValue / portfolioTotalValue
};

export type PortfolioBasketAllocationItem = {
    item: PortfolioBasketItem;
    itemValue: number; // unit * ticker latest price
    allocationPercentageOfTotalValue: number; // itemValue / totalValue
    allocationPercentageOfRelativeTotalValue: number; // itemValue / portfolioBasketTotalValue
};

class PorfolioAllocation {
    /**
     * Manages calculating the allocation amount
     * - reason for using roundDecimalPlace: javascript loses precision when doing mathematical operations
     */
    totalValue: number; // total value of the portfolio & portfolio-basket given
    portfolioTotalValue: number; // total value of the portfolio
    portfolioBasketTotalValue: number; // total value of the portfolio-basket
    portfolioTotalBookValue: number; // total book value of the portfolio
    portfolioAllocation: Array<PortfolioAllocationItem>;
    portfolioBasketAllocation: Array<PortfolioBasketAllocationItem>;
    baseCurrencyCode: string;
    baseCurrencySymbol: string;

    constructor(portfolio?: Portfolio, portfolioBasket?: PortfolioBasket) {
        this.totalValue = 0;
        this.portfolioTotalValue = 0;
        this.portfolioTotalBookValue = 0;
        this.portfolioBasketTotalValue = 0;
        this.baseCurrencyCode = portfolio
            ? portfolio.baseCurrencyCode
            : portfolioBasket
            ? portfolioBasket.baseCurrencyCode
            : 'USD';
        this.baseCurrencySymbol = currencyCodeToSymbol(this.baseCurrencyCode);

        // setup portfolio
        this.portfolioAllocation = [];
        if (portfolio) {
            for (let i = 0; i < portfolio.bookHoldings.length; i++) {
                const bookHolding = portfolio.bookHoldings[i];

                // setup item
                const allocItem: PortfolioAllocationItem = {
                    item: bookHolding,
                    itemValue: roundDecimalPlace(
                        bookHolding.ticker.tickerBaseLatestDailyClosePrice *
                            bookHolding.totalUnit,
                    ),
                    allocationPercentageOfTotalValue: 0,
                    allocationPercentageOfRelativeTotalValue: 0,
                };
                this.portfolioAllocation.push(allocItem);

                // setup value
                this.totalValue = roundDecimalPlace(
                    this.totalValue + allocItem.itemValue,
                );
                this.portfolioTotalValue = roundDecimalPlace(
                    this.portfolioTotalValue + allocItem.itemValue,
                );
                this.portfolioTotalBookValue = roundDecimalPlace(
                    this.portfolioTotalBookValue +
                        allocItem.item.totalBookValue,
                );
            }
        }

        // setup portfolio basket
        this.portfolioBasketAllocation = [];
        if (portfolioBasket) {
            for (let i = 0; i < portfolioBasket.basketItems.length; i++) {
                const portfolioBasketItem = portfolioBasket.basketItems[i];

                // setup item
                const allocItem: PortfolioBasketAllocationItem = {
                    item: portfolioBasketItem,
                    itemValue: roundDecimalPlace(
                        portfolioBasketItem.ticker
                            .tickerBaseLatestDailyClosePrice *
                            portfolioBasketItem.unit,
                    ),
                    allocationPercentageOfTotalValue: 0,
                    allocationPercentageOfRelativeTotalValue: 0,
                };
                this.portfolioBasketAllocation.push(allocItem);

                // setup value
                this.totalValue = roundDecimalPlace(
                    this.totalValue + allocItem.itemValue,
                );
                this.portfolioBasketTotalValue = roundDecimalPlace(
                    this.portfolioBasketTotalValue + allocItem.itemValue,
                );
            }
        }

        // calcaulate allocation
        this.calculateAllocationValue();
    }

    calculateAllocationValue = () => {
        for (let i = 0; i < this.portfolioAllocation.length; i++) {
            const allocItem = this.portfolioAllocation[i];
            allocItem.allocationPercentageOfTotalValue = roundDecimalPlace(
                allocItem.itemValue / this.totalValue,
            );
            allocItem.allocationPercentageOfRelativeTotalValue = roundDecimalPlace(
                allocItem.itemValue / this.portfolioTotalValue,
            );
        }
        for (let i = 0; i < this.portfolioBasketAllocation.length; i++) {
            const allocItem = this.portfolioBasketAllocation[i];
            allocItem.allocationPercentageOfTotalValue = roundDecimalPlace(
                allocItem.itemValue / this.totalValue,
            );
            allocItem.allocationPercentageOfRelativeTotalValue = roundDecimalPlace(
                allocItem.itemValue / this.portfolioBasketTotalValue,
            );
        }
    };
}

export default PorfolioAllocation;
