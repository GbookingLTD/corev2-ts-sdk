import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import { MedMeAPIBusiness } from "./business";
import { MedMeAPICracSlots } from "./cracSlots";
import { MedMeAPIClient } from "./client";
import { MedMeAPIAppointment } from "./appointment";
import { MedMeAPIOTPAuthorize } from "./otpAuthorize";
import { MedMedAPIBusinessModel } from "./businessModel";
/**
 *
 */
export declare class MedMeAPI {
    /**
     * Набор методов для доступа к методам API с префиксом "business".
     */
    static readonly business: MedMeAPIBusiness;
    /**
     * Методы для получения слотов расписания.
     */
    static readonly slots: MedMeAPICracSlots;
    /**
     * Методы для создания и/или получения клиента, редактирования данных клиента.
     */
    static readonly client: MedMeAPIClient;
    /**
     * Методы для резервирования, подтверждения, отмены записи, снятия резерва записи, получения записей.
     */
    static readonly appointment: MedMeAPIAppointment;
    /**
     * Методы для OTP авторизации.
     */
    static readonly otpAuthorize: MedMeAPIOTPAuthorize;
    /**
     * Создание бизнес модели для управления данными, полученными из api.
     * @param business
     */
    static createBusinessModel(business: GBookingCoreV2.BusinessClass): MedMedAPIBusinessModel;
}
export * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
