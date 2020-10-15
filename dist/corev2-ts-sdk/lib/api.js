import { MedMeAPIBusiness } from "./business";
import { MedMeAPICracSlots } from "./cracSlots";
import { MedMeAPIClient } from "./client";
import { MedMeAPIAppointment } from "./appointment";
import { MedMeAPIOTPAuthorize } from "./otpAuthorize";
import { MedMedAPIBusinessModel } from "./businessModel";
import { jsonRpcRequest, JsonRpcRequestContext } from "./jsonRpcRequest";
import prodEnv from 'prodJsonRpcEnv';
export var MedMeAPI;
/**
 * Initialize MedMeAPI as JsonRpc API
 */
export function initJsonRpcMedMeAPI(env) {
    if (env === void 0) { env = prodEnv; }
    MedMeAPI = new JsonRpcMedMeAPI(env);
}
/**
 *
 */
var AMedMeAPI = /** @class */ (function () {
    function AMedMeAPI(apiRequest) {
        this.business =
            new MedMeAPIBusiness(apiRequest);
        this.client =
            new MedMeAPIClient(apiRequest);
        this.appointment =
            new MedMeAPIAppointment(apiRequest);
    }
    /**
     * Создание бизнес модели для управления данными, полученными из api.
     * @param business
     */
    AMedMeAPI.prototype.createBusinessModel = function (business) {
        return new MedMedAPIBusinessModel(business);
    };
    return AMedMeAPI;
}());
export { AMedMeAPI };
/**
 *
 */
var JsonRpcMedMeAPI = /** @class */ (function () {
    function JsonRpcMedMeAPI(env) {
        this.context_ = new JsonRpcRequestContext(env);
        this.business =
            new MedMeAPIBusiness(jsonRpcRequest.bind(this.context_, env.CORE_API_ENDPOINT));
        this.slots =
            new MedMeAPICracSlots(jsonRpcRequest.bind(this.context_, env.CORE_API_ENDPOINT), jsonRpcRequest.bind(this.context_, env.CRAC_SLOTS_API_ENDPOINT), jsonRpcRequest.bind(this.context_), env);
        this.client =
            new MedMeAPIClient(jsonRpcRequest.bind(this.context_, env.CORE_API_ENDPOINT));
        this.appointment =
            new MedMeAPIAppointment(jsonRpcRequest.bind(this.context_, env.CORE_API_ENDPOINT));
        this.otpAuthorize = new MedMeAPIOTPAuthorize(env);
    }
    /**
     * Создание бизнес модели для управления данными, полученными из api.
     * @param business
     */
    JsonRpcMedMeAPI.prototype.createBusinessModel = function (business) {
        return new MedMedAPIBusinessModel(business);
    };
    /**
     * Устанавливает cred.user, cred.token для всех последующих запросов
     * @param cred
     */
    JsonRpcMedMeAPI.prototype.setCredentials = function (cred) {
        this.context_.cred = cred;
    };
    /**
     * Удаляет из всех последующих запросов cred
     */
    JsonRpcMedMeAPI.prototype.clearCredentials = function () {
        this.context_.cred = null;
    };
    return JsonRpcMedMeAPI;
}());
export { JsonRpcMedMeAPI };
export * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
