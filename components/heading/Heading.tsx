import { css, cx } from 'emotion';
import React, { ReactNode } from 'react';

import theme from 'common/theme';

const titleBaseStyle = css`
    padding: 0px;
    margin: 0px;
`;

const titleOneStyle = css`
    ${titleBaseStyle};
    font-size: ${theme.font.title1MobileTextSize}px;

    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        font-size: ${theme.font.title1TextSize}px;
    }
`;

const titleTwoStyle = css`
    ${titleBaseStyle};
    font-size: ${theme.font.title2MobileTextSize}px;

    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        font-size: ${theme.font.title2TextSize}px;
    }
`;

const titleThreeStyle = css`
    ${titleBaseStyle};
    font-size: ${theme.font.title3MobileTextSize}px;

    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        font-size: ${theme.font.title3TextSize}px;
    }
`;

const titleFourStyle = css`
    ${titleBaseStyle};
    font-size: ${theme.font.title4MobileTextSize}px;

    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        font-size: ${theme.font.title4TextSize}px;
    }
`;

const contentOneStyle = css`
    font-size: ${theme.font.largeTextSize}px;

    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        font-size: ${theme.font.largeTextSize + 4}px;
    }
`;
const contentTwoStyle = css`
    font-size: ${theme.font.normalTextSize}px;

    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        font-size: ${theme.font.normalTextSize + 4}px;
    }
`;
const contentThreeStyle = css`
    font-size: ${theme.font.smallTextSize}px;

    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        font-size: ${theme.font.normalTextSize + 4}px;
    }
`;

type IHeadingProps = {
    /**
     * Classname to append
     */
    className?: string;

    /**
     * Content of heading.
     */
    children: ReactNode;

    /**
     * Heading tag level (e.g. H1, H2, H3, H4, H5, H6)
     */
    level?: 1 | 2 | 3 | 4 | 5 | 6;

    /**
     * The styling of heading. Corresponds to our theming variables.
     */
    fontStyle:
        | 'content1'
        | 'content2'
        | 'content3'
        | 'title1'
        | 'title2'
        | 'title3'
        | 'title4';

    /**
     * Title on element
     */
    title?: string;
};

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingRef = HTMLHeadingElement;

const Heading = React.forwardRef<HeadingRef, IHeadingProps>(
    ({ className, children, level, fontStyle, title }, ref) => {
        const Tag = level ? (`h${level}` as HeadingTag) : 'div';

        // font style
        let headingClassName = titleOneStyle;
        if (fontStyle == 'title2') headingClassName = titleTwoStyle;
        if (fontStyle == 'title3') headingClassName = titleThreeStyle;
        if (fontStyle == 'title4') headingClassName = titleFourStyle;
        if (fontStyle == 'content1') headingClassName = contentOneStyle;
        if (fontStyle == 'content2') headingClassName = contentTwoStyle;
        if (fontStyle == 'content3') headingClassName = contentThreeStyle;

        if (className) headingClassName = cx(headingClassName, className);

        let elementProps: any = {};
        elementProps.className = headingClassName;
        if (title) elementProps.title = title;

        return (
            <Tag {...elementProps} ref={ref}>
                {children}
            </Tag>
        );
    },
);

export default Heading;
