import { CORE_API_ENDPOINT } from '../env.prod';
import { apiRequest } from "./request";
/**
 *
 */
var MedMeAPIBusiness = /** @class */ (function () {
    function MedMeAPIBusiness() {
    }
    /**
     * Получение данных бизнеса.
     * @param params
     */
    MedMeAPIBusiness.prototype.getProfileById = function (params) {
        return apiRequest(CORE_API_ENDPOINT, "business.get_profile_by_id", params);
    };
    /**
     * Получение модели бизнеса по ее идентификатору.
     * Является упрощенной версией метода getProfileById.
     * @see getProfileById
     * @param id
     */
    MedMeAPIBusiness.prototype.getBusinessById = function (id) {
        var params = {
            business: {
                id: id.toString()
            }
        };
        return this.getProfileById(params)
            .then(function (res) {
            return res.result.business;
        });
    };
    /**
     * Получение списка бизнесов сети.
     * @param params
     */
    MedMeAPIBusiness.prototype.getNetworkData = function (params) {
        return apiRequest(CORE_API_ENDPOINT, "business.get_network_data", params);
    };
    /**
     *
     * @param networkId
     * @param takeBusinessInfo
     * @param source
     */
    MedMeAPIBusiness.prototype.getNetworkBusinessList = function (networkId, takeBusinessInfo, source) {
        if (takeBusinessInfo === void 0) { takeBusinessInfo = true; }
        if (source === void 0) { source = 'GENERAL'; }
        var params = {
            networkID: networkId,
            with_business_info: takeBusinessInfo
        };
        return this.getNetworkData(params)
            .then(function (res) {
            var conf = res.result.networkWidgetConfiguration.find(function (conf) {
                return conf.source === source;
            });
            if (!conf)
                throw new Error("not found network source " + source);
            var businessSet = conf.businesses.filter(function (business) { return business.active; })
                .reduce(function (ret, business) {
                ret[business.internalID] = true;
                return ret;
            }, {});
            return res.result.businesses.filter(function (business) {
                return businessSet[business.businessID] && !business.isMapBusiness;
            });
        });
    };
    return MedMeAPIBusiness;
}());
export { MedMeAPIBusiness };
