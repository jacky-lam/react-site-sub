//import App from 'next/app';
import React from 'react';

import 'common/theme/global.css';

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

// This disables the ability to perform automatic static optimization
/*
MyApp.getInitialProps = async (appContext) => {

    // some code here
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps };
};*/

export default MyApp;
