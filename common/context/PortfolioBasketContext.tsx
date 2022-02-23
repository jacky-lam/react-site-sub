import React, { ReactNode, useState } from 'react';

import PortfolioBasket, {
    getBlankPortfolioBasket,
    PortfolioBasketItem,
} from 'common/model/PortfolioBasket';
import PortfolioApi from 'common/api/PortfolioApi';

/**
 *
 * Future thoughts:
 * - Right now we are preserving the basket in the database.
 * - In future, we may want to preserve it in localStorage instead (faster/less hassle for db maintenance).
 * - To get relative stocks: we just ping to the recommendation api what's in localStorage.
 * - To know what user added/revmoved in the past: we could read the analytics data (con: ad-blocker).
 *
 * Something to think about in future
 *
 */

type PortfolioBasketContextProps = {
    portfolioBasket: PortfolioBasket;
    /**
     * @deprecated use addBasketItem and removeBasketItem instead
     */
    setPortfolioBasket(portfolio: PortfolioBasket, callBack?: () => any): void;
    addBasketItems(basketItems: PortfolioBasketItem[]): void;
    removeBasketItemByIds(basketItemIds: number[]): void;
};

const PortfolioBasketContext = React.createContext<PortfolioBasketContextProps>(
    {
        portfolioBasket: getBlankPortfolioBasket('USD'),
        setPortfolioBasket: () => {
            console.error(
                'Error: PortfolioBasketContext has not been overriden',
            );
        },
        addBasketItems: () => {
            console.error(
                'Error: PortfolioBasketContext has not been overriden',
            );
        },
        removeBasketItemByIds: () => {
            console.error(
                'Error: PortfolioBasketContext has not been overriden',
            );
        },
    },
);

type PortfolioBasketContextProviderProps = {
    children?: ReactNode;
    defaultValue: PortfolioBasket;
};
const PortfolioBasketContextProvider: React.FunctionComponent<PortfolioBasketContextProviderProps> = ({
    children,
    defaultValue,
}) => {
    const [state, setState] = useState<PortfolioBasket>(defaultValue);

    /**
     * @deprecated use addBasketItem and removeBasketItem instead
     * - This is only used by our old explore-page code
     */
    const setStateFunc = (portfolio: PortfolioBasket) => {
        setState(portfolio);
    };

    const addBasketItems = async (addingBasketItems: PortfolioBasketItem[]) => {
        console.log('call addBasketItems: ', addingBasketItems);

        const result = await PortfolioApi.addPortfolioBasketItems(
            addingBasketItems,
        );

        if (result.response) {
            console.log('Success addBasketItems:', result.response);
            setState({
                ...state,
                basketItems: [...state.basketItems, ...addingBasketItems],
            });
        } else if (result.error) {
            alert(result.error.code); //TODO - output error
            console.error(
                `failed addBasketItems: removing items that failed to be added to basket`,
                addingBasketItems,
            );
        }
    };

    const removeBasketItemByIds = async (removingBasketItemIds: number[]) => {
        console.log('call removeBasketItems: ', removingBasketItemIds);
        const removeExistingItemIds: number[] = [];
        const removingItems: PortfolioBasketItem[] = [];
        const newBasketItemState: PortfolioBasketItem[] = [];
        state.basketItems.forEach((basketItem) => {
            if (
                removingBasketItemIds.some(
                    (removingId) => basketItem.id == removingId,
                )
            ) {
                if (basketItem.id && basketItem.id > 0) {
                    // we only want to submit ids that are legit
                    removeExistingItemIds.push(basketItem.id);
                }
                removingItems.push(basketItem);
            } else {
                newBasketItemState.push(basketItem);
            }
        });

        const result = await PortfolioApi.removePortfolioBasketItemByIds(
            removeExistingItemIds,
        );
        if (result.response) {
            console.log('Success removeBasketItems:', result.response);
            setState({
                ...state,
                basketItems: newBasketItemState,
            });
        } else if (result.error) {
            alert(result.error.code); //TODO - output error
            console.error(
                `failed removeBasketItemByIds, adding back in items that failed to be removed`,
                removingBasketItemIds,
            );
        }
    };

    return (
        <PortfolioBasketContext.Provider
            value={{
                portfolioBasket: state,
                setPortfolioBasket: setStateFunc,
                addBasketItems,
                removeBasketItemByIds,
            }}
        >
            {children && children}
        </PortfolioBasketContext.Provider>
    );
};

export { PortfolioBasketContext, PortfolioBasketContextProvider };
