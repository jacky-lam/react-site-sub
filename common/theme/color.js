const colors = {
    navy: '#05145d',
    navyRgb: '5,20,93',

    // purple: '#c9cdf0',

    blue: '#1a71bf',
    blueDark: '#1a2abf',
    bluePale: '#c4e2ff',
    blueTeal: '#24afc7',
    // blueTealRgb: '36,175,199',
    // blueTealPale: '#46b5ec',

    // green: '#00a08d',
    greenDark: '#007b6c',

    greenTeal: '#029e82',
    greenTealRgb: '2,158,130',
    greenTealPale: '#03c3a1',
};

export default {
    // Header
    primaryHeaderBackground: '#FFFFFF',
    primaryHeaderText: colors.greenTealPale,
    primaryHeaderActiveText: colors.navy,
    primaryHeaderInactiveText: '#9b9b9b',
    primaryHeaderBorder: colors.navy,

    subHeaderBackground: '#efefef',

    // Footer
    footerActiveColor: colors.greenTeal,
    footerNonActiveColor: colors.navy,

    // background/pane/sections
    primarySectionBackground: colors.bluePale,
    secondarySectionBackground: '#fff7e9', // pale cream
    secondaryParagraphBackground: '#efefef', // pale grey

    // Text - primary
    primaryActionText: colors.blueDark,
    primaryActiveActionText: colors.greenDark,
    primaryInactiveActionText: '#9b9b9b',

    // Button - primary
    primaryActionButtonBackground: colors.blue,
    primaryActionActiveButtonBackground: colors.greenTeal,
    primaryActionButtonText: '#ffffff',

    // Button - secondary
    secondaryActionText: colors.blueTeal,
    secondaryActionButtonBackground: colors.blueTeal,
    secondaryActionButtonText: '#ffffff',
    secondaryActionActiveButtonBackground: colors.greenTeal,
    secondaryActionActiveButtonBackgroundRgb: colors.greenTealRgb,
    secondaryActionActiveButtonText: '#000000',

    // Button - other
    otherActionButtonBackground: '#adadad',
    otherActionButtonText: '#ffffff',

    // Border
    primaryBorderColor: '#000000',
    secondaryBorderColor: '#adadad',
    inactiveBorderColor: '#adadad',

    // Error & Success text
    errorText: '#EE000A',
    errorActiveText: '#C00000', // darker than errorText
    errorBackground: '#ff454e', // lighter than errorText
    errorBackgroundText: '#ffffff',

    successText: '#008761',
    successBackground: '#33c670',
    successBackgroundText: '#ffffff',

    positiveText: '#008761',
    negativeText: '#C00000',

    // Header title
    sectionTitle: colors.navy,

    // label
    tableLabel: '#606060',

    // Neutral text
    neutralText: '#050A3A',
    neutralTextRgb: '5, 10, 58',

    // Notification
    notificationBackground: '#ff8066', //salmon pink
    notificationBackgroundText: '#ffffff',

    // popup modal
    primaryPopupModalBackground: '#ffffff',
    overlayBackgroundRgba: '56,56,56,0.5',
    popupShadow: '#b8b8b8',

    // Chart
    chartBlue: '#1b73e8',
    chartBlueRgb: '27,115,232',
    chartGreen: '#00a651',
    chartGreenRgb: '0,166,81',
    chartOrange: '#ed9821',
    chartOrangeRgb: '237,152,33',
    chartRed: '#d12411',
    chartRedRgb: '209,36,17',
    chartGrey: '#606060',
    chartGreyRgb: '96,96,96',
    chartPurple: '#6a0dad',
    chartPurpleRgb: '106,13,173',

    dataType: {
        yield: '#d5a5bd', // purple
        yieldRgb: '213, 165, 189',
        cost: '#a7cae9', // blue
        costRgb: '167, 202, 233',
        pnl: '#f9cb9b', // orange
        pnlRgb: '249, 203, 155',
        value: '#f9cb9b', // orange
        valueRgb: '249, 203, 155',
    },

    sector: {
        basic_materials: '#da7a6e', // pale red
        consumer_cyclicals: '#ffd5a1', //pale orange
        consumer_defensive: '#cf9d5f', //light brown
        financial_services: '#97ffba', // light green
        communication_services: '#ffe479', // pale yellow
        technology: '#a3c5ff', // light blue
        utilities: '#ffb0cf', // light pink
        industrials: '#adaabd', // light grey purple
        real_estate: '#e1a8ff', // light purple
        energy: '#b3fff0', // light teal
        healthcare: '#ff8066', // salmon
    },

    region: {
        north_america: '#c3d1fd', // pale blue
        latin_america: '#d5f5f9', // pale teal
        united_kingdom: '#dec7ff', // pale purple
        europe_developed: '#a9edc2', // light green (slightly darker)
        europe_emerging: '#ccfdde', // light green
        africa_middle_east: '#f8e8d7', //pale cream
        asia_developed: '#fbc3c3', // pale red (slightly darker)
        asia_emerging: '#ffdce8', // pale red
        australasia: '#d5fbbf', // pale green
        japan: '#ffb7e4', // pale pink
    },

    productType: {
        stock: '#1b73e8', // chart blue
        stockRgb: '27,115,232',
        bond: '#6a0dad', // chart purple
        bondRgb: '106,13,173',
        cash: '#00a651', // chart green
        cashRgb: '0,166,81',
        other: '#ed9821', // chart orange
        otherRgb: '237,152,33',
        unknown: '#606060', // chart grey
        unknownRgb: '96,96,96',
    },
};
