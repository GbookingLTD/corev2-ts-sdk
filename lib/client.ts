import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import {MedMeAPIBasic} from "./basic";

/**
 * Методы для создания и/или получения клиента, редактирования данных клиента.
 */
export class MedMeAPIClient extends MedMeAPIBasic {

    /**
     *
     * @param params
     */
    addClient(params: GBookingCoreV2.ClientAddClientRequestParams):
        Promise<GBookingCoreV2.ClientAddClientResponseResult> {
        return this.apiRequest_("client.add_client", params)
            .then((res) => res.result);
    }

    /**
     *
     * @param params
     */
    findOrCreateClient(params: GBookingCoreV2.ClientFindOrCreateClientRequestParams):
        Promise<GBookingCoreV2.ClientFindOfCreateClientResponseResult> {
        return this.apiRequest_("client.find_or_create_client", params)
            .then((res) => res.result);
    }

    /**
     *
     * @param params
     */
    updateClient(params: GBookingCoreV2.ClientUpdateClientRequestParams):
        Promise<boolean> {
        return this.apiRequest_("client.update_client", params)
            .then((res) => res.result.success);
    }
}
