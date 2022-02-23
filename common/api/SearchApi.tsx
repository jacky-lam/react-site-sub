import { AxiosRequestConfig } from 'axios';

import type { Ticker, Stock } from 'common/model/Ticker';
import request from 'common/request';
import { CountryIso } from 'common/model/CountryConst';

import BaseApi from './BaseApi';
import {
    GicsIndustry,
    GicsIndustryGroup,
    GicsSector,
} from 'common/model/SectorConst';

export type GetFilters = {
    tickerTypeNames: string[];
    regionNames: Record<string, string>;
    sectorNames: Record<string, string>;
    esgLevelNames: string[];
};
export type GetStockFilters = {
    countryISOs: CountryIso[];
    gicsSectors: GicsSector[];
    gicsIndustryGroups: GicsIndustryGroup[];
    gicsIndustries: GicsIndustry[];
};
export type GetTickers = {
    totalUnpaginatedResults: number;
    results: Ticker[];
    paginationOffset: number;
    paginationLimit: number;
};

type GetStocks = {
    totalUnpaginatedResults: number;
    results: Stock[];
    paginationOffset: number;
    paginationLimit: number;
};

type GetStockByIds = {
    stocks: Stock[];
};
/**
 * Search API
 */
class SearchApi extends BaseApi {
    getFilters = async (): Promise<GetFilters | null> => {
        try {
            let config: AxiosRequestConfig = {};
            config.headers = this.getHeader();

            let response = await request.get(
                this.invesmentApi + '/search/fund-filters',
                config,
            );
            return {
                tickerTypeNames: response.data.tickerTypeNames,
                regionNames: response.data.regionNames,
                sectorNames: response.data.sectorNames,
                esgLevelNames: response.data.esgLevelNames,
            };
        } catch (err) {
            this.error('Failed getFilters', err);
        }
        return null;
    };

    getTickers = async (
        paginationOffset?: number,
        paginationLimit?: number,
        searchText?: string,
        tickerTypeNames?: string[],
        regionNames?: string[],
        sectorNames?: string[],
        esgLevelNames?: string[],
    ): Promise<GetTickers | null> => {
        try {
            let params: any = {};
            if (paginationOffset) params.paginationOffset = paginationOffset;
            if (paginationLimit) params.paginationLimit = paginationLimit;
            if (searchText) params.searchText = searchText;
            if (tickerTypeNames)
                params.tickerTypeNames = tickerTypeNames.toString();
            if (regionNames) params.regionNames = regionNames.toString();
            if (sectorNames) params.sectorNames = sectorNames.toString();
            if (esgLevelNames) params.esgLevelNames = esgLevelNames.toString();

            let config: AxiosRequestConfig = {};
            config.headers = this.getHeader();
            config.params = params;
            config.paramsSerializer = this.paramsSerializer;

            let response = await request.get(
                this.invesmentApi + '/search/funds',
                config,
            );
            return {
                totalUnpaginatedResults: response.data.totalUnpaginatedResults,
                paginationOffset: response.data.paginationOffset,
                paginationLimit: response.data.paginationLimit,
                results: response.data.results as Ticker[],
            };
        } catch (err) {
            this.error('Failed getTickers', err);
        }
        return null;
    };

    getStockFilters = async (): Promise<GetStockFilters | null> => {
        try {
            let config: AxiosRequestConfig = {};
            config.headers = this.getHeader();

            let response = await request.get(
                this.invesmentApi + '/search/stock-filters',
                config,
            );
            return {
                countryISOs: response.data.countryISOs,
                gicsSectors: response.data.gicsSectors,
                gicsIndustryGroups: response.data.gicsIndustryGroups,
                gicsIndustries: response.data.gicsIndustries,
            };
        } catch (err) {
            this.error('Failed getStockFilters', err);
        }
        return null;
    };

    getStocks = async (props: {
        paginationOffset?: number;
        paginationLimit?: number;
        searchText?: string;
        countryISOs?: string[];
        gicsSectors?: string[];
        gicsIndustryGroups?: string[];
        gicsIndustries?: string[];
    }): Promise<GetStocks | null> => {
        try {
            let params: any = {};
            if (props.paginationOffset)
                params.paginationOffset = props.paginationOffset;
            if (props.paginationLimit)
                params.paginationLimit = props.paginationLimit;
            if (props.searchText) params.searchText = props.searchText;
            if (props.countryISOs && props.countryISOs.length > 0)
                params.countryISOs = props.countryISOs.toString();
            if (props.gicsSectors && props.gicsSectors.length > 0)
                params.gicsSectors = props.gicsSectors.toString();
            if (props.gicsIndustryGroups && props.gicsIndustryGroups.length > 0)
                params.gicsIndustryGroups = props.gicsIndustryGroups.toString();
            if (props.gicsIndustries && props.gicsIndustries.length > 0)
                params.gicsIndustries = props.gicsIndustries.toString();

            let config: AxiosRequestConfig = {};
            config.headers = this.getHeader();
            config.params = params;
            config.paramsSerializer = this.paramsSerializer;

            let response = await request.get(
                this.invesmentApi + '/search/stocks',
                config,
            );
            return {
                totalUnpaginatedResults: response.data.totalUnpaginatedResults,
                paginationOffset: response.data.paginationOffset,
                paginationLimit: response.data.paginationLimit,
                results: response.data.results as Stock[],
            };
        } catch (err) {
            this.error('Failed getStocks', err);
        }
        return null;
    };

    // TODO - this is bad API - only temp because i dont store 'selected stocks' in db
    getStockByIds = async (props: {
        tickerIds: number[];
    }): Promise<GetStockByIds | null> => {
        try {
            let params: any = {};
            params.tickerIds = props.tickerIds.toString();

            let config: AxiosRequestConfig = {};
            config.headers = this.getHeader();
            config.params = params;
            config.paramsSerializer = this.paramsSerializer;

            let response = await request.get(
                this.invesmentApi + '/search/stock-by-ids',
                config,
            );
            return {
                stocks: response.data.results as Stock[],
            };
        } catch (err) {
            this.error('Failed getStockByIds', err);
        }
        return null;
    };
}

export default new SearchApi(); //singleton
