import * as GBookingCoreV2 from "../../corev2-schemata/langs/typescript/GBookingCoreV2";
export declare type APIRequestFn = (method: string, params: GBookingCoreV2.ParamsUnion, cred?: GBookingCoreV2.Cred) => Promise<any>;
export declare type CRACServerRequestFn = (endpoint: string, method: string, params: GBookingCoreV2.ParamsUnion, cred?: GBookingCoreV2.Cred) => Promise<any>;
export declare class MedMeAPIBasic {
    protected apiRequest_: APIRequestFn;
    constructor(apiRequest: APIRequestFn);
}
