import React from 'react';
import { cx } from 'emotion';

interface IMaterialIconProps {
    /**
     * The Material Icon to display.
     *
     * Can be the name of any icon specified [here](https://material.io/tools/icons/).
     */
    iconType: string;

    /**
     * Class names to apply on the icon. Can be used to stylize and re-color the icon.
     */
    className?: string;
}

const MaterialIcon: React.FunctionComponent<IMaterialIconProps> = ({
    iconType,
    className,
}) => {
    return <i className={cx('material-icons', className)}>{iconType}</i>;
};

export default MaterialIcon;
