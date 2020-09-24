import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import {MedMeAPIBusiness} from "./business";
import {MedMeAPICracSlots} from "./cracSlots";
import {MedMeAPIClient} from "./client";
import {MedMeAPIAppointment} from "./appointment";
import {MedMeAPIOTPAuthorize} from "./otpAuthorize";
import {MedMedAPIBusinessModel} from "./businessModel";
import {IMedMeJsonRpcEnv} from "./jsonRpcEnv";
import {jsonRpcRequest} from "./jsonRpcRequest";

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
}

export let MedMeAPI: IMedMeAPI;

/**
 * Initialize MedMeAPI as JsonRpc API
 */
export function initJsonRpcMedMeAPI(env: IMedMeJsonRpcEnv) {
    MedMeAPI = new JsonRpcMedMeAPI(env);
}

/**
 *
 */
export class JsonRpcMedMeAPI implements IMedMeAPI {
    private readonly env_: IMedMeJsonRpcEnv;

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

    constructor(env: IMedMeJsonRpcEnv) {
        this.env_ = env;

        this.business =
            new MedMeAPIBusiness(jsonRpcRequest.bind(this.env_, this.env_.CORE_API_ENDPOINT));

        this.slots =
            new MedMeAPICracSlots(
                jsonRpcRequest.bind(this.env_, this.env_.CORE_API_ENDPOINT),
                jsonRpcRequest.bind(this.env_, this.env_.CRAC_SLOTS_API_ENDPOINT),
                jsonRpcRequest.bind(this.env_),
                this.env_
            );

        this.client =
            new MedMeAPIClient(jsonRpcRequest.bind(this.env_, this.env_.CORE_API_ENDPOINT));

        this.appointment =
            new MedMeAPIAppointment(jsonRpcRequest.bind(this.env_, this.env_.CORE_API_ENDPOINT));

        this.otpAuthorize = new MedMeAPIOTPAuthorize(this.env_);

    }
}

export * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';