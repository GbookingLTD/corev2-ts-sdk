import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import { Taxonomies } from 'widget-utils/dist';
import {APIRequestFn, CRACServerRequestFn, MedMeAPIBasic} from "./basic";
import {IMedMeJsonRpcEnv} from "./jsonRpcEnv";

export class InvalidParams extends Error {
    constructor(path: string[]) {
        super(`Cannot read parameter \'${path.join('.')}\'`);
        Error.captureStackTrace(this, InvalidParams);
        Object.setPrototypeOf(this, InvalidParams.prototype);
    }
}

const _pickRecursive = function (filter, object, path: string[] = []) {
    const pathLevel = path.length;

    return Object.keys(filter).reduce(function (ret, key) {
        if (object === null || object === undefined) throw new InvalidParams(path);
        path[pathLevel] = key;
        if (filter[key] === true && (object[key] === null || object[key] === undefined))
            throw new InvalidParams(path);

        ret[key] = typeof filter[key] === 'object' ?
            _pickRecursive(filter[key], object[key], path.slice(0)) : object[key];
        return ret;
    }, {});
};

/**
 *
 */
export class MedMeAPICracSlots extends MedMeAPIBasic {

    /**
     * Возвращает url сервера CRAC по его названию, полученному из данных бизнеса.
     * @param env: IMedMeJsonRpcEnv
     * @param cracServerName
     */
    private static getCracEndpointUrl(env: IMedMeJsonRpcEnv, cracServerName: string): string {
        const cracUrlMap = {
            'CRAC': env.CRAC_API_ENDPOINT,
            'CRAC3': env.CRAC3_API_ENDPOINT,
        };

        return cracUrlMap[cracServerName];
    }

    /**
     *
     * @param taxonomy
     * @param resources
     */
    private static createResourceFilter(taxonomy: GBookingCoreV2.BusinessTaxonomy,
                                        resources: GBookingCoreV2.Resource[]):
        GBookingCoreV2.CracSlotsGetCracResourcesAndRoomsRequestResourceFilter[] {
        const resourceFilter = [] as GBookingCoreV2.CracSlotsGetCracResourcesAndRoomsRequestResourceFilter[];
        for (let res of resources)
            resourceFilter.push({
                id: res.id,
                duration: Taxonomies.getServiceDuration(taxonomy, res)
            });
        return resourceFilter;
    }

    /**
     * Возвращает название сервера CRAC из данных бизнеса.
     * @param business
     */
    public static getCracServerNameFromBusiness(business: GBookingCoreV2.BusinessClass): string {
        return business.widget_configuration.cracServer;
    }

    /**
     * Преобразует объект данных бизнеса GBookingCoreV2.BusinessClass в объект параметров
     * GBookingCoreV2.CracSlotsRequestBusinessParams.
     * @param business
     */
    public static convertBusinessToParams(business: GBookingCoreV2.BusinessClass):
        GBookingCoreV2.CracSlotsRequestBusinessParams {
        const filter = {
            "id": true,
            "widget_configuration": {
                "cracServer": true,
                "displaySlotSize": false,
                "hideGraySlots": false
            },
            "general_info": {
                "timezone": true
            }
        };

        return _pickRecursive(filter, business) as {general_info, id, widget_configuration};
    }

    private readonly cracSlotsAPIRequest_: APIRequestFn;
    private readonly cracServerRequest_: CRACServerRequestFn;
    private readonly env_: IMedMeJsonRpcEnv;

    constructor(apiRequest: APIRequestFn, cracSlotsApiRequest: APIRequestFn,
                cracServerRequest: CRACServerRequestFn, env: IMedMeJsonRpcEnv) {
        super(apiRequest);
        this.cracSlotsAPIRequest_ = cracSlotsApiRequest;
        this.cracServerRequest_ = cracServerRequest;
        this.env_ = env;
    }

