"use strict";
exports.__esModule = true;
exports.jsonRpcRequest = void 0;
var fetch = require("node-fetch");
var env_prod_1 = require("../env.prod");
var jsonRpcCounter = 1;
var debug = env_prod_1.JSONRPC_REQUEST_DEBUG;
function jsonRpcRequest(endpoint, method, params, cred) {
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
exports.jsonRpcRequest = jsonRpcRequest;
