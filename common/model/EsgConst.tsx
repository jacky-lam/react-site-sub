import theme from 'common/theme';

export const esgKeyName: Record<string, string> = {
    environmental: 'Environmental',
    social: 'Social',
    governance: 'Governance',
};

export const esgKeyColorRgb: Record<string, string> = {
    environmental: theme.color.chartGreenRgb,
    social: theme.color.chartOrangeRgb,
    governance: theme.color.chartPurpleRgb,
};
