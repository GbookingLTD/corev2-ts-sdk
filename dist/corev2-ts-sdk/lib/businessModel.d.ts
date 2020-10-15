import * as GBookingCoreV2 from 'corev2-schemata/langs/typescript/GBookingCoreV2';
import { SetType } from "./types";
/**
 *
 */
export declare type TaxonomyTreeType = {
    [key: string]: GBookingCoreV2.BusinessTaxonomy[];
};
/**
 *
 */
export declare type TaxonomyTreeBottomUpType = {
    [key: string]: GBookingCoreV2.BusinessTaxonomy;
};
export declare type TaxonomyVisitorObjectType = {
    path: GBookingCoreV2.BusinessTaxonomy[];
    taxonomyTree: TaxonomyTreeType;
};
export declare type TaxonomyVisitorCallback = ((tax: GBookingCoreV2.BusinessTaxonomy, obj: TaxonomyVisitorObjectType) => void);
/**
 *
 */
export declare class MedMedAPIBusinessModel {
    private business_;
    private activeResources_;
    private activeTaxonomies_;
    private activeInWidgetTaxonomySet_;
    private taxonomyActiveResourceSet_;
    private taxonomyFullTree_;
    private taxonomyTreeBottomUp_;
    /**
     *
     * @param business
     */
    constructor(business: GBookingCoreV2.BusinessClass);
    /**
     * Возвращает массив активных ресурсов.
     * Если во 2-м параметре передано true, то возвращаются только работники, имеющие активные
     * таксономии на виджете.
     * @param hasActiveTaxonomies
     * @return GBookingCoreV2.Resource[]
     */
    activeResourcesInWidget(hasActiveTaxonomies?: boolean): GBookingCoreV2.Resource[];
    /**
     * Возвращает массив активных ресурсов, выполняющих услугу, переданную в качестве параметра.
     * Если во 2-м параметре передано true, то возвращаются только работники, имеющие активные
     * таксономии на виджете.
     * @param taxonomyId
     * @param hasActiveTaxonomies
     * @return GBookingCoreV2.Resource[]
     */
    activeResourcesInWidgetFromTaxonomy(taxonomyId: string, hasActiveTaxonomies?: boolean): GBookingCoreV2.Resource[];
    /**
     * Возвращает массив активных таксономий.
     * Если во 2-м параметре передано true, то возвращаются только таксономии,
     * имеющие исполнителей.
     * @param hasExecutors
     * @return GBookingCoreV2.BusinessTaxonomy[]
     */
    activeTaxonomiesInWidget(hasExecutors?: boolean): GBookingCoreV2.BusinessTaxonomy[];
    /**
     * Возвращает таксономию по её идентификатору.
     * @param id
     * @return GBookingCoreV2.BusinessTaxonomy
     */
    getTaxonomyById(id: string): GBookingCoreV2.BusinessTaxonomy;
    /**
     * Возвращает объект, в качестве ключа в котором выступает идентификатор таксономии,
     * в качестве значения - булево значение - активна или нет таксономия на виджете.
     * @return SetType
     */
    activeInWidgetTaxonomySet(): SetType;
    /**
     * Возвращает объект, в качестве ключа в котором выступает идентификатор таксономии,
     * в качестве значения - булево значение - имеет или нет таксономия исполнителей.
     * @return SetType
     */
    taxonomyActiveResourceSet(): SetType;
    /**
     * Возвращает массив активных таксономий, отображаемых на виджете и выполняемых работником.
     *  Данный метод возвращает только те услуги, которые привязаны к работник, но не их родителей.
     * @param res
     */
    activeTaxonomiesInWidgetFromResource(res: GBookingCoreV2.Resource): GBookingCoreV2.BusinessTaxonomy[];
    /**
     * Возвращает дерево таксономий в виде объекта.
     * В качестве ключа выступает идентификатор родетеля, в качестве значения - список дочерних элементов.
     * @param taxonomies
     * @return {TaxonomyTreeType}
     */
    taxonomyTree(taxonomies: GBookingCoreV2.BusinessTaxonomy[]): TaxonomyTreeType;
    /**
     * Возвращает дерево всех таксономий бизнеса.
     * @see taxonomyTree
     * @return {TaxonomyTreeType}
     */
    taxonomyFullTree(): TaxonomyTreeType;
    /**
     * Возвращает дерево таксономий в виде объекта.
     * В качестве ключа выступает идентификатор таксономии, в качестве значения - сам объект таксономии.
     */
    taxonomyTreeBottomUp(): TaxonomyTreeBottomUpType;
    /**
     * Возвращает путь таксономии от родителя до нее самой включительно.
     * Возвращает массив таксономий, начиная от родительской и заканчивая переданной в метод.
     * @param taxonomy
     * @return GBookingCoreV2.BusinessTaxonomy[]
     */
    taxonomyPath(taxonomy: GBookingCoreV2.BusinessTaxonomy): GBookingCoreV2.BusinessTaxonomy[];
    /**
     * Обход дерева услуг
     * Для создания дерева таксономий используйте метод taxonomyTree.
     * @see taxonomyTree
     * @param taxonomyTree
     * @param parentTaxonomyId
     * @param visitor
     */
    traverseTaxonomyTree(taxonomyTree: TaxonomyTreeType, parentTaxonomyId: string, visitor: TaxonomyVisitorCallback): void;
    /**
     * Обход листьев дерева услуг
     * Для создания дерева таксономий используйте метод taxonomyTree.
     * @see taxonomyTree
     * @param taxonomyTree
     * @param parentTaxonomyId
     * @param visitor
     */
    traverseTaxonomyLeaves(taxonomyTree: TaxonomyTreeType, parentTaxonomyId: string, visitor: TaxonomyVisitorCallback): void;
    /**
     * Возвращает список таксономий, находящихся на одном уровне дерева таксономий.
     * Для создания дерева таксономий используйте метод taxonomyTree.
     * @see taxonomyTree
     * @param taxonomyTree
     * @param parentTaxonomyId
     */
    taxonomyLayer(taxonomyTree: TaxonomyTreeType, parentTaxonomyId: string): GBookingCoreV2.BusinessTaxonomy[] | undefined;
    /**
     * Возвращает список таксономий, находящихся на верхнем уровне дерева таксономий.
     * @see taxonomyLayer
     * @param taxonomyTree
     */
    taxonomyTopLayer(taxonomyTree: TaxonomyTreeType): GBookingCoreV2.BusinessTaxonomy[] | undefined;
}
