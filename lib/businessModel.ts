import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import {SetType} from "./types";


/**
 * Критерий для показа активных работников на виджете
 * @param res
 * @return boolean
 */
function resourceIsActiveInWidget(res: GBookingCoreV2.Resource): boolean {
    return res.status === GBookingCoreV2.ResourceStatus.Active && res.displayInWidget
        && !res.scheduleIsEmpty;
}

/**
 * Критерий для показа активных таксономий на виджете
 * @param tax
 * @return boolean
 */
function taxonomyIsActiveInWidget(tax: GBookingCoreV2.BusinessTaxonomy): boolean {
    return tax.active && tax.displayInWidget;
}

/**
 *
 */
export type TaxonomyTreeType = { [key: string]: GBookingCoreV2.BusinessTaxonomy[] };

/**
 *
 */
export type TaxonomyTreeBottomUpType = { [key: string]: GBookingCoreV2.BusinessTaxonomy };
export type TaxonomyVisitorObjectType = {path: GBookingCoreV2.BusinessTaxonomy[], taxonomyTree: TaxonomyTreeType};
export type TaxonomyVisitorCallback = ((tax: GBookingCoreV2.BusinessTaxonomy, obj: TaxonomyVisitorObjectType) => void);

/**
 *
 */
export class MedMedAPIBusinessModel {
    private business_: GBookingCoreV2.BusinessClass;
    private activeResources_: GBookingCoreV2.Resource[] = null;
    private activeTaxonomies_: GBookingCoreV2.BusinessTaxonomy[] = null;
    private activeInWidgetTaxonomySet_: SetType = null;
    private taxonomyActiveResourceSet_: SetType = null;
    private taxonomyFullTree_: TaxonomyTreeType = null;
    private taxonomyTreeBottomUp_: TaxonomyTreeBottomUpType = null;

    /**
     *
     * @param business
     */
    constructor(business: GBookingCoreV2.BusinessClass) {
        this.business_ = business;
    }

    /**
     * Возвращает массив активных ресурсов.
     * Если во 2-м параметре передано true, то возвращаются только работники, имеющие активные
     * таксономии на виджете.
     * @param hasActiveTaxonomies
     * @return GBookingCoreV2.Resource[]
     */
    public activeResourcesInWidget(hasActiveTaxonomies: boolean = false): GBookingCoreV2.Resource[] {
        let resources = this.activeResources_ === null ? this.activeResources_ =
            this.business_.resources.filter(resourceIsActiveInWidget) : this.activeResources_;

        if (hasActiveTaxonomies) {
            const activeTaxonomySet = this.activeInWidgetTaxonomySet();
            resources = resources.filter((res: GBookingCoreV2.Resource) =>
                res.taxonomies.length && !!res.taxonomies.find((taxonomyId) =>
                    activeTaxonomySet[taxonomyId]));
        }

        return resources;
    }

    /**
     * Возвращает массив активных ресурсов, выполняющих услугу, переданную в качестве параметра.
     * Если во 2-м параметре передано true, то возвращаются только работники, имеющие активные
     * таксономии на виджете.
     * @param taxonomyId
     * @param hasActiveTaxonomies
     * @return GBookingCoreV2.Resource[]
     */
    public activeResourcesInWidgetFromTaxonomy(taxonomyId: string, hasActiveTaxonomies: boolean = false): GBookingCoreV2.Resource[] {
        return this.activeResourcesInWidget().filter((res: GBookingCoreV2.Resource) =>
            res.taxonomies.indexOf(taxonomyId) >= 0);
    }

    /**
     * Возвращает массив активных таксономий.
     * Если во 2-м параметре передано true, то возвращаются только таксономии,
     * имеющие исполнителей.
     * @param hasExecutors
     * @return GBookingCoreV2.BusinessTaxonomy[]
     */
    public activeTaxonomiesInWidget(hasExecutors: boolean = false): GBookingCoreV2.BusinessTaxonomy[] {
        let taxonomies = this.activeTaxonomies_ === null ? this.activeTaxonomies_ =
            this.business_.taxonomies.filter(taxonomyIsActiveInWidget) : this.activeTaxonomies_;

        if (hasExecutors) {
            const taxonomyActiveResourceSet = this.taxonomyActiveResourceSet();
            taxonomies = taxonomies.filter((tax: GBookingCoreV2.BusinessTaxonomy) =>
                taxonomyActiveResourceSet[tax.id]);
        }

        return taxonomies;
    }

