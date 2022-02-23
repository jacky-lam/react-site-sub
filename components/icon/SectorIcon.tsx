import React from 'react';
import { css, cx } from 'emotion';

import { sectorIconSrc, sectorKeyColor } from 'common/model/SectorConst';

const iconWrapperStyle = css`
    width: 100%;
    height: 100%;
`;

const iconStyle = css`
    width: 100%;
    height: 100%;
`;

interface SectorIconProps {
    sector: string;
    className?: string;
}

const SectorIcon: React.FunctionComponent<SectorIconProps> = ({
    sector,
    className,
}) => {
    let iconSrc = sectorIconSrc[sector] ?? '';
    return (
        <div className={cx(iconWrapperStyle, className)}>
            <img
                src={iconSrc}
                className={cx(
                    iconStyle,
                    css`
                        background-color: ${sectorKeyColor[sector]};
                    `,
                )}
            />
        </div>
    );
};

export default SectorIcon;
