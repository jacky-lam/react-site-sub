import getConfig from 'next/config';
import { getAuthenticationToken } from 'common/auth/authenticationUtils';

class BaseApi {
    headers: any;
    invesmentApi: string;
    paramsSerializer: (params: any) => string;
    getHeader: () => any;
    info: (message?: any, ...optionalParams: any[]) => void;
    error: (message?: any, ...optionalParams: any[]) => void;
    debug: (message?: any, ...optionalParams: any[]) => void;

    constructor() {
        const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
        this.invesmentApi =
            serverRuntimeConfig.INVESTMENT_API_URL ??
            publicRuntimeConfig.INVESTMENT_API_URL;
        this.headers = {};

        this.paramsSerializer = (params: any) => {
            // Sample implementation of query string building
            let result = '';
            Object.keys(params).forEach((key) => {
                result += `${key}=${encodeURI(params[key])}&`;
            });
            return result.substr(0, result.length - 1);
        };

        this.getHeader = () => {
            const token = getAuthenticationToken();
            if (token) return { ...this.headers, Authorization: token };
            else return this.headers;
        };

        this.info = (message?: any, ...optionalParams: any[]): void => {
            console.log(message, ...optionalParams);
        };
        this.debug = (message?: any, ...optionalParams: any[]): void => {
            console.debug(message, ...optionalParams);
        };
        this.error = (message?: any, ...optionalParams: any[]): void => {
            console.error(message, ...optionalParams);
        };
    }
}

export default BaseApi;
