"use strict";
exports.__esModule = true;
exports.MedMedAPIBusinessModel = void 0;
var GBookingCoreV2 = require("corev2-schemata/langs/typescript/GBookingCoreV2");
/**
 * Критерий для показа активных работников на виджете
 * @param res
 * @return boolean
 */
function resourceIsActiveInWidget(res) {
    return res.status === GBookingCoreV2.ResourceStatus.Active && res.displayInWidget
        && !res.scheduleIsEmpty;
}
/**
 * Критерий для показа активных таксономий на виджете
 * @param tax
 * @return boolean
 */
function taxonomyIsActiveInWidget(tax) {
    return tax.active && tax.displayInWidget;
}
/**
 *
 */
var MedMedAPIBusinessModel = /** @class */ (function () {
    /**
     *
     * @param business
     */
    function MedMedAPIBusinessModel(business) {
        this.activeResources_ = null;
        this.activeTaxonomies_ = null;
        this.activeInWidgetTaxonomySet_ = null;
        this.taxonomyActiveResourceSet_ = null;
        this.taxonomyFullTree_ = null;
        this.taxonomyTreeBottomUp_ = null;
        this.business_ = business;
    }
    /**
     * Возвращает массив активных ресурсов.
     * Если во 2-м параметре передано true, то возвращаются только работники, имеющие активные
     * таксономии на виджете.
     * @param hasActiveTaxonomies
     * @return GBookingCoreV2.Resource[]
     */
    MedMedAPIBusinessModel.prototype.activeResourcesInWidget = function (hasActiveTaxonomies) {
        if (hasActiveTaxonomies === void 0) { hasActiveTaxonomies = false; }
        var resources = this.activeResources_ === null ? this.activeResources_ =
            this.business_.resources.filter(resourceIsActiveInWidget) : this.activeResources_;
        if (hasActiveTaxonomies) {
            var activeTaxonomySet_1 = this.activeInWidgetTaxonomySet();
            resources = resources.filter(function (res) {
                return res.taxonomies.length && !!res.taxonomies.find(function (taxonomyId) {
                    return activeTaxonomySet_1[taxonomyId];
                });
            });
        }
        return resources;
    };
    /**
     * Возвращает массив активных ресурсов, выполняющих услугу, переданную в качестве параметра.
     * Если во 2-м параметре передано true, то возвращаются только работники, имеющие активные
     * таксономии на виджете.
     * @param taxonomyId
     * @param hasActiveTaxonomies
     * @return GBookingCoreV2.Resource[]
     */
    MedMedAPIBusinessModel.prototype.activeResourcesInWidgetFromTaxonomy = function (taxonomyId, hasActiveTaxonomies) {
        if (hasActiveTaxonomies === void 0) { hasActiveTaxonomies = false; }
        return this.activeResourcesInWidget().filter(function (res) {
            return res.taxonomies.indexOf(taxonomyId) >= 0;
        });
    };
    /**
     * Возвращает массив активных таксономий.
     * Если во 2-м параметре передано true, то возвращаются только таксономии,
     * имеющие исполнителей.
     * @param hasExecutors
     * @return GBookingCoreV2.BusinessTaxonomy[]
     */
    MedMedAPIBusinessModel.prototype.activeTaxonomiesInWidget = function (hasExecutors) {
        if (hasExecutors === void 0) { hasExecutors = false; }
        var taxonomies = this.activeTaxonomies_ === null ? this.activeTaxonomies_ =
            this.business_.taxonomies.filter(taxonomyIsActiveInWidget) : this.activeTaxonomies_;
        if (hasExecutors) {
            var taxonomyActiveResourceSet_1 = this.taxonomyActiveResourceSet();
            taxonomies = taxonomies.filter(function (tax) {
                return taxonomyActiveResourceSet_1[tax.id];
            });
        }
        return taxonomies;
    };
    /**
     * Возвращает таксономию по её идентификатору.
     * @param id
     * @return GBookingCoreV2.BusinessTaxonomy
     */
    MedMedAPIBusinessModel.prototype.getTaxonomyById = function (id) {
        var taxonomyById = this.taxonomyTreeBottomUp();
        return taxonomyById[id];
    };
    /**
     * Возвращает объект, в качестве ключа в котором выступает идентификатор таксономии,
     * в качестве значения - булево значение - активна или нет таксономия на виджете.
     * @return SetType
     */
    MedMedAPIBusinessModel.prototype.activeInWidgetTaxonomySet = function () {
        if (this.activeInWidgetTaxonomySet_ === null)
            this.activeInWidgetTaxonomySet_ = this.activeTaxonomiesInWidget().reduce(function (ret, tax) {
                ret[tax.id] = taxonomyIsActiveInWidget(tax);
                return ret;
            }, {});
        return this.activeInWidgetTaxonomySet_;
    };
    /**
     * Возвращает объект, в качестве ключа в котором выступает идентификатор таксономии,
     * в качестве значения - булево значение - имеет или нет таксономия исполнителей.
     * @return SetType
     */
    MedMedAPIBusinessModel.prototype.taxonomyActiveResourceSet = function () {
        var _this = this;
        if (this.taxonomyActiveResourceSet_ === null) {
            this.taxonomyActiveResourceSet_ = {};
            for (var _i = 0, _a = this.activeResourcesInWidget(); _i < _a.length; _i++) {
                var res = _a[_i];
                for (var _b = 0, _c = res.taxonomies; _b < _c.length; _b++) {
                    var taxonomyId = _c[_b];
                    this.taxonomyActiveResourceSet_[taxonomyId] = resourceIsActiveInWidget(res);
                }
            }
            var taxonomyTree = this.taxonomyFullTree();
            var visitor = function (tax, obj) {
                if (_this.taxonomyActiveResourceSet_[tax.id])
                    for (var _i = 0, _a = obj.path; _i < _a.length; _i++) {
                        var item = _a[_i];
                        _this.taxonomyActiveResourceSet_[item.id] = true;
                    }
            };
            this.traverseTaxonomyLeaves(taxonomyTree, this.business_.vertical, visitor);
        }
        return this.taxonomyActiveResourceSet_;
    };
    /**
     * Возвращает массив активных таксономий, отображаемых на виджете и выполняемых работником.
     *  Данный метод возвращает только те услуги, которые привязаны к работник, но не их родителей.
     * @param res
     */
    MedMedAPIBusinessModel.prototype.activeTaxonomiesInWidgetFromResource = function (res) {
        var _this = this;
        if (this.activeTaxonomies_ === null) {
            this.activeTaxonomies_ = [];
            return this.business_.taxonomies.filter(function (tax) {
                return taxonomyIsActiveInWidget(tax) && _this.activeTaxonomies_.push(tax) &&
                    res.taxonomies.indexOf(tax.id) >= 0;
            });
        }
        return this.activeTaxonomies_.filter(function (tax) {
            return res.taxonomies.indexOf(tax.id) >= 0;
        });
    };
    /**
     * Возвращает дерево таксономий в виде объекта.
     * В качестве ключа выступает идентификатор родетеля, в качестве значения - список дочерних элементов.
     * @param taxonomies
     * @return {TaxonomyTreeType}
     */
    MedMedAPIBusinessModel.prototype.taxonomyTree = function (taxonomies) {
        var child = {};
        for (var _i = 0, taxonomies_1 = taxonomies; _i < taxonomies_1.length; _i++) {
            var tax = taxonomies_1[_i];
            child[tax.taxonomyParentID] = child[tax.taxonomyParentID] || [];
            child[tax.taxonomyParentID].push(tax);
        }
        return child;
    };
    /**
     * Возвращает дерево всех таксономий бизнеса.
     * @see taxonomyTree
     * @return {TaxonomyTreeType}
     */
    MedMedAPIBusinessModel.prototype.taxonomyFullTree = function () {
        return this.taxonomyFullTree_ === null ?
            this.taxonomyFullTree_ = this.taxonomyTree(this.business_.taxonomies) :
            this.taxonomyFullTree_;
    };
    /**
     * Возвращает дерево таксономий в виде объекта.
     * В качестве ключа выступает идентификатор таксономии, в качестве значения - сам объект таксономии.
     */
    MedMedAPIBusinessModel.prototype.taxonomyTreeBottomUp = function () {
        if (this.taxonomyTreeBottomUp_ === null) {
            var map = {};
            for (var _i = 0, _a = this.business_.taxonomies; _i < _a.length; _i++) {
                var tax = _a[_i];
                map[tax.id] = tax;
            }
            this.taxonomyTreeBottomUp_ = map;
        }
        return this.taxonomyTreeBottomUp_;
    };
    /**
     * Возвращает путь таксономии от родителя до нее самой включительно.
     * Возвращает массив таксономий, начиная от родительской и заканчивая переданной в метод.
     * @param taxonomy
     * @return GBookingCoreV2.BusinessTaxonomy[]
     */
    MedMedAPIBusinessModel.prototype.taxonomyPath = function (taxonomy) {
        var taxonomyTreeBottomUp = this.taxonomyTreeBottomUp();
        var path = [];
        while (taxonomy) {
            path.push(taxonomy);
            taxonomy = taxonomyTreeBottomUp[taxonomy.taxonomyParentID];
        }
        return path.reverse();
    };
    /**
     * Обход дерева услуг
     * Для создания дерева таксономий используйте метод taxonomyTree.
     * @see taxonomyTree
     * @param taxonomyTree
     * @param parentTaxonomyId
     * @param visitor
     */
    MedMedAPIBusinessModel.prototype.traverseTaxonomyTree = function (taxonomyTree, parentTaxonomyId, visitor) {
        if (!taxonomyTree[parentTaxonomyId] || taxonomyTree[parentTaxonomyId].length === 0)
            return;
        var dfs = function (tax, visit, obj) {
            obj.path.push(tax);
            visit(tax, obj);
            for (var _i = 0, _a = (taxonomyTree[tax.id] || []); _i < _a.length; _i++) {
                var child = _a[_i];
                dfs(child, visit, obj);
            }
            obj.path.pop();
        };
        for (var _i = 0, _a = taxonomyTree[parentTaxonomyId]; _i < _a.length; _i++) {
            var tax = _a[_i];
            dfs(tax, visitor, { path: [], taxonomyTree: taxonomyTree });
        }
        return;
    };
    /**
     * Обход листьев дерева услуг
     * Для создания дерева таксономий используйте метод taxonomyTree.
     * @see taxonomyTree
     * @param taxonomyTree
     * @param parentTaxonomyId
     * @param visitor
     */
    MedMedAPIBusinessModel.prototype.traverseTaxonomyLeaves = function (taxonomyTree, parentTaxonomyId, visitor) {
        var visitor_ = function (tax, obj) {
            if (!obj.taxonomyTree[tax.id] || obj.taxonomyTree[tax.id].length === 0)
                visitor(tax, obj);
        };
        return this.traverseTaxonomyTree(taxonomyTree, parentTaxonomyId, visitor_);
    };
    /**
     * Возвращает список таксономий, находящихся на одном уровне дерева таксономий.
     * Для создания дерева таксономий используйте метод taxonomyTree.
     * @see taxonomyTree
     * @param taxonomyTree
     * @param parentTaxonomyId
     */
    MedMedAPIBusinessModel.prototype.taxonomyLayer = function (taxonomyTree, parentTaxonomyId) {
        return taxonomyTree[parentTaxonomyId];
    };
    /**
     * Возвращает список таксономий, находящихся на верхнем уровне дерева таксономий.
     * @see taxonomyLayer
     * @param taxonomyTree
     */
    MedMedAPIBusinessModel.prototype.taxonomyTopLayer = function (taxonomyTree) {
        return this.taxonomyLayer(taxonomyTree, this.business_.vertical);
    };
    return MedMedAPIBusinessModel;
}());
exports.MedMedAPIBusinessModel = MedMedAPIBusinessModel;
