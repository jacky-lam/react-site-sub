import React, { ReactNode } from 'react';
import { css } from 'emotion';

import theme from 'common/theme';

const headerWrapperStyle = css`
    position: relative;
    background-color: ${theme.color.primaryHeaderBackground};
    text-align: right;
    align-items: center;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid ${theme.color.primaryHeaderBorder};
`;

type HeaderProps = {
    children?: ReactNode | ReactNode[];
};

const Header: React.FunctionComponent<HeaderProps> = ({ children }) => (
    <div className={headerWrapperStyle}>{children && children}</div>
);

export default Header;
