import React, { ReactNode } from 'react';
import { css, cx } from 'emotion';

import theme from 'common/theme';
import Clickable from 'components/clickable';
import MaterialIcon from 'components/icon/MaterialIcon';

const headerHeight = 40;

// button wrapper - base
const headerNavButtonBaseStyle = css`
    position: relative;
    display: inline-block;
    background-color: transparent;
    text-align: center;
    vertical-align: middle;
    height: 100%;
    cursor: pointer;
    color: ${theme.color.primaryHeaderText};

    &[disabled] {
        color: ${theme.color.primaryHeaderInactiveText};
        cursor: default;
    }
`;
const headerNavButtonActiveColorStyle = css`
    color: ${theme.color.primaryHeaderActiveText};
`;

// button wrapper - label is inline left-right
const headerNavButtonBaseInlinePaddingStyle = css`
    line-height: ${headerHeight - 2 * theme.spacing.xs}px;
    padding: ${theme.spacing.xs}px ${theme.spacing.xs}px;

    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        line-height: ${headerHeight - 2 * theme.spacing.xs}px;
        padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
    }
`;
const headerNavButtonLeftInlineStyle = css`
    ${headerNavButtonBaseStyle};
    ${headerNavButtonBaseInlinePaddingStyle};
    float: left;
`;
const headerNavButtonRightInlineStyle = css`
    ${headerNavButtonBaseStyle};
    ${headerNavButtonBaseInlinePaddingStyle};
    float: right;
`;
// button wrapper - label is top-bottom
const headerNavButtonBaseTopBottomPaddingStyle = css`
    line-height: ${headerHeight - theme.spacing.sm}px;
    padding: ${theme.spacing.xs}px ${theme.spacing.xs}px;
    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        line-height: normal;
        padding: ${theme.spacing.xs}px ${theme.spacing.md}px;
    }
`;
const headerNavButtonLeftTopBottomStyle = css`
    ${headerNavButtonBaseStyle};
    ${headerNavButtonBaseTopBottomPaddingStyle};
    float: left;
`;
const headerNavButtonRightTopBottomStyle = css`
    ${headerNavButtonBaseStyle};
    ${headerNavButtonBaseTopBottomPaddingStyle};
    float: right;
`;

// icon
const iconStyle = css`
    vertical-align: middle;
    font-size: ${theme.font.largeTextSize + 4}px;
`;
const iconTopBottomStyle = css`
    ${iconStyle}

    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        font-size: ${theme.font.normalTextSize}px;
    }
`;

// label - left-right
const labelInlineBaseStyle = css`
    display: none;
    vertical-align: middle;

    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        display: inline-block;
        font-size: ${theme.font.largeTextSize}px;
    }
`;
const labelLeftInlineStyle = css`
    ${labelInlineBaseStyle};
    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        margin-right: ${theme.spacing.sm}px;
    }
`;
const labelRightInlineStyle = css`
    ${labelInlineBaseStyle};
    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        margin-left: ${theme.spacing.sm}px;
    }
`;

// label - top-bottom
const labelBlockBaseStyle = css`
    display: none;
    vertical-align: middle;

    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        display: block;
        font-size: ${theme.font.smallTextSize}px;
    }
`;
const labelTopStyle = css`
    ${labelBlockBaseStyle};
    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        margin-bottom: ${theme.spacing.xs}px;
    }
`;
const labelBottomStyle = css`
    ${labelBlockBaseStyle};
    @media (min-width: ${theme.breakpoint.tabletPortrait}px) {
        margin-top: ${theme.spacing.xs}px;
    }
`;

const getLabelClassName = (
    isLeftButton: boolean,
    labelPosition?: LabelPosition,
): string => {
    switch (labelPosition) {
        case 'TOP':
            return labelTopStyle;
        case 'BOTTOM':
            return labelBottomStyle;
        case 'LEFT':
            return labelLeftInlineStyle;
        case 'RIGHT':
            return labelRightInlineStyle;
        default:
            return isLeftButton ? labelRightInlineStyle : labelLeftInlineStyle;
    }
};

const getButtonClassName = (
    isActiveColor: boolean,
    isLeftButton: boolean,
    labelPosition?: LabelPosition,
): string => {
    let positionStyle = '';
    switch (labelPosition) {
        case 'TOP':
        case 'BOTTOM':
            positionStyle = isLeftButton
                ? headerNavButtonLeftTopBottomStyle
                : headerNavButtonRightTopBottomStyle;
            break;
        default:
            positionStyle = isLeftButton
                ? headerNavButtonLeftInlineStyle
                : headerNavButtonRightInlineStyle;
            break;
    }

    if (isActiveColor)
        return cx(positionStyle, headerNavButtonActiveColorStyle);
    else return positionStyle;
};

type LabelPosition = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT';

// Must provide either: href / onclickfunc
type HeaderNavigationItemProp = {
    label?: string | ReactNode;
    labelPosition?: LabelPosition;
    isLeftButton?: boolean;
    prefixClickableCode: string;
    iconType: string;
    href?: string;
    onClickFunc?: (event: React.MouseEvent<HTMLElement>) => void;
    forwardRef?: React.RefObject<HTMLButtonElement | HTMLAnchorElement>;
    isEnabled?: boolean; // Can trigger on-click
    isActiveColor?: boolean;
    children?: string | ReactNode;
};

const HeaderNavButton: React.FunctionComponent<HeaderNavigationItemProp> = ({
    label,
    labelPosition,
    isLeftButton = true,
    prefixClickableCode,
    iconType,
    href,
    onClickFunc,
    forwardRef,
    isEnabled = true,
    isActiveColor = false,
    children,
}) => (
    <Clickable
        clickableCode={prefixClickableCode + '_headernavbutton'}
        elementType={onClickFunc ? 'button' : 'a'}
        isEnabled={isEnabled}
        className={getButtonClassName(
            isActiveColor,
            isLeftButton,
            labelPosition,
        )}
        href={href}
        onClick={onClickFunc}
        forwardRef={forwardRef ?? undefined}
    >
        {label &&
            (labelPosition == 'TOP' ||
                labelPosition == 'LEFT' ||
                (!isLeftButton && // right-float button, and label position hasn't been specified to be bottom/right
                    labelPosition != 'BOTTOM' &&
                    labelPosition != 'RIGHT')) && (
                <div className={getLabelClassName(isLeftButton, labelPosition)}>
                    {label}
                </div>
            )}
        {!isLeftButton && children}

        <MaterialIcon
            iconType={iconType}
            className={
                labelPosition == 'TOP' || labelPosition == 'BOTTOM'
                    ? iconTopBottomStyle
                    : iconStyle
            }
        />

        {label &&
            (labelPosition == 'RIGHT' ||
                labelPosition == 'BOTTOM' ||
                (isLeftButton && // left-float button, and label position hasn't been specified to be top/left
                    labelPosition != 'TOP' &&
                    labelPosition != 'LEFT')) && (
                <div className={getLabelClassName(isLeftButton, labelPosition)}>
                    {label}
                </div>
            )}
        {isLeftButton && children}
    </Clickable>
);

export default HeaderNavButton;
