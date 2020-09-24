import * as GBookingCoreV2 from "../../corev2-schemata/langs/typescript/GBookingCoreV2";

export type APIRequestFn = (method: string, params: GBookingCoreV2.ParamsUnion, cred?:GBookingCoreV2.Cred)
    => Promise<any>

export type CRACServerRequestFn = (endpoint: string, method: string, params: GBookingCoreV2.ParamsUnion, cred?:GBookingCoreV2.Cred)
    => Promise<any>

export class MedMeAPIBasic {
    protected apiRequest_: APIRequestFn;
    constructor(apiRequest: APIRequestFn) {
        this.apiRequest_ = apiRequest;
    }

}