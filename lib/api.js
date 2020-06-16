import { MedMeAPIBusiness } from "./business";
import { MedMeAPICracSlots } from "./cracSlots";
import { MedMeAPIClient } from "./client";
import { MedMeAPIAppointment } from "./appointment";
import { MedMeAPIOTPAuthorize } from "./otpAuthorize";
import { MedMedAPIBusinessModel } from "./businessModel";
/**
 *
 */
var MedMeAPI = /** @class */ (function () {
    function MedMeAPI() {
    }
    /**
     * Создание бизнес модели для управления данными, полученными из api.
     * @param business
     */
    MedMeAPI.createBusinessModel = function (business) {
        return new MedMedAPIBusinessModel(business);
    };
    /**
     * Набор методов для доступа к методам API с префиксом "business".
     */
    MedMeAPI.business = new MedMeAPIBusiness();
    /**
     * Методы для получения слотов расписания.
     */
    MedMeAPI.slots = new MedMeAPICracSlots();
    /**
     * Методы для создания и/или получения клиента, редактирования данных клиента.
     */
    MedMeAPI.client = new MedMeAPIClient();
    /**
     * Методы для резервирования, подтверждения, отмены записи, снятия резерва записи, получения записей.
     */
    MedMeAPI.appointment = new MedMeAPIAppointment();
    /**
     * Методы для OTP авторизации.
     */
    MedMeAPI.otpAuthorize = new MedMeAPIOTPAuthorize();
    return MedMeAPI;
}());
export { MedMeAPI };
