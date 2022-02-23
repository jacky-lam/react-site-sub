import theme from 'common/theme';

export const productTypeKeyName: Record<string, string> = {
    stock: 'Stock',
    bond: 'Bond',
    cash: 'Cash',
    other: 'Others',
    unknown: 'Unknown',
};

export const productTypeKeyColor: Record<string, string> = {
    stock: theme.color.productType.stock,
    bond: theme.color.productType.bond,
    cash: theme.color.productType.cash,
    other: theme.color.productType.other,
    unknown: theme.color.productType.unknown,
};
export const productTypeKeyColorRgb: Record<string, string> = {
    stock: theme.color.productType.stockRgb,
    bond: theme.color.productType.bondRgb,
    cash: theme.color.productType.cashRgb,
    other: theme.color.productType.otherRgb,
    unknown: theme.color.productType.unknownRgb,
};
