import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import { APIRequestFn, CRACServerRequestFn, MedMeAPIBasic } from "./basic";
export declare class InvalidParams extends Error {
    constructor(path: string[]);
}
/**
 *
 */
export declare class MedMeAPICracSlots extends MedMeAPIBasic {
    /**
     * Возвращает url сервера CRAC по его названию, полученному из данных бизнеса.
     * @param cracServerName
     */
    private static getCracEndpointUrl;
    /**
     *
     * @param taxonomy
     * @param resources
     */
    private static createResourceFilter;
    /**
     * Возвращает название сервера CRAC из данных бизнеса.
     * @param business
     */
    static getCracServerNameFromBusiness(business: GBookingCoreV2.BusinessClass): string;
    /**
     * Преобразует объект данных бизнеса GBookingCoreV2.BusinessClass в объект параметров
     * GBookingCoreV2.CracSlotsRequestBusinessParams.
     * @param business
     */
    static convertBusinessToParams(business: GBookingCoreV2.BusinessClass): GBookingCoreV2.CracSlotsRequestBusinessParams;
    private readonly cracSlotsAPIRequest_;
    private readonly cracServerRequest_;
    constructor(apiRequest: APIRequestFn, cracSlotsApiRequest: APIRequestFn, cracServerRequest: CRACServerRequestFn);
    /**
     *
     * @param taxonomy
     * @param resources
     * @param dateFrom
     * @param dateTo
     */
    createCRACResourcesAndRoomsFilters(taxonomy: GBookingCoreV2.BusinessTaxonomy, resources: GBookingCoreV2.Resource[], dateFrom: Date, dateTo: Date): GBookingCoreV2.CracSlotsGetCracResourcesAndRoomsRequestFilters;
    /**
     *
     * @param business
     * @param filters
     */
    getCRACResourcesAndRooms(business: GBookingCoreV2.CracSlotsRequestBusinessParams, filters: GBookingCoreV2.CracSlotsGetCracResourcesAndRoomsRequestFilters): Promise<GBookingCoreV2.CracSlotsGetCracResourcesAndRoomsResponse>;
    /**
     *
     * @param business
     * @param filters
     */
    getCRACDistributedResourcesAndRooms(business: GBookingCoreV2.CracSlotsRequestBusinessParams, filters: GBookingCoreV2.CracSlotsGetCracDistributedResourcesAndRoomsRequestFilters): Promise<GBookingCoreV2.CracSlotsGetCracDistributedResourcesAndRoomsResponse>;
    /**
     *
     * @param business
     * @param filters
     */
    getCRACInsuranceResourcesAndRooms(business: GBookingCoreV2.CracSlotsRequestBusinessParams, filters: GBookingCoreV2.CracSlotsGetCracInsuranceResourcesAndRoomsRequestFilters): Promise<GBookingCoreV2.CracSlotsGetCracInsuranceResourcesAndRoomsResponse>;
    /**
     *
     * @param serverName
     * @param params
     */
    getDistributedResourcesFreeByDate(serverName: string, params: GBookingCoreV2.CracCracDistributedResourcesFreeByDateRequestParam[]): Promise<GBookingCoreV2.CracCracDistributedResourcesFreeByDateResponse>;
    /**
     *
     * @param serverName
     * @param params
     */
    getResourcesFreeByDate(serverName: string, params: GBookingCoreV2.CracCracResourcesFreeByDateRequestParam[]): Promise<GBookingCoreV2.CracCracResourcesFreeByDateResponse>;
    /**
     *
     * @param serverName
     * @param params
     */
    getResourcesFreeByDateV2(serverName: string, params: GBookingCoreV2.CracCracResourcesFreeByDateV2RequestParam[]): Promise<GBookingCoreV2.CracCracResourcesFreeByDateV2Response>;
}
