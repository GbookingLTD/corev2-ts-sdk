"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.MedMeAPIAppointment = void 0;
var basic_1 = require("./basic");
/**
 * Методы для резервирования, подтверждения, отмены записи, снятия резерва записи, получения записей.
 */
var MedMeAPIAppointment = /** @class */ (function (_super) {
    __extends(MedMeAPIAppointment, _super);
    function MedMeAPIAppointment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Резервирование времени для записи
     * @param params
     */
    MedMeAPIAppointment.prototype.reserveAppointment = function (params) {
        return this.apiRequest_("appointment.reserve_appointment", params)
            .then(function (res) { return res.result; });
    };
    /**
     * Подтверждение записи клиентом
     * @param params
     */
    MedMeAPIAppointment.prototype.clientConfirmAppointment = function (params) {
        return this.apiRequest_("appointment.client_confirm_appointment", params)
            .then(function (res) { return res.result; });
    };
    /**
     * Подтверждение записи администратором бизнеса
     * @see clientConfirmAppointment
     * @param appointmentId
     * @param clientId
     */
    MedMeAPIAppointment.prototype.clientConfirmAppointmentById = function (appointmentId, clientId) {
        var params = {
            appointment: {
                id: appointmentId
            },
            client: {
                id: clientId
            }
        };
        return this.clientConfirmAppointment(params);
    };
    /**
     * Отмена записи клиентом
     * @param params
     */
    MedMeAPIAppointment.prototype.cancelAppointmentByClient = function (params) {
        return this.apiRequest_("appointment.cancel_appointment_by_client", params)
            .then(function (res) { return res.result; });
    };
    /**
     * Отмена записи администратором бизнеса
     * @param params
     */
    MedMeAPIAppointment.prototype.cancelAppointmentByBusiness = function (params) {
        return this.apiRequest_("appointment.cancel_appointment_by_business", params)
            .then(function (res) { return res.result; });
    };
    /**
     * Удаление неподтвержденного резерва
     * @param params
     */
    MedMeAPIAppointment.prototype.clientRemoveEmptyAppointment = function (params) {
        return this.apiRequest_("appointment.client_remove_empty_appointment", params)
            .then(function (res) { return res.result; });
    };
    /**
     * Получение записей по фильтру.
     * @param params
     */
    MedMeAPIAppointment.prototype.getAppointmentByFilter = function (params) {
        return this.apiRequest_("appointment.get_appointment_by_filter", params)
            .then(function (res) { return res.result; });
    };
    /**
     * Получение записей витрины.
     * @param params
     */
    MedMeAPIAppointment.prototype.getAppointmentByShowcase = function (params) {
        return this.apiRequest_("appointment.get_appointment_by_showcase", params)
            .then(function (res) { return res.result; });
    };
    /**
     * Получение записей клиента.
     * @param params
     */
    MedMeAPIAppointment.prototype.getAppointmentByClient = function (params, cred) {
        return this.apiRequest_("appointment.get_appointments_by_client_v2", params, cred)
            .then(function (res) { return res.result; });
    };
    /**
     * Получение записей пользователя.
     * @param params
     */
    MedMeAPIAppointment.prototype.getAppointmentByUser = function (params, cred) {
        return this.apiRequest_("appointment.get_appointments_by_user", params, cred)
            .then(function (res) { return res.result; });
    };
    /**
     * Устанавливает свойство записи "клиент пришел"
     * @param params
     * @param cred
     */
    MedMeAPIAppointment.prototype.clientAppear = function (params, cred) {
        return this.apiRequest_("appointment.client_appear", params, cred)
            .then(function (res) { return res.result; });
    };
    return MedMeAPIAppointment;
}(basic_1.MedMeAPIBasic));
exports.MedMeAPIAppointment = MedMeAPIAppointment;
