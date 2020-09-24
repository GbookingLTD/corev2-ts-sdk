import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import { MedMeAPIBasic } from "./basic";
/**
 * Методы для создания и/или получения клиента, редактирования данных клиента.
 */
export declare class MedMeAPIClient extends MedMeAPIBasic {
    /**
     *
     * @param params
     */
    addClient(params: GBookingCoreV2.ClientAddClientRequestParams): Promise<GBookingCoreV2.ClientAddClientResponseResult>;
    /**
     *
     * @param params
     */
    findOrCreateClient(params: GBookingCoreV2.ClientFindOrCreateClientRequestParams): Promise<GBookingCoreV2.ClientFindOfCreateClientResponseResult>;
    /**
     *
     * @param params
     */
    updateClient(params: GBookingCoreV2.ClientUpdateClientRequestParams): Promise<boolean>;
}
