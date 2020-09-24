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
        this.env_ = env;
        this.business =
            new business_1.MedMeAPIBusiness(jsonRpcRequest_1.jsonRpcRequest.bind(this.env_, this.env_.CORE_API_ENDPOINT));
        this.slots =
            new cracSlots_1.MedMeAPICracSlots(jsonRpcRequest_1.jsonRpcRequest.bind(this.env_, this.env_.CORE_API_ENDPOINT), jsonRpcRequest_1.jsonRpcRequest.bind(this.env_, this.env_.CRAC_SLOTS_API_ENDPOINT), jsonRpcRequest_1.jsonRpcRequest.bind(this.env_), this.env_);
        this.client =
            new client_1.MedMeAPIClient(jsonRpcRequest_1.jsonRpcRequest.bind(this.env_, this.env_.CORE_API_ENDPOINT));
        this.appointment =
            new appointment_1.MedMeAPIAppointment(jsonRpcRequest_1.jsonRpcRequest.bind(this.env_, this.env_.CORE_API_ENDPOINT));
        this.otpAuthorize = new otpAuthorize_1.MedMeAPIOTPAuthorize(this.env_);
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
