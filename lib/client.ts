import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import {
    CORE_API_ENDPOINT
} from '../env.prod';
import {apiRequest} from "./request";

/**
 * Методы для создания и/или получения клиента, редактирования данных клиента.
 */
export class MedMeAPIClient {

    /**
     *
     * @param params
     */
    addClient(params: GBookingCoreV2.ClientAddClientRequestParams):
        Promise<GBookingCoreV2.ClientAddClientResponseResult> {
        return apiRequest(CORE_API_ENDPOINT, "client.add_client", params)
            .then((res) => res.result);
    }

    /**
     *
     * @param params
     */
    findOrCreateClient(params: GBookingCoreV2.ClientFindOrCreateClientRequestParams):
        Promise<GBookingCoreV2.ClientFindOfCreateClientResponseResult> {
        return apiRequest(CORE_API_ENDPOINT, "client.find_or_create_result", params)
            .then((res) => res.result);
    }

    /**
     *
     * @param params
     */
    updateClient(params: GBookingCoreV2.ClientUpdateClientRequestParams):
        Promise<boolean> {
        return apiRequest(CORE_API_ENDPOINT, "client.update_client", params)
            .then((res) => res.result.success);
    }
}
