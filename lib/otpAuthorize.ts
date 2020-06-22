import * as fetch from 'node-fetch';
import {
    OAUTH_OTP_SEND,
    OAUTH_OTP_VERIFY,
    OAUTH_OTP_WEBLOGIN,
    OTP_REQUEST_DEBUG
} from '../env.prod';

const debug: boolean = OTP_REQUEST_DEBUG;

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
    askNewPass: boolean; // client should set new password over change_password method
                         // webLogin will not give access if askNewPass is true

}

/**
 * Методы OTP авторизации.
 */
export class MedMeAPIOTPAuthorize {
    /**
     * Отправить OTP код на номер телефона.
     * @param businessId
     * @param phoneCountry
     * @param phoneArea
     * @param phoneNumber
     */
    public send(businessId: string, phoneCountry: string, phoneArea: string, phoneNumber: string):
        Promise<OTPAuthenticateSendResponse> {
        const qs = {
            businessID: businessId,
            phone_country: phoneCountry,
            phone_area: phoneArea,
            phone_number: phoneNumber
        }

        const otpSendUrl = new URL(OAUTH_OTP_SEND);
        Object.keys(qs).forEach((param) =>
            otpSendUrl.searchParams.append(param, qs[param]));

        debug && console.debug('<-- otp send', otpSendUrl);

        return fetch(otpSendUrl)
            .then(res => res.text())
            .then(json => {
                debug && console.debug('--> otp send', json)
                return JSON.parse(json);
            })
            .then((res: any) => {
                if (res.error)
                    throw {isRpcError: true, error: res.error};
                return res;
            })
    }

    /**
     * Отправляет запрос на проверку OTP кода.
     * В ответ возвращает параметры сессии.
     * @param oauthClientId
     * @param token
     * @param code
     * @param resetPassword
     */
    public verify(oauthClientId: string, token: string, code: string, resetPassword?:boolean):
        Promise<OTPAuthenticateVerifyResponse> {
        const jsonRequest = {
            client: oauthClientId,
            token,
            code,
            resetPassword: !!resetPassword
        };
        debug && console.debug('<-- otp verify', OAUTH_OTP_VERIFY, jsonRequest);

        return fetch(OAUTH_OTP_VERIFY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(res => res.text())
            .then(json => {
                debug && console.debug('--> otp verify', json)
                return JSON.parse(json);
            })
            .then((res: any) => {
                if (res.error)
                    throw {isRpcError: true, error: res.error};
                return res;
            })
    }

    /**
     * Receive users credentials by phone and password
     * @param phone 
     * @param password 
     */
    public webLogin(phone: string, password: string): Promise<OTPAuthenticateVerifyResponse> {
        const qs = {
            phone,
            password,
        }

        const otpSendUrl = new URL(OAUTH_OTP_WEBLOGIN);
        Object.keys(qs).forEach((param) =>
            otpSendUrl.searchParams.append(param, qs[param]));

        debug && console.debug('<-- otp send', otpSendUrl);

        return fetch(otpSendUrl)
            .then(res => res.text())
            .then(json => {
                debug && console.debug('--> otp send', json)
                return JSON.parse(json);
            })
            .then((res: any) => {
                if (res.error)
                    throw {isRpcError: true, error: res.error};
                return res;
            })
    }
}