import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import {MedMeAPIBusiness} from "./business";
import {MedMeAPICracSlots} from "./cracSlots";
import {MedMeAPIClient} from "./client";
import {MedMeAPIAppointment} from "./appointment";
import {MedMeAPIOTPAuthorize} from "./otpAuthorize";
import {MedMedAPIBusinessModel} from "./businessModel";
import {jsonRpcRequest} from "./request";
import {
    CORE_API_ENDPOINT,
    CRAC_SLOTS_API_ENDPOINT,
} from '../env.prod';

export let MedMeAPI;

/**
 * Initialize MedMeAPI as JsonRpc API
 */
export function initJsonRpcMedMeAPI() {
    MedMeAPI = new JsonRpcMedMeAPI();
}

/**
 *
 */
export class JsonRpcMedMeAPI {
    /**
     * Набор методов для доступа к методам API с префиксом "business".
     */
    public business: MedMeAPIBusiness =
        new MedMeAPIBusiness(jsonRpcRequest.bind(null, CORE_API_ENDPOINT));

    /**
     * Методы для получения слотов расписания.
     */
    public slots: MedMeAPICracSlots =
        new MedMeAPICracSlots(
            jsonRpcRequest.bind(null, CORE_API_ENDPOINT),
            jsonRpcRequest.bind(null, CRAC_SLOTS_API_ENDPOINT),
            jsonRpcRequest.bind(null)
        );

    /**
     * Методы для создания и/или получения клиента, редактирования данных клиента.
     */
    public client: MedMeAPIClient =
        new MedMeAPIClient(jsonRpcRequest.bind(null, CORE_API_ENDPOINT));

    /**
     * Методы для резервирования, подтверждения, отмены записи, снятия резерва записи, получения записей.
     */
    public appointment: MedMeAPIAppointment =
        new MedMeAPIAppointment(jsonRpcRequest.bind(null, CORE_API_ENDPOINT));

    /**
     * Методы для OTP авторизации.
     */
    public otpAuthorize: MedMeAPIOTPAuthorize = new MedMeAPIOTPAuthorize();

    /**
     * Создание бизнес модели для управления данными, полученными из api.
     * @param business
     */
    public createBusinessModel(business: GBookingCoreV2.BusinessClass): MedMedAPIBusinessModel {
        return new MedMedAPIBusinessModel(business);
    }
}

export * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';