import React from 'react';
import { useRouter } from 'next/router';
import { css } from 'emotion';

import theme from 'common/theme';

import NavigationItem from './FooterNavigationItem';
/**
 *
 * Footer navigation
 *
 */
const navigationWrapperStyle = css`
    flex: 0 0 auto;
    bottom: 0px;
    border-top: 2px solid ${theme.color.primaryBorderColor};

    padding: ${theme.spacing.xs}px 0;
    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        padding: ${theme.spacing.md}px 0;
    }
`;

const navigationItemContainerStyle = css`
    display: grid;
    flex-shrink: 0;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 100%;
    grid-template-columns: auto auto auto auto;
`;

const FooterNavigation: React.FunctionComponent = (props) => {
    const router = useRouter();
    return (
        <div className={navigationWrapperStyle}>
            <div className={navigationItemContainerStyle}>
                <NavigationItem
                    navItemCode="footernav_explore"
                    href="/search-stock"
                    iconType="add_business"
                    label="Explore"
                    isClickable={
                        !(
                            router.pathname.startsWith('/search-stock') ||
                            router.pathname.startsWith('/explore')
                        )
                    }
                    isActive={
                        router.pathname.startsWith('/search-stock') ||
                        router.pathname.startsWith('/explore')
                    }
                />
                <NavigationItem
                    navItemCode="footernav_trending"
                    href="/trending"
                    iconType="local_fire_department"
                    label="Trending"
                    isClickable={true}
                    isActive={router.pathname.startsWith('/trending')}
                />
                <NavigationItem
                    navItemCode="footernav_deck"
                    href="/deck"
                    iconType="collections_bookmark"
                    label="Deck"
                    isClickable={true}
                    isActive={router.pathname.startsWith('/deck')}
                />
                <NavigationItem
                    navItemCode="footernav_profile"
                    href="/profile"
                    iconType="account_circle"
                    label="Profile"
                    isClickable={true}
                    isActive={router.pathname.startsWith('/profile')}
                />
            </div>
        </div>
    );
};

export default FooterNavigation;
