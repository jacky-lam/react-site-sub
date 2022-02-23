export const convertCurrency = (
    fromCurrencyCode: string,
    fromAmount: number,
    toCurrencyCode: string,
): number => {
    return fromAmount;
};

export const formatNumberWithComma = (value: number | string): string => {
    //return value.toLocaleString('en'); // standard JS format number
    //return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // format number & decimal
    return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','); // format number, exclude decimal
};

// Round closest dp
export const roundDecimalPlace = (
    value: number,
    decimalPlace: number = 8, //default to prevent JS problems
): number => {
    var multiplier = Math.pow(10, decimalPlace || 0);
    return Math.round(value * multiplier) / multiplier;
};

// Always round up (used for showing total fee/cost related)
export const roundUpDecimalPlace = (
    value: number,
    decimalPlace: number = 8, //default to prevent JS problems
): number => {
    var multiplier = Math.pow(10, decimalPlace || 0);
    return Math.ceil(value * multiplier) / multiplier;
};

export const currencyCodeToSymbol = (
    code: string,
    valueType: 'TEXT' | 'HTML_CODE' = 'TEXT',
): string => {
    switch (code) {
        case 'CNY':
            return valueType == 'TEXT' ? '¥' : '&yen;';
        case 'EUR':
            return valueType == 'TEXT' ? '€' : '&euro;';
        case 'GBP':
            return valueType == 'TEXT' ? '£' : '&#163;';
        case 'GBX':
            return valueType == 'TEXT' ? 'GBp' : '&yen;';
        case 'JPY':
            return valueType == 'TEXT' ? '¥' : '&yen;';
        case 'USD':
            return valueType == 'TEXT' ? '$' : '&#36';
    }
    return code;
};

// Return shorten number with post-fix text ( e.g. value = 1,500,000, will return {value: 1.5, unitType: "Billion"} )
export const formatShortNumber = (
    value: number,
    unitTypeFormat: 'WORD' | 'SYMBOL' = 'WORD',
): { value: number; unitType: string } => {
    // only allow 3 digits max
    const maxDigit = (value: number) => {
        if (value >= 100) {
            return roundUpDecimalPlace(value, 0);
        }
        return value;
    };

    // Nine Zeroes for Billions
    return Math.abs(value) >= 1.0e12
        ? {
              value: roundUpDecimalPlace(value / 1.0e12, 1),
              unitType: unitTypeFormat === 'WORD' ? 'Trillion' : 'T',
          }
        : Math.abs(value) >= 1.0e9
        ? {
              value: roundUpDecimalPlace(value / 1.0e9, 1),
              unitType: unitTypeFormat === 'WORD' ? 'Billion' : 'B',
          }
        : // Six Zeroes for Millions
        Math.abs(value) >= 1.0e6
        ? {
              value: maxDigit(roundUpDecimalPlace(value / 1.0e6, 1)),
              unitType: unitTypeFormat === 'WORD' ? 'Million' : 'M',
          }
        : // Three Zeroes for Thousands
        Math.abs(value) >= 1.0e3
        ? {
              value: maxDigit(roundUpDecimalPlace(value / 1.0e3, 1)),
              unitType: unitTypeFormat === 'WORD' ? 'K' : 'K',
          }
        : { value: value, unitType: '' };
};
