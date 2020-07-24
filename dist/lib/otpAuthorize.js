import * as fetch from 'node-fetch';
import { OAUTH_OTP_SEND, OAUTH_OTP_VERIFY, OAUTH_OTP_WEBLOGIN, OTP_REQUEST_DEBUG } from '../env.prod';
var debug = OTP_REQUEST_DEBUG;
/**
 * Методы OTP авторизации.
 */
var MedMeAPIOTPAuthorize = /** @class */ (function () {
    function MedMeAPIOTPAuthorize() {
    }
    /**
     * Отправить OTP код на номер телефона.
     * @param businessId
     * @param phoneCountry
     * @param phoneArea
     * @param phoneNumber
     */
    MedMeAPIOTPAuthorize.prototype.send = function (businessId, phoneCountry, phoneArea, phoneNumber) {
        var qs = {
            businessID: businessId,
            phone_country: phoneCountry,
            phone_area: phoneArea,
            phone_number: phoneNumber
        };
        var otpSendUrl = new URL(OAUTH_OTP_SEND);
        Object.keys(qs).forEach(function (param) {
            return otpSendUrl.searchParams.append(param, qs[param]);
        });
        debug && console.debug('<-- otp send', otpSendUrl);
        return fetch(otpSendUrl)
            .then(function (res) { return res.text(); })
            .then(function (json) {
            debug && console.debug('--> otp send', json);
            return JSON.parse(json);
        })
            .then(function (res) {
            if (res.error)
                throw { isRpcError: true, error: res.error };
            return res;
        });
    };
    /**
     * Отправляет запрос на проверку OTP кода.
     * В ответ возвращает параметры сессии.
     * @param oauthClientId
     * @param token
     * @param code
     * @param resetPassword
     */
    MedMeAPIOTPAuthorize.prototype.verify = function (oauthClientId, token, code, resetPassword) {
        var jsonRequest = {
            client: oauthClientId,
            token: token,
            code: code,
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
            .then(function (res) { return res.text(); })
            .then(function (json) {
            debug && console.debug('--> otp verify', json);
            return JSON.parse(json);
        })
            .then(function (res) {
            if (res.error)
                throw { isRpcError: true, error: res.error };
            return res;
        });
    };
    /**
     * Receive users credentials by phone and password
     * @param phone
     * @param password
     */
    MedMeAPIOTPAuthorize.prototype.webLogin = function (phone, password) {
        var jsonRequest = {
            phone: phone,
            password: password,
        };
        debug && console.debug('<-- webLogin', OAUTH_OTP_WEBLOGIN, jsonRequest);
        return fetch(OAUTH_OTP_WEBLOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(function (res) { return res.text(); })
            .then(function (json) {
            debug && console.debug('--> otp send', json);
            return JSON.parse(json);
        })
            .then(function (res) {
            if (res.error)
                throw { isRpcError: true, error: res.error };
            return res;
        });
    };
    return MedMeAPIOTPAuthorize;
}());
export { MedMeAPIOTPAuthorize };