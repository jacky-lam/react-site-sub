export type AnalyticsMetadata = {
    // Typescript does not support exclusive typing (e.g. A xor B xor C). the use of 'never' is not a scalable solution
    code: string;
    tickerId?: number;
    sortBy?: string;
};

export const sendAnalytics = (props: { analytics: AnalyticsMetadata }) => {
    //TODO - conslidate with click
};
