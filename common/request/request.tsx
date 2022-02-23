/**
 *
 * Standardise how requests are built
 * - handles outputting errors
 */
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

/*
const appendURL = (url: string, param: any): string => {
  const urlObject = new URL(url);

  Object.entries(param).forEach(([key, value]) => {
    urlObject.searchParams.append(key, String(value));
  });

  return urlObject.toString();
};*/

/**
 * Todo
 * - Need to standardise the:
 *    - Header setup
 *    - Building urls
 *    - Format Request parameters:
 *      - for GETS and POST
 *    - Format the Response returned:
 *      - json
 *    - number of retry
 */
const get = async (
    url: string,
    config?: AxiosRequestConfig,
): Promise<AxiosResponse> =>
    new Promise((resolve, reject) => {
        axios
            .get(url, config)
            .then((response: AxiosResponse) => {
                resolve(response);
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('Response error', error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.error('Request error', error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error', error.message);
                }
                reject(error);
            });
    });

const post = async (
    url: string,
    data: any,
    config?: AxiosRequestConfig,
): Promise<AxiosResponse> =>
    new Promise((resolve, reject) => {
        axios
            .post(url, data, config)
            .then((response: AxiosResponse) => {
                resolve(response);
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('Response error', error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.error('Request error', error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error', error.message);
                }
                reject(error);
            });
    });

export default {
    get,
    post,
};
