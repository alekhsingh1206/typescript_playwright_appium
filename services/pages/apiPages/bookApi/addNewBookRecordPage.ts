import test, { APIRequestContext, expect, request } from "@playwright/test";
import Params, { GlobalConst as gc } from "../../../../utils/params";
import APIendpoints, { API_ENDPOINTS } from "../../../../config/endpoint.config";
import postReqPayload from "../../../../data/apiData/payload/postPayload.json";
import addNewBookHeader from "../../../../data/apiData/headers/addNewBookHeader.json";

export class AddNewBookRecordPage {
 
    private param: Params;
    
    constructor(param: Params) {
        this.param = param
    }

    // hiting post api to create new book record and returning response back
    async addNewBookRecord(request, baseApiURL : string|undefined){
        let uri = baseApiURL+APIendpoints.createBookRecord;
        const response = await request.post(uri, addNewBookHeader, postReqPayload);
        console.log("response is....",response);
        return response;
    }
}