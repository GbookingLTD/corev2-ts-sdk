import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import { MedMeAPIBusiness } from "./business";
import { MedMeAPICracSlots } from "./cracSlots";
import { MedMeAPIClient } from "./client";
import { MedMeAPIAppointment } from "./appointment";
import { MedMeAPIOTPAuthorize } from "./otpAuthorize";
import { MedMedAPIBusinessModel } from "./businessModel";
import { IMedMeJsonRpcEnv } from "./jsonRpcEnv";
import { APIRequestFn } from "./basic";
/**
 *
 */
export interface IMedMeAPI {
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
    /**
    * Устанавливает cred.user, cred.token для всех последующих запросов
    * @param cred
    */
    setCredentials?: (cred: GBookingCoreV2.Cred) => void;
    /**
     * Удаляет из всех последующих запросов cred
     */
    clearCredentials?: () => void;
}
export declare let MedMeAPI: IMedMeAPI;
/**
 * Initialize MedMeAPI as JsonRpc API
 */
export declare function initJsonRpcMedMeAPI(env?: IMedMeJsonRpcEnv): void;
/**
 *
 */
export declare class AMedMeAPI implements IMedMeAPI {
    constructor(apiRequest: APIRequestFn);
    /**
     * Набор методов для доступа к методам API с префиксом "business".
     */
    readonly business: MedMeAPIBusiness;
    /**
     * Методы для получения слотов расписания.
     */
    readonly slots: MedMeAPICracSlots;
    /**
     * Методы для создания и/или получения клиента, редактирования данных клиента.
     */
    readonly client: MedMeAPIClient;
    /**
     * Методы для резервирования, подтверждения, отмены записи, снятия резерва записи, получения записей.
     */
    readonly appointment: MedMeAPIAppointment;
    /**
     * Методы для OTP авторизации.
     */
    readonly otpAuthorize: MedMeAPIOTPAuthorize;
    /**
     * Создание бизнес модели для управления данными, полученными из api.
     * @param business
     */
    createBusinessModel(business: GBookingCoreV2.BusinessClass): MedMedAPIBusinessModel;
}
/**
 *
 */
export declare class JsonRpcMedMeAPI implements IMedMeAPI {
    private readonly context_;
    /**
     * Набор методов для доступа к методам API с префиксом "business".
     */
    readonly business: MedMeAPIBusiness;
    /**
     * Методы для получения слотов расписания.
     */
    readonly slots: MedMeAPICracSlots;
    /**
     * Методы для создания и/или получения клиента, редактирования данных клиента.
     */
    readonly client: MedMeAPIClient;
    /**
     * Методы для резервирования, подтверждения, отмены записи, снятия резерва записи, получения записей.
     */
    readonly appointment: MedMeAPIAppointment;
    /**
     * Методы для OTP авторизации.
     */
    readonly otpAuthorize: MedMeAPIOTPAuthorize;
    /**
     * Создание бизнес модели для управления данными, полученными из api.
     * @param business
     */
    createBusinessModel(business: GBookingCoreV2.BusinessClass): MedMedAPIBusinessModel;
    /**
     * Устанавливает cred.user, cred.token для всех последующих запросов
     * @param cred
     */
    setCredentials(cred: GBookingCoreV2.Cred): void;
    /**
     * Удаляет из всех последующих запросов cred
     */
    clearCredentials(): void;
    constructor(env: IMedMeJsonRpcEnv);
}
export * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
