import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import { MedMeAPIBasic } from "./basic";
/**
 *
 */
export declare class MedMeAPIBusiness extends MedMeAPIBasic {
    /**
     * Получение данных бизнеса.
     * @param params
     */
    getProfileById(params: GBookingCoreV2.BusinessGetProfileByIdRequestParams): Promise<GBookingCoreV2.BusinessGetProfileByIdResponse>;
    /**
     * Получение модели бизнеса по ее идентификатору.
     * Является упрощенной версией метода getProfileById.
     * @see getProfileById
     * @param id
     */
    getBusinessById(id: number): Promise<GBookingCoreV2.BusinessClass>;
    /**
     * Получение списка бизнесов сети.
     * @param params
     */
    getNetworkData(params: GBookingCoreV2.BusinessGetNetworkDataRequestParams): Promise<GBookingCoreV2.BusinessGetNetworkDataResponse>;
    /**
     *
     * @param networkId
     * @param takeBusinessInfo
     * @param source
     */
    getNetworkBusinessList(networkId: number, takeBusinessInfo?: boolean, source?: string, contractExtraId?: string): Promise<GBookingCoreV2.BusinessRefInNetwork[]>;
}
