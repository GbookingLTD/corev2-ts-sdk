import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import { IMedMeJsonRpcEnv } from "./jsonRpcEnv";
/**
 *
 */
export interface IJsonRpcRequestContext {
    env: IMedMeJsonRpcEnv;
    cred?: GBookingCoreV2.Cred;
}
/**
 *
 */
export declare class JsonRpcRequestContext implements IJsonRpcRequestContext {
    env: IMedMeJsonRpcEnv;
    cred?: GBookingCoreV2.Cred;
    constructor(env: IMedMeJsonRpcEnv);
}
/**
 * @this IJsonRpcRequestContext
 * @param endpoint
 * @param method
 * @param params
 */
export declare function jsonRpcRequest(endpoint: string, method: string, params: GBookingCoreV2.ParamsUnion): any;
