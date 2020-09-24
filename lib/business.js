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
exports.MedMeAPIBusiness = void 0;
var basic_1 = require("./basic");
/**
 *
 */
var MedMeAPIBusiness = /** @class */ (function (_super) {
    __extends(MedMeAPIBusiness, _super);
    function MedMeAPIBusiness() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Получение данных бизнеса.
     * @param params
     */
    MedMeAPIBusiness.prototype.getProfileById = function (params) {
        return this.apiRequest_("business.get_profile_by_id", params);
    };
    /**
     * Получение модели бизнеса по ее идентификатору.
     * Является упрощенной версией метода getProfileById.
     * @see getProfileById
     * @param id
     */
    MedMeAPIBusiness.prototype.getBusinessById = function (id) {
        var params = {
            business: {
                id: id.toString()
            }
        };
        return this.getProfileById(params)
            .then(function (res) {
            return res.result.business;
        });
    };
    /**
     * Получение списка бизнесов сети.
     * @param params
     */
    MedMeAPIBusiness.prototype.getNetworkData = function (params) {
        return this.apiRequest_("business.get_network_data", params);
    };
    /**
     *
     * @param networkId
     * @param takeBusinessInfo
     * @param source
     */
    MedMeAPIBusiness.prototype.getNetworkBusinessList = function (networkId, takeBusinessInfo, source) {
        if (takeBusinessInfo === void 0) { takeBusinessInfo = true; }
        if (source === void 0) { source = 'GENERAL'; }
        var params = {
            networkID: networkId,
            with_business_info: takeBusinessInfo
        };
        return this.getNetworkData(params)
            .then(function (res) {
            var conf = res.result.networkWidgetConfiguration.find(function (conf) {
                return conf.source === source;
            });
            if (!conf)
                throw new Error("not found network source " + source);
            var businessSet = conf.businesses.filter(function (business) { return business.active; })
                .reduce(function (ret, business) {
                ret[business.internalID] = true;
                return ret;
            }, {});
            return res.result.businesses.filter(function (business) {
                return businessSet[business.businessID] && !business.isMapBusiness;
            });
        });
    };
    return MedMeAPIBusiness;
}(basic_1.MedMeAPIBasic));
exports.MedMeAPIBusiness = MedMeAPIBusiness;
