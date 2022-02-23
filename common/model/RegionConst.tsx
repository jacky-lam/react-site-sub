import theme from 'common/theme';

export const regionKeyName: Record<string, string> = {
    // TODO: Need to support multi-language
    north_america: 'North America',
    latin_america: 'Latin America',
    united_kingdom: 'United Kingdom',
    europe_developed: 'Europe Developed',
    europe_emerging: 'Europe Emerging',
    africa_middle_east: 'Middle East/ Africa',
    asia_developed: 'Asia Developed',
    asia_emerging: 'Asia Emerging',
    japan: 'Japan',
    australasia: 'Australasia',
};

export const regionKeyColor: Record<string, string> = {
    north_america: theme.color.region.north_america,
    latin_america: theme.color.region.latin_america,
    united_kingdom: theme.color.region.united_kingdom,
    europe_developed: theme.color.region.europe_developed,
    europe_emerging: theme.color.region.europe_emerging,
    africa_middle_east: theme.color.region.africa_middle_east,
    asia_developed: theme.color.region.asia_developed,
    asia_emerging: theme.color.region.asia_emerging,
    australasia: theme.color.region.australasia,
    japan: theme.color.region.japan,
};
