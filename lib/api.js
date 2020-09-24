"use strict";
exports.__esModule = true;
exports.JsonRpcMedMeAPI = exports.initJsonRpcMedMeAPI = exports.MedMeAPI = void 0;
var business_1 = require("./business");
var cracSlots_1 = require("./cracSlots");
var client_1 = require("./client");
var appointment_1 = require("./appointment");
var otpAuthorize_1 = require("./otpAuthorize");
var businessModel_1 = require("./businessModel");
var jsonRpcRequest_1 = require("./jsonRpcRequest");
/**
 * Initialize MedMeAPI as JsonRpc API
 */
function initJsonRpcMedMeAPI(env) {
    exports.MedMeAPI = new JsonRpcMedMeAPI(env);
}
exports.initJsonRpcMedMeAPI = initJsonRpcMedMeAPI;
/**
 *
 */
var JsonRpcMedMeAPI = /** @class */ (function () {
    function JsonRpcMedMeAPI(env) {
        this.context_ = new jsonRpcRequest_1.JsonRpcRequestContext(env);
        this.business =
            new business_1.MedMeAPIBusiness(jsonRpcRequest_1.jsonRpcRequest.bind(this.context_, env.CORE_API_ENDPOINT));
        this.slots =
            new cracSlots_1.MedMeAPICracSlots(jsonRpcRequest_1.jsonRpcRequest.bind(this.context_, env.CORE_API_ENDPOINT), jsonRpcRequest_1.jsonRpcRequest.bind(this.context_, env.CRAC_SLOTS_API_ENDPOINT), jsonRpcRequest_1.jsonRpcRequest.bind(this.context_), env);
        this.client =
            new client_1.MedMeAPIClient(jsonRpcRequest_1.jsonRpcRequest.bind(this.context_, env.CORE_API_ENDPOINT));
        this.appointment =
            new appointment_1.MedMeAPIAppointment(jsonRpcRequest_1.jsonRpcRequest.bind(this.context_, env.CORE_API_ENDPOINT));
        this.otpAuthorize = new otpAuthorize_1.MedMeAPIOTPAuthorize(env);
    }
    /**
     * Создание бизнес модели для управления данными, полученными из api.
     * @param business
     */
    JsonRpcMedMeAPI.prototype.createBusinessModel = function (business) {
        return new businessModel_1.MedMedAPIBusinessModel(business);
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
exports.JsonRpcMedMeAPI = JsonRpcMedMeAPI;
exports.GBookingCoreV2 = require("corev2-schemata/langs/typescript/GBookingCoreV2");
