import React from 'react';
import { css, cx } from 'emotion';

import theme from 'common/theme';
import { sendAnalytics, AnalyticsMetadata } from 'common/analytic';

import MaterialIcon from 'components/icon/MaterialIcon';

const inputStyle = css`
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
`;

const buttonWrapperStyle = css`
    display: inline-block;
    text-align: left;
    position: relative;
    border: 1px solid ${theme.color.primaryBorderColor};
    border-radius: 6px;
    background-color: #ffffff;
`;
const activeButtonWrapperStyle = css`
    ${buttonWrapperStyle};
    background-color: ${theme.color.primaryActionActiveButtonBackground};
    border: 0;
`;

const iconStyle = css`
    float: left;
    color: ${theme.color.primaryActionButtonText};
`;

type CheckboxProps = {
    className?: string;
    clickableCode: string;
    analyticsMetadata?: AnalyticsMetadata;
    isChecked?: boolean;
    onChange?: (event?: React.ChangeEvent<HTMLElement>) => void;
    size?: 'SMALL' | 'MEDIUM' | 'LARGE';
    stopClickPropagation?: boolean;
};

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
    className,
    clickableCode,
    analyticsMetadata,
    isChecked,
    onChange = () => {},
    size = 'SMALL',
    stopClickPropagation = true,
}) => {
    console.log('Rendering Checkbox ...');
    const onClickEvent = (event: React.ChangeEvent<HTMLElement>) => {
        if (analyticsMetadata) {
            sendAnalytics({ analytics: analyticsMetadata });
        } else {
            sendAnalytics({ analytics: { code: clickableCode } });
        }
        onChange(event);
    };
    let sizePx = '25px';
    switch (size) {
        case 'MEDIUM':
            sizePx = '35px';
            break;
        case 'LARGE':
            sizePx = '45px';
            break;
    }
    return (
        <label
            className={cx(
                isChecked ? activeButtonWrapperStyle : buttonWrapperStyle,
                css`
                    height: ${sizePx};
                    width: ${sizePx};
                `,
                className,
            )}
        >
            {isChecked && (
                <MaterialIcon
                    iconType="done"
                    className={cx(
                        iconStyle,
                        css`
                            font-size: ${sizePx};
                        `,
                    )}
                />
            )}
            <input
                type="checkbox"
                className={inputStyle}
                checked={isChecked}
                onChange={onClickEvent}
                onClick={
                    stopClickPropagation
                        ? (event: React.MouseEvent<HTMLElement>) => {
                              event.stopPropagation();
                          }
                        : undefined
                }
            />
        </label>
    );
};

export default Checkbox;
