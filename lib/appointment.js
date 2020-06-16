import { apiRequest } from "./request";
import { CORE_API_ENDPOINT } from "../env.prod";
/**
 * Методы для резервирования, подтверждения, отмены записи, снятия резерва записи, получения записей.
 */
var MedMeAPIAppointment = /** @class */ (function () {
    function MedMeAPIAppointment() {
    }
    /**
     * Резервирование времени для записи
     * @param params
     */
    MedMeAPIAppointment.prototype.reserveAppointment = function (params) {
        return apiRequest(CORE_API_ENDPOINT, "appointment.reserve_appointment", params)
            .then(function (res) { return res.result; });
    };
    /**
     * Подтверждение записи клиентом
     * @param params
     */
    MedMeAPIAppointment.prototype.clientConfirmAppointment = function (params) {
        return apiRequest(CORE_API_ENDPOINT, "appointment.client_confirm_appointment", params)
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
        return apiRequest(CORE_API_ENDPOINT, "appointment.cancel_appointment_by_client", params)
            .then(function (res) { return res.result; });
    };
    /**
     * Отмена записи администратором бизнеса
     * @param params
     */
    MedMeAPIAppointment.prototype.cancelAppointmentByBusiness = function (params) {
        return apiRequest(CORE_API_ENDPOINT, "appointment.cancel_appointment_by_business", params)
            .then(function (res) { return res.result; });
    };
    /**
     * Удаление неподтвержденного резерва
     * @param params
     */
    MedMeAPIAppointment.prototype.clientRemoveEmptyAppointment = function (params) {
        return apiRequest(CORE_API_ENDPOINT, "appointment.client_remove_empty_appointment", params)
            .then(function (res) { return res.result; });
    };
    /**
     * Получение записей по фильтру.
     * @param params
     */
    MedMeAPIAppointment.prototype.getAppointmentByFilter = function (params) {
        return apiRequest(CORE_API_ENDPOINT, "appointment.get_appointment_by_filter", params)
            .then(function (res) { return res.result; });
    };
    /**
     * Получение записей витрины.
     * @param params
     */
    MedMeAPIAppointment.prototype.getAppointmentByShowcase = function (params) {
        return apiRequest(CORE_API_ENDPOINT, "appointment.get_appointment_by_showcase", params)
            .then(function (res) { return res.result; });
    };
    return MedMeAPIAppointment;
}());
export { MedMeAPIAppointment };
