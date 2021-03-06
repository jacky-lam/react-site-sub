module.exports = {
    serverRuntimeConfig: {
        INVESTMENT_API_URL: process.env.INVESTMENT_API_URL_SERVER,
    },
    publicRuntimeConfig: {
        APP_NAME: 'Investment Platform',
        INVESTMENT_API_URL: process.env.INVESTMENT_API_URL_PUBLIC,
        USER_TOKEN: '',
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        // Important: return the modified config
        config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

        return config;
    },
    webpackDevMiddleware: (config) => {
        // Perform customizations to webpack dev middleware config
        // Important: return the modified config
        return config;
    },
    devIndicators: {
        autoPrerender: false,
    },
    compress: true,
};
