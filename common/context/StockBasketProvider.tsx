import React, { ReactNode, useState } from 'react';

import type { Stock } from 'common/model/Ticker';

type StockBasketContextProps = {
    stockBasket: Stock[];
    toggleStockBasketItem: (toggledStock: Stock) => void;
};

const StockBasketContext = React.createContext<StockBasketContextProps>({
    stockBasket: [],
    toggleStockBasketItem: (toggledStock: Stock) => {
        console.error(
            'Error: StockBasketContext.toggleStockBasketItem has not been overriden',
        );
    },
});

type StockSimple = Pick<Stock, 'tickerId'>;

type StockBasketContextProviderProps = {
    children?: ReactNode;
    defaultValue?: StockSimple[];
};

const StockBasketContextProvider: React.FunctionComponent<StockBasketContextProviderProps> = ({
    children,
    defaultValue = [],
}) => {
    console.log('default:', defaultValue);
    const [stockBasket, setStockBasket] = useState<StockSimple[]>(defaultValue);

    const toggleStockBasketItem = (toggledStock: Stock) => {
        const indexOfStockInBasket = stockBasket.findIndex(
            (x) => x.tickerId === toggledStock.tickerId,
        );

        if (indexOfStockInBasket >= 0) {
            stockBasket.splice(indexOfStockInBasket, 1);
            setStockBasket([...stockBasket]);
        } else {
            setStockBasket([...stockBasket, toggledStock]);
        }
    };

    return (
        <StockBasketContext.Provider
            value={{ stockBasket, toggleStockBasketItem }}
        >
            {children && children}
        </StockBasketContext.Provider>
    );
};

export { StockBasketContext, StockBasketContextProvider };