    /**
     * Возвращает таксономию по её идентификатору.
     * @param id
     * @return GBookingCoreV2.BusinessTaxonomy
     */
    public getTaxonomyById(id: string): GBookingCoreV2.BusinessTaxonomy {
        const taxonomyById = this.taxonomyTreeBottomUp();
        return taxonomyById[id];
    }

    /**
     * Возвращает объект, в качестве ключа в котором выступает идентификатор таксономии,
     * в качестве значения - булево значение - активна или нет таксономия на виджете.
     * @return SetType
     */
    public activeInWidgetTaxonomySet(): SetType {
        if (this.activeInWidgetTaxonomySet_ === null)
            this.activeInWidgetTaxonomySet_ = this.activeTaxonomiesInWidget().reduce((ret: object, tax: GBookingCoreV2.BusinessTaxonomy) => {
                ret[tax.id] = taxonomyIsActiveInWidget(tax);
                return ret;
            }, {});

        return this.activeInWidgetTaxonomySet_;
    }

    /**
     * Возвращает объект, в качестве ключа в котором выступает идентификатор таксономии,
     * в качестве значения - булево значение - имеет или нет таксономия исполнителей.
     * @return SetType
     */
    public taxonomyActiveResourceSet(): SetType {
        if (this.taxonomyActiveResourceSet_ === null) {
            this.taxonomyActiveResourceSet_ = {};
            for (let res of this.activeResourcesInWidget())
                for (let taxonomyId of res.taxonomies)
                    this.taxonomyActiveResourceSet_[taxonomyId] = resourceIsActiveInWidget(res);

            const taxonomyTree = this.taxonomyFullTree();
            const visitor = (tax, obj) => {
                if (this.taxonomyActiveResourceSet_[tax.id])
                    for (let item of obj.path)
                        this.taxonomyActiveResourceSet_[item.id] = true;
            };
            this.traverseTaxonomyLeaves(taxonomyTree, this.business_.vertical, visitor);
        }
        return this.taxonomyActiveResourceSet_;
    }

    /**
     * Возвращает массив активных таксономий, отображаемых на виджете и выполняемых работником.
     *  Данный метод возвращает только те услуги, которые привязаны к работник, но не их родителей.
     * @param res
     */
    public activeTaxonomiesInWidgetFromResource(res: GBookingCoreV2.Resource) {
        if (this.activeTaxonomies_ === null) {
            this.activeTaxonomies_ = [];
            return this.business_.taxonomies.filter((tax) =>
                taxonomyIsActiveInWidget(tax) && this.activeTaxonomies_.push(tax) &&
                res.taxonomies.indexOf(tax.id) >= 0)
        }

        return this.activeTaxonomies_.filter((tax) =>
            res.taxonomies.indexOf(tax.id) >= 0);
    }

    /**
     * Возвращает дерево таксономий в виде объекта.
     * В качестве ключа выступает идентификатор родетеля, в качестве значения - список дочерних элементов.
     * @param taxonomies
     * @return {TaxonomyTreeType}
     */
    public taxonomyTree(taxonomies: GBookingCoreV2.BusinessTaxonomy[]): TaxonomyTreeType {
        let child = {};
        for (let tax of taxonomies) {
            child[tax.taxonomyParentID] = child[tax.taxonomyParentID] || [];
            child[tax.taxonomyParentID].push(tax);
        }
        return child;
    }

    /**
     * Возвращает дерево всех таксономий бизнеса.
     * @see taxonomyTree
     * @return {TaxonomyTreeType}
     */
    public taxonomyFullTree(): TaxonomyTreeType {
        return this.taxonomyFullTree_ === null ?
            this.taxonomyFullTree_ = this.taxonomyTree(this.business_.taxonomies) :
            this.taxonomyFullTree_;
    }

