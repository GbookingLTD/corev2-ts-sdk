import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
/**
 * @this IMedMeJsonRpcEnv
 * @param endpoint
 * @param method
 * @param params
 * @param cred
 */
export declare function jsonRpcRequest(endpoint: string, method: string, params: GBookingCoreV2.ParamsUnion, cred?: GBookingCoreV2.Cred): any;
