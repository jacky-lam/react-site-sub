import React, { ReactNode, useState } from 'react';

import Portfolio, { getBlankPortfolio } from 'common/model/Portfolio';

type PortfolioContextProps = {
    portfolio: Portfolio;
    setPortfolio(portfolio: Portfolio, callBack?: () => any): void;
};

const PortfolioContext = React.createContext<PortfolioContextProps>({
    portfolio: getBlankPortfolio('PORTFOLIO'),
    setPortfolio: (portfolio: Portfolio) => {
        console.error('Error: PortfolioContext has not been overriden');
    },
});

type PortfolioContextProviderProps = {
    children?: ReactNode;
    defaultValue: Portfolio;
};
const PortfolioContextProvider: React.FunctionComponent<PortfolioContextProviderProps> = ({
    children,
    defaultValue,
}) => {
    const [state, setState] = useState<Portfolio>(defaultValue);
    const setStateFunc = (portfolio: Portfolio) => {
        setState(portfolio);
        // TODO - call server-api to update portfolio on server
    };
    return (
        <PortfolioContext.Provider
            value={{ portfolio: state, setPortfolio: setStateFunc }}
        >
            {children && children}
        </PortfolioContext.Provider>
    );
};

export { PortfolioContext, PortfolioContextProvider };
