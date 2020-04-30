import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import * as fetch from 'node-fetch';
import {
    API_REQUEST_DEBUG
} from '../env.prod';


let jsonRpcCounter: number = 1;

const debug: boolean = API_REQUEST_DEBUG;

export function apiRequest(endpoint: string, method: string, params: GBookingCoreV2.ParamsUnion): any {
    let req: GBookingCoreV2.RequestClass = {
        jsonrpc: "2.0",
        id: jsonRpcCounter++,
        method: method,
        params: params
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
