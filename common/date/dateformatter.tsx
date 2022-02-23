import moment from 'moment';

const monthShortname: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

/**
 * Format the ISO date string to any date string in UTC
 */
export const formatIsoDateString = (
    isoDateTime: string,
    formatString: string,
): string => {
    return moment.utc(isoDateTime).format(formatString);
};

// Date object to YYYY-MM-DD
export const dateToString = (date: Date): string => {
    const month = date.getMonth() + 1;
    return (
        date.getFullYear() +
        '-' +
        (month < 10 ? '0' : '') +
        month +
        '-' +
        (date.getDate() < 10 ? '0' : '') +
        date.getDate()
    );
};

export const formatDateToShortString = (date: Date | string): string => {
    let dateValue = typeof date == 'string' ? stringToDate(date) : date;
    if (dateValue != null) {
        return (
            dateValue.getDate() +
            ' ' +
            monthShortname[dateValue.getMonth()] +
            ' ' +
            dateValue.getFullYear().toString().slice(-2)
        );
    }
    return '';
};

// String YYYY-MM-DD to Date
export const stringToDate = (dateString: string): Date | null => {
    const d = new Date(dateString);
    if (d instanceof Date && !isNaN(d.getTime())) return d;
    return null;
};
