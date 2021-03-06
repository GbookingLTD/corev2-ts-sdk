"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.MedMeAPIClient = void 0;
var basic_1 = require("./basic");
/**
 * Методы для создания и/или получения клиента, редактирования данных клиента.
 */
var MedMeAPIClient = /** @class */ (function (_super) {
    __extends(MedMeAPIClient, _super);
    function MedMeAPIClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @param params
     */
    MedMeAPIClient.prototype.addClient = function (params) {
        return this.apiRequest_("client.add_client", params)
            .then(function (res) { return res.result; });
    };
    /**
     *
     * @param params
     */
    MedMeAPIClient.prototype.findOrCreateClient = function (params) {
        return this.apiRequest_("client.find_or_create_client", params)
            .then(function (res) { return res.result; });
    };
    /**
     *
     * @param params
     */
    MedMeAPIClient.prototype.updateClient = function (params) {
        return this.apiRequest_("client.update_client", params)
            .then(function (res) { return res.result.success; });
    };
    return MedMeAPIClient;
}(basic_1.MedMeAPIBasic));
exports.MedMeAPIClient = MedMeAPIClient;
