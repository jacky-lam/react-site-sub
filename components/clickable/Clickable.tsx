import React, { ReactNode } from 'react';
import Link from 'next/link';

import { AnalyticsMetadata, sendAnalytics } from 'common/analytic';
/**
 * Single place to create clickable events
 * - single place to manage click analytic-events
 * -
 */

/**
 *
 * Common Styling for Buttons
 *
 * - Apart from the predictable colour varieties (including hover & active & loading state)
 * - Padding vs Width - There are some anchors/buttons where I want specific width specified (text center), but in most cases I would want padding
 *    - padding is not always the same, some places i want more padding, some places i want more padding on the left-right than top-bottom.
 * - Font-size: must be specified, as different places rely on different font-size (ideally minimum is 'normalTextSize')
 * - Re-size based on mobile - buttons on mobile should shrink abit (including padding). Width based would need to be manually specified
 *
 *
 * Suggested props:
 * - buttonTheme: [primaryButton, secondaryButton, primaryAnchor, secondaryAnchor, custom]
 *    - they need 'isEnabled/Disabled' colouring
 * - Material Icon (as icon size will need to be responsive, if we're making the font-size responsive)
 *
 * (padding)
 * - Padding size top-bottom ? : (sm, md, lg)
 * - padding size left-right ? : (sm, md, lg)
 *
 * (manual size)
 * - width ? : number (px or 100%)
 * - height ?: number (px or 100%)
 * - text-align: 'center' | 'left' | 'right'
 *
 *
 * Fully customisable Clickable - buttonTheme = 'custom'
 * - only one prop: className
 *
 */

interface IClickableProps {
    /**
     * Additional metadata that we want to attach to the analytics event on click.
     *
     * All properties are optional.
     *
     *
     */
    analyticsMetadata?: AnalyticsMetadata;

    /**
     * Component to embed into the element
     */
    children?: ReactNode | string;

    /**
     * Code representing this button - used for analytics
     */
    clickableCode: string;

    /**
     * Styles to apply on this element.
     */
    className?: string;

    /**
     * The type of the element: 'a' for links, 'button' for actions
     */
    elementType: 'a' | 'button';

    /**
     * Ref set on button
     */
    forwardRef?: React.RefObject<HTMLButtonElement | HTMLAnchorElement>;

    /**
     * href attribute. Only applies to <a> elementTypes.
     */
    href?: string;

    /**
     * Is this button enabled? Propagates as <button>'s `disabled` attribute.
     * Only applies to <button> elements.
     */
    isEnabled?: boolean;

    /**
     * Name property of the button
     */
    name?: string;

    /**
     * Callback when this button activates.
     */
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;

    /**
     * rel attribute. Only applies to <a> elements.
     */
    rel?: string;

    /**
     * target attribute. Only applies to <a> elements.
     */
    target?: '_self' | '_blank' | '_parent' | '_top';

    /**
     * Optional string to render in a `data-testid` attribute to allow element to
     * be found in tests
     */
    testId?: string;

    /**
     * The button's title. Note: this is used as the tooltip, not as the label.
     */
    title?: string;
}

const Clickable: React.FunctionComponent<IClickableProps> = ({
    analyticsMetadata,
    children,
    className,
    elementType,
    forwardRef,
    href = '',
    isEnabled = true,
    clickableCode,
    name = undefined,
    onClick = () => {},
    rel,
    target,
    testId,
    title,
}) => {
    let newOnClick = (event: React.MouseEvent<HTMLElement>) => {
        if (analyticsMetadata) {
            sendAnalytics({ analytics: analyticsMetadata });
        } else {
            sendAnalytics({ analytics: { code: clickableCode } });
        }
        onClick(event);
    };

    if (elementType === 'button') {
        return (
            <button
                className={className}
                data-testid={testId}
                disabled={!isEnabled}
                name={name}
                key={clickableCode}
                onClick={(event) => {
                    if (!event.currentTarget.disabled) newOnClick(event);
                }}
                title={title}
                ref={
                    forwardRef
                        ? (forwardRef as React.RefObject<HTMLButtonElement>)
                        : undefined
                }
            >
                {children}
            </button>
        );
    } else {
        return (
            <Link key={clickableCode} href={href}>
                <a
                    className={className}
                    data-testid={testId}
                    href={href}
                    key={clickableCode}
                    onClick={newOnClick}
                    rel={rel}
                    ref={
                        forwardRef
                            ? (forwardRef as React.RefObject<HTMLAnchorElement>)
                            : undefined
                    }
                    target={target}
                    title={title}
                >
                    {children}
                </a>
            </Link>
        );
    }
};

export default Clickable;
