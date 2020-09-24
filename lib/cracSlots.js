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
exports.MedMeAPICracSlots = exports.InvalidParams = void 0;
var dist_1 = require("widget-utils/dist");
var basic_1 = require("./basic");
var InvalidParams = /** @class */ (function (_super) {
    __extends(InvalidParams, _super);
    function InvalidParams(path) {
        var _this = _super.call(this, "Cannot read parameter '" + path.join('.') + "'") || this;
        Error.captureStackTrace(_this, InvalidParams);
        Object.setPrototypeOf(_this, InvalidParams.prototype);
        return _this;
    }
    return InvalidParams;
}(Error));
exports.InvalidParams = InvalidParams;
var _pickRecursive = function (filter, object, path) {
    if (path === void 0) { path = []; }
    var pathLevel = path.length;
    return Object.keys(filter).reduce(function (ret, key) {
        if (object === null || object === undefined)
            throw new InvalidParams(path);
        path[pathLevel] = key;
        if (filter[key] === true && (object[key] === null || object[key] === undefined))
            throw new InvalidParams(path);
        ret[key] = typeof filter[key] === 'object' ?
            _pickRecursive(filter[key], object[key], path.slice(0)) : object[key];
        return ret;
    }, {});
};
/**
 *
 */
var MedMeAPICracSlots = /** @class */ (function (_super) {
    __extends(MedMeAPICracSlots, _super);
    function MedMeAPICracSlots(apiRequest, cracSlotsApiRequest, cracServerRequest, env) {
        var _this = _super.call(this, apiRequest) || this;
        _this.cracSlotsAPIRequest_ = cracSlotsApiRequest;
        _this.cracServerRequest_ = cracServerRequest;
        _this.env_ = env;
        return _this;
    }
    /**
     * Возвращает url сервера CRAC по его названию, полученному из данных бизнеса.
     * @param env: IMedMeJsonRpcEnv
     * @param cracServerName
     */
    MedMeAPICracSlots.getCracEndpointUrl = function (env, cracServerName) {
        var cracUrlMap = {
            'CRAC': env.CRAC_API_ENDPOINT,
            'CRAC3': env.CRAC3_API_ENDPOINT
        };
        return cracUrlMap[cracServerName];
    };
    /**
     *
     * @param taxonomy
     * @param resources
     */
    MedMeAPICracSlots.createResourceFilter = function (taxonomy, resources) {
        var resourceFilter = [];
        for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
            var res = resources_1[_i];
            resourceFilter.push({
                id: res.id,
                duration: dist_1.Taxonomies.getServiceDuration(taxonomy, res)
            });
        }
        return resourceFilter;
    };
    /**
     * Возвращает название сервера CRAC из данных бизнеса.
     * @param business
     */
    MedMeAPICracSlots.getCracServerNameFromBusiness = function (business) {
        return business.widget_configuration.cracServer;
    };
    /**
     * Преобразует объект данных бизнеса GBookingCoreV2.BusinessClass в объект параметров
     * GBookingCoreV2.CracSlotsRequestBusinessParams.
     * @param business
     */
    MedMeAPICracSlots.convertBusinessToParams = function (business) {
        var filter = {
            "id": true,
            "widget_configuration": {
                "cracServer": true,
                "displaySlotSize": false,
                "hideGraySlots": false
            },
            "general_info": {
                "timezone": true
            }
        };
        return _pickRecursive(filter, business);
    };
    /**
     *
     * @param taxonomy
     * @param resources
     * @param dateFrom
     * @param dateTo
     */
    MedMeAPICracSlots.prototype.createCRACResourcesAndRoomsFilters = function (taxonomy, resources, dateFrom, dateTo) {
        var filters = {};
        filters.resources = MedMeAPICracSlots.createResourceFilter(taxonomy, resources);
        filters.taxonomies = [taxonomy.id];
        filters.rooms = [];
        filters.date = {
            from: dateFrom,
            to: dateTo
        };
        return filters;
    };
    /**
     *
     * @param business
     * @param filters
     */
    MedMeAPICracSlots.prototype.getCRACResourcesAndRooms = function (business, filters) {
        var params = {
            business: business,
            filters: filters
        };
        return this.cracSlotsAPIRequest_("CracSlots.GetCRACResourcesAndRooms", params);
    };
    /**
     *
     * @param business
     * @param filters
     */
    MedMeAPICracSlots.prototype.getCRACDistributedResourcesAndRooms = function (business, filters) {
        var params = {
            business: business,
            filters: filters
        };
        return this.cracSlotsAPIRequest_("CracSlots.GetCRACDistributedResourcesAndRooms", params);
    };
    /**
     *
     * @param business
     * @param filters
     */
    MedMeAPICracSlots.prototype.getCRACInsuranceResourcesAndRooms = function (business, filters) {
        var params = {
            business: business,
            filters: filters
        };
        return this.cracSlotsAPIRequest_("CracSlots.GetCRACInsuranceResourcesAndRooms", params);
    };
    /**
     *
     * @param serverName
     * @param params
     */
    MedMeAPICracSlots.prototype.getDistributedResourcesFreeByDate = function (serverName, params) {
        var cracServerEndpoint = MedMeAPICracSlots.getCracEndpointUrl(this.env_, serverName);
        return this.cracServerRequest_(cracServerEndpoint, "Crac.CRACDistributedResourcesFreeByDate", params);
    };
    /**
     *
     * @param serverName
     * @param params
     */
    MedMeAPICracSlots.prototype.getResourcesFreeByDate = function (serverName, params) {
        var cracServerEndpoint = MedMeAPICracSlots.getCracEndpointUrl(this.env_, serverName);
        return this.cracServerRequest_(cracServerEndpoint, "Crac.CRACResourcesFreeByDate", params);
    };
    /**
     *
     * @param serverName
     * @param params
     */
    MedMeAPICracSlots.prototype.getResourcesFreeByDateV2 = function (serverName, params) {
        var cracServerEndpoint = MedMeAPICracSlots.getCracEndpointUrl(this.env_, serverName);
        return this.cracServerRequest_(cracServerEndpoint, "Crac.CRACResourcesFreeByDateV2", params);
    };
    return MedMeAPICracSlots;
}(basic_1.MedMeAPIBasic));
exports.MedMeAPICracSlots = MedMeAPICracSlots;
