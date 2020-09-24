"use strict";
exports.__esModule = true;
exports.jsonRpcRequest = exports.JsonRpcRequestContext = void 0;
var fetch = require("node-fetch");
var jsonRpcCounter = 1;
/**
 *
 */
var JsonRpcRequestContext = /** @class */ (function () {
    function JsonRpcRequestContext(env) {
        this.env = env;
    }
    return JsonRpcRequestContext;
}());
exports.JsonRpcRequestContext = JsonRpcRequestContext;
/**
 * @this IJsonRpcRequestContext
 * @param endpoint
 * @param method
 * @param params
 */
function jsonRpcRequest(endpoint, method, params) {
    var debug = this.env.JSONRPC_REQUEST_DEBUG;
    var req = {
        jsonrpc: "2.0",
        id: jsonRpcCounter++,
        method: method,
        params: params,
        cred: this.cred
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
exports.jsonRpcRequest = jsonRpcRequest;