    /**
     * Возвращает дерево таксономий в виде объекта.
     * В качестве ключа выступает идентификатор таксономии, в качестве значения - сам объект таксономии.
     */
    public taxonomyTreeBottomUp(): TaxonomyTreeBottomUpType {
        if (this.taxonomyTreeBottomUp_ === null) {
            let map = {};
            for (let tax of this.business_.taxonomies)
                map[tax.id] = tax;
            this.taxonomyTreeBottomUp_ = map;
        }

        return this.taxonomyTreeBottomUp_;
    }

    /**
     * Возвращает путь таксономии от родителя до нее самой включительно.
     * Возвращает массив таксономий, начиная от родительской и заканчивая переданной в метод.
     * @param taxonomy
     * @return GBookingCoreV2.BusinessTaxonomy[]
     */
    public taxonomyPath(taxonomy: GBookingCoreV2.BusinessTaxonomy): GBookingCoreV2.BusinessTaxonomy[] {
        const taxonomyTreeBottomUp = this.taxonomyTreeBottomUp();
        let path = [];
        while (taxonomy) {
            path.push(taxonomy);
            taxonomy = taxonomyTreeBottomUp[taxonomy.taxonomyParentID];
        }
        return path.reverse();
    }

    /**
     * Обход дерева услуг
     * Для создания дерева таксономий используйте метод taxonomyTree.
     * @see taxonomyTree
     * @param taxonomyTree
     * @param parentTaxonomyId
     * @param visitor
     */
    public traverseTaxonomyTree(taxonomyTree: TaxonomyTreeType, parentTaxonomyId: string, visitor: TaxonomyVisitorCallback) {
        if (!taxonomyTree[parentTaxonomyId] || taxonomyTree[parentTaxonomyId].length === 0)
            return;

        const dfs = (tax: GBookingCoreV2.BusinessTaxonomy,
                     visit: TaxonomyVisitorCallback,
                     obj: TaxonomyVisitorObjectType): void => {
            obj.path.push(tax);
            visit(tax, obj);
            for (let child of (taxonomyTree[tax.id] || []))
                dfs(child, visit, obj);
            obj.path.pop();
        };

        for (let tax of taxonomyTree[parentTaxonomyId])
            dfs(tax, visitor, {path: [], taxonomyTree});

        return;
    }

    /**
     * Обход листьев дерева услуг
     * Для создания дерева таксономий используйте метод taxonomyTree.
     * @see taxonomyTree
     * @param taxonomyTree
     * @param parentTaxonomyId
     * @param visitor
     */
    public traverseTaxonomyLeaves(taxonomyTree: TaxonomyTreeType, parentTaxonomyId: string,
                                  visitor: TaxonomyVisitorCallback) {
        const visitor_ = (tax: GBookingCoreV2.BusinessTaxonomy, obj: TaxonomyVisitorObjectType) => {
            if (!obj.taxonomyTree[tax.id] || obj.taxonomyTree[tax.id].length === 0)
                visitor(tax, obj);
        };

        return this.traverseTaxonomyTree(taxonomyTree, parentTaxonomyId, visitor_);
    }

    /**
     * Возвращает список таксономий, находящихся на одном уровне дерева таксономий.
     * Для создания дерева таксономий используйте метод taxonomyTree.
     * @see taxonomyTree
     * @param taxonomyTree
     * @param parentTaxonomyId
     */
    public taxonomyLayer(taxonomyTree: TaxonomyTreeType, parentTaxonomyId: string):
        GBookingCoreV2.BusinessTaxonomy[] | undefined {
        return taxonomyTree[parentTaxonomyId];
    }

    /**
     * Возвращает список таксономий, находящихся на верхнем уровне дерева таксономий.
     * @see taxonomyLayer
     * @param taxonomyTree
     */
    public taxonomyTopLayer(taxonomyTree: TaxonomyTreeType): GBookingCoreV2.BusinessTaxonomy[] | undefined {
        return this.taxonomyLayer(taxonomyTree, this.business_.vertical);
    }
}
