import React from 'react';
import { css } from 'emotion';

import theme from 'common/theme';
import Clickable from 'components/clickable';
import MaterialIcon from 'components/icon/MaterialIcon';

const navigationItemStyle = css`
    text-align: center;
    height: 100%;
`;

const clickableBaseStyle = css`
    text-align: center;
    height: 100%;
`;

const clickableNonSelectedStyle = css`
    ${clickableBaseStyle};

    color: ${theme.color.footerNonActiveColor};
    &:visited {
        color: ${theme.color.footerNonActiveColor};
    }
`;

const clickableSelectedStyle = css`
    ${clickableBaseStyle};

    color: ${theme.color.footerActiveColor};
    &:visited {
        color: ${theme.color.footerActiveColor};
    }
`;

const clickableIconStyle = css`
    vertical-align: middle;

    font-size: ${theme.font.smallTextSize + 8}px;

    /* icon needs to be 8px bigger than text */
    @media (min-width: ${theme.breakpoint.mobileLandscape}px) {
        font-size: ${theme.font.normalTextSize + 8}px;
    }

    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        font-size: ${theme.font.largeTextSize + 8}px;
    }
`;

const clickableTextStyle = css`
    vertical-align: middle;

    display: block;
    font-size: ${theme.font.smallTextSize}px;

    @media (min-width: ${theme.breakpoint.mobileLandscape}px) {
        display: inline;
        font-size: ${theme.font.normalTextSize}px;
        margin-left: ${theme.spacing.sm}px;
    }

    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        display: inline;
        font-size: ${theme.font.largeTextSize}px;
        margin-left: ${theme.spacing.sm}px;
    }
`;

type NavigationItemProps = {
    navItemCode: string;
    href: string;
    iconType: string;
    label?: string;
    isActive: boolean;
    isClickable: boolean;
};

const NavigationItem: React.FunctionComponent<NavigationItemProps> = ({
    navItemCode,
    href,
    iconType,
    label,
    isActive,
    isClickable,
}) => {
    return (
        <div className={navigationItemStyle}>
            {isClickable ? (
                <Clickable
                    clickableCode={navItemCode}
                    className={
                        isActive
                            ? clickableSelectedStyle
                            : clickableNonSelectedStyle
                    }
                    elementType="a"
                    href={href}
                >
                    <MaterialIcon
                        iconType={iconType}
                        className={clickableIconStyle}
                    />
                    {label && (
                        <span className={clickableTextStyle}>{label}</span>
                    )}
                </Clickable>
            ) : (
                <div
                    className={
                        isActive
                            ? clickableSelectedStyle
                            : clickableNonSelectedStyle
                    }
                >
                    <MaterialIcon
                        iconType={iconType}
                        className={clickableIconStyle}
                    />
                    {label && (
                        <span className={clickableTextStyle}>{label}</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default NavigationItem;
