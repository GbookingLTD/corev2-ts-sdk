import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
/**
 * Методы для резервирования, подтверждения, отмены записи, снятия резерва записи, получения записей.
 */
export declare class MedMeAPIAppointment {
    /**
     * Резервирование времени для записи
     * @param params
     */
    reserveAppointment(params: GBookingCoreV2.AppointmentReserve): Promise<GBookingCoreV2.Appointment>;
    /**
     * Подтверждение записи клиентом
     * @param params
     */
    clientConfirmAppointment(params: GBookingCoreV2.ConfirmAppointment): Promise<GBookingCoreV2.Appointment>;
    /**
     * Подтверждение записи администратором бизнеса
     * @see clientConfirmAppointment
     * @param appointmentId
     * @param clientId
     */
    clientConfirmAppointmentById(appointmentId: string, clientId: string): Promise<GBookingCoreV2.Appointment>;
    /**
     * Отмена записи клиентом
     * @param params
     */
    cancelAppointmentByClient(params: GBookingCoreV2.AppointmentCancelAppointmentByClientRequestParams): Promise<boolean>;
    /**
     * Отмена записи администратором бизнеса
     * @param params
     */
    cancelAppointmentByBusiness(params: GBookingCoreV2.CancelAppointmentByClient): Promise<boolean>;
    /**
     * Удаление неподтвержденного резерва
     * @param params
     */
    clientRemoveEmptyAppointment(params: GBookingCoreV2.RemoveEmptyAppointment): Promise<boolean>;
    /**
     * Получение записей по фильтру.
     * @param params
     */
    getAppointmentByFilter(params: GBookingCoreV2.AppointmentGetAppointmentByFilterRequestParams): Promise<GBookingCoreV2.AppointmentGetAppointmentByFilterResponseResult>;
    /**
     * Получение записей витрины.
     * @param params
     */
    getAppointmentByShowcase(params: GBookingCoreV2.AppointmentGetAppointmentByShowcaseRequestParams): Promise<GBookingCoreV2.Appointment[]>;
    /**
     * Получение записей клиента.
     * @param params
     */
    getAppointmentByClient(params: GBookingCoreV2.AppointmentGetAppointmentsByClientV2RequestParams, cred: GBookingCoreV2.Cred): Promise<GBookingCoreV2.Appointment[]>;
    /**
     * Получение записей пользователя.
     * @param params
     */
    getAppointmentByUser(params: GBookingCoreV2.AppointmentGetAppointmentsByUserRequestParams, cred: GBookingCoreV2.Cred): Promise<GBookingCoreV2.AppointmentGetAppointmentsByUserResponseResult>;
}
