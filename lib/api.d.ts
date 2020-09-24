import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import { MedMeAPIBusiness } from "./business";
import { MedMeAPICracSlots } from "./cracSlots";
import { MedMeAPIClient } from "./client";
import { MedMeAPIAppointment } from "./appointment";
import { MedMeAPIOTPAuthorize } from "./otpAuthorize";
import { MedMedAPIBusinessModel } from "./businessModel";
export declare let MedMeAPI: any;
/**
 * Initialize MedMeAPI as JsonRpc API
 */
export declare function initJsonRpcMedMeAPI(): void;
/**
 *
 */
export declare class JsonRpcMedMeAPI {
    /**
     * Набор методов для доступа к методам API с префиксом "business".
     */
    business: MedMeAPIBusiness;
    /**
     * Методы для получения слотов расписания.
     */
    slots: MedMeAPICracSlots;
    /**
     * Методы для создания и/или получения клиента, редактирования данных клиента.
     */
    client: MedMeAPIClient;
    /**
     * Методы для резервирования, подтверждения, отмены записи, снятия резерва записи, получения записей.
     */
    appointment: MedMeAPIAppointment;
    /**
     * Методы для OTP авторизации.
     */
    otpAuthorize: MedMeAPIOTPAuthorize;
    /**
     * Создание бизнес модели для управления данными, полученными из api.
     * @param business
     */
    createBusinessModel(business: GBookingCoreV2.BusinessClass): MedMedAPIBusinessModel;
}
export * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