    /**
     *
     * @param taxonomy
     * @param resources
     * @param dateFrom
     * @param dateTo
     */
    public createCRACResourcesAndRoomsFilters(taxonomy: GBookingCoreV2.BusinessTaxonomy,
                                              resources: GBookingCoreV2.Resource[], dateFrom: Date, dateTo: Date):
        GBookingCoreV2.CracSlotsGetCracResourcesAndRoomsRequestFilters {
        const filters = {} as GBookingCoreV2.CracSlotsGetCracResourcesAndRoomsRequestFilters;
        filters.resources = MedMeAPICracSlots.createResourceFilter(taxonomy, resources);
        filters.taxonomies = [taxonomy.id];
        filters.rooms = [];
        filters.date = {
            from: dateFrom,
            to: dateTo
        };
        return filters;
    }

    /**
     *
     * @param business
     * @param filters
     */
    public getCRACResourcesAndRooms(business: GBookingCoreV2.CracSlotsRequestBusinessParams,
                                    filters: GBookingCoreV2.CracSlotsGetCracResourcesAndRoomsRequestFilters):
        Promise<GBookingCoreV2.CracSlotsGetCracResourcesAndRoomsResponse> {
        const params = {
            business,
            filters
        };

        return this.cracSlotsAPIRequest_("CracSlots.GetCRACResourcesAndRooms", params);
    }

    /**
     *
     * @param business
     * @param filters
     */
    public getCRACDistributedResourcesAndRooms(business: GBookingCoreV2.CracSlotsRequestBusinessParams,
                                               filters: GBookingCoreV2.CracSlotsGetCracDistributedResourcesAndRoomsRequestFilters):
        Promise<GBookingCoreV2.CracSlotsGetCracDistributedResourcesAndRoomsResponse> {
        const params = {
            business,
            filters
        };

        return this.cracSlotsAPIRequest_("CracSlots.GetCRACDistributedResourcesAndRooms", params);
    }

    /**
     *
     * @param business
     * @param filters
     */
    public getCRACInsuranceResourcesAndRooms(business: GBookingCoreV2.CracSlotsRequestBusinessParams,
                                             filters: GBookingCoreV2.CracSlotsGetCracInsuranceResourcesAndRoomsRequestFilters):
        Promise<GBookingCoreV2.CracSlotsGetCracInsuranceResourcesAndRoomsResponse> {
        const params = {
            business,
            filters
        };

        return this.cracSlotsAPIRequest_("CracSlots.GetCRACInsuranceResourcesAndRooms", params);
    }

    /**
     *
     * @param serverName
     * @param params
     */
    public getDistributedResourcesFreeByDate(serverName: string, params: GBookingCoreV2.CracCracDistributedResourcesFreeByDateRequestParam[]):
        Promise<GBookingCoreV2.CracCracDistributedResourcesFreeByDateResponse> {
        const cracServerEndpoint = MedMeAPICracSlots.getCracEndpointUrl(this.env_, serverName);
        return this.cracServerRequest_(cracServerEndpoint, "Crac.CRACDistributedResourcesFreeByDate", params);
    }

    /**
     *
     * @param serverName
     * @param params
     */
    public getResourcesFreeByDate(serverName: string, params: GBookingCoreV2.CracCracResourcesFreeByDateRequestParam[]):
        Promise<GBookingCoreV2.CracCracResourcesFreeByDateResponse> {
        const cracServerEndpoint = MedMeAPICracSlots.getCracEndpointUrl(this.env_, serverName);
        return this.cracServerRequest_(cracServerEndpoint, "Crac.CRACResourcesFreeByDate", params);
    }

    /**
     *
     * @param serverName
     * @param params
     */
    public getResourcesFreeByDateV2(serverName: string, params: GBookingCoreV2.CracCracResourcesFreeByDateV2RequestParam[]):
        Promise<GBookingCoreV2.CracCracResourcesFreeByDateV2Response> {
        const cracServerEndpoint = MedMeAPICracSlots.getCracEndpointUrl(this. env_, serverName);
        return this.cracServerRequest_(cracServerEndpoint, "Crac.CRACResourcesFreeByDateV2", params);
    }
}
