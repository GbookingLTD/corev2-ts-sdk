import { IMedMeJsonRpcEnv } from "jsonRpcEnv";


const prodEnv: IMedMeJsonRpcEnv = {
    CORE_API_ENDPOINT: "https://apiv2.gbooking.ru/rpc",
    CRAC_SLOTS_API_ENDPOINT: "http://cracslots.gbooking.ru/rpc",
    CRAC_API_ENDPOINT: "http://crac-prod.gbooking.ru/rpc",
    CRAC3_API_ENDPOINT: "http://crac-prod3.gbooking.ru/rpc",
    OAUTH_OTP_SEND: "https://oauthv2.gbooking.ru/sms/code",
    OAUTH_OTP_VERIFY: "https://oauthv2.gbooking.ru/sms/verify",
    OAUTH_OTP_WEBLOGIN: "https://oauthv2.gbooking.ru/web_login",

    JSONRPC_REQUEST_DEBUG: false,
    OTP_REQUEST_DEBUG: false
};

export default prodEnv;