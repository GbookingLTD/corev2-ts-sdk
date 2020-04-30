import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import {MedMeAPIBusiness} from "./business";
import {MedMeAPICracSlots} from "./cracSlots";
import {MedMeAPIClient} from "./client";
import {MedMeAPIAppointment} from "./appointment";
import {MedMeAPIOTPAuthorize} from "./otpAuthorize";
import {MedMedAPIBusinessModel} from "./businessModel";

/**
 *
 */
export class MedMeAPI {
    /**
     * Набор методов для доступа к методам API с префиксом "business".
     */
    public static readonly business: MedMeAPIBusiness = new MedMeAPIBusiness();

    /**
     * Методы для получения слотов расписания.
     */
    public static readonly slots: MedMeAPICracSlots = new MedMeAPICracSlots();

    /**
     * Методы для создания и/или получения клиента, редактирования данных клиента.
     */
    public static readonly client: MedMeAPIClient = new MedMeAPIClient();

    /**
     * Методы для резервирования, подтверждения, отмены записи, снятия резерва записи, получения записей.
     */
    public static readonly appointment: MedMeAPIAppointment = new MedMeAPIAppointment();

    /**
     * Методы для OTP авторизации.
     */
    public static readonly otpAuthorize: MedMeAPIOTPAuthorize = new MedMeAPIOTPAuthorize();

    /**
     * Создание бизнес модели для управления данными, полученными из api.
     * @param business
     */
    public static createBusinessModel(business: GBookingCoreV2.BusinessClass): MedMedAPIBusinessModel {
        return new MedMedAPIBusinessModel(business);
    }
}
