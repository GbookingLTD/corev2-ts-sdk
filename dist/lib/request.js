import * as fetch from 'node-fetch';
import { API_REQUEST_DEBUG } from '../env.prod';
var jsonRpcCounter = 1;
var debug = API_REQUEST_DEBUG;
export function apiRequest(endpoint, method, params, cred) {
    var req = {
        jsonrpc: "2.0",
        id: jsonRpcCounter++,
        method: method,
        params: params,
        cred: cred
    };
    var jsonRequest = JSON.stringify(req);
    debug && console.debug('<--', jsonRequest);
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonRequest
    })
        .then(function (res) { return res.text(); })
        .then(function (json) {
        debug && console.debug('-->', json);
        return JSON.parse(json);
    })
        .then(function (res) {
        if (res.error)
            throw { isRpcError: true, error: res.error };
        return res;
    });
}
