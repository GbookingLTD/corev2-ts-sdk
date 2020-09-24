"use strict";
exports.__esModule = true;
exports.JsonRpcMedMeAPI = exports.initJsonRpcMedMeAPI = exports.MedMeAPI = void 0;
var business_1 = require("./business");
var cracSlots_1 = require("./cracSlots");
var client_1 = require("./client");
var appointment_1 = require("./appointment");
var otpAuthorize_1 = require("./otpAuthorize");
var businessModel_1 = require("./businessModel");
var request_1 = require("./request");
var env_prod_1 = require("../env.prod");
/**
 * Initialize MedMeAPI as JsonRpc API
 */
function initJsonRpcMedMeAPI() {
    exports.MedMeAPI = new JsonRpcMedMeAPI();
}
exports.initJsonRpcMedMeAPI = initJsonRpcMedMeAPI;
/**
 *
 */
var JsonRpcMedMeAPI = /** @class */ (function () {
    function JsonRpcMedMeAPI() {
        /**
         * Набор методов для доступа к методам API с префиксом "business".
         */
        this.business = new business_1.MedMeAPIBusiness(request_1.jsonRpcRequest.bind(null, env_prod_1.CORE_API_ENDPOINT));
        /**
         * Методы для получения слотов расписания.
         */
        this.slots = new cracSlots_1.MedMeAPICracSlots(request_1.jsonRpcRequest.bind(null, env_prod_1.CORE_API_ENDPOINT), request_1.jsonRpcRequest.bind(null, env_prod_1.CRAC_SLOTS_API_ENDPOINT), request_1.jsonRpcRequest.bind(null));
        /**
         * Методы для создания и/или получения клиента, редактирования данных клиента.
         */
        this.client = new client_1.MedMeAPIClient(request_1.jsonRpcRequest.bind(null, env_prod_1.CORE_API_ENDPOINT));
        /**
         * Методы для резервирования, подтверждения, отмены записи, снятия резерва записи, получения записей.
         */
        this.appointment = new appointment_1.MedMeAPIAppointment(request_1.jsonRpcRequest.bind(null, env_prod_1.CORE_API_ENDPOINT));
        /**
         * Методы для OTP авторизации.
         */
        this.otpAuthorize = new otpAuthorize_1.MedMeAPIOTPAuthorize();
    }
    /**
     * Создание бизнес модели для управления данными, полученными из api.
     * @param business
     */
    JsonRpcMedMeAPI.prototype.createBusinessModel = function (business) {
        return new businessModel_1.MedMedAPIBusinessModel(business);
    };
    return JsonRpcMedMeAPI;
}());
exports.JsonRpcMedMeAPI = JsonRpcMedMeAPI;
exports.GBookingCoreV2 = require("corev2-schemata/langs/typescript/GBookingCoreV2");
