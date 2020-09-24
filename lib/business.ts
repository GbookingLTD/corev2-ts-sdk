import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import {SetType} from "./types";
import {MedMeAPIBasic} from "./basic";

/**
 *
 */
export class MedMeAPIBusiness extends MedMeAPIBasic {
    /**
     * Получение данных бизнеса.
     * @param params
     */
    public getProfileById(params: GBookingCoreV2.BusinessGetProfileByIdRequestParams): Promise<GBookingCoreV2.BusinessGetProfileByIdResponse> {
        return this.apiRequest_("business.get_profile_by_id", params);
    }

    /**
     * Получение модели бизнеса по ее идентификатору.
     * Является упрощенной версией метода getProfileById.
     * @see getProfileById
     * @param id
     */
    public getBusinessById(id: number): Promise<GBookingCoreV2.BusinessClass> {
        let params: GBookingCoreV2.BusinessGetProfileByIdRequestParams = {
            business: {
                id: id.toString()
            }
        };

        return this.getProfileById(params)
            .then((res: GBookingCoreV2.BusinessGetProfileByIdResponse) => {
                return res.result.business;
            });
    }

    /**
     * Получение списка бизнесов сети.
     * @param params
     */
    public getNetworkData(params: GBookingCoreV2.BusinessGetNetworkDataRequestParams): Promise<GBookingCoreV2.BusinessGetNetworkDataResponse> {
        return this.apiRequest_("business.get_network_data", params);
    }

    /**
     *
     * @param networkId
     * @param takeBusinessInfo
     * @param source
     */
    public getNetworkBusinessList(networkId: number, takeBusinessInfo: boolean = true, source: string = 'GENERAL'):
        Promise<GBookingCoreV2.BusinessRefInNetwork[]> {
        let params: GBookingCoreV2.BusinessGetNetworkDataRequestParams = {
            networkID: networkId,
            with_business_info: takeBusinessInfo
        };

        return this.getNetworkData(params)
            .then((res: GBookingCoreV2.BusinessGetNetworkDataResponse) => {
                const conf = res.result.networkWidgetConfiguration.find((conf) =>
                    conf.source === source);
                if (!conf)
                    throw new Error(`not found network source ${source}`);
                const businessSet: SetType = conf.businesses.filter((business) => business.active)
                    .reduce((ret, business) => {
                        ret[business.internalID] = true;
                        return ret;
                    }, {} as SetType);
                return res.result.businesses.filter((business) =>
                    businessSet[business.businessID] && !business.isMapBusiness);
            });
    }
}