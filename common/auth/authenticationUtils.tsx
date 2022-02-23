import { NextPageContext } from 'next';
import getConfig, { setConfig } from 'next/config';
import Router from 'next/router';
import { Cookies } from 'react-cookie';

/**
 *
 * Hacky way of authenticating (until I have a stateful auth server?)
 * 1. token is stored in cookie (so its permanent) & environment variable
 * 2. on server-side page render: token is copied from the cookie into environment variable - our API classes don't need to access the cookie anymore
 * 3. on client-side: token is loaded from cookie
 */

// TODO - Dunno the best way to do this
export const pageAuthentication = (ctx: NextPageContext): void => {
    let redirectFunc = null;
    if (ctx.res) {
        // server-side
        redirectFunc = () => {
            ctx.res?.writeHead(302, { Location: '/login' });
            ctx.res?.end();
        };
    } else {
        // client-side
        redirectFunc = () => {
            Router.push('/login');
        };
    }

    loadAuthentication(
        redirectFunc,
        ctx.req ? ctx.req.headers.cookie : undefined,
    );
};

// store it in cooke & the runtime environment variable
export const storeAuthentication = (token: string): void => {
    console.log('Storing authentication: ' + token);
    const cookies = new Cookies();
    cookies.set('user_token', token);

    const config = getConfig();
    config.publicRuntimeConfig = {
        ...config.publicRuntimeConfig,
        USER_TOKEN: token,
    };
    setConfig(config);
};

// load from cookie into runtime environment variable
const loadAuthentication = (
    redirectUnauthorisedToLoginFunc: () => void | undefined,
    serverCookie: string | undefined,
): void => {
    const cookies = serverCookie ? new Cookies(serverCookie) : new Cookies();
    const token = cookies.get('user_token');

    console.log('Loading authentication: ' + token);
    if (token) {
        // TODO - call server to check if token has exipred

        const config = getConfig();
        config.publicRuntimeConfig = {
            ...config.publicRuntimeConfig,
            USER_TOKEN: token,
        };
        setConfig(config);
    } else if (redirectUnauthorisedToLoginFunc) {
        console.log('calling redirect');
        redirectUnauthorisedToLoginFunc();
    }
};

// remove authentication
export const removeAuthentication = (
    serverCookie?: string | undefined,
): void => {
    // remove from cookie
    const cookies = serverCookie ? new Cookies(serverCookie) : new Cookies();
    cookies.remove('user_token');

    // remove from environment variable
    const config = getConfig();
    config.publicRuntimeConfig = {
        ...config.publicRuntimeConfig,
        USER_TOKEN: '',
    };
    setConfig(config);
    // ^^^ TODO - BUG: this only removes client-side's env-variable (when called by client) - doesn't remove server-side
    // - should maybe redirect to a logout page that kills both client & server side's env-var
    // - or ideally, call auth-server to invalidate this session (by killing it); but we are currently stateless server

    console.log('removed authentication');
};

// load from runtime environment variable
export const getAuthenticationToken = (): string | undefined => {
    // TODO - server-side (this is not deleted when called 'removeAuthentication()' from client-side)
    const { publicRuntimeConfig } = getConfig();
    if (publicRuntimeConfig.USER_TOKEN) {
        console.log('publicRuntimeConfig.USER_TOKEN still alive!');
        return publicRuntimeConfig.USER_TOKEN;
    }

    // client-side
    const cookies = new Cookies();
    const token = cookies.get('user_token');
    if (token) return token;

    // nowhere
    return undefined;
};
