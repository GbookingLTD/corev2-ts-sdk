import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import {MedMeAPIBusiness} from "./business";
import {MedMeAPICracSlots} from "./cracSlots";
import {MedMeAPIClient} from "./client";
import {MedMeAPIAppointment} from "./appointment";
import {MedMeAPIOTPAuthorize} from "./otpAuthorize";
import {MedMedAPIBusinessModel} from "./businessModel";
import {IMedMeJsonRpcEnv} from "./jsonRpcEnv";
import {IJsonRpcRequestContext, jsonRpcRequest, JsonRpcRequestContext} from "./jsonRpcRequest";
import {APIRequestFn} from "./basic";
import prodEnv from './prodJsonRpcEnv';

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
    setCredentials?: (cred: GBookingCoreV2.Cred) => void

    /**
     * Удаляет из всех последующих запросов cred
     */
    clearCredentials?: () => void
}

export let MedMeAPI: IMedMeAPI;

/**
 * Initialize MedMeAPI as JsonRpc API
 */
export function initJsonRpcMedMeAPI(env: IMedMeJsonRpcEnv = prodEnv) {
    console.error(JSON.stringify(env));
    MedMeAPI = new JsonRpcMedMeAPI(env);
}

/**
 *
 */
export class AMedMeAPI implements IMedMeAPI {

    constructor(apiRequest: APIRequestFn) {
        this.business =
            new MedMeAPIBusiness(apiRequest);

        this.client =
            new MedMeAPIClient(apiRequest)

        this.appointment =
            new MedMeAPIAppointment(apiRequest);
    }

    /**
     * Набор методов для доступа к методам API с префиксом "business".
     */
    public readonly business: MedMeAPIBusiness;

    /**
     * Методы для получения слотов расписания.
     */
    public readonly slots: MedMeAPICracSlots;

    /**
     * Методы для создания и/или получения клиента, редактирования данных клиента.
     */
    public readonly client: MedMeAPIClient;

    /**
     * Методы для резервирования, подтверждения, отмены записи, снятия резерва записи, получения записей.
     */
    public readonly appointment: MedMeAPIAppointment;

    /**
     * Методы для OTP авторизации.
     */
    public readonly otpAuthorize: MedMeAPIOTPAuthorize;

    /**
     * Создание бизнес модели для управления данными, полученными из api.
     * @param business
     */
    public createBusinessModel(business: GBookingCoreV2.BusinessClass): MedMedAPIBusinessModel {
        return new MedMedAPIBusinessModel(business);
    }
}

/**
 *
 */
export class JsonRpcMedMeAPI implements IMedMeAPI {
    private readonly context_: IJsonRpcRequestContext;

    /**
     * Набор методов для доступа к методам API с префиксом "business".
     */
    public readonly business: MedMeAPIBusiness;

    /**
     * Методы для получения слотов расписания.
     */
    public readonly slots: MedMeAPICracSlots;

    /**
     * Методы для создания и/или получения клиента, редактирования данных клиента.
     */
    public readonly client: MedMeAPIClient;

    /**
     * Методы для резервирования, подтверждения, отмены записи, снятия резерва записи, получения записей.
     */
    public readonly appointment: MedMeAPIAppointment;

    /**
     * Методы для OTP авторизации.
     */
    public readonly otpAuthorize: MedMeAPIOTPAuthorize;

    /**
     * Создание бизнес модели для управления данными, полученными из api.
     * @param business
     */
    public createBusinessModel(business: GBookingCoreV2.BusinessClass): MedMedAPIBusinessModel {
        return new MedMedAPIBusinessModel(business);
    }

    /**
     * Устанавливает cred.user, cred.token для всех последующих запросов
     * @param cred
     */
    public setCredentials(cred: GBookingCoreV2.Cred): void {
        this.context_.cred = cred;
    }

    /**
     * Удаляет из всех последующих запросов cred
     */
    public clearCredentials(): void {
        this.context_.cred = null;
    }

    constructor(env: IMedMeJsonRpcEnv) {
        this.context_ = new JsonRpcRequestContext(env);

        this.business =
            new MedMeAPIBusiness(jsonRpcRequest.bind(this.context_, env.CORE_API_ENDPOINT));

        this.slots =
            new MedMeAPICracSlots(
                jsonRpcRequest.bind(this.context_, env.CORE_API_ENDPOINT),
                jsonRpcRequest.bind(this.context_, env.CRAC_SLOTS_API_ENDPOINT),
                jsonRpcRequest.bind(this.context_),
                env
            );

        this.client =
            new MedMeAPIClient(jsonRpcRequest.bind(this.context_, env.CORE_API_ENDPOINT));

        this.appointment =
            new MedMeAPIAppointment(jsonRpcRequest.bind(this.context_, env.CORE_API_ENDPOINT));

        this.otpAuthorize = new MedMeAPIOTPAuthorize(env);

    }
}

export * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';