import * as fetch from 'node-fetch';
/**
 * Методы OTP авторизации.
 */
var MedMeAPIOTPAuthorize = /** @class */ (function () {
    function MedMeAPIOTPAuthorize(env) {
        this.env_ = env;
    }
    /**
     * Отправить OTP код на номер телефона.
     * @param businessId
     * @param phoneCountry
     * @param phoneArea
     * @param phoneNumber
     */
    MedMeAPIOTPAuthorize.prototype.send = function (businessId, phoneCountry, phoneArea, phoneNumber) {
        var debug = this.env_.OTP_REQUEST_DEBUG;
        var qs = {
            businessID: businessId,
            phone_country: phoneCountry,
            phone_area: phoneArea,
            phone_number: phoneNumber
        };
        var otpSendUrl = new URL(this.env_.OAUTH_OTP_SEND);
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
        var debug = this.env_.OTP_REQUEST_DEBUG;
        var jsonRequest = {
            client: oauthClientId,
            token: token,
            code: code,
            resetPassword: !!resetPassword
        };
        debug && console.debug('<-- otp verify', this.env_.OAUTH_OTP_VERIFY, jsonRequest);
        return fetch(this.env_.OAUTH_OTP_VERIFY, {
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
        var debug = this.env_.OTP_REQUEST_DEBUG;
        var jsonRequest = {
            phone: phone,
            password: password,
        };
        debug && console.debug('<-- webLogin', this.env_.OAUTH_OTP_WEBLOGIN, jsonRequest);
        return fetch(this.env_.OAUTH_OTP_WEBLOGIN, {
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
