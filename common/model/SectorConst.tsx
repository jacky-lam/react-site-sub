import theme from 'common/theme';

export const sectorKeyName: Record<string, string> = {
    consumer_cyclicals: 'Consumer Cyclicals',
    basic_materials: 'Basic Materials',
    consumer_defensive: 'Consumer Defensive',
    financial_services: 'Financial Services',
    communication_services: 'Communication Services',
    technology: 'Technology',
    utilities: 'Utilities',
    industrials: 'Industrials',
    real_estate: 'Real Estate',
    energy: 'Energy',
    healthcare: 'Healthcare',
};

export const sectorKeyColor: Record<string, string> = {
    consumer_cyclicals: theme.color.sector.consumer_cyclicals,
    basic_materials: theme.color.sector.basic_materials,
    consumer_defensive: theme.color.sector.consumer_defensive,
    financial_services: theme.color.sector.financial_services,
    communication_services: theme.color.sector.communication_services,
    technology: theme.color.sector.technology,
    utilities: theme.color.sector.utilities,
    industrials: theme.color.sector.industrials,
    real_estate: theme.color.sector.real_estate,
    energy: theme.color.sector.energy,
    healthcare: theme.color.sector.healthcare,
};

export const sectorIconSrc: Record<string, string> = {
    consumer_cyclicals: '/icons/sector/sector_tech.svg',
    basic_materials: '/icons/sector/sector_tech.svg',
    consumer_defensive: '/icons/sector/sector_tech.svg',
    financial_services: '/icons/sector/sector_tech.svg',
    communication_services: '/icons/sector/sector_tech.svg',
    technology: '/icons/sector/sector_tech.svg',
    utilities: '/icons/sector/sector_tech.svg',
    industrials: '/icons/sector/sector_tech.svg',
    real_estate: '/icons/sector/sector_tech.svg',
    energy: '/icons/sector/sector_tech.svg',
    healthcare: '/icons/sector/sector_tech.svg',
};

export type GicsSector = {
    name: string;
    code: string;
};
export type GicsIndustryGroup = {
    name: string;
    code: string;
    gicsSector: string;
};
export type GicsIndustry = {
    name: string;
    code: string;
    gicsIndustryGroup: string;
};
