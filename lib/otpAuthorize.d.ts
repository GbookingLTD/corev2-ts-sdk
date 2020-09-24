import { IMedMeJsonRpcEnv } from "./jsonRpcEnv";
/**
 *
 */
export interface OTPAuthenticateSendResponse {
    token: string;
}
/**
 *
 */
export interface OTPAuthenticateVerifyResponse {
    user: string;
    token: string;
    auth_user: string;
    expires: string;
    askNewPass: boolean;
}
/**
 * Методы OTP авторизации.
 */
export declare class MedMeAPIOTPAuthorize {
    private readonly env_;
    constructor(env: IMedMeJsonRpcEnv);
    /**
     * Отправить OTP код на номер телефона.
     * @param businessId
     * @param phoneCountry
     * @param phoneArea
     * @param phoneNumber
     */
    send(businessId: string, phoneCountry: string, phoneArea: string, phoneNumber: string): Promise<OTPAuthenticateSendResponse>;
    /**
     * Отправляет запрос на проверку OTP кода.
     * В ответ возвращает параметры сессии.
     * @param oauthClientId
     * @param token
     * @param code
     * @param resetPassword
     */
    verify(oauthClientId: string, token: string, code: string, resetPassword?: boolean): Promise<OTPAuthenticateVerifyResponse>;
    /**
     * Receive users credentials by phone and password
     * @param phone
     * @param password
     */
    webLogin(phone: string, password: string): Promise<OTPAuthenticateVerifyResponse>;
}
