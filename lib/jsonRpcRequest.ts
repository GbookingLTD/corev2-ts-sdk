import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import * as fetch from 'node-fetch';
import {IMedMeJsonRpcEnv} from "./jsonRpcEnv";

let jsonRpcCounter: number = 1;

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
export class JsonRpcRequestContext
    implements IJsonRpcRequestContext {
    public env: IMedMeJsonRpcEnv;
    public cred?: GBookingCoreV2.Cred;

    constructor(env: IMedMeJsonRpcEnv) {
        this.env = env;
    }
}

/**
 * @this IJsonRpcRequestContext
 * @param endpoint
 * @param method
 * @param params
 */
export function jsonRpcRequest(endpoint: string, method: string, params: GBookingCoreV2.ParamsUnion): any {
    const debug: boolean = this.env.JSONRPC_REQUEST_DEBUG;
    let req: GBookingCoreV2.RequestClass = {
        jsonrpc: "2.0",
        id: jsonRpcCounter++,
        method: method,
        params: params,
        cred: this.cred
    };

    const jsonRequest = JSON.stringify(req as GBookingCoreV2.BusinessGetProfileByIdRequest);
    debug && console.debug('<--', jsonRequest);
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonRequest
    })
        .then(res => res.text())
        .then(json => {
            debug && console.debug('-->', json)
            return JSON.parse(json);
        })
        .then((res: any) => {
            if (res.error)
                throw {isRpcError: true, error: res.error};
            return res;
        })
}
