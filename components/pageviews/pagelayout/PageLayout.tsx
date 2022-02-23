import React, { ReactNode } from 'react';
import { css } from 'emotion';
import Head from 'next/head';
import getConfig from 'next/config';

import Header from 'components/header';
import FooterNavigation from 'components/footernavigation';
const { publicRuntimeConfig } = getConfig();
/**
 *
 * Core page component
 * - Every page must import this
 *
 */

/**
 * Styling
 */
const layoutStyle = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

const pageContextStyle = css`
    flex: 1;
    height: 100%;
    overflow: auto;
    width: 100%;
`;

/**
 * Interface and Class
 */
interface PageLayoutProps {
    pageTitle: string;
    children: ReactNode;
    showHeader?: boolean;
    showFooter?: boolean;
    headerChildren?: ReactNode | ReactNode[];
}
const PageLayout: React.FunctionComponent<PageLayoutProps> = ({
    pageTitle,
    children,
    showHeader = false,
    showFooter = true,
    headerChildren,
}) => (
    <>
        <Head>
            <title>
                {pageTitle} - {publicRuntimeConfig.APP_NAME}
            </title>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
        </Head>
        <div className={layoutStyle}>
            {showHeader && <Header>{headerChildren}</Header>}
            <div className={pageContextStyle}>{children}</div>
            {showFooter && <FooterNavigation />}
        </div>
    </>
);

export default PageLayout;
