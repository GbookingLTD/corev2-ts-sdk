import { CORE_API_ENDPOINT } from '../env.prod';
import { apiRequest } from "./request";
/**
 * Методы для создания и/или получения клиента, редактирования данных клиента.
 */
var MedMeAPIClient = /** @class */ (function () {
    function MedMeAPIClient() {
    }
    /**
     *
     * @param params
     */
    MedMeAPIClient.prototype.addClient = function (params) {
        return apiRequest(CORE_API_ENDPOINT, "client.add_client", params)
            .then(function (res) { return res.result; });
    };
    /**
     *
     * @param params
     */
    MedMeAPIClient.prototype.findOrCreateClient = function (params) {
        return apiRequest(CORE_API_ENDPOINT, "client.find_or_create_result", params)
            .then(function (res) { return res.result; });
    };
    /**
     *
     * @param params
     */
    MedMeAPIClient.prototype.updateClient = function (params) {
        return apiRequest(CORE_API_ENDPOINT, "client.update_client", params)
            .then(function (res) { return res.result.success; });
    };
    return MedMeAPIClient;
}());
export { MedMeAPIClient };
