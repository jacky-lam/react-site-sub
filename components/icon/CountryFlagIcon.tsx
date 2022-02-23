import React from 'react';
import { css, cx } from 'emotion';

import { countryIsoFlagIconSrc } from 'common/model/CountryConst';

const flagIconWrapperStyle = css`
    width: 100%;
    height: 100%;
    position: relative;
`;

const flagIconStyle = css`
    max-width: 100%;
    max-height: 100%;
`;
const flagIconCoverStyle = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 25% 0%;
`;

interface CountryFlagIconProps {
    countryISO: string;
    className?: string;
    fullCover?: boolean;
}

const CountryFlagIcon: React.FunctionComponent<CountryFlagIconProps> = ({
    countryISO,
    className,
    fullCover = false,
}) => {
    let iconSrc = countryIsoFlagIconSrc[countryISO] ?? countryIsoFlagIconSrc.US;
    return (
        <div className={cx(flagIconWrapperStyle, className)}>
            <div
                className={cx(
                    fullCover ? flagIconCoverStyle : flagIconStyle,
                    css`
                        background-image: url(${iconSrc});
                    `,
                )}
            />
        </div>
    );
};

export default CountryFlagIcon;
