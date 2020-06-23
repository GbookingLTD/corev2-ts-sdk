import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import {apiRequest} from "./request";
import {CORE_API_ENDPOINT} from "../env.prod";

/**
 * Методы для резервирования, подтверждения, отмены записи, снятия резерва записи, получения записей.
 */
export class MedMeAPIAppointment {
    /**
     * Резервирование времени для записи
     * @param params
     */
    reserveAppointment(params: GBookingCoreV2.AppointmentReserve): Promise<GBookingCoreV2.Appointment> {
        return apiRequest(CORE_API_ENDPOINT, "appointment.reserve_appointment", params)
            .then((res) => res.result);
    }

    /**
     * Подтверждение записи клиентом
     * @param params
     */
    clientConfirmAppointment(params: GBookingCoreV2.ConfirmAppointment): Promise<GBookingCoreV2.Appointment> {
        return apiRequest(CORE_API_ENDPOINT, "appointment.client_confirm_appointment", params)
            .then((res) => res.result);
    }

    /**
     * Подтверждение записи администратором бизнеса
     * @see clientConfirmAppointment
     * @param appointmentId
     * @param clientId
     */
    clientConfirmAppointmentById(appointmentId: string, clientId: string): Promise<GBookingCoreV2.Appointment> {
        const params = {
            appointment: {
                id: appointmentId
            },
            client: {
                id: clientId
            }
        } as GBookingCoreV2.ConfirmAppointment;

        return this.clientConfirmAppointment(params);
    }

    /**
     * Отмена записи клиентом
     * @param params
     */
    cancelAppointmentByClient(params: GBookingCoreV2.AppointmentCancelAppointmentByClientRequestParams):
        Promise<boolean> {
        return apiRequest(CORE_API_ENDPOINT, "appointment.cancel_appointment_by_client", params)
            .then((res) => res.result);
    }

    /**
     * Отмена записи администратором бизнеса
     * @param params
     */
    cancelAppointmentByBusiness(params: GBookingCoreV2.CancelAppointmentByClient):
        Promise<boolean> {
        return apiRequest(CORE_API_ENDPOINT, "appointment.cancel_appointment_by_business", params)
            .then((res) => res.result);
    }

    /**
     * Удаление неподтвержденного резерва
     * @param params
     */
    clientRemoveEmptyAppointment(params: GBookingCoreV2.RemoveEmptyAppointment):
        Promise<boolean> {
        return apiRequest(CORE_API_ENDPOINT, "appointment.client_remove_empty_appointment", params)
            .then((res) => res.result);
    }

    /**
     * Получение записей по фильтру.
     * @param params
     */
    getAppointmentByFilter(params: GBookingCoreV2.AppointmentGetAppointmentByFilterRequestParams):
        Promise<GBookingCoreV2.AppointmentGetAppointmentByFilterResponseResult> {
        return apiRequest(CORE_API_ENDPOINT, "appointment.get_appointment_by_filter", params)
            .then((res) => res.result);
    }

    /**
     * Получение записей витрины.
     * @param params
     */
    getAppointmentByShowcase(params: GBookingCoreV2.AppointmentGetAppointmentByShowcaseRequestParams):
        Promise<GBookingCoreV2.Appointment[]> {
        return apiRequest(CORE_API_ENDPOINT, "appointment.get_appointment_by_showcase", params)
            .then((res) => res.result);
    }

    /**
     * Получение записей клиента.
     * @param params
     */
    getAppointmentByClient(params: GBookingCoreV2.AppointmentGetAppointmentsByClientV2RequestParams, cred: GBookingCoreV2.Cred):
        Promise<GBookingCoreV2.Appointment[]> {
        return apiRequest(CORE_API_ENDPOINT, "appointment.get_appointments_by_client_v2", params, cred)
            .then((res) => res.result);
    }

    /**
     * Получение записей пользователя.
     * @param params
     */
    getAppointmentByUser(params: GBookingCoreV2.AppointmentGetAppointmentsByUserRequestParams, cred: GBookingCoreV2.Cred):
        Promise<GBookingCoreV2.Appointment[]> {
        return apiRequest(CORE_API_ENDPOINT, "appointment.get_appointments_by_user", params, cred)
            .then((res) => res.result);
    }
}
