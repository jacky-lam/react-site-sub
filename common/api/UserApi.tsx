import { AxiosRequestConfig, AxiosResponse } from 'axios';

import request from 'common/request';
import { storeAuthentication } from 'common/auth/authenticationUtils';
import { storeUserData } from 'common/auth/userDataUtils';

import BaseApi from './BaseApi';

type LoginResponse = {
    success: boolean;
    errorMessage: string;
};

type RegisterResponse = {
    success: boolean;
    errorMessage: string;
};

class UserApi extends BaseApi {
    // login
    login = async (
        username: string,
        password: string,
    ): Promise<LoginResponse | null> => {
        // setup config
        const config: AxiosRequestConfig = {
            headers: this.getHeader(),
        };

        try {
            const response: AxiosResponse = await request.post(
                this.invesmentApi + '/user/login',
                {
                    username: username,
                    password: password,
                },
                config,
            );

            if (response.data.token) {
                storeAuthentication(response.data.token);
                storeUserData({ region: {}, sector: {} });

                return {
                    success: true,
                    errorMessage: '',
                };
            } else {
                return {
                    success: false,
                    errorMessage: 'User token was not returned',
                };
            }
        } catch (err) {
            if (err.response) {
                return {
                    success: false,
                    errorMessage:
                        err.response.status +
                        (err.response.status == 400
                            ? ' Invalid username/password'
                            : ' Server problem'),
                };
            }
        }
        return {
            success: false,
            errorMessage: 'No response from server',
        };
    };

    // register
    register = async (registerParams: {
        firstName: string;
        lastName: string;
        emailAddress: string;
        loginName: string;
        password: string;
        baseCurrencyCode: string;
        betaKey: string;
    }): Promise<RegisterResponse | null> => {
        // setup config
        const config: AxiosRequestConfig = {
            headers: this.getHeader(),
        };

        try {
            const response: AxiosResponse = await request.post(
                this.invesmentApi + '/user/register',
                {
                    firstName: registerParams.firstName,
                    lastName: registerParams.lastName,
                    emailAddress: registerParams.emailAddress,
                    loginName: registerParams.loginName,
                    password: registerParams.password,
                    baseCurrencyCode: registerParams.baseCurrencyCode,
                    betaKey: registerParams.betaKey,
                },
                config,
            );

            if (response.data.token) {
                storeAuthentication(response.data.token);

                return {
                    success: true,
                    errorMessage: '',
                };
            } else {
                return {
                    success: false,
                    errorMessage: 'User token was not returned',
                };
            }
        } catch (err) {
            if (err.response) {
                return {
                    success: false,
                    errorMessage:
                        err.response.status + ': ' + err.response.data.message,
                };
            }
        }
        return {
            success: false,
            errorMessage: 'No response from server',
        };
    };

    // set persona
    setPersona = async (
        personaParam: {
            regions?: string[];
            sectors?: string[];
        },
        onSuccessFunc: (response: AxiosResponse) => void,
        onFailFunc: (response: AxiosResponse) => void,
    ): Promise<AxiosResponse | null> => {
        // setup config
        const config: AxiosRequestConfig = {
            headers: this.getHeader(),
        };

        try {
            let response = await request.post(
                this.invesmentApi + '/user/set-persona',
                personaParam,
                config,
            );
            if (response.status != 200) {
                onFailFunc(response);
            } else {
                onSuccessFunc(response);
            }
            return response;
        } catch (err) {
            this.info('Failed setPersona', err);
        }
        return null;
    };
}

export default new UserApi(); //singleton
